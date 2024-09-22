import { Test, TestingModule } from '@nestjs/testing'
import { TaskController } from './task.controller'
import { TaskService } from './task.service'
import { UpdateTaskDto } from './dto/update.task.api.dto'
import { TaskByIdDto } from './dto/task.by.id.api.dto'
import { TaskDto } from './dto/task.api.dto'

describe('TaskController', () => {
	let taskController: TaskController

	const mockTaskService = {
		create: jest.fn((dto) =>
			Promise.resolve({
				id: Date.now(),
				...dto,
			}),
		),
		findAll: jest.fn(() => {
			return Promise.resolve(
				[0, 1, 2].map((n) => ({
					id: n,
					name: `task${n}`,
					body: `task body${n}`,
					userId: n * 2,
				})),
			)
		}),
		update: jest.fn((dto: UpdateTaskDto) =>
			Promise.resolve({
				...dto,
				userId: Date.now(),
			}),
		),
		delete: jest.fn((id: TaskByIdDto) => Promise.resolve('task was deleted')),
	}

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [TaskController],
			providers: [TaskService],
		})
			.overrideProvider(TaskService)
			.useValue(mockTaskService)
			.compile()

		taskController = app.get<TaskController>(TaskController)
	})

	it('should be defined', () => {
		expect(taskController).toBeDefined()
	})

	it('should create a task', () => {
		const dto: TaskDto = {
			body: 'text',
			name: 'text',
			userId: 1,
		}

		taskController.createTask(dto).then((data) => {
			expect(data).toEqual({
				id: expect.any(Number),
				name: dto.name,
				body: dto.body,
				userId: dto.userId,
			} as TaskByIdDto & TaskDto)
		})

		expect(mockTaskService.create).toHaveBeenCalledWith(dto)
	})

	it('should delete task', () => {
		const dto: TaskByIdDto = {
			id: 1,
		}

		taskController.deleteTask(dto).then((data) => {
			expect(typeof data).toBe('string')
		})

		expect(mockTaskService.delete).toHaveBeenCalled()
	})

	it('should update task', () => {
		const dto: UpdateTaskDto = {
			id: 1,
			body: 'new body',
			name: 'new name',
		}

		taskController.updateTask(dto).then((data) => {
			expect(data).toEqual({
				id: dto.id,
				name: dto.name,
				body: dto.body,
				userId: expect.any(Number),
			})
		})

		expect(mockTaskService.update).toHaveBeenCalledWith(dto)
	})

	it('should get all tasks', () => {
		taskController.getAllTasks().then((data) => {
			expect(data).toContainEqual({
				id: expect.any(Number),
				name: expect.any(String),
				body: expect.any(String),
				userId: expect.any(Number),
			})
		})

		expect(mockTaskService.findAll).toHaveBeenCalled()
	})
})
