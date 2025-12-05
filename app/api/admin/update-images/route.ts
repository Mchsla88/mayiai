import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    // Simple authentication - you can enhance this
    const { secret } = await request.json()
    
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('🔄 Updating training images...')

    // Update all training images
    const updates = [
      { slug: 'nauczyciele', imageUrl: '/training-nauczyciele.jpg' },
      { slug: 'dzieci', imageUrl: '/training-dzieci.jpg' },
      { slug: 'mlody-influencer', imageUrl: '/training-influencer.jpg' },
      { slug: 'bezpieczenstwo-w-sieci-i-ai', imageUrl: '/training-rodzice.jpg' },
    ]

    const results = []
    for (const update of updates) {
      const training = await prisma.training.update({
        where: { slug: update.slug },
        data: { imageUrl: update.imageUrl }
      })
      results.push({ slug: update.slug, updated: true })
      console.log(`✅ Updated ${update.slug}`)
    }

    return NextResponse.json({ 
      success: true, 
      message: 'All training images updated',
      results 
    })
  } catch (error) {
    console.error('Error updating images:', error)
    return NextResponse.json({ 
      error: 'Failed to update images',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// GET endpoint to check current images
export async function GET() {
  try {
    const trainings = await prisma.training.findMany({
      select: {
        slug: true,
        title: true,
        imageUrl: true
      },
      orderBy: { orderIndex: 'asc' }
    })

    return NextResponse.json({ trainings })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trainings' }, { status: 500 })
  }
}
