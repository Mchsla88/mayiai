import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { code, trainingId } = await req.json();

    console.log(`[VALIDATE DISCOUNT] Received code: "${code}", trainingId: ${trainingId}`);

    if (!code) {
      return NextResponse.json({ error: 'Kod rabatowy jest wymagany' }, { status: 400 });
    }

    // Normalize code (uppercase and trim)
    const normalizedCode = code.toUpperCase().trim();
    console.log(`[VALIDATE DISCOUNT] Normalized code: "${normalizedCode}"`);

    // Use case-insensitive search
    const discountCode = await prisma.discountCode.findFirst({
      where: { 
        code: {
          equals: normalizedCode,
          mode: 'insensitive'
        }
      },
      include: { training: true },
    });

    console.log(`[VALIDATE DISCOUNT] Found code:`, discountCode ? {
      code: discountCode.code,
      type: discountCode.type,
      discount: discountCode.discount,
      isActive: discountCode.isActive
    } : 'NOT FOUND');

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

    console.log(`[VALIDATE DISCOUNT] ✅ Code valid, returning: ${discountCode.code}, ${discountCode.discount}, ${discountCode.type}`);

    return NextResponse.json({
      code: discountCode.code, // Return the code as stored in DB (for consistency)
      discount: discountCode.discount,
      type: discountCode.type,
    });
  } catch (error) {
    console.error('[VALIDATE DISCOUNT] Error:', error);
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 });
  }
}
