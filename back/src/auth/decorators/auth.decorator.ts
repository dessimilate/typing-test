import { UseGuards, applyDecorators } from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jwt.guard'
import { AdminGuard } from '../guards/admin.guard'
import { ModeratorGuard } from '../guards/moderator.guard'
import { Roles } from '@prisma/client'

export const Auth = (role: Roles = 'USER') =>
	applyDecorators(
		role === 'USER'
			? UseGuards(JwtAuthGuard)
			: role === 'MODERATOR'
			? UseGuards(JwtAuthGuard, ModeratorGuard, AdminGuard)
			: UseGuards(JwtAuthGuard, AdminGuard)
	)
