import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

type ReportType = 'barcodes' | 'word'

export class CreateReportManualDto {
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
	 * date_from
	 */
	@IsString()
	@ApiProperty({
		example: '2023-06-01',
		description: 'date_from',
	})
	date_to: Date
}
