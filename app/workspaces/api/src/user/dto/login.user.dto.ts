import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class LoginUserDto {
	/**
	 * user name
	 */
	@IsString()
	@ApiProperty({
		example: 'user0',
		description: 'user name',
	})
	username: string

	/**
	 * user password
	 */
	@IsString()
	@ApiProperty({
		example: '123',
		description: 'user password',
	})
	password: string
}
