import { Module } from '@nestjs/common'
import { AttemptService } from './attempt.service'
import { AttemptController } from './attempt.controller'
import { PrismaService } from '@/prisma.service'
import { UserService } from '@/user/user.service'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
	imports: [ScheduleModule.forRoot()],
	controllers: [AttemptController],
	providers: [AttemptService, PrismaService, UserService],
	exports: [AttemptService]
})
export class AttemptModule {}
