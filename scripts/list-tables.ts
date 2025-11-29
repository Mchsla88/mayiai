
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    const result = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`
    console.log('Tables in DB:', result)
  } catch (e) {
    console.error('Error listing tables:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
