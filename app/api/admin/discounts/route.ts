import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin && session?.user?.email !== 'michal@mayiai.pl') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const codes = await prisma.discountCode.findMany({
      orderBy: { createdAt: 'desc' },
      include: { training: true }
    })

    return NextResponse.json(codes)
  } catch (error) {
    console.error('Error fetching discount codes:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin && session?.user?.email !== 'michal@mayiai.pl') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { code, discount, trainingId, usageLimit, expiresAt } = body

    if (!code || !discount) {
      return new NextResponse('Missing fields', { status: 400 })
    }

    const newCode = await prisma.discountCode.create({
      data: {
        code: code.toUpperCase(),
        discount: parseInt(discount),
        trainingId: trainingId || null,
        usageLimit: usageLimit ? parseInt(usageLimit) : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null
      }
    })

    return NextResponse.json(newCode)
  } catch (error) {
    console.error('Error creating discount code:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.isAdmin && session?.user?.email !== 'michal@mayiai.pl') {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return new NextResponse('Missing ID', { status: 400 })
    }

    await prisma.discountCode.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting discount code:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
