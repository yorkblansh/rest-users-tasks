import { ApiProperty } from '@nestjs/swagger'
import { IsDate } from 'class-validator'

export class GetShpiExtraSheetsDto {
	/**
	 * дата (берется только месяц)
	 */
	@IsDate()
	@ApiProperty({
		example: 'barcodes',
		description: 'тип отчета',
	})
	date: Date
}
