import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class ReserveISHPIDto {
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
	 * кол-во резервируемых шпи
	 */
	@IsString()
	@ApiProperty({
		example: '5',
		description: `кол-во резервируемых шпи`,
	})
	count: string

	/**
	 * работник
	 */
	@IsString()
	@ApiProperty({
		example: '',
		description: `работник`,
	})
	worker: string
}
