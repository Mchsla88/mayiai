
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Musisz być zalogowany' },
        { status: 401 }
      );
    }

    const { chapterId, isCompleted } = await request.json();

    if (!chapterId) {
      return NextResponse.json(
        { error: 'ID rozdziału jest wymagane' },
        { status: 400 }
      );
    }

    // Check if user has access to ebook
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id,
        status: 'ACTIVE',
        type: 'EBOOK_ACCESS',
        endDate: {
          gt: new Date()
        }
      }
    });

    if (!subscription) {
      return NextResponse.json(
        { error: 'Brak dostępu do e-booka' },
        { status: 403 }
      );
    }

    // Update or create progress
    const progress = await prisma.ebookProgress.upsert({
      where: {
        userId_chapterId: {
          userId: session.user.id,
          chapterId
        }
      },
      update: {
        isCompleted,
        readAt: isCompleted ? new Date() : null
      },
      create: {
        userId: session.user.id,
        chapterId,
        isCompleted,
        readAt: isCompleted ? new Date() : null
      }
    });

    return NextResponse.json({ progress });

  } catch (error) {
    console.error('Progress update error:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas aktualizacji postępu' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Musisz być zalogowany' },
        { status: 401 }
      );
    }

    const progress = await prisma.ebookProgress.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        chapter: {
          select: {
            id: true,
            title: true,
            slug: true,
            estimatedReadTime: true
          }
        }
      },
      orderBy: {
        chapter: {
          orderIndex: 'asc'
        }
      }
    });

    return NextResponse.json({ progress });

  } catch (error) {
    console.error('Get progress error:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas pobierania postępu' },
      { status: 500 }
    );
  }
}
