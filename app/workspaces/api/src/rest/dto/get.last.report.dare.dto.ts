import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsNumberString, IsString } from 'class-validator'
import { isNumericLiteral } from 'typescript'

type ReportType = 'barcodes' | 'word'

export class GetLastReportDateDto {
	/**
	 * тип отчета
	 */
	@IsString()
	@ApiProperty({
		example: 'barcodes',
		description: 'тип отчета',
	})
	type: ReportType
}
