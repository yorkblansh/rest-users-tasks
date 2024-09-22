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
		try {
			return this.taskService.findAll()
		} catch (error) {
			throw new BadRequestException(error.meta)
		}
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
		try {
			return this.taskService.create(dto)
		} catch (error) {
			throw new BadRequestException(error.meta)
		}
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
		try {
			return this.taskService.delete(dto)
		} catch (error) {
			throw new BadRequestException(error.meta)
		}
	}

	@UseGuards(JwtAuthGuard)
	@Post('/update_task')
	@ApiResponse({
		status: 200,
		description: 'updated task',
		type: TaskDto,
	})
	@ApiBearerAuth()
	async updateTask(@Body() dto: UpdateTaskDto) {
		try {
			return this.taskService.update(dto)
		} catch (error) {
			throw new BadRequestException(error.meta)
		}
	}
}
