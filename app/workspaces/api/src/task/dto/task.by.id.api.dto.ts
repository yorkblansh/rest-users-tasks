import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNumber, IsString } from 'class-validator'

export class TaskByIdDto {
	/**
	 * 66
	 */
	@IsNumber()
	@ApiProperty({
		example: '66',
		description: 'task id',
	})
	id: number
}
