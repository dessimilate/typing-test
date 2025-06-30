import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { PhrasesService } from './phrases.service'
import { checkForNum } from '@/utils/check-for-number'

@Controller('phrase')
export class PhrasesController {
	constructor(private readonly phrasesService: PhrasesService) {}

	@Get(':amount')
	async getPhrase(@Param('amount') amount: string) {
		if (!checkForNum(amount)) {
			throw new BadRequestException('amount is wrong')
		}

		return this.phrasesService.getPhrase(+amount)
	}
}
