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

interface ReportDates {
	date_from: string
	date_to: Date
}

const TEST = process.env.TEST

const postfixTest = TEST === 'TEST' ? '_test' : ''

@ApiTags('rest')
@Controller('rest')
export class RestController {
	constructor(private readonly prismaService: PrismaService) {}

	@Get('/')
	barcoder() {
		return pipe(
			join(
				process.cwd(),
				'..',
				'react',
				'dist',
				'src',
				'barcode-app',
				'template',
				'index.html',
			),
			path.resolve,
			readFileAsync,
		)
	}
}
