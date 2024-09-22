import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { UserDto } from './dto/user.api.dto'
import { UpdateUserDto } from './dto/update.user.api.dto'

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	async delete(id: number) {
		const user = await this.prismaService.user.delete({
			where: {
				id,
			},
		})

		return user
	}

	async update(userDto: UpdateUserDto) {
		const { email, id, username, password, permission } = userDto

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
	}

	async create(userDto: UserDto) {
		const user = await this.prismaService.user.create({
			data: {
				...userDto,
			},
		})

		return user
	}

	async registerUserAvatar(username: string) {
		await this.prismaService.user.update({
			where: {
				username,
			},
			data: {
				has_avatar: true,
			},
		})
	}

	async findAll() {
		const userList = await this.prismaService.user.findMany({
			// skip: skip ? parseInt(skip) : undefined,
			// take: take ? parseInt(take) : undefined,
			// orderBy,
			// where,
			// cursor,
		})

		return userList
	}

	async findOne(username: string) {
		const user = await this.prismaService.user.findUnique({
			where: { username },
		})

		return user
	}

	async findById(id: number) {
		const user = await this.prismaService.user.findUnique({
			where: { id },
		})

		return user
	}
}
