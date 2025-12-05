import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    const trainings = await prisma.training.findMany({
      where: { isActive: true },
      orderBy: { orderIndex: 'asc' },
    });

    let userTrainingsIds: string[] = [];

    if (session?.user?.id) {
      // Check for admin access
      if (session.user.isAdmin || session.user.email === 'michal@mayiai.pl') {
        // Admin has access to everything
        userTrainingsIds = trainings.map(t => t.id);
      } else {
        const userTrainings = await prisma.userTraining.findMany({
          where: { 
            userId: session.user.id,
            isActive: true,
            expiresAt: { gt: new Date() }
          },
          select: { trainingId: true }
        });
        userTrainingsIds = userTrainings.map(ut => ut.trainingId);
      }
    }

    const imageMap: Record<string, string> = {
      'nauczyciele': '/training-nauczyciele.jpg',
      'dzieci': '/training-dzieci.jpg',
      'mlody-influencer': '/training-influencer.jpg',
      'bezpieczenstwo-w-sieci-i-ai': '/training-rodzice.jpg'
    };

    const trainingsWithAccess = trainings.map(training => ({
      ...training,
      imageUrl: imageMap[training.slug] || training.imageUrl,
      hasAccess: userTrainingsIds.includes(training.id),
      price: Number(training.price) // Convert Decimal to number for JSON
    }));

    return NextResponse.json(trainingsWithAccess);
  } catch (error) {
    console.error('Error fetching trainings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
