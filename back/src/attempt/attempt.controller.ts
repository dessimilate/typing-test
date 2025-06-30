import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post
} from '@nestjs/common'
import { AttemptService } from './attempt.service'
import { Auth } from '@/auth/decorators/auth.decorator'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { AttemptDto } from './dto/attempt.dto'

@Controller('attempt')
export class AttemptController {
	constructor(private readonly attemptService: AttemptService) {}

	@Get('by-name')
	@Auth()
	async getByName(@CurrentUser('name') name: string) {
		return this.attemptService.getByUsername(name)
	}

	@Get('leaderboard/week')
	async getWeekLeaderboard() {
		return this.attemptService.getWeekLeaderboard()
	}

	@Get('by-name/:name')
	@Auth('ADMIN')
	async getByUserName(@Param('name') name: string) {
		return this.attemptService.getByUsername(name)
	}

	@Get('last')
	@Auth()
	async getLastAttempt() {
		return this.attemptService.getLastAttempt()
	}

	@Post()
	@Auth()
	@HttpCode(HttpStatus.OK)
	async create(@Body() dto: AttemptDto, @CurrentUser('id') id: string) {
		return this.attemptService.create(id, dto)
	}
}
