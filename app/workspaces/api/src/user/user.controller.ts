import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common'
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
import { PermissionsGuard } from '../permissions/permissions.guard'
import {
	PERMISSIONS,
	RequirePermissions,
} from '../permissions/require.permission.decorator'
import { Prisma } from '@prisma/client'

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
		const { email, username: name, password } = body

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
	async getUser(
		@Query('skip') skip?: string,
		@Query('take') take?: string,
		@Query('where') where?: Prisma.UserWhereInput,
		@Query('cursor') cursor?: Prisma.UserWhereUniqueInput,
		@Query('orderBy') orderBy?: Prisma.UserOrderByWithRelationInput,
	) {
		const userList = await this.prismaService.user.findMany({
			skip: skip ? parseInt(skip) : undefined,
			take: take ? parseInt(take) : undefined,
			orderBy,
			where,
			cursor,
		})

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

	// @CheckAbilities({ action: Action.Delete, subject: UserDto })

	@Post('/update_user')
	async updateUser(@Body() body: UpdateUserDto) {
		const { email, id, username: name } = body

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
	@RequirePermissions(PERMISSIONS.ADMIN)
	@UseGuards(JwtAuthGuard, PermissionsGuard)
	async deleteUser(@Body() body: any) {
		// const { id } = body

		// const user = await this.prismaService.user.delete({
		// 	where: {
		// 		id,
		// 	},
		// })

		return 'user was deleted'
	}
}
