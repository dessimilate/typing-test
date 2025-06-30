import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from './prisma.service'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const prismaService = app.get(PrismaService)
	await prismaService.enableShutdownHooks(app)

	app.setGlobalPrefix('api')
	app.enableCors({
		origin: [process.env.FRONT_URL],
		credentials: true,
		exposedHeaders: 'set-cookie'
	})
	app.use(cookieParser())
 
	await app.listen(4200)
}

bootstrap() 
