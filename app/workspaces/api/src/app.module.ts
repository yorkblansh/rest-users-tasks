import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from '../prisma/prisma.module'
import { RestModule } from './rest/rest.module'
import { TaskModule } from './task/task.module'
import { AbilityModule } from './ability/ability.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { AbilitiesGuard } from './ability/abilities.guard'

@Module({
	imports: [
		PrismaModule,
		RestModule,
		TaskModule,
		UserModule,
		AuthModule,
		AbilityModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: AbilitiesGuard,
		},
	],
})
export class AppModule {}
