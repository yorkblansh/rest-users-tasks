import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNumber, IsString } from 'class-validator'

export class UpdateTaskDto {
	/**
	 * 66
	 */
	@IsNumber()
	@ApiProperty({
		example: '66',
		description: 'task id',
	})
	id: number

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
}
