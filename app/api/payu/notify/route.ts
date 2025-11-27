import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { grantAccess } from '@/lib/access';

export async function POST(req: Request) {
  try {
    const body = await req.text(); // Get raw body for signature verification
    const signatureHeader = req.headers.get('OpenPayu-Signature');

    if (!signatureHeader) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Parse signature header
    const signatureParts = signatureHeader.split(';').reduce((acc: any, part) => {
      const [key, value] = part.split('=');
      acc[key] = value;
      return acc;
    }, {});

    const incomingSignature = signatureParts['signature'];
    const algorithm = signatureParts['algorithm']; // usually MD5

    // Verify Signature
    const concatenated = body + process.env.PAYU_MD5_KEY;
    const expectedSignature = crypto.createHash('md5').update(concatenated).digest('hex');

    if (incomingSignature !== expectedSignature) {
      console.error('Invalid PayU signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const orderData = JSON.parse(body);
    const { order, status } = orderData;

    console.log(`PayU Notification: Order ${order.orderId} status ${order.status}`);

    // Update Order in DB
    const dbOrder = await prisma.order.update({
      where: { payuOrderId: order.orderId },
      data: { status: order.status },
    });

    // Grant Access if COMPLETED
    if (order.status === 'COMPLETED' && dbOrder.trainingId) {
      await grantAccess(dbOrder.customerEmail, dbOrder.trainingId, order.orderId);
    }

    return NextResponse.json({ status: 'OK' });

  } catch (error) {
    console.error('PayU Notification Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
