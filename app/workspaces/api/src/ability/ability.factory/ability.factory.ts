import { Injectable } from '@nestjs/common'
import { UserDto } from '../../user/dto/user.api.dto'
import {
	Ability,
	AbilityBuilder,
	ExtractSubjectType,
	InferSubjects,
} from '@casl/ability'

export enum Action {
	Manage = 'manage',
	Create = 'create',
	Read = 'read',
	Update = 'update',
	Delete = 'delete',
}

export type Subjects = InferSubjects<typeof UserDto> | 'all'

export type AppAbility = Ability<[Action, Subjects]>

@Injectable()
export class AbilityFactory {
	defineAbility(user: UserDto) {
		const { build, can, cannot, rules } = new AbilityBuilder(Ability)

		can(Action.Manage, UserDto)

		return build({
			detectSubjectType: (item) =>
				item.constructor as ExtractSubjectType<Subjects>,
		})
	}
}
