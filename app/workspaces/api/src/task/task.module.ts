import { Module } from '@nestjs/common'
import { TaskService } from './task.service'
import { TaskController } from './task.controller'

import { HttpModule } from '@nestjs/axios'
import { PrismaModule } from '../../prisma/prisma.module'

@Module({
	controllers: [TaskController],
	providers: [TaskService],
	imports: [HttpModule, PrismaModule],
})
export class TaskModule {}
