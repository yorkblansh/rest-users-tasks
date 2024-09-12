import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNumber, IsString } from 'class-validator'

export class TaskDto {
	/**
	 * task name
	 */
	@IsString()
	@ApiProperty({
		example: 'task1',
		description: 'task name',
	})
	name: string

	/**
	 * task body
	 */
	@IsString()
	@ApiProperty({
		example: 'smth in the task',
		description: 'task body',
	})
	body: string

	/**
	 * userId
	 */
	@IsNumber()
	@ApiProperty({
		example: 'userId',
		description: 'userId',
	})
	userId: number
}
