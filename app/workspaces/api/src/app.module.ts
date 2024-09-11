import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaModule } from '../prisma/prisma.module'
import { RestModule } from './rest/rest.module'
import { TaskModule } from './task/task.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { FileUploadModule } from './file-upload/file-upload.module'
import { LoggerModule } from 'nestjs-pino'

@Module({
	imports: [
		PrismaModule,
		RestModule,
		TaskModule,
		UserModule,
		AuthModule,
		FileUploadModule,
		LoggerModule.forRoot(),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
