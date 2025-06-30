import type { IAttempt } from '@/types/attempt.type'
import type { IBase } from '@/types/root.type'

export interface IUser extends IBase {
	name: string
	nameSlug: string
	attempts: IAttempt[]
	userStatistics: IUserStatistics
}

export interface IUserStatistics {
	trainings: number
	bestWPM: number
}

export enum Roles {
	USER = 'USER',
	MODERATOR = 'MODERATOR',
	ADMIN = 'ADMIN',
	SUPERADMIN = 'SUPERADMIN'
}

export interface IUserUpdate {
	name?: string
	email?: string
	password?: string
}

export interface IAuthForm {
	email: string
	password: string
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}
