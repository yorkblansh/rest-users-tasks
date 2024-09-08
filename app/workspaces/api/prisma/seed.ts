import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
	const users = await Promise.all(
		[0, 1, 2, 3, 4, 5].map((n, i) => {
			return prisma.user.upsert({
				where: { email: 'alice@prisma.io' },
				update: {},
				create: {
					email: `user${i}@mail.com`,
					username: `user${i}`,
					password: `123`,
					is_admin: false,
					tasks: {
						create: {
							body: `body for the task${i}`,
							name: `task${i}`,
						},
					},
				},
			})
		}),
	)

	const admins = await Promise.all(
		[6, 7].map((n, i) => {
			return prisma.user.upsert({
				where: { email: 'alice@prisma.io' },
				update: {},
				create: {
					email: `user${n}@mail.com`,
					username: `user${n}`,
					password: `123`,
					is_admin: true,
				},
			})
		}),
	)

	console.log({ users, admins })
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
