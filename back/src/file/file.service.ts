import {
	BadRequestException,
	Injectable,
	PayloadTooLargeException
} from '@nestjs/common'
import { FileResponse } from './file.interface'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { User } from '@prisma/client'

@Injectable()
export class FileService {
	async saveFile(
		files: Express.Multer.File[],
		folder = 'default',
		user: User
	): Promise<FileResponse[]> {
		if (folder === 'common')
			throw new BadRequestException("You can't use 'common' folder")

		const uploadFolder = `${path}/uploads/${folder}`
		await ensureDir(uploadFolder)

		const res: FileResponse[] = await Promise.all(
			files.map(async (file, i) => {
				if (file.size > 1024 * 1024 * 1) {
					return undefined
				}

				const fileExtension = file.originalname.split('.')[1]
				const name = `${user.name}_${Date.now()}_${i}.${fileExtension}`

				await writeFile(`${uploadFolder}/${name}`, file.buffer)

				return {
					url: `/uploads/${folder}/${name}`,
					name: name
				}
			})
		)

		return res
	}
}
