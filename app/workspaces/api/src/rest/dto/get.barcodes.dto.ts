import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsString } from 'class-validator'

export class GetBarcodesDto {
	/**
	 * date_from
	 */
	@IsString()
	@ApiProperty({
		example: '2023-06-01',
		description: 'date_from',
	})
	date_from: Date

	// @IsArray()
	// lastReports: InvoiceF16[]
}
