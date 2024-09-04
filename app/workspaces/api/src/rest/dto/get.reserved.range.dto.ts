import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class GetReservedRangeDto {
	/**
	 * префикс 'ro' | 'vb' | 'cb'
	 */
	@IsString()
	@ApiProperty({
		example: 'barcodes',
		description: `префикс 'ro' | 'vb' | 'cb'`,
	})
	prefix: string

	/**
	 * длинна (кол-во) получаемого диапазона
	 */
	count: number
}
