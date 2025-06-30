import { axiosWithAuth } from '@/api/interceptors'

class Service {
	private url = '/phrase'

	async getPhrase(amount: number) {
		if (typeof amount !== 'number') return null
		const res = await axiosWithAuth.get<string>(`${this.url}/${amount}`)

		return res.data
	}
}

export const phraseService = new Service()
