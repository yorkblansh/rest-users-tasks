import { Module } from '@nestjs/common'
import { RestService } from './rest.service'
import { RestController } from './rest.controller'
import { HttpModule } from '@nestjs/axios'
import { PrismaModule } from '../../prisma/prisma.module'

@Module({
	controllers: [RestController],
	providers: [RestService],
	imports: [HttpModule, PrismaModule],
})
export class RestModule {}
