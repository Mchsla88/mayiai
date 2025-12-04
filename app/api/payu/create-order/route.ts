import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getPayUClient } from '@/lib/payu';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { trainingId, email, firstName, lastName } = body;

    // Validate required fields
    if (!trainingId) {
      return NextResponse.json({ error: 'Missing trainingId' }, { status: 400 });
    }

    if (!email || !firstName || !lastName) {
      return NextResponse.json({ 
        error: 'Missing buyer information (email, firstName, lastName required)' 
      }, { status: 400 });
    }

    const training = await prisma.training.findUnique({
      where: { id: trainingId },
    });

    if (!training) {
      return NextResponse.json({ error: 'Training not found' }, { status: 404 });
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Create new user if doesn't exist
      user = await prisma.user.create({
        data: {
          email,
          name: `${firstName} ${lastName}`,
          firstName,
          lastName,
        },
      });
      console.log('Created new user:', user.id);
    }

    const payuClient = getPayUClient();
    const amount = Math.round(Number(training.price) * 100); // PayU expects amount in grosze as integer string

    const baseUrl = process.env.NEXTAUTH_URL || 'https://mayiai.pl';

    const orderRequest = {
      customerIp: req.headers.get('x-forwarded-for') || '127.0.0.1',
      merchantPosId: process.env.PAYU_POS_ID!,
      description: `Zakup szkolenia: ${training.title}`,
      currencyCode: 'PLN',
      totalAmount: amount.toString(),
      buyer: {
        email,
        firstName,
        lastName,
        language: 'pl',
      },
      products: [
        {
          name: training.title,
          unitPrice: amount.toString(),
          quantity: '1',
        },
      ],
      continueUrl: `${baseUrl}/szkolenia?status=success`,
      notifyUrl: `${baseUrl}/api/payu/notify`,
    };

    console.log('Creating PayU order:', orderRequest);

    const payuResponse = await payuClient.createOrder(orderRequest);

    // Save order to database
    await prisma.order.create({
      data: {
        payuOrderId: payuResponse.orderId!,
        amount: training.price,
        status: 'PENDING',
        description: `Zakup szkolenia: ${training.title}`,
        customerEmail: email,
        userId: user.id,
        trainingId: training.id,
      },
    });

    return NextResponse.json({ redirectUri: payuResponse.redirectUri });
  } catch (error) {
    console.error('PayU Create Order Error:', error);
    // Log detailed error if available
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Stack:', error.stack);
    }
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
