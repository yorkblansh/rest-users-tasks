import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class PutReprintDto {
	/**
	 * тип отчета
	 */
	@IsString()
	@ApiProperty({
		example: 'barcodes',
		description: 'тип отчета',
	})
	id: string

	/**
	 * worker string
	 */
	@IsString()
	@ApiProperty({
		example: 'barcodes',
		description: 'тип отчета',
	})
	worker: string

	/**
	 * date
	 */
	@IsString()
	@ApiProperty({
		example: '2023-05-01',
		description: 'date_from',
	})
	date: Date
}
