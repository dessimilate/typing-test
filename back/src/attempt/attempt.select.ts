import { Prisma } from '@prisma/client'

export const attemptSelect: Prisma.AttemptsSelect = {
	id: true,
	createdAt: true,
	updatedAt: true,
	chars: true,
	words: true,
	mistakes: true,
	time: true,
	acc: true,
	isNewRecord: true,
	lpm: true,
	text: true,
	wpm: true,
	userId: true
}

export const attemptSelectLeaderboard: Prisma.AttemptsSelect = {
	id: true,
	createdAt: true,
	updatedAt: true,
	wpm: true,
	acc: true,
	user: {
		select: {
			id: true,
			name: true
		}
	}
}
