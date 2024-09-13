import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'
import { Request } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LoginUserDto } from '../user/dto/login.user.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Get('/login')
	login(@Body() user: LoginUserDto) {
		return this.authService.login(user)
	}
}
