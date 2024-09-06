import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
	const users = await Promise.all(
		[0, 1, 2, 3, 4, 5].map((number) => {
			// prisma.task.upsert({where:{}})

			return prisma.user.upsert({
				where: { email: 'alice@prisma.io' },
				update: {},
				create: {
					email: `user${number}@mail.com`,
					name: `user${number}`,
					password: `123`,
				},
			})
		}),
	)

	console.log({ users })
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
