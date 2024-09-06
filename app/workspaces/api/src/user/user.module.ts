import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'

import { HttpModule } from '@nestjs/axios'
import { PrismaModule } from '../../prisma/prisma.module'
import { AbilityModule } from '../ability/ability.module'
import { AuthModule } from '../auth/auth.module'
import { AuthService } from '../auth/auth.service'

@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [HttpModule, PrismaModule],
	exports: [UserService],
})
export class UserModule {}
