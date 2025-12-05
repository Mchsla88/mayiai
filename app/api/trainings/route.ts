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

    const titleMap: Record<string, string> = {
      'nauczyciele': 'Poradnik AI dla Nauczycieli: Wykorzystanie AI w Edukacji',
    };

    const descriptionMap: Record<string, string> = {
      'nauczyciele': 'Opanuj narzędzia AI, zaoszczędź 5h tygodniowo i wprowadź nowoczesną edukację do swojej szkoły. Certyfikowany poradnik dla nauczycieli.',
      'mlody-influencer': 'Poradnik dla przyszłych twórców internetowych. Od pomysłu, przez montaż, aż po bezpieczne zarabianie i etykę w sieci.'
    };

    const priceMap: Record<string, number> = {
      'nauczyciele': 100,
      'dzieci': 100,
      'mlody-influencer': 100,
      'bezpieczenstwo-w-sieci-i-ai': 50
    };

    const trainingsWithAccess = trainings.map(training => ({
      ...training,
      imageUrl: imageMap[training.slug] || training.imageUrl,
      title: titleMap[training.slug] || training.title,
      shortDescription: descriptionMap[training.slug] || training.shortDescription,
      hasAccess: userTrainingsIds.includes(training.id),
      price: priceMap[training.slug] || Number(training.price)
    }));

    return NextResponse.json(trainingsWithAccess);
  } catch (error) {
    console.error('Error fetching trainings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
