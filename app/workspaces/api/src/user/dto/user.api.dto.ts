import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsString } from 'class-validator'
import type { Permissions } from '../../ability1/requirePermission'

export class UserDto {
	/**
	 * user name
	 */
	@IsString()
	@ApiProperty({
		example: 'alexander',
		description: 'user name',
	})
	name: string

	/**
	 * user email
	 */
	@IsEmail()
	@IsString()
	@ApiProperty({
		example: 'smth@mail.com',
		description: 'user email',
	})
	email: string

	/**
	 * user password
	 */
	@IsString()
	@ApiProperty({
		example: 'password',
		description: 'user password',
	})
	password: string

	/**
	 * is_admin
	 */
	@IsString()
	@ApiProperty({
		example: false,
		description: 'is_admin',
	})
	permission: Permissions
}
