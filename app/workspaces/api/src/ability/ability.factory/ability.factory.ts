import { Injectable } from '@nestjs/common'
import { UserDto } from '../../user/dto/user.api.dto'
import {
	Ability,
	AbilityBuilder,
	AbilityClass,
	ExtractSubjectType,
	InferSubjects,
} from '@casl/ability'
import { TaskDto } from 'src/task/dto/task.api.dto'

export enum Action {
	Manage = 'manage',
	Create = 'create',
	Read = 'read',
	Update = 'update',
	Delete = 'delete',
}

export type Subjects = InferSubjects<typeof UserDto | typeof TaskDto> | 'all'

export type AppAbility = Ability<[Action, Subjects]>

@Injectable()
export class AbilityFactory {
	defineAbility(user: UserDto) {
		const { build, can, cannot, rules } = new AbilityBuilder(
			Ability as AbilityClass<AppAbility>,
		)

		if (user.is_admin) {
			can(Action.Manage, 'all')
		}

		can(Action.Manage, UserDto)

		return build({
			detectSubjectType: (item) =>
				item.constructor as ExtractSubjectType<Subjects>,
		})
	}
}
