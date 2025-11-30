import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'michal@mayiai.pl'
  const newPassword = 'admin123'
  
  console.log(`Resetting password for ${email}...`)
  
  const hashedPassword = await bcrypt.hash(newPassword, 10)
  
  const user = await prisma.user.update({
    where: { email },
    data: { 
      password: hashedPassword,
      isAdmin: true,
      role: 'ADMIN'
    }
  })
  
  console.log('✅ Password reset successfully!')
  console.log(`   Email: ${user.email}`)
  console.log(`   New password: ${newPassword}`)
  console.log(`   Is Admin: ${user.isAdmin}`)
  console.log(`   Role: ${user.role}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error('❌ Error:', err)
    await prisma.$disconnect()
    process.exit(1)
  })
