import {
	Controller,
	Get,
	Post,
	Body,
	UseGuards,
	Query,
	BadRequestException,
} from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { PrismaService } from '../../prisma/prisma.service'
import _ from 'lodash'
import { TaskDto } from './dto/task.api.dto'
import { UpdateTaskDto } from './dto/update.task.api.dto'
import {
	PERMISSIONS,
	RequirePermissions,
} from '../permissions/require.permission.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { PermissionsGuard } from '../permissions/permissions.guard'
import { Prisma } from '@prisma/client'
import { TaskByIdDto } from './dto/task.by.id.api.dto'

@ApiTags('task')
@Controller('task')
export class TaskController {
	constructor(private readonly prismaService: PrismaService) {}

	@UseGuards(JwtAuthGuard)
	@Get('/get_all_task')
	@ApiResponse({
		status: 200,
		description: 'list of all tasks',
		type: [TaskDto],
	})
	@ApiBearerAuth('get_all_task')
	async getTask() {
		// @Query('orderBy') orderBy?: Prisma.TaskOrderByWithRelationInput, // @Query('cursor') cursor?: Prisma.TaskWhereUniqueInput, // @Query('where') where?: Prisma.TaskWhereInput, // @Query('take') take?: string, // @Query('skip') skip?: string,

		try {
			const taskList = await this.prismaService.task.findMany({
				// skip: skip ? parseInt(skip) : undefined,
				// take: take ? parseInt(take) : undefined,
				// orderBy,
				// where,
				// cursor,
			})

			return taskList
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
	@ApiBearerAuth('create_task')
	async createTask(@Body() body: TaskDto) {
		const { body: taskBody, name, userId } = body

		try {
			const task = await this.prismaService.task.create({
				data: {
					body: taskBody,
					name,
					userId,
				},
			})

			return task
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
	@ApiBearerAuth('delete_task')
	async deleteTask(@Body() body: TaskByIdDto) {
		const { id } = body

		try {
			const task = await this.prismaService.task.delete({
				where: {
					id,
				},
			})

			return `task ${task.name} was deleted`
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
	@ApiBearerAuth('update_task')
	async updateTask(@Body() body: UpdateTaskDto) {
		const { body: taskBody, id, name } = body

		try {
			const task = await this.prismaService.task.update({
				data: {
					body: taskBody,
					name,
				},
				where: {
					id,
				},
			})

			return task
		} catch (error) {
			throw new BadRequestException(error.meta)
		}
	}
}
