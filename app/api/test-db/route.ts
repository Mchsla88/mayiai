
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const count = await prisma.user.count()
    return NextResponse.json({ status: 'ok', userCount: count })
  } catch (error) {
    console.error('DB Test Error:', error)
    return NextResponse.json({ status: 'error', message: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
