
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

// GET - Pobierz wszystkie ebooki
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !(session.user as any).isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const ebooks = await prisma.ebook.findMany({
      orderBy: { orderIndex: 'asc' }
    });

    return NextResponse.json(ebooks);
  } catch (error) {
    console.error('Error fetching ebooks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ebooks' },
      { status: 500 }
    );
  }
}

// POST - Utwórz nowy ebook
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !(session.user as any).isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    // Generuj slug
    const slug = data.title
      .toLowerCase()
      .replace(/ą/g, 'a')
      .replace(/ć/g, 'c')
      .replace(/ę/g, 'e')
      .replace(/ł/g, 'l')
      .replace(/ń/g, 'n')
      .replace(/ó/g, 'o')
      .replace(/ś/g, 's')
      .replace(/ź|ż/g, 'z')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const ebook = await prisma.ebook.create({
      data: {
        ...data,
        slug,
        price: parseFloat(data.price),
        pages: data.pages ? parseInt(data.pages) : null,
      }
    });

    return NextResponse.json(ebook, { status: 201 });
  } catch (error) {
    console.error('Error creating ebook:', error);
    return NextResponse.json(
      { error: 'Failed to create ebook' },
      { status: 500 }
    );
  }
}
