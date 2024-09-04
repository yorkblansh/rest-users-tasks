import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class GetReprintDto {
	/**
	 * тип отчета
	 */
	@IsString()
	@ApiProperty({
		example: 'barcodes',
		description: 'тип отчета',
	})
	id: string
}
