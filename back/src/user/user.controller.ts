import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@Auth('ADMIN')
	async getAll(@Query('name') name: string) {
		return this.userService.getAll(name)
	}

	@Get('profile')
	@Auth()
	async getProfile(@CurrentUser('id') id: string) {
		return this.userService.byId(id)
	}

	@Get('validation/:name')
	@Auth()
	async isNameUnique(@Param('name') name: string) {
		return this.userService.isNameUnique(name)
	}

	@Get('profile/:id')
	@Auth('MODERATOR')
	async getUserProfile(@Param('id') id: string) {
		return this.userService.byId(id)
	}

	@UsePipes(new ValidationPipe())
	@Put('profile')
	@HttpCode(HttpStatus.OK)
	@Auth()
	async updateProfile(
		@CurrentUser('id') id: string,
		@Body() dto: UpdateUserDto
	) {
		return this.userService.updateProfile(id, dto)
	}

	@UsePipes(new ValidationPipe())
	@Put('profile/:id')
	@HttpCode(HttpStatus.OK)
	@Auth('ADMIN')
	async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
		return this.userService.updateProfile(id, dto)
	}
}
