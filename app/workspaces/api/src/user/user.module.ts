import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'

import { HttpModule } from '@nestjs/axios'
import { PrismaModule } from '../../prisma/prisma.module'

@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [HttpModule, PrismaModule],
})
export class UserModule {}
