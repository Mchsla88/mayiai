
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const trainingSlug = 'mlody-influencer'
  
  console.log(`Checking for training with slug: ${trainingSlug}...`)

  const existingTraining = await prisma.training.findUnique({
    where: { slug: trainingSlug },
  })

  if (existingTraining) {
    console.log(`Training '${trainingSlug}' already exists. ID: ${existingTraining.id}`)
  } else {
    console.log(`Training '${trainingSlug}' not found. Creating...`)
    
    const newTraining = await prisma.training.create({
      data: {
        title: 'Młody Influencer',
        slug: trainingSlug,
        shortDescription: 'Kompletny kurs dla przyszłych twórców internetowych.',
        fullDescription: 'Naucz się tworzyć bezpieczne i wartościowe treści w internecie. Poznaj narzędzia AI, zasady bezpieczeństwa i rozwijaj swoją kreatywność.',
        price: 199.00, // Setting a default price
        duration: '4h',
        level: 'BEGINNER',
        isActive: true,
        imageUrl: '/images/mlody-influencer-cover.jpg', // Placeholder
        orderIndex: 2
      },
    })
    
    console.log(`Training created successfully! ID: ${newTraining.id}`)
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
