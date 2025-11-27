
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

// GET - Pobierz zawartość stron
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !(session.user as any).isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const pageKey = searchParams.get('pageKey');

    if (pageKey) {
      const page = await prisma.pageContent.findUnique({
        where: { pageKey }
      });
      return NextResponse.json(page);
    }

    const pages = await prisma.pageContent.findMany({
      orderBy: { pageKey: 'asc' }
    });

    return NextResponse.json(pages);
  } catch (error) {
    console.error('Error fetching page content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page content' },
      { status: 500 }
    );
  }
}

// POST/PUT - Upsert zawartości strony
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !(session.user as any).isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const page = await prisma.pageContent.upsert({
      where: { pageKey: data.pageKey },
      update: {
        title: data.title,
        content: data.content,
        metadata: data.metadata,
      },
      create: {
        pageKey: data.pageKey,
        title: data.title,
        content: data.content,
        metadata: data.metadata,
      }
    });

    return NextResponse.json(page);
  } catch (error) {
    console.error('Error saving page content:', error);
    return NextResponse.json(
      { error: 'Failed to save page content' },
      { status: 500 }
    );
  }
}
