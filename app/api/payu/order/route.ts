import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const PAYU_API_URL = process.env.PAYU_ENVIRONMENT === 'production' 
  ? 'https://secure.payu.com' 
  : 'https://secure.snd.payu.com';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, description, email, firstName, lastName, phone, trainingId } = body;

    // 1. Authenticate (Get Access Token)
    const authParams = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.PAYU_POS_ID || '',
      client_secret: process.env.PAYU_CLIENT_SECRET || '',
    });

    const authResponse = await fetch(`${PAYU_API_URL}/pl/standard/user/oauth/authorize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: authParams,
    });

    if (!authResponse.ok) {
      const error = await authResponse.json();
      console.error('PayU Auth Error:', error);
      return NextResponse.json({ error: 'Payment authorization failed' }, { status: 500 });
    }

    const { access_token } = await authResponse.json();

    // 2. Create Order in PayU
    const orderPayload = {
      notifyUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/payu/notify`,
      customerIp: req.headers.get('x-forwarded-for') || '127.0.0.1',
      merchantPosId: process.env.PAYU_POS_ID,
      description: description || 'Payment for services',
      currencyCode: 'PLN',
      totalAmount: Math.round(amount * 100), // PayU expects amount in grosze
      buyer: {
        email,
        phone,
        firstName,
        lastName,
        language: 'pl'
      },
      products: [
        {
          name: description || 'Service',
          unitPrice: Math.round(amount * 100),
          quantity: 1
        }
      ]
    };

    const orderResponse = await fetch(`${PAYU_API_URL}/api/v2_1/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
      body: JSON.stringify(orderPayload),
    });

    if (!orderResponse.ok) {
      const error = await orderResponse.json();
      console.error('PayU Order Error:', error);
      return NextResponse.json({ error: 'Failed to create payment order' }, { status: 500 });
    }

    const orderData = await orderResponse.json();

    // 3. Save Order to Database
    if (trainingId) {
      try {
        await prisma.order.create({
          data: {
            payuOrderId: orderData.orderId,
            amount: amount,
            currency: 'PLN',
            status: 'PENDING',
            description: description,
            customerEmail: email,
            trainingId: trainingId,
            // userId will be linked later if user exists or created
          }
        });
      } catch (dbError) {
        console.error('Failed to save order to DB:', dbError);
        // Continue anyway to allow payment, but log error. 
        // In production, we might want to fail here or have a retry mechanism.
      }
    }
    
    return NextResponse.json({ 
      redirectUri: orderData.redirectUri, 
      orderId: orderData.orderId 
    });

  } catch (error) {
    console.error('PayU Integration Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
