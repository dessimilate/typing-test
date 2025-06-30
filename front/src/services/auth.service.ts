import { removeFromStorage, saveToStorage } from '@/services/auth-token.service'

import type { IAuthForm, IAuthResponse } from '@/types/user.type'

import { axiosClassic } from '@/api/interceptors'

class Service {
	private url = '/auth'

	async main(type: 'login' | 'register', data: IAuthForm) {
		const res = await axiosClassic.post<IAuthResponse>(
			`${this.url}/${type}`,
			data
		)

		if (res.data.accessToken) saveToStorage(res.data.accessToken)

		return res
	}

	async getNewTokens() {
		const res = await axiosClassic.post<IAuthResponse>(
			`${this.url}/login/access-token`
		)

		if (res.data.accessToken) saveToStorage(res.data.accessToken)

		return res
	}

	async logout() {
		const res = await axiosClassic.post<boolean>(`${this.url}/logout`)

		if (res.data) removeFromStorage()

		return res
	}
}

export const authService = new Service()
