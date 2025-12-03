
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const email = 'm.slawinski@gmail.com'
    const plainPassword = 'admin123'
    const hashedPassword = await bcrypt.hash(plainPassword, 10)

    console.log(`Resetting admin user: ${email}`)

    // Delete if exists
    try {
      await prisma.user.delete({ where: { email } })
      console.log('User deleted')
    } catch (e) {
      console.log('User did not exist or delete failed', e)
    }

    // Create fresh
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        isAdmin: true,
        role: 'ADMIN',
        firstName: 'Michał',
        lastName: 'Sławiński',
      },
    })

    // Verify immediately
    const isMatch = await bcrypt.compare(plainPassword, user.password!)

    return NextResponse.json({ 
      success: true, 
      message: 'Admin user reset successfully',
      verification: isMatch ? 'MATCH' : 'MISMATCH',
      user: {
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin
      }
    })
  } catch (error) {
    console.error('Error resetting admin user:', error)
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 })
  }
}
