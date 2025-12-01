
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const userEmail = 'jan.kowalski999@test.pl'
  const trainingSlug = 'mlody-influencer'

  console.log(`Testing Grant Access for ${userEmail} -> ${trainingSlug}`)

  // 1. Get User
  const user = await prisma.user.findUnique({ where: { email: userEmail } })
  if (!user) {
    console.error('User not found')
    return
  }

  // 2. Get Training
  const training = await prisma.training.findUnique({ where: { slug: trainingSlug } })
  if (!training) {
    console.error('Training not found')
    return
  }

  console.log(`User ID: ${user.id}`)
  console.log(`Training ID: ${training.id}`)

  // 3. Grant Access
  const result = await prisma.userTraining.upsert({
    where: {
      userId_trainingId: {
        userId: user.id,
        trainingId: training.id
      }
    },
    update: {
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    },
    create: {
      userId: user.id,
      trainingId: training.id,
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    }
  })

  console.log('Grant Result:', result)

  // 4. Verify
  const check = await prisma.userTraining.findUnique({
    where: {
      userId_trainingId: {
        userId: user.id,
        trainingId: training.id
      }
    },
    include: { training: true }
  })

  console.log('Verification:', check ? `Success: ${check.training.title}` : 'Failed')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
