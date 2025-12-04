import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { code, trainingId } = await req.json();

    if (!code) {
      return NextResponse.json({ error: 'Kod rabatowy jest wymagany' }, { status: 400 });
    }

    const discountCode = await prisma.discountCode.findUnique({
      where: { code },
      include: { training: true },
    });

    if (!discountCode) {
      return NextResponse.json({ error: 'Nieprawidłowy kod rabatowy' }, { status: 404 });
    }

    if (!discountCode.isActive) {
      return NextResponse.json({ error: 'Kod rabatowy jest nieaktywny' }, { status: 400 });
    }

    if (discountCode.expiresAt && new Date() > discountCode.expiresAt) {
      return NextResponse.json({ error: 'Kod rabatowy wygasł' }, { status: 400 });
    }

    if (discountCode.usageLimit && discountCode.usedCount >= discountCode.usageLimit) {
      return NextResponse.json({ error: 'Limit użycia kodu został wyczerpany' }, { status: 400 });
    }

    if (discountCode.trainingId && discountCode.trainingId !== trainingId) {
      return NextResponse.json({ error: 'Kod nie dotyczy tego szkolenia' }, { status: 400 });
    }

    return NextResponse.json({
      code: discountCode.code,
      discount: discountCode.discount,
      type: discountCode.type,
    });
  } catch (error) {
    console.error('Error validating discount code:', error);
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 });
  }
}
