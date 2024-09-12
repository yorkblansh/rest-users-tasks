import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
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

	@Get('/get_all_task')
	async getTask(
		@Query('take') take?: string,
		@Query('where') where?: string, //Prisma.TaskWhereInput,
		@Query('orderBy') orderBy?: string, // Prisma.TaskOrderByWithRelationInput,
	) {
		const taskList = await this.prismaService.task.findMany({
			take: take ? parseInt(take) : undefined,
			orderBy: orderBy ? JSON.parse(orderBy) : undefined,
			where: where ? JSON.parse(where) : undefined,
		})

		return taskList
	}

	@Post('/create_task')
	async createTask(@Body() body: TaskDto) {
		const { body: taskBody, name } = body

		const task = await this.prismaService.task.create({
			data: {
				body: taskBody,
				name,
			},
		})

		return task
	}

	@RequirePermissions(PERMISSIONS.ADMIN)
	@UseGuards(JwtAuthGuard, PermissionsGuard)
	@Post('/delete_task')
	async deleteTask(@Body() body: TaskByIdDto) {
		const { id } = body

		const task = await this.prismaService.task.delete({
			where: {
				id,
			},
		})

		return `task ${task.name} was deleted`
	}

	@Post('/update_task')
	async updateTask(@Body() body: UpdateTaskDto) {
		const { body: taskBody, id, name } = body

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
	}
}
