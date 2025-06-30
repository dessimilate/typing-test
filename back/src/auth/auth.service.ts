import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service'
import { AuthDto } from './dto/auth.dto'
import { hash, verify } from 'argon2'
import { RefreshTokenDto } from './dto/refreshToken.dto'
import { UserService } from '@/user/user.service'
import { Response } from 'express'

@Injectable()
export class AuthService {
	REFRESH_TOKEN_NAME = 'refreshToken'
	EXPIRE_DAY_REFRESH_TOKEN = 1

	constructor(
		private readonly jwt: JwtService,
		private readonly userService: UserService
	) {}

	async login(dto: AuthDto) {
		const user = await this.validate(dto)

		const tokens = this.issueTokens(user.id)

		return {
			user,
			...tokens
		}
	}

	async register(dto: AuthDto) {
		const oldUser = await this.userService.getByEmail(dto.email)

		if (oldUser) throw new BadRequestException('User already exists')

		const user = await this.userService.create(dto)

		delete user.password

		const tokens = this.issueTokens(user.id)

		return {
			user,
			...tokens
		}
	}

	issueTokens(userId: string) {
		const data = { id: userId }

		const accessToken = this.jwt.sign(data, { expiresIn: '1h' })
		const refreshToken = this.jwt.sign(data, { expiresIn: '7d' })

		return { accessToken, refreshToken }
	}

	async validate(dto: AuthDto) {
		const user = await this.userService.getByEmail(dto.email, true)

		if (!user) throw new NotFoundException('User not found')

		const isRequired = await verify(user.password, dto.password)
		if (!isRequired) throw new UnauthorizedException('Invalid password')

		delete user.password

		return user
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()

		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			domain: 'localhost',
			expires: expiresIn,
			secure: true,
			sameSite: 'none'
		})
	}

	async getNewTokens(rt: string) {
		const res = await this.jwt.verifyAsync(rt)

		if (!res) throw new UnauthorizedException('Invalid refresh token')

		const user = await this.userService.byId(res.id)

		delete user.password

		const tokens = this.issueTokens(user.id)

		return {
			user,
			...tokens
		}
	}

	removeRefreshTokenToResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			httpOnly: true,
			domain: 'localhost',
			expires: new Date(0),
			secure: true,
			sameSite: 'none'
		})
	}
}
