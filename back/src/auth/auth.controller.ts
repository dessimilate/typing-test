import {
	Controller,
	Post,
	Body,
	UsePipes,
	ValidationPipe,
	HttpCode,
	HttpStatus,
	Res,
	Req,
	UnauthorizedException
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	@Post('register')
	async register(
		@Body() dto: AuthDto,
		@Res({ passthrough: true }) res: Response
	) {
		const { refreshToken, ...rest } = await this.authService.register(dto)
		this.authService.addRefreshTokenToResponse(res, refreshToken)

		return rest
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
		const { refreshToken, ...rest } = await this.authService.login(dto)
		this.authService.addRefreshTokenToResponse(res, refreshToken)

		return rest
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	@Post('login/access-token')
	async getNewTokens(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const rt = req.cookies[this.authService.REFRESH_TOKEN_NAME]

		if (!rt) {
			this.authService.removeRefreshTokenToResponse(res)
			throw new UnauthorizedException('Refresh token not passed')
		}

		const { refreshToken, ...rest } = await this.authService.getNewTokens(rt)

		this.authService.addRefreshTokenToResponse(res, refreshToken)

		return rest
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(@Res({ passthrough: true }) res: Response) {
		this.authService.removeRefreshTokenToResponse(res)

		return true
	}
}
