import { NextRequest, NextResponse } from 'next/server';
import { getPayUClient } from '@/lib/payu';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      trainingSlug,
      userEmail,
      firstName,
      lastName,
      discountCode,
    } = body;

    // Validate input
    if (!trainingSlug || !userEmail || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Define training prices
    const trainingPrices: Record<string, number> = {
      'nauczyciele': 10000, // 100 PLN in grosze
      'dzieci': 10000,
      'mlody-influencer': 10000,
      'bezpieczenstwo-w-sieci-i-ai': 10000,
    };

    const trainingNames: Record<string, string> = {
      'nauczyciele': 'Szkolenie dla Nauczycieli',
      'dzieci': 'Nauka z AI',
      'mlody-influencer': 'Młody Influencer',
      'bezpieczenstwo-w-sieci-i-ai': 'Bezpieczeństwo w Sieci i AI',
    };

    let totalAmount = trainingPrices[trainingSlug];
    if (!totalAmount) {
      return NextResponse.json(
        { error: 'Invalid training' },
        { status: 400 }
      );
    }

    // Apply discount code if provided
    if (discountCode) {
      // TODO: Validate discount code from database
      // For now, hardcoded example
      if (discountCode === 'PROMO10') {
        totalAmount = Math.floor(totalAmount * 0.9); // 10% off
      }
    }

    const client = getPayUClient();
    
    // Get user's IP
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';

    const orderData = {
      customerIp: clientIp.split(',')[0].trim(),
      merchantPosId: process.env.PAYU_POS_ID!,
      description: `Szkolenie: ${trainingNames[trainingSlug]}`,
      currencyCode: 'PLN',
      totalAmount: totalAmount.toString(),
      extOrderId: `training-${trainingSlug}-${Date.now()}`,
      buyer: {
        email: userEmail,
        firstName,
        lastName,
        language: 'pl',
      },
      products: [
        {
          name: trainingNames[trainingSlug],
          unitPrice: totalAmount.toString(),
          quantity: '1',
        },
      ],
      continueUrl: `${process.env.NEXTAUTH_URL}/payment/success?training=${trainingSlug}`,
      notifyUrl: `${process.env.NEXTAUTH_URL}/api/payment/callback`,
    };

    const result = await client.createOrder(orderData);

    if (result.status.statusCode === 'SUCCESS' && result.redirectUri) {
      return NextResponse.json({
        redirectUri: result.redirectUri,
        orderId: result.orderId,
      });
    } else {
      return NextResponse.json(
        { error: 'Payment initiation failed' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
