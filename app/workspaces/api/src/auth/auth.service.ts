import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { LoginUserDto } from 'src/user/dto/login.user.dto'

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async validateUser(username: string, password: string) {
		const user = await this.userService.findOne(username)

		if (user && user.password === password) {
			return user
		}

		return null
	}

	async login(user: LoginUserDto) {
		const pulledUser = await this.userService.findOne(user.username)
		const payload = { name: user.username, sub: pulledUser.id }

		return {
			access_token: this.jwtService.sign(payload),
		}
	}
}
