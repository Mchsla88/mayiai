import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getUserTrainings } from '@/lib/access'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const trainings = await getUserTrainings(session.user.id)

    return NextResponse.json(trainings)
  } catch (error) {
    console.error('Error fetching user trainings:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
