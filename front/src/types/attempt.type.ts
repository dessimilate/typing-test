import type { IBase } from '@/types/root.type'

export interface IAttempt extends IBase {
	chars: number
	words: number
	mistakes: number
	time: number
	text: string
	wpm: number
	lpm: number
	acc: number
	isNewRecord: boolean
	userId: string
}

export interface ILeaderboard extends IBase {
	acc: number
	wpm: number
	user: {
		id: string
		name: string
	}
}

export interface IAttemptRecord {
	chars: number
	words: number
	mistakes: number
	time: number
	text: string
}

export type Top100Type = 'week' | 'month' | 'year'
