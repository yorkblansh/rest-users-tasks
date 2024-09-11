import { Controller, Get } from '@nestjs/common'
import { pipe } from 'fp-ts/lib/function'
import path, { join } from 'path'
import { readFileAsync } from '../utils/readFileAsync'
import { ApiTags } from '@nestjs/swagger'
import { PrismaService } from '../../prisma/prisma.service'
import _ from 'lodash'

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
