import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UpdateUserDto } from '@/user/dto/update-user.dto'
import { hash } from 'argon2'
import { userSelect } from '@/user/user.select'
import { stringToSlug } from '@/utils/name-to-slug'
import { AttemptDto } from '@/attempt/dto/attempt.dto'
import { AuthDto } from '@/auth/dto/auth.dto'
import { characters, usernameHashLength } from '@/constants/chars.constant'
import { AttemptService } from '@/attempt/attempt.service'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	/** Get All */
	async getAll(name?: string) {
		return this.prisma.user.findMany({
			where: { name: { contains: name } },
			select: userSelect
		})
	}

	/** By Id */
	async byId(id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			select: userSelect
		})

		if (!user) throw new NotFoundException('user not found')

		return user
	}

	/** By Email */
	async getByEmail(email: string, password = false) {
		return await this.prisma.user.findUnique({
			where: { email },
			select: { ...userSelect, password }
		})
	}

	/** Update */
	async updateProfile(id: string, dto: UpdateUserDto) {
		if (dto.email) {
			const findByEmail = await this.prisma.user.findUnique({
				where: { email: dto.email }
			})

			if (findByEmail && id !== findByEmail.id) {
				throw new BadRequestException('email is already in use')
			}
		}

		if (dto.name) {
			const findByName = await this.prisma.user.findUnique({
				where: { name: dto.name }
			})

			if (findByName && id !== findByName.id) {
				throw new BadRequestException('name is already in use')
			}
		}

		return await this.prisma.user.update({
			where: { id },
			data: {
				name: dto.name,
				nameSlug: stringToSlug(dto.name),
				email: dto.email,
				password: dto.password && (await hash(dto.password))
			},
			select: userSelect
		})
	}

	async isNameUnique(name: string) {
		const user = await this.prisma.user.findUnique({
			where: { name }
		})

		return !user
	}

	/** Create */
	async create(dto: AuthDto) {
		const generateRandomHash = () => {
			let result = ''
			for (let i = 0; i < usernameHashLength; i++) {
				result += characters.charAt(
					Math.floor(Math.random() * characters.length)
				)
			}
			return result
		}

		let newUsername: string
		let isUsernameExists: boolean

		do {
			const hash = generateRandomHash()
			newUsername = `user_${hash}`

			isUsernameExists = !!(await this.prisma.user.findUnique({
				where: { name: newUsername }
			}))
		} while (isUsernameExists)

		const user = await this.prisma.user.create({
			data: {
				email: dto.email,
				password: await hash(dto.password),
				name: newUsername,
				nameSlug: stringToSlug(newUsername),
				userStatistics: { create: {} }
			},
			select: userSelect
		})

		return user
	}

	async updateUserStats(userId: string, dto: AttemptDto) {
		const user = await this.byId(userId)

		const attempts = await this.prisma.attempts.findMany({ where: { userId } })

		const { words, time } = dto

		const newWPM = +((60 * 1000 * words) / time).toFixed(2)

		const bestWPM = user.userStatistics.bestWPM < newWPM ? newWPM : undefined

		const attempt = await this.prisma.user.update({
			where: { id: userId },
			data: {
				userStatistics: {
					update: {
						trainings: attempts.length,
						bestWPM
					}
				}
			}
		})

		return {
			...attempt,
			isNewRecord: user.userStatistics.bestWPM < newWPM
		}
	}
}
