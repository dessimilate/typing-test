import {
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Query,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common'
import { FileService } from './file.service'
import { FilesInterceptor } from '@nestjs/platform-express'
import { Auth } from '@/auth/decorators/auth.decorator'
import { CurrentUser } from '@/auth/decorators/user.decorator'
import { User } from '@prisma/client'

@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post()
	@HttpCode(HttpStatus.OK)
	@Auth()
	@UseInterceptors(FilesInterceptor('file'))
	async uploadFiles(
		@UploadedFiles() files: Express.Multer.File[],
		@CurrentUser() user: User,
		@Query('folder') folder?: string
	) {
		return this.fileService.saveFile(files, folder, user)
	}
}
