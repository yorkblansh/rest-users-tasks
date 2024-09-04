import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNumber, IsString } from 'class-validator'

export class CheckIshpiDiapasonDto {
	/**
	 * префикс 'ro' | 'vb' | 'cb'
	 */
	@IsArray()
	@ApiProperty({
		example: 'barcodes',
		description: `префикс 'ro' | 'vb' | 'cb'`,
	})
	diapason: string[]
}
