import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsArray, IsNumberString } from 'class-validator'

export class barcodeImageBase64Dto {
	/**
	 * indexList
	 */
	@IsArray()
	@ApiProperty({
		example: ['123456', '123123'],
		description: 'index',
	})
	indexList: string[]
}
