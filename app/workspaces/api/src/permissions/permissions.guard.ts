import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { PERMISSIONS_METADATA_KEY } from './require.permission.decorator'
import { Reflector } from '@nestjs/core'
import { Permissions } from './require.permission.decorator'
import { UserDto } from 'src/user/dto/user.api.dto'

@Injectable()
export class PermissionsGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	async canActivate(context: ExecutionContext) {
		const req = context.switchToHttp().getRequest()
		const user = req.user as UserDto

		const permissions =
			this.reflector.get<Permissions[]>(
				PERMISSIONS_METADATA_KEY,
				context.getHandler(),
			) || []

		const matchedPermissions = permissions.find((v) => v === user.permission)

		return matchedPermissions !== undefined ? true : false
	}
}
