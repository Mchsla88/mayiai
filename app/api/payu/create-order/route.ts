import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getPayUClient } from '@/lib/payu';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { trainingId } = await req.json();

    if (!trainingId) {
      return NextResponse.json({ error: 'Missing trainingId' }, { status: 400 });
    }

    const training = await prisma.training.findUnique({
      where: { id: trainingId },
    });

    if (!training) {
      return NextResponse.json({ error: 'Training not found' }, { status: 404 });
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
        email: session.user.email!,
        firstName: session.user.name?.split(' ')[0] || 'Użytkownik',
        lastName: session.user.name?.split(' ')[1] || 'Mayiai',
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
        customerEmail: session.user.email!,
        userId: session.user.id,
        trainingId: training.id,
      },
    });

    return NextResponse.json({ redirectUri: payuResponse.redirectUri });
  } catch (error) {
    console.error('PayU Create Order Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
