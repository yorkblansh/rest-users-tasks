import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { TaskDto } from './dto/task.api.dto'
import { TaskByIdDto } from './dto/task.by.id.api.dto'
import { UpdateTaskDto } from './dto/update.task.api.dto'

@Injectable()
export class TaskService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(taskDto: TaskDto) {
		return await this.prismaService.task.create({
			data: {
				...taskDto,
			},
		})
	}

	async delete(dto: TaskByIdDto) {
		const task = await this.prismaService.task.delete({
			where: {
				...dto,
			},
		})

		return `task ${task.name} was deleted`
	}

	async update(dto: UpdateTaskDto) {
		const { id, ...restDto } = dto

		return await this.prismaService.task.update({
			data: { ...restDto },
			where: {
				id,
			},
		})
	}

	async findAll() {
		return await this.prismaService.task.findMany()
	}
}
