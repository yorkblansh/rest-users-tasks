import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class GetAllTaskDto {

    
	// /**
	//  * task name
	//  */
	// @IsString()
	// @ApiProperty({
	// 	example: 'task1',
	// 	description: 'task name',
	// })
	// name: string

	// /**
	//  * task body
	//  */
	// @IsString()
	// @ApiProperty({
	// 	example: 'smth in the task',
	// 	description: 'task body',
	// })
	// body: string
}
