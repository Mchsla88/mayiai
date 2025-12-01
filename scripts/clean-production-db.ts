import { PrismaClient } from '@prisma/client'

// Use production database URL
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

async function main() {
  console.log('=== CHECKING PRODUCTION DATABASE ===\n')
  console.log('Database URL:', process.env.DATABASE_URL?.substring(0, 30) + '...')

  const all = await prisma.training.findMany({
    orderBy: { createdAt: 'asc' }
  })

  console.log('\n=== ALL TRAININGS IN PRODUCTION: ===\n')
  all.forEach((t, i) => {
    console.log(`${i + 1}. ${t.title}`)
    console.log(`   Slug: ${t.slug}`)
    console.log(`   ID: ${t.id}`)
    console.log('')
  })

  console.log(`\nTotal: ${all.length} trainings`)
  
  // Now DELETE the unwanted ones
  console.log('\n=== DELETING UNWANTED TRAININGS ===\n')
  
  const toDelete = all.filter(t => 
    t.slug === 'szkolenie-ai-dla-rodzicow' || 
    t.slug === 'szkolenie-ai-dla-nauczycieli'
  )

  for (const training of toDelete) {
    console.log(`Deleting: ${training.title} (${training.slug})...`)
    await prisma.training.delete({
      where: { id: training.id }
    })
    console.log('✓ Deleted')
  }

  console.log('\n=== REMAINING TRAININGS: ===\n')
  const remaining = await prisma.training.findMany()
  remaining.forEach((t, i) => {
    console.log(`${i + 1}. ${t.title} (${t.slug})`)
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
