import { Controller, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'
import { Request } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('/login')
	login(@Request() req) {
		console.log({ user: req.user })
		// return { msg: 'logged in' }
		return this.authService.login(req.user)
	}
}
