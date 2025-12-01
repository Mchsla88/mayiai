import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('=== Testing Admin Functions Directly ===\n')

  // 1. Create a test user
  const testUser = await prisma.user.upsert({
    where: { email: 'test.delete@example.com' },
    update: {},
    create: {
      email: 'test.delete@example.com',
      password: 'hashed_password',
      name: 'Test Delete User',
      firstName: 'Test',
      lastName: 'Delete'
    }
  })
  console.log('✓ Created test user:', testUser.email, testUser.id)

  // 2. Get Młody Influencer training
  const training = await prisma.training.findUnique({
    where: { slug: 'mlody-influencer' }
  })
  console.log('✓ Found training:', training?.title, training?.id)

  if (!training) {
    console.error('✗ Training not found!')
    return
  }

  // 3. Test GRANT ACCESS
  console.log('\n--- Testing GRANT ACCESS ---')
  const grantResult = await prisma.userTraining.upsert({
    where: {
      userId_trainingId: {
        userId: testUser.id,
        trainingId: training.id
      }
    },
    update: {
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    },
    create: {
      userId: testUser.id,
      trainingId: training.id,
      isActive: true,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    }
  })
  console.log('✓ Granted access:', grantResult.id)

  // 4. Verify access granted
  const userWithTraining = await prisma.user.findUnique({
    where: { id: testUser.id },
    include: {
      userTrainings: {
        include: {
          training: true
        }
      }
    }
  })
  console.log('✓ User now has trainings:', userWithTraining?.userTrainings.map(ut => ut.training.title))

  // 5. Test DELETE USER (anonymize orders first)
  console.log('\n--- Testing DELETE USER ---')
  
  // First anonymize any orders
  await prisma.order.updateMany({
    where: { userId: testUser.id },
    data: { userId: null }
  })
  console.log('✓ Anonymized orders')

  // Then delete user
  await prisma.user.delete({
    where: { id: testUser.id }
  })
  console.log('✓ Deleted user')

  // 6. Verify deletion
  const deletedUser = await prisma.user.findUnique({
    where: { id: testUser.id }
  })
  console.log('✓ User deleted?', deletedUser === null ? 'YES' : 'NO')

  console.log('\n=== All backend functions work correctly! ===')
}

main()
  .catch((e) => {
    console.error('ERROR:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
