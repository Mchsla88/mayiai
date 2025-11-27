
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

// GET - Pobierz pojedynczy ebook
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !(session.user as any).isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const ebook = await prisma.ebook.findUnique({
      where: { id: params.id }
    });

    if (!ebook) {
      return NextResponse.json(
        { error: 'Ebook not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(ebook);
  } catch (error) {
    console.error('Error fetching ebook:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ebook' },
      { status: 500 }
    );
  }
}

// PUT - Zaktualizuj ebook
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !(session.user as any).isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    const ebook = await prisma.ebook.update({
      where: { id: params.id },
      data: {
        ...data,
        price: data.price ? parseFloat(data.price) : undefined,
        pages: data.pages ? parseInt(data.pages) : undefined,
      }
    });

    return NextResponse.json(ebook);
  } catch (error) {
    console.error('Error updating ebook:', error);
    return NextResponse.json(
      { error: 'Failed to update ebook' },
      { status: 500 }
    );
  }
}

// DELETE - Usuń ebook
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !(session.user as any).isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.ebook.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting ebook:', error);
    return NextResponse.json(
      { error: 'Failed to delete ebook' },
      { status: 500 }
    );
  }
}
