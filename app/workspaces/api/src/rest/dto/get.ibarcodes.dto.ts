import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class GetIbarcodesDto {
	/**
	 * префикс 'ro' | 'vb' | 'cb'
	 */
	@IsString()
	@ApiProperty({
		example: 'barcodes',
		description: `префикс 'ro' | 'vb' | 'cb'`,
	})
	prefix: string
}
