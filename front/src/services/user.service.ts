import type { IUser, IUserUpdate } from '@/types/user.type'

import { axiosWithAuth } from '@/api/interceptors'

class Service {
	private url = '/user'

	async getProfile() {
		const res = await axiosWithAuth.get<IUser>(`${this.url}/profile`)

		return res.data
	}

	async update(data: IUserUpdate) {
		const res = await axiosWithAuth.put<IUser>(`${this.url}/profile`, data)

		return res.data
	}

	async isUsernameUnique(name: string) {
		const res = await axiosWithAuth.get<boolean>(
			`${this.url}/validation/${name}`
		)

		return res.data
	}
}

export const userService = new Service()
