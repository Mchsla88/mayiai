import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('=== Wszystkie szkolenia w bazie: ===\n')
  
  const trainings = await prisma.training.findMany({
    orderBy: { createdAt: 'asc' }
  })

  trainings.forEach((t, i) => {
    console.log(`${i + 1}. ${t.title}`)
    console.log(`   Slug: ${t.slug}`)
    console.log(`   ID: ${t.id}`)
    console.log(`   Utworzono: ${t.createdAt}`)
    console.log(`   Aktywne: ${t.isActive}`)
    console.log('')
  })

  console.log(`Łącznie: ${trainings.length} szkoleń`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
