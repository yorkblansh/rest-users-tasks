import { Injectable } from '@nestjs/common'
// import { BarcodesLayoutProps } from '../../../react/src/barcodes-layout/interfaces/BarcodesLayoutProps.interface'

import { pipe } from 'fp-ts/lib/function'
import ReactDOMServer from 'react-dom/server'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

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
