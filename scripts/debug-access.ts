
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('--- Debugging Access ---')

  // 1. List all trainings
  const trainings = await prisma.training.findMany()
  console.log('Available Trainings:', trainings.map(t => ({ id: t.id, title: t.title, slug: t.slug })))

  // 2. List all users and their trainings
  const users = await prisma.user.findMany({
    include: {
      userTrainings: {
        include: {
          training: true
        }
      },
      orders: true
    }
  })

  console.log(`\nFound ${users.length} users.`)

  for (const user of users) {
    console.log(`\nUser: ${user.email} (ID: ${user.id})`)
    console.log(`  - Orders: ${user.orders.length}`)
    
    if (user.userTrainings.length === 0) {
      console.log('  - No assigned trainings.')
    } else {
      user.userTrainings.forEach(ut => {
        console.log(`  - Training: ${ut.training.title}`)
        console.log(`    - Status: ${ut.isActive ? 'Active' : 'Inactive'}`)
        console.log(`    - Expires: ${ut.expiresAt}`)
        console.log(`    - Is Expired?: ${new Date() > ut.expiresAt}`)
      })
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
