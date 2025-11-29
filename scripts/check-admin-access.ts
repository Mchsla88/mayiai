
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Testing database connection...')
  try {
    await prisma.$connect()
    console.log('✅ Database connection successful!')

    const email = 'michal@mayiai.pl'
    console.log(`Checking for user: ${email}...`)
    
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (user) {
      console.log('✅ User found:')
      console.log(`   ID: ${user.id}`)
      console.log(`   Email: ${user.email}`)
      console.log(`   Is Admin: ${user.isAdmin}`)
      console.log(`   Role: ${user.role}`)
    } else {
      console.log('❌ User NOT found.')
    }

  } catch (error) {
    console.error('❌ Database connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
