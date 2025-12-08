import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Updating prices...')

  const slugsToUpdate = ['nauczyciele', 'dzieci', 'mlody-influencer']

  for (const slug of slugsToUpdate) {
    await prisma.training.update({
      where: { slug: slug },
      data: { price: 200 }
    })
    console.log(`✅ Updated "${slug}" to 200 PLN`)
  }

  // Checking all prices in DB:
  console.log('\n📊 Current prices:')
  const trainings = await prisma.training.findMany()
  trainings.forEach(t => {
    console.log(`- ${t.slug}: ${t.price} PLN`)
  })

  console.log('\n🎉 Price update completed!')
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
