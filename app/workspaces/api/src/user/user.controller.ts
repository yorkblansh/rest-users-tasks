import {
	Controller,
	Get,
	Post,
	Body,
	UseGuards,
	Query,
	BadRequestException,
} from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiOperation,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger'
import { PrismaService } from '../../prisma/prisma.service'
import _ from 'lodash'
import { UserDto } from './dto/user.api.dto'
import { UserByIdDto } from './dto/user.by.id.api.dto'
import { UpdateUserDto } from './dto/update.user.api.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { PermissionsGuard } from '../permissions/permissions.guard'
import {
	PERMISSIONS,
	RequirePermissions,
} from '../permissions/require.permission.decorator'
import { Prisma } from '@prisma/client'

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(
		private readonly prismaService: PrismaService, // private readonly authService: AuthService,
	) {}

	@Post('/create_user')
	@ApiResponse({
		status: 201,
		description: 'create user',
		type: UserDto,
	})
	async createUser(@Body() body: UserDto) {
		const { email, username, password, permission } = body

		try {
			const user = await this.prismaService.user.create({
				data: {
					email,
					username,
					password,
					permission,
				},
			})

			return user
		} catch (error) {
			throw new BadRequestException(error.meta)
		}
	}

	@Get('/get_all_users')
	@ApiResponse({
		status: 200,
		description: 'list of all users',
		type: [UserDto],
	})
	async getUser() {
		// @Query('orderBy') orderBy?: Prisma.UserOrderByWithRelationInput, // @Query('cursor') cursor?: Prisma.UserWhereUniqueInput, // @Query('where') where?: Prisma.UserWhereInput, // @Query('take') take?: string, // @Query('skip') skip?: string,
		try {
			const userList = await this.prismaService.user.findMany({
				// skip: skip ? parseInt(skip) : undefined,
				// take: take ? parseInt(take) : undefined,
				// orderBy,
				// where,
				// cursor,
			})

			return userList
		} catch (error) {
			throw new BadRequestException(error.meta)
		}
	}

	@Get('/get_user_by_id')
	@ApiResponse({
		status: 200,
		description: 'certain user info',
		type: UserDto,
	})
	async getUserById(@Body() body: UserByIdDto) {
		const { id } = body

		try {
			const user = await this.prismaService.user.findUnique({
				where: {
					id,
				},
			})

			return user
		} catch (error) {
			throw new BadRequestException(error.meta)
		}
	}

	@Post('/update_user')
	@ApiResponse({
		status: 200,
		description: 'updated user info',
		type: UserDto,
	})
	async updateUser(@Body() body: UpdateUserDto) {
		const { email, id, username, password, permission } = body

		try {
			const user = await this.prismaService.user.update({
				data: {
					email,
					username,
					id,
					password,
					permission,
				},
				where: {
					id,
				},
			})

			return user
		} catch (error) {
			throw new BadRequestException(error.meta)
		}
	}

	@Post('/delete_user')
	@RequirePermissions(PERMISSIONS.ADMIN)
	@UseGuards(JwtAuthGuard, PermissionsGuard)
	@ApiResponse({
		status: 200,
		description: 'delete user, require bearer auth and admin role',
		// type: `user user0 was deleted`,
	})
	@ApiBearerAuth('delete_user')
	async deleteUser(@Body() body: UserByIdDto) {
		const { id } = body

		try {
			const user = await this.prismaService.user.delete({
				where: {
					id,
				},
			})

			return user
		} catch (error) {
			throw new BadRequestException(error.meta)
		}
	}
}
