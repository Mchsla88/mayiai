import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin && session?.user?.email !== 'michal@mayiai.pl') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const deletedUsers = await prisma.deletedUser.findMany({
      orderBy: {
        deletedAt: 'desc'
      }
    })

    return NextResponse.json(deletedUsers)
  } catch (error) {
    console.error('Error fetching deleted users:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
