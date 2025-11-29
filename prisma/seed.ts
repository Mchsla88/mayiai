
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'michal@mayiai.pl'
  const password = await bcrypt.hash('admin123', 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password,
      isAdmin: true,
    },
    create: {
      email,
      password,
      isAdmin: true,
      role: 'ADMIN',
      firstName: 'Michał',
      lastName: 'Admin',
    },
  })

  console.log({ user })
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
