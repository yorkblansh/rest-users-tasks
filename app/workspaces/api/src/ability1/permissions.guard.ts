import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { PERMISSIONS_METADATA_KEY } from './requirePermission'
import { Reflector } from '@nestjs/core'
import { UserService } from '../user/user.service'

@Injectable()
export class PermissionsGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private readonly userService: UserService,
	) {}

	async canActivate(context: ExecutionContext) {
		const req = context.switchToHttp().getRequest()

		const permissions =
			this.reflector.get<Permissions>(
				PERMISSIONS_METADATA_KEY,
				context.getHandler(),
			) || []

		console.log({
			USER_SERVICE: await this.userService.findById(1),
			permissions,
		})

		// const isAllowedToProceed = req.user.roles.find(permissions) // тут ищем роли пользователей

		// return isAllowedToProceed
		return false
	}
}
