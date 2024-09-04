import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsString } from 'class-validator'

export class RejectBarcodePartyDto {
	/**
	 * id партии лист
	 */
	@IsArray()
	@ApiProperty({
		example: 'id партии лист',
		description: 'id партии лист',
	})
	partyIdList: string[]

	/**
	 * пользователь
	 */
	@IsString()
	@ApiProperty({
		example: 'пользователь',
		description: 'пользователь',
	})
	worker: string
}
