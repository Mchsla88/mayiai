import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'michal@mayiai.pl'
  const testPassword = 'admin123'
  
  console.log('=== Testing Password Hash ===')
  console.log(`Email: ${email}`)
  console.log(`Test Password: ${testPassword}`)
  console.log('')
  
  const user = await prisma.user.findUnique({
    where: { email }
  })
  
  if (!user) {
    console.log('❌ User not found!')
    return
  }
  
  console.log('✅ User found:')
  console.log(`   ID: ${user.id}`)
  console.log(`   Email: ${user.email}`)
  console.log(`   Has Password: ${!!user.password}`)
  console.log(`   Password Hash (first 20 chars): ${user.password?.substring(0, 20)}...`)
  console.log('')
  
  if (!user.password) {
    console.log('❌ User has no password!')
    return
  }
  
  // Test bcrypt compare
  console.log('Testing bcrypt.compare...')
  const match = await bcrypt.compare(testPassword, user.password)
  
  console.log('')
  if (match) {
    console.log('✅ PASSWORD MATCHES!')
  } else {
    console.log('❌ PASSWORD DOES NOT MATCH!')
    console.log('')
    console.log('Attempting to create new hash...')
    const newHash = await bcrypt.hash(testPassword, 10)
    console.log(`New hash: ${newHash.substring(0, 20)}...`)
    console.log(`Old hash: ${user.password.substring(0, 20)}...`)
    console.log('')
    console.log('Testing new hash...')
    const newMatch = await bcrypt.compare(testPassword, newHash)
    console.log(`New hash test: ${newMatch ? '✅ WORKS' : '❌ FAILED'}`)
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(err => {
    console.error('Error:', err)
    prisma.$disconnect()
    process.exit(1)
  })
