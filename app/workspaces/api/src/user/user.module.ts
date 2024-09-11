import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'

import { HttpModule } from '@nestjs/axios'
import { PrismaModule } from '../../prisma/prisma.module'
import { AuthModule } from '../auth/auth.module'
import { AuthService } from '../auth/auth.service'

@Module({
	imports: [HttpModule, PrismaModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
