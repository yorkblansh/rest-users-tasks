import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { PrismaModule } from '../../prisma/prisma.module'
import type { Permissions } from '../permissions/require.permission.decorator'
import { UpdateUserDto } from './dto/update.user.api.dto'
import { UserByIdDto } from './dto/user.by.id.api.dto'

describe('UserController', () => {
	let userController: UserController

	const mockUserService = {
		create: jest.fn((dto) =>
			Promise.resolve({
				id: Date.now(),
				...dto,
				has_avatar: false,
			}),
		),
		findAll: jest.fn(() => {
			return Promise.resolve(
				[0, 1, 2].map((n) => ({
					id: n,
					email: `user${n}@mail.com`,
					username: `user${n}`,
					password: `123`,
					permission: 'nonadmin',
					has_avatar: false,
				})),
			)
		}),
		findById: jest.fn((id) =>
			Promise.resolve({
				email: `user@mail.com`,
				username: `user`,
				password: `123`,
				permission: 'nonadmin',
				has_avatar: false,
				id,
			}),
		),
		update: jest.fn((dto: UpdateUserDto) =>
			Promise.resolve({
				email: dto.email,
				username: dto.username,
				password: dto.password,
				permission: dto.permission,
				has_avatar: false,
				id: dto.id,
			}),
		),
		delete: jest.fn((id: number) =>
			Promise.resolve({
				email: `user@mail.com`,
				username: `user`,
				password: `123`,
				permission: 'nonadmin',
				has_avatar: false,
				id,
			}),
		),
	}

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [UserService],
		})
			.overrideProvider(UserService)
			.useValue(mockUserService)
			.compile()

		userController = app.get<UserController>(UserController)
	})

	it('should be defined', () => {
		expect(userController).toBeDefined()
	})

	it('should create a user', () => {
		const dto = {
			email: 'mail@mail.com',
			password: '123',
			permission: 'nonadmin' as Permissions,
			username: 'user88',
		}

		userController.createUser(dto).then((data) => {
			expect(data).toEqual({
				id: expect.any(Number),
				email: expect.any(String),
				username: expect.any(String),
				password: expect.any(String),
				permission: expect.stringMatching(/^admin|nonadmin$/),
				has_avatar: expect.any(Boolean),
			})
		})

		expect(mockUserService.create).toHaveBeenCalledWith(dto)
	})

	it('should get all users', () => {
		userController.getAllUsers().then((data) => {
			expect(data).toContainEqual({
				id: expect.any(Number),
				email: expect.any(String),
				username: expect.any(String),
				password: expect.any(String),
				permission: expect.stringMatching(/^admin|nonadmin$/),
				has_avatar: expect.any(Boolean),
			})
		})

		expect(mockUserService.findAll).toHaveBeenCalled()
	})

	it('should get user by id', () => {
		const dto = { id: 1 }

		userController.getUserById(dto).then((data) => {
			expect(data).toEqual({
				id: expect.any(Number),
				email: expect.any(String),
				username: expect.any(String),
				password: expect.any(String),
				permission: expect.stringMatching(/^admin|nonadmin$/),
				has_avatar: expect.any(Boolean),
			})
		})

		expect(mockUserService.findById).toHaveBeenCalledWith(dto.id)
	})

	it('should update user', () => {
		const dto = {
			id: 1,
			email: 'mail@mail.com',
			password: '123',
			permission: 'nonadmin' as Permissions,
			username: 'user88',
		} as UpdateUserDto

		userController.updateUser(dto).then((data) => {
			expect(data).toEqual({
				id: dto.id,
				email: expect.any(String),
				username: expect.any(String),
				password: expect.any(String),
				permission: expect.stringMatching(/^admin|nonadmin$/),
				has_avatar: expect.any(Boolean),
			})
		})

		expect(mockUserService.update).toHaveBeenCalledWith(dto)
	})

	it('should delete user', () => {
		const dto: UserByIdDto = {
			id: 1,
		}

		userController.deleteUser(dto).then((data) => {
			expect(data).toEqual({
				id: dto.id,
				email: expect.any(String),
				username: expect.any(String),
				password: expect.any(String),
				permission: expect.stringMatching(/^admin|nonadmin$/),
				has_avatar: expect.any(Boolean),
			})
		})

		expect(mockUserService.delete).toHaveBeenCalledWith(dto.id)
	})
})
