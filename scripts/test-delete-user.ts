
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const email = 'delete.me@test.pl'
  
  console.log(`Creating user to delete: ${email}`)

  // 1. Create User
  const user = await prisma.user.create({
    data: {
      email,
      name: 'Delete Me',
      orders: {
        create: {
          payuOrderId: `ORDER-${Date.now()}`,
          amount: 100,
          status: 'COMPLETED',
          customerEmail: email,
          description: 'Test Order'
        }
      }
    },
    include: { orders: true }
  })

  console.log(`User created: ${user.id} with ${user.orders.length} orders`)

  // 2. Simulate Delete Logic (same as API)
  console.log('Attempting deletion...')
  
  try {
    // Step 1: Anonymize orders
    await prisma.order.updateMany({
      where: { userId: user.id },
      data: { userId: null }
    })
    console.log('Orders anonymized.')

    // Step 2: Delete user
    await prisma.user.delete({
      where: { id: user.id }
    })
    console.log('User deleted successfully.')

    // 3. Verify
    const checkUser = await prisma.user.findUnique({ where: { id: user.id } })
    const checkOrder = await prisma.order.findUnique({ where: { id: user.orders[0].id } })

    if (!checkUser && checkOrder && checkOrder.userId === null) {
      console.log('VERIFICATION SUCCESS: User gone, Order remains (anonymized).')
    } else {
      console.error('VERIFICATION FAILED')
      console.log('User:', checkUser)
      console.log('Order:', checkOrder)
    }

  } catch (error) {
    console.error('Deletion failed:', error)
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
