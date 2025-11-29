import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin && session?.user?.email !== 'michal@mayiai.pl') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { userId, trainingId, action } = body

    if (!userId || !trainingId) {
      return new NextResponse('Missing fields', { status: 400 })
    }

    if (action === 'grant') {
      // Create or update UserTraining
      await prisma.userTraining.upsert({
        where: {
          userId_trainingId: {
            userId,
            trainingId
          }
        },
        update: {
          isActive: true,
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year access
        },
        create: {
          userId,
          trainingId,
          isActive: true,
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        }
      })
    } else if (action === 'revoke') {
      await prisma.userTraining.update({
        where: {
          userId_trainingId: {
            userId,
            trainingId
          }
        },
        data: {
          isActive: false
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error managing access:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
