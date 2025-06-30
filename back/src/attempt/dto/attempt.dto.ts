import {
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	ValidateIf
} from 'class-validator'

export class AttemptDto {
	@IsNumber()
	chars: number

	@IsNumber()
	words: number

	@IsNumber()
	mistakes: number

	@IsNumber()
	time: number

	@IsString()
	text: string
}
