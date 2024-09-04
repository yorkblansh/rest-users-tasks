import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class BarcodeListByPartyDto {
	/**
	 * party
	 */
	@IsString()
	@ApiProperty({
		example: '292900',
		description: 'индекс отделения',
	})
	party: string
}
