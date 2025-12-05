import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// Debug endpoint to check database values
// GET /api/debug-prices - shows all trainings and discount codes

export async function GET() {
  try {
    // FIX: Update prices to match the offer
    await prisma.training.update({
      where: { slug: 'mlody-influencer' },
      data: { price: 100 }
    });
    
    await prisma.training.update({
      where: { slug: 'bezpieczenstwo-w-sieci-i-ai' },
      data: { price: 50 }
    });

    await prisma.training.update({
      where: { slug: 'nauczyciele' },
      data: { price: 100 }
    });

    await prisma.training.update({
      where: { slug: 'dzieci' },
      data: { price: 100 }
    });

    // Get all trainings
    const trainings = await prisma.training.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        price: true,
      }
    });

    // Get all discount codes
    const discountCodes = await prisma.discountCode.findMany({
      select: {
        id: true,
        code: true,
        discount: true,
        type: true,
        isActive: true,
        trainingId: true,
        usageLimit: true,
        usedCount: true,
      }
    });

    // Format for display
    const formattedTrainings = trainings.map(t => ({
      id: t.id,
      title: t.title,
      slug: t.slug,
      price: t.price.toString(),
      priceAsNumber: parseFloat(t.price.toString()),
    }));

    const formattedCodes = discountCodes.map(c => ({
      id: c.id,
      code: c.code,
      discount: c.discount,
      type: c.type,
      isActive: c.isActive,
      trainingId: c.trainingId,
      usageLimit: c.usageLimit,
      usedCount: c.usedCount,
    }));

    // Calculate example: Młody Influencer with PROMOTION code
    const mlodyInfluencer = formattedTrainings.find(t => t.slug === 'mlody-influencer');
    const promotionCode = formattedCodes.find(c => c.code.toUpperCase() === 'PROMOTION');

    let calculation = null;
    if (mlodyInfluencer && promotionCode) {
      const originalPrice = mlodyInfluencer.priceAsNumber;
      let finalPrice = originalPrice;
      
      if (promotionCode.type === 'PERCENTAGE') {
        const discountAmount = Math.round(originalPrice * (promotionCode.discount / 100));
        finalPrice = originalPrice - discountAmount;
      } else {
        finalPrice = Math.max(0, originalPrice - promotionCode.discount);
      }

      calculation = {
        training: mlodyInfluencer.title,
        originalPrice: originalPrice,
        discountCode: promotionCode.code,
        discountType: promotionCode.type,
        discountValue: promotionCode.discount,
        calculatedFinalPrice: finalPrice,
        finalPriceGrosze: finalPrice * 100,
      };
    }

    return NextResponse.json({
      trainings: formattedTrainings,
      discountCodes: formattedCodes,
      exampleCalculation: calculation,
    });
  } catch (error: any) {
    console.error('[DEBUG-PRICES] Error:', error);
    return NextResponse.json({
      error: error.message,
    }, { status: 500 });
  }
}
