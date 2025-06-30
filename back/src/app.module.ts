import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PrismaService } from './prisma.service'
import { PhrasesModule } from './phrases/phrases.module'
import { JwtModule } from '@nestjs/jwt/dist/jwt.module'
import { getJwtConfig } from './config/jwt.config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { FileModule } from './file/file.module'
import { AttemptModule } from './attempt/attempt.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		PhrasesModule,
		AuthModule,
		UserModule,
		FileModule,
		AttemptModule
	],
	providers: [PrismaService]
})
export class AppModule {}
