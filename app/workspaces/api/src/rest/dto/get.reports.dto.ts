import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsNumberString, IsString } from 'class-validator'
import { isNumericLiteral } from 'typescript'

type ReportType = 'barcodes' | 'word'

export class GetReportsDto {
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
		example: '2023-05-01',
		description: 'date_from',
	})
	date_from: Date

	// /**
	//  * date_to
	//  */
	// @IsString()
	// @ApiProperty({
	// 	example: '2023-06-12',
	// 	description: 'date_to',
	// })
	// date_to: Date
}
