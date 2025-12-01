
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@mayiai.pl'
  const password = 'adminpassword123'
  
  console.log(`Creating/Updating admin user: ${email}...`)

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      isAdmin: true,
      role: 'ADMIN'
    },
    create: {
      email,
      password: hashedPassword,
      name: 'Admin User',
      firstName: 'Admin',
      lastName: 'User',
      isAdmin: true,
      role: 'ADMIN'
    },
  })

  console.log(`Admin user ready: ${user.email}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
