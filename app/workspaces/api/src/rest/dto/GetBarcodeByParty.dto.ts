import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class GetBarcodeByPartyDto {
	/**
	 * лист партий
	 */
	@IsString()
	@ApiProperty({
		example: 'barcodes',
		description: 'лист партий',
	})
	partyID: string
}
