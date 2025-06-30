import { ConfigService } from '@nestjs/config/dist/config.service'
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface'

export const getJwtConfig = async (
	configService: ConfigService
): Promise<JwtModuleOptions> => ({
	secret: configService.get('JWT_SECRET')
})
