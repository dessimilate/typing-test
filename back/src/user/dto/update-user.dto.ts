import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@IsString()
	@IsEmail()
	email?: string

	@IsOptional()
	@IsString()
	@MinLength(6, { message: 'password cannot be less than 6 characters' })
	password?: string
}
