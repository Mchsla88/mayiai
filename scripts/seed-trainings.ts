import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding trainings...')

  // Training 1: Dla nauczycieli
  const training1 = await prisma.training.upsert({
    where: { slug: 'szkolenie-ai-dla-nauczycieli' },
    update: {},
    create: {
      title: 'Szkolenie AI dla Nauczycieli',
      slug: 'szkolenie-ai-dla-nauczycieli',
      shortDescription: 'Kompleksowe szkolenie z wykorzystania AI w edukacji',
      fullDescription: 'Szkolenie obejmuje praktyczne narzędzia AI dla nauczycieli, metodyki nauczania, oraz integrację AI w programie nauczania.',
      price: 499.00,
      duration: '6 godzin',
      level: 'INTERMEDIATE',
      isActive: true,
      orderIndex: 1
    }
  })

  // Training 2: Dla dzieci
  const training2 = await prisma.training.upsert({
    where: { slug: 'szkolenie-ai-dla-dzieci' },
    update: {},
    create: {
      title: 'Szkolenie AI dla Dzieci',
      slug: 'szkolenie-ai-dla-dzieci',
      shortDescription: 'Wprowadzenie do sztucznej inteligencji dla młodych umysłów',
      fullDescription: 'Interaktywne szkolenie ucz ące dzieci podstaw AI poprzez zabawy, eksperymenty i praktyczne projekty.',
      price: 299.00,
      duration: '4 godziny',
      level: 'BEGINNER',
      isActive: true,
      orderIndex: 2
    }
  })

  // Training 3: Dla rodziców
  const training3 = await prisma.training.upsert({
    where: { slug: 'szkolenie-ai-dla-rodzicow' },
    update: {},
    create: {
      title: 'Szkolenie AI dla Rodziców',
      slug: 'szkolenie-ai-dla-rodzicow',
      shortDescription: 'Jak wspierać dzieci w świecie sztucznej inteligencji',
      fullDescription: 'Szkolenie dla rodziców chcących zrozumieć AI i nauczyć dzieci bezpiecznego korzystania z technologii.',
      price: 199.00,
      duration: '3 godziny',
      level: 'BEGINNER',
      isActive: true,
      orderIndex: 3
    }
  })

  console.log('✅ Created trainings:')
  console.log(`   1. ${training1.title} (${training1.slug})`)
  console.log(`   2. ${training2.title} (${training2.slug})`)
  console.log(`   3. ${training3.title} (${training3.slug})`)

  console.log('\n🎉 Seed completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
