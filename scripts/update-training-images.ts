import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateTrainingImages() {
  console.log('🔄 Updating training images...')

  try {
    // Update Nauczyciele
    await prisma.training.update({
      where: { slug: 'nauczyciele' },
      data: { imageUrl: '/training-nauczyciele.jpg' }
    })
    console.log('✅ Updated Nauczyciele')

    // Update Dzieci
    await prisma.training.update({
      where: { slug: 'dzieci' },
      data: { imageUrl: '/training-dzieci.jpg' }
    })
    console.log('✅ Updated Dzieci')

    // Update Młody Influencer
    await prisma.training.update({
      where: { slug: 'mlody-influencer' },
      data: { imageUrl: '/training-influencer.jpg' }
    })
    console.log('✅ Updated Młody Influencer')

    // Update Bezpieczeństwo
    await prisma.training.update({
      where: { slug: 'bezpieczenstwo-w-sieci-i-ai' },
      data: { imageUrl: '/training-rodzice.jpg' }
    })
    console.log('✅ Updated Bezpieczeństwo')

    console.log('🎉 All training images updated successfully!')
  } catch (error) {
    console.error('❌ Error updating images:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

updateTrainingImages()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
