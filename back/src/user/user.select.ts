import { attemptSelect } from '@/attempt/attempt.select'
import { Prisma } from '@prisma/client'

export const userStatisticsSelect: Prisma.UserStatisticsSelect = {
	trainings: true,
	bestWPM: true
}

export const userSelect: Prisma.UserSelect = {
	id: true,
	createdAt: true,
	updatedAt: true,
	name: true,
	nameSlug: true,
	attempts: { select: attemptSelect },
	userStatistics: { select: userStatisticsSelect }
}
