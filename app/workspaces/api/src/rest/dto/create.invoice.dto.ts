import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsString } from 'class-validator'

type ReportType = 'barcodes' | 'word'

export class CreateInvoiceDto {
	/**
	 * тип отчета
	 */
	@IsString()
	@ApiProperty({
		example: 'barcodes',
		description: 'тип отчета',
	})
	type: ReportType

	/**
	 * date_from
	 */
	@IsString()
	@ApiProperty({
		example: '2023-06-01',
		description: 'date_from',
	})
	date_from: Date

	/**
	 * date_to
	 */
	@IsString()
	@ApiProperty({
		example: '2023-06-01',
		description: 'date_from',
	})
	date_to: Date

	/**
	 * date_receive
	 */
	@IsString()
	@ApiProperty({
		example: '2023-06-01',
		description: 'date_receive',
	})
	date_receive: Date

	/**
	 * worker string
	 */
	@IsString()
	@ApiProperty({
		example: 'worker',
		description: 'worker',
	})
	worker: string

	/**
	 * parties string[]
	 */
	@IsArray()
	@ApiProperty({
		example: 'barcodes',
		description: 'parties',
	})
	parties: string[]
}
