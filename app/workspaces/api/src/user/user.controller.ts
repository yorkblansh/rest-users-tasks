import { Controller, Get, Post, Body, Put, Patch } from '@nestjs/common'
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
import { UserDto } from './dto/user.api.dto'
import { UserByIdDto } from './dto/user.by.id.api.dto'
import { UpdateUserDto } from './dto/update.user.api.dto'
import {
	AbilityFactory,
	Action,
} from '../ability/ability.factory/ability.factory'
import { CheckAbilities } from 'src/ability/abilities.decorator'

interface ReportDates {
	date_from: string
	date_to: Date
}

const TEST = process.env.TEST

const postfixTest = TEST === 'TEST' ? '_test' : ''

console.log({ postfixTest })

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(
		private readonly prismaService: PrismaService,
		private abilityFactory: AbilityFactory,
	) {}

	@Post('/create_user')
	async createUser(@Body() body: UserDto) {
		const { email, name } = body

		const user = await this.prismaService.user.create({
			data: {
				email,
				name,
			},
		})

		return user
	}

	@Get('/get_all_users')
	async getUser() {
		const userList = await this.prismaService.user.findMany()

		return userList
	}

	@Get('/get_user_by_id')
	async getUserById(@Body() body: UserByIdDto) {
		const { id } = body

		const user = await this.prismaService.user.findUnique({
			where: {
				id,
			},
		})

		return user
	}

	@Post('/update_user')
	async updateUser(@Body() body: UpdateUserDto) {
		const { email, id, name } = body

		const user = await this.prismaService.user.update({
			data: {
				email,
				name,
			},
			where: {
				id,
			},
		})

		return user
	}

	@Post('/delete_user')
	@CheckAbilities({ action: Action.Delete, subject: UserDto })
	async deleteUser(@Body() body: UserByIdDto) {
		const { id } = body

		const user = await this.prismaService.user.delete({
			where: {
				id,
			},
		})

		return 'user was deleted'
	}
}
