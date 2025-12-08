import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Updating "mlody-influencer"...')

  // Update price to 150
  await prisma.training.update({
    where: { slug: 'mlody-influencer' },
    data: { price: 150 }
  })
  console.log('✅ Updated price to 150 PLN')

  // Verify 'comingSoon' status via log (logic is in API code, not DB field usually, unless schema changed)
  // Checking schema for 'comingSoon' or similar field? 
  // Based on previous view_file, 'comingSoon' is handled in app/api/trainings/route.ts via `comingSoonSlugs` array.
  // So DB update is just for price.

  console.log('\n📊 Current "mlody-influencer" data:')
  const t = await prisma.training.findUnique({ where: { slug: 'mlody-influencer' } })
  console.log(t)

  console.log('\n🎉 Update completed!')
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
