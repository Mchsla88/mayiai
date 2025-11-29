import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin && session?.user?.email !== 'michal@mayiai.pl') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const trainings = await prisma.training.findMany({
      where: { isActive: true },
      select: { id: true, title: true }
    })

    return NextResponse.json(trainings)
  } catch (error) {
    console.error('Error fetching trainings:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
