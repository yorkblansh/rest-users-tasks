import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from '../prisma/prisma.module'
import { RestModule } from './rest/rest.module'
import { TaskModule } from './task/task.module'
import { UserModule } from './user/user.module'
import { AbilityModule } from './ability/ability.module';

@Module({
	imports: [PrismaModule, RestModule, TaskModule, UserModule, AbilityModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
