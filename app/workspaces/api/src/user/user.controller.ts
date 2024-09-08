import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { PrismaService } from '../../prisma/prisma.service'
import _ from 'lodash'
import { UserDto } from './dto/user.api.dto'
import { UserByIdDto } from './dto/user.by.id.api.dto'
import { UpdateUserDto } from './dto/update.user.api.dto'
import { Action } from '../ability/ability.factory/ability.factory'
import { CheckAbilities } from '../ability/abilities.decorator'
import { AbilitiesGuard } from '../ability/abilities.guard'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

interface ReportDates {
	date_from: string
	date_to: Date
}

const TEST = process.env.TEST

const postfixTest = TEST === 'TEST' ? '_test' : ''

console.log({ postfixTest })

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(
		private readonly prismaService: PrismaService, // private readonly authService: AuthService,
	) {}

	@Post('/create_user')
	async createUser(@Body() body: UserDto) {
		const { email, name, password } = body

		const user = await this.prismaService.user.create({
			data: {
				email,
				username: name,
				password,
			},
		})

		return user
	}

	@Get('/get_all_users')
	async getUser() {
		const userList = await this.prismaService.user.findMany()

		return userList
	}

	@Get('/get_user_by_id')
	async getUserById(@Body() body: UserByIdDto) {
		const { id } = body

		const user = await this.prismaService.user.findUnique({
			where: {
				id,
			},
		})

		return user
	}

	@Post('/update_user')
	async updateUser(@Body() body: UpdateUserDto) {
		const { email, id, name } = body

		const user = await this.prismaService.user.update({
			data: {
				email,
				username: name,
			},
			where: {
				id,
			},
		})

		return user
	}

	@Post('/delete_user')
	@UseGuards(JwtAuthGuard, AbilitiesGuard)
	@CheckAbilities({ action: Action.Delete, subject: UserDto })
	async deleteUser(@Body() body: UserByIdDto) {
		// const { id } = body

		// const user = await this.prismaService.user.delete({
		// 	where: {
		// 		id,
		// 	},
		// })

		return 'user was deleted'
	}
}
