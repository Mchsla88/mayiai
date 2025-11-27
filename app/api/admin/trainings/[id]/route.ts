
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

// GET - Pobierz pojedyncze szkolenie
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !(session.user as any).isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const training = await prisma.training.findUnique({
      where: { id: params.id }
    });

    if (!training) {
      return NextResponse.json(
        { error: 'Training not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(training);
  } catch (error) {
    console.error('Error fetching training:', error);
    return NextResponse.json(
      { error: 'Failed to fetch training' },
      { status: 500 }
    );
  }
}

// PUT - Zaktualizuj szkolenie
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
    
    const training = await prisma.training.update({
      where: { id: params.id },
      data: {
        ...data,
        price: data.price ? parseFloat(data.price) : undefined,
      }
    });

    return NextResponse.json(training);
  } catch (error) {
    console.error('Error updating training:', error);
    return NextResponse.json(
      { error: 'Failed to update training' },
      { status: 500 }
    );
  }
}

// DELETE - Usuń szkolenie
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || !(session.user as any).isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.training.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting training:', error);
    return NextResponse.json(
      { error: 'Failed to delete training' },
      { status: 500 }
    );
  }
}
