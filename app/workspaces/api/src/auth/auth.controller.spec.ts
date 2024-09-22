import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

describe('AuthController', () => {
	let controller: AuthController

	const mockAuthService = {
		login: jest.fn(() => Promise.resolve({ access_token: 'token' })),
	}

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [AuthService],
		})
			.overrideProvider(AuthService)
			.useValue(mockAuthService)
			.compile()

		controller = module.get<AuthController>(AuthController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})

	it('should login and get acces token', async () => {
		controller
			.login({ username: 'user', password: 'password' })
			.then((data) => {
				expect(data).toEqual({ access_token: 'token' })
			})
	})
})
