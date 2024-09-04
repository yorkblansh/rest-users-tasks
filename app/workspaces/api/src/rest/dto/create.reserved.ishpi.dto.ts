import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateReservedISHPIDto {
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
	 * начальный индекс получаемого диапазона
	 */
	@IsString()
	@ApiProperty({
		example: '49418697',
		description: `начальный индекс получаемого диапазона`,
	})
	start: string

	/**
	 * конечный индекс получаемого диапазона
	 */
	@IsString()
	@ApiProperty({
		example: '49418697',
		description: `конечный индекс получаемого диапазона`,
	})
	end: string

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
