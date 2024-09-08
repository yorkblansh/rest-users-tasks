import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class UserByIdDto {
	/**
	 * 66
	 */
	@IsString()
	@ApiProperty({
		example: '66',
		description: 'user id',
	})
	id: number
}
