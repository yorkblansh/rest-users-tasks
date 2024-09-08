import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './auth.service'
import { UserService } from '../user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private userService: UserService) {
		super({
			secretOrKey: 'SECRET',
			ignoreExpiration: false,
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		})
	}

	async validate(payload: any) {
		const { password, ...safeUser } = await this.userService.findById(
			payload.sub,
		)
		console.log({ payload, safeUser })

		return { ...safeUser }
	}
}
