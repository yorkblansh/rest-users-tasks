import { ApiProperty } from '@nestjs/swagger'
import {
	IsBoolean,
	IsEmail,
	IsNumber,
	IsOptional,
	IsString,
} from 'class-validator'
import type { Permissions } from '../../permissions/require.permission.decorator'

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
