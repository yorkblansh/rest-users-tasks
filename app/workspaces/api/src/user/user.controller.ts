import {
	Controller,
	Get,
	Post,
	Body,
	UseGuards,
	BadRequestException,
} from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
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
import { UserService } from './user.service'

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('/create_user')
	@ApiResponse({
		status: 201,
		description: 'create user',
		type: UserDto,
	})
	async createUser(@Body() userDto: UserDto) {
		try {
			return this.userService.create(userDto)
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
	async getAllUsers() {
		try {
			return this.userService.findAll()
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
			return this.userService.findById(id)
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
	async updateUser(@Body() userDto: UpdateUserDto) {
		try {
			return this.userService.update(userDto)
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
	})
	@ApiBearerAuth()
	async deleteUser(@Body() body: UserByIdDto) {
		const { id } = body

		try {
			return this.userService.delete(id)
		} catch (error) {
			throw new BadRequestException(error.meta)
		}
	}
}
