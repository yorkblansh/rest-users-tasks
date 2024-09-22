import {
	Controller,
	Get,
	Post,
	Body,
	UseGuards,
	BadRequestException,
} from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import _ from 'lodash'
import { TaskDto } from './dto/task.api.dto'
import { UpdateTaskDto } from './dto/update.task.api.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { TaskByIdDto } from './dto/task.by.id.api.dto'
import { TaskService } from './task.service'

@ApiTags('task')
@Controller('task')
export class TaskController {
	constructor(private readonly taskService: TaskService) {}

	@UseGuards(JwtAuthGuard)
	@Get('/get_all_task')
	@ApiResponse({
		status: 200,
		description: 'list of all tasks',
		type: [TaskDto],
	})
	@ApiBearerAuth()
	async getAllTasks() {
		return this.taskService.findAll()
	}

	@UseGuards(JwtAuthGuard)
	@Post('/create_task')
	@ApiResponse({
		status: 201,
		description: 'created task',
		type: TaskDto,
	})
	@ApiBearerAuth()
	async createTask(@Body() dto: TaskDto) {
		return this.taskService.create(dto)
	}

	@UseGuards(JwtAuthGuard)
	@Post('/delete_task')
	@ApiResponse({
		status: 200,
		description: 'delete task',
		type: TaskDto,
	})
	@ApiBearerAuth()
	async deleteTask(@Body() dto: TaskByIdDto) {
		return this.taskService.delete(dto)
	}

	@UseGuards(JwtAuthGuard)
	@Post('/update_task')
	@ApiResponse({
		status: 200,
		description: 'updated task',
		type: TaskDto,
	})
	@ApiBearerAuth()
	updateTask(@Body() dto: UpdateTaskDto) {
		return this.taskService.update(dto)
	}
}
