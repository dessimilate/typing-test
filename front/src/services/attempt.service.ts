import type {
	IAttempt,
	IAttemptRecord,
	ILeaderboard,
	Top100Type
} from '@/types/attempt.type'

import { axiosWithAuth } from '@/api/interceptors'

class Service {
	private url = '/attempt'

	async getMyAttempts() {
		const res = await axiosWithAuth.get<IAttempt>(`${this.url}/by-name`)

		return res.data
	}

	async getLastAttempt() {
		const res = await axiosWithAuth.get<IAttempt>(`${this.url}/last`)

		return res.data
	}

	async createAttempt(data: IAttemptRecord) {
		const res = await axiosWithAuth.post<IAttempt>(this.url, data)

		return res.data
	}

	async getTop100(type: Top100Type) {
		const res = await axiosWithAuth.get<ILeaderboard[]>(
			`${this.url}/leaderboard/${type}`
		)

		return res.data
	}
}

export const attemptService = new Service()
