import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin && session?.user?.email !== 'michal@mayiai.pl') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { userId, password } = body

    if (!userId || !password) {
      return new NextResponse('Missing fields', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error resetting password:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
