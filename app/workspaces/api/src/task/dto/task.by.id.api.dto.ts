import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class TaskByIdDto {
	/**
	 * 66
	 */
	@IsString()
	@ApiProperty({
		example: '66',
		description: 'task id',
	})
	id: number
}
