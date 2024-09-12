import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNumber, IsString } from 'class-validator'

export class UserByIdDto {
	/**
	 * 66
	 */
	@IsNumber()
	@ApiProperty({
		example: '66',
		description: 'user id',
	})
	id: number
}
