import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AbilityFactory } from './ability.factory/ability.factory'
import { Observable } from 'rxjs'
import { CHECK_ABILITY, RequiredRule } from './abilities.decorator'
import { ForbiddenError } from '@casl/ability'

export class AbilitiesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private caslAbilityFactory: AbilityFactory,
	) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		// const rules =
		// 	this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
		// 	[]

		const user = context.switchToHttp().getRequest()
		console.log({ user })

		// const ability = this.caslAbilityFactory.defineAbility(user)

		// try {
		// 	rules.forEach((rule) => {
		// 		ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject)
		// 	})

		// 	return true
		// } catch (error) {
		// 	if (error instanceof ForbiddenError) {
		// 		throw new ForbiddenException(error.message)
		// 	}
		// }
	}
}
