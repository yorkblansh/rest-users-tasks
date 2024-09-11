import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserDto } from '../user/dto/user.api.dto'
import { UserService } from '../user/user.service'

@Injectable()
export class RegisterUserAvatarGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private readonly userService: UserService,
	) {}

	async canActivate(context: ExecutionContext) {
		const req = context.switchToHttp().getRequest()
		const user = req.user as UserDto

		await this.userService.registerUserAvatar(user.username)

		return true
	}
}
