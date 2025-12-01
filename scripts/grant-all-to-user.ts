import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

async function main() {
  const userEmail = 'michal@mayiai.pl'
  
  console.log(`=== PRZYZNANIE WSZYSTKICH SZKOLEŃ DLA ${userEmail} ===\n`)

  const user = await prisma.user.findUnique({
    where: { email: userEmail }
  })

  if (!user) {
    console.log('❌ Użytkownik nie znaleziony')
    return
  }

  const trainings = await prisma.training.findMany({
    where: { isActive: true }
  })

  console.log(`Znaleziono ${trainings.length} aktywnych szkoleń:\n`)

  for (const training of trainings) {
    console.log(`Przyznawanie: ${training.title}...`)
    
    await prisma.userTraining.upsert({
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
    
    console.log('✅ Przyznano')
  }

  // Verify
  console.log('\n=== WERYFIKACJA ===\n')
  const userWithTrainings = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      userTrainings: {
        include: {
          training: true
        }
      }
    }
  })

  console.log(`${userEmail} ma teraz dostęp do:\n`)
  userWithTrainings?.userTrainings.forEach((ut, i) => {
    console.log(`${i + 1}. ${ut.training.title}`)
  })
}

main()
  .catch((e) => {
    console.error('ERROR:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
