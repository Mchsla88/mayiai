import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const progress = await prisma.userProgress.findMany({
      where: { userId },
    });

    return NextResponse.json({ progress });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await request.json();
    const { chapterId, sectionId, completed, progress: progressValue } = body;

    const userProgress = await prisma.userProgress.upsert({
      where: {
        userId_chapterId_sectionId: {
          userId,
          chapterId,
          sectionId: sectionId || '',
        },
      },
      update: {
        completed,
        progress: progressValue || 0,
        lastAccessed: new Date(),
      },
      create: {
        userId,
        chapterId,
        sectionId,
        completed,
        progress: progressValue || 0,
      },
    });

    // Check for achievements
    const completedChapters = await prisma.userProgress.count({
      where: {
        userId,
        completed: true,
      },
    });

    const achievementKeys = [];
    if (completedChapters === 1) achievementKeys.push('first_chapter');
    if (completedChapters === 5) achievementKeys.push('five_chapters');
    if (completedChapters === 10) achievementKeys.push('ten_chapters');
    if (completedChapters === 20) achievementKeys.push('all_chapters');

    for (const key of achievementKeys) {
      const achievement = await prisma.achievement.findUnique({
        where: { key },
      });

      if (achievement) {
        await prisma.userAchievement.upsert({
          where: {
            userId_achievementId: {
              userId,
              achievementId: achievement.id,
            },
          },
          update: {},
          create: {
            userId,
            achievementId: achievement.id,
          },
        });
      }
    }

    return NextResponse.json({ progress: userProgress });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
