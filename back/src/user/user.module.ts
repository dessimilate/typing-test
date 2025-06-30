import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from 'src/config/jwt.config'
import { PrismaService } from 'src/prisma.service'
import { AttemptModule } from '@/attempt/attempt.module'
import { AttemptService } from '@/attempt/attempt.service'

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	],
	controllers: [UserController],
	providers: [UserService, PrismaService],
	exports: [UserService]
})
export class UserModule {}
