import { IsString } from 'class-validator'

export class PhraseDto {
  @IsString()
  text: string
}