import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const trainings = await prisma.training.findMany()
    return NextResponse.json({ 
      count: trainings.length, 
      trainings,
      env: {
        dbUrl: process.env.POSTGRES_PRISMA_URL ? 'Set' : 'Not Set'
      }
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
