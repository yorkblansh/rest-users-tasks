import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Inject,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AbilityFactory } from './ability.factory/ability.factory'
import { Observable } from 'rxjs'
import { CHECK_ABILITY, RequiredRule } from './abilities.decorator'
import { ForbiddenError } from '@casl/ability'

export class AbilitiesGuard implements CanActivate {
	constructor(private caslAbilityFactory: AbilityFactory) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const rules = Reflect.getMetadata(CHECK_ABILITY, context.getHandler()) || []

		const user = context.switchToHttp().getRequest().user
		console.log({
			ABILITY_GUARD_LOG: user,
			RR: rules,
			caslAbilityFactory: this.caslAbilityFactory,
		})

		const ability = this.caslAbilityFactory.defineAbility(user)

		try {
			rules.forEach((rule) => {
				ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject)
			})

			return true
		} catch (error) {
			if (error instanceof ForbiddenError) {
				throw new ForbiddenException(error.message)
			}
		}
	}
}
