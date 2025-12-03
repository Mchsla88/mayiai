
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'm.slawinski@gmail.com'
  const password = await bcrypt.hash('admin123', 10)

  console.log(`Creating/Updating admin user: ${email}`)

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password,
      isAdmin: true,
      role: 'ADMIN',
    },
    create: {
      email,
      password,
      isAdmin: true,
      role: 'ADMIN',
      firstName: 'Michał',
      lastName: 'Sławiński',
    },
  })

  console.log('User created/updated successfully:', user)
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
