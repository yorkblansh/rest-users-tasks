import { Global, Module } from '@nestjs/common'
import { AbilityFactory } from './ability.factory/ability.factory'
import { AbilitiesGuard } from './abilities.guard'

@Module({
	providers: [AbilityFactory],
	exports: [AbilityFactory],
})
export class AbilityModule {}
