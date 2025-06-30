import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { faker } from '@faker-js/faker'

@Injectable()
export class PhrasesService {
	constructor(private prisma: PrismaService) {}

	async getPhrase(amount: number) {
		// let result = ''

		// for (let i = 0; i < amount; i++) {
		// 	result += faker.lorem.word() + ' '
		// }

		return faker.lorem.words(amount)
	}
}
