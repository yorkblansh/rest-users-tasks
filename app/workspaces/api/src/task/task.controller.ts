import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Patch,
	UseGuards,
} from '@nestjs/common'
import { pipe } from 'fp-ts/lib/function'
import path, { join } from 'path'
import { readFileAsync } from '../utils/readFileAsync'
import { BarcodeRangeDto } from './dto/barcode.api.dto'
import D from 'detain'
import { ApiTags } from '@nestjs/swagger'
import { barcodeImageBase64Dto } from './dto/barcodeImageBase64.dto'
import { GetBarcodesDto } from './dto/get.barcodes.dto'
import { GetReportsDto } from './dto/get.reports.dto'
import { GetReportListDto } from './dto/get.report.list.dto'
import { getLatestDateInList } from '../utils/getLatestDateInList'
import { CreateReportManualDto } from './dto/create.report.manual.dto'
import { BarcodeListByPartyDto } from './dto/barcode.list.by.barty.dto'
import { PutReprintDto } from './dto/put.reprint.dto'
import { GetReprintDto } from './dto/get.reprint.dto'
import { CreateInvoiceDto } from './dto/create.invoice.dto'
import * as A from 'fp-ts/lib/Array'
import { RejectBarcodePartyDto } from './dto/rejectBarcodeParty.dto'
import { PrismaService } from '../../prisma/prisma.service'
import _ from 'lodash'
import { GetBarcodeByPartyDto } from './dto/GetBarcodeByParty.dto'
import { ReservedRangeDto } from './dto/reserved.dto'
import { GetReservedRangeDto } from './dto/get.reserved.range.dto'
import { CreateReservedISHPIDto } from './dto/create.reserved.ishpi.dto'
import { ReserveISHPIDto } from './dto/reserve.ishpi.dto'
import { CheckIshpiDiapasonDto } from './dto/check.ishpi.diapason.dto'
import { TaskDto } from './dto/task.api.dto'
import { TaskByIdDto } from './dto/task.by.id.api.dto'
import { UpdateTaskDto } from './dto/update.task.api.dto'
import {
	PERMISSIONS,
	RequirePermissions,
} from '../ability1/require.permission.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { PermissionsGuard } from '../ability1/permissions.guard'

interface ReportDates {
	date_from: string
	date_to: Date
}

const TEST = process.env.TEST

const postfixTest = TEST === 'TEST' ? '_test' : ''

console.log({ postfixTest })

@ApiTags('task')
@Controller('task')
export class TaskController {
	constructor(private readonly prismaService: PrismaService) {}

	@Get('/get_all_task')
	async getTask() {
		const taskList = await this.prismaService.task.findMany()

		return taskList
	}

	@Post('/create_task')
	async createTask(@Body() body: TaskDto) {
		const { body: taskBody, name } = body

		const task = await this.prismaService.task.create({
			data: {
				body: taskBody,
				name,
			},
		})

		return task
	}

	@RequirePermissions(PERMISSIONS.ADMIN)
	@UseGuards(JwtAuthGuard, PermissionsGuard)
	@Post('/delete_task')
	async deleteTask(@Body() body: any) {
		// const { id } = body

		// // await this.prismaService.task.delete({
		// // 	where: {
		// // 		id,
		// // 	},
		// // })

		return 'task was deleted'
	}

	@Post('/update_task')
	async updateTask(@Body() body: UpdateTaskDto) {
		const { body: taskBody, id, name } = body

		const task = await this.prismaService.task.update({
			data: {
				body: taskBody,
				name,
			},
			where: {
				id,
			},
		})

		return task
	}
}
