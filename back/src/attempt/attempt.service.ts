import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { attemptSelect, attemptSelectLeaderboard } from './attempt.select'
import { AttemptDto } from './dto/attempt.dto'
import { UserService } from '@/user/user.service'
import { startOfWeek } from 'date-fns'
import { TOP100 } from '@/constants/top100.constant'
import { Cron, CronExpression } from '@nestjs/schedule'

@Injectable()
export class AttemptService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService
	) {}

	/** get all */
	async getAll() {
		return await this.prisma.attempts.findMany({
			select: attemptSelect
		})
	}

	/** by name */
	async getByUsername(name: string) {
		const attempts = await this.prisma.attempts.findMany({
			where: { user: { name } },
			select: attemptSelect
		})

		if (!attempts) throw new NotFoundException('attempts not found')

		return attempts
	}

	/** get last attempt */
	async getLastAttempt() {
		return await this.prisma.attempts.findFirst({
			orderBy: { createdAt: 'desc' },
			select: attemptSelect
		})
	}

	/** create attempt */
	async create(userId: string, dto: AttemptDto) {
		const user = await this.userService.byId(userId)

		const attempts = await this.prisma.attempts.findMany({ where: { userId } })

		const { words, time, chars, mistakes, text } = dto

		const newWPM = +((60 * 1000 * words) / time).toFixed(2)

		const isNewRecord = user.userStatistics.bestWPM < newWPM

		const bestWPM =
			user.userStatistics.bestWPM < newWPM && newWPM !== Infinity
				? newWPM
				: user.userStatistics.bestWPM

		await this.prisma.user.update({
			where: { id: userId },
			data: {
				userStatistics: {
					update: {
						trainings: attempts.length + 1,
						bestWPM
					}
				}
			}
		})

		const newAttempt = await this.prisma.attempts.create({
			data: {
				chars,
				words,
				mistakes,
				text,
				time: +(time / 1000).toFixed(2),
				isNewRecord,
				acc: +((100 * chars) / (chars + mistakes)).toFixed(2),
				lpm: +((60 * 1000 * chars) / time).toFixed(2),
				wpm: newWPM,
				userId
			},
			select: attemptSelect
		})

		return newAttempt
	}

	async getWeekLeaderboard() {
		const top100week = await this.prisma.top100.findUnique({
			where: { key: TOP100.WEEK },
			select: { key: true, value: { select: attemptSelectLeaderboard } }
		})

		return top100week ? top100week.value.sort((a, b) => b.wpm - a.wpm) : []
	}

	@Cron(CronExpression.EVERY_MINUTE)
	private async setWeekLeaderboard() {
		const today = new Date()
		const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 })

		const oldTop100 = await this.prisma.top100.findUnique({
			where: { key: TOP100.WEEK },
			select: { key: true, value: { select: { id: true, wpm: true } } }
		})

		if (!oldTop100) {
			await this.prisma.top100.upsert({
				where: { key: TOP100.WEEK },
				create: { key: TOP100.WEEK },
				update: {}
			})
		}

		const newTop100 = await this.prisma.attempts.findMany({
			where: {
				createdAt: { gte: startOfCurrentWeek }
			},
			orderBy: { wpm: 'desc' },
			take: 100,
			distinct: ['userId'],
			select: { id: true, wpm: true }
		})

		await this.prisma.$transaction(
			oldTop100.value.map(el =>
				this.prisma.top100.update({
					where: { key: TOP100.WEEK },
					data: { value: { disconnect: { id: el.id } } }
				})
			)
		)

		await this.prisma.$transaction(
			newTop100.map(el =>
				this.prisma.top100.update({
					where: { key: TOP100.WEEK },
					data: { value: { connect: { id: el.id } } }
				})
			)
		)
	}
}
