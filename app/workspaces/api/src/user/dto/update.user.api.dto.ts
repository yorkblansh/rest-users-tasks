import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsString } from 'class-validator'

export class UpdateUserDto {
	/**
	 * 66
	 */
	@IsString()
	@ApiProperty({
		example: '66',
		description: 'user id',
	})
	id: number

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
	@IsBoolean()
	@ApiProperty({
		example: false,
		description: 'is_admin',
	})
	is_admin: boolean
}
