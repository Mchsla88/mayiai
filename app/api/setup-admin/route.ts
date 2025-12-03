
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const email = 'm.slawinski@gmail.com'
    const password = await bcrypt.hash('admin123', 10)

    console.log(`Creating/Updating admin user: ${email}`)

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password,
        isAdmin: true,
        role: 'ADMIN',
      },
      create: {
        email,
        password,
        isAdmin: true,
        role: 'ADMIN',
        firstName: 'Michał',
        lastName: 'Sławiński',
      },
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Admin user created/updated successfully',
      user: {
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin
      }
    })
  } catch (error) {
    console.error('Error creating admin user:', error)
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 })
  }
}
