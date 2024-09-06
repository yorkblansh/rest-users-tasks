import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'

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

	login(user: any) {
		const payload = { name: user.name, sub: user.id }

		return {
			access_token: this.jwtService.sign(payload),
		}
	}
}
