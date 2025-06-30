import {
	CanActivate,
	ExecutionContext,
	ForbiddenException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User } from '@prisma/client'

export class AdminGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const { user } = context.switchToHttp().getRequest<{ user: User }>()
		const isMatch = user.role === 'ADMIN'

		if (!isMatch) throw new ForbiddenException('no rights')

		return isMatch
	}
}
