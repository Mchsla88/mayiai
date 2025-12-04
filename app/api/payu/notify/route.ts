import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { grantAccess } from '@/lib/access';

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    const signatureHeader = req.headers.get('OpenPayu-Signature');

    if (!signatureHeader) {
      console.error('Missing OpenPayu-Signature header');
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // Parse signature header
    const signatureParts = signatureHeader.split(';').reduce((acc, part) => {
      const [key, value] = part.split('=');
      if (key && value) acc[key.trim()] = value.trim();
      return acc;
    }, {} as Record<string, string>);

    const incomingSignature = signatureParts['signature'];
    
    // Verify signature
    // Concatenate body + key
    const concatenated = bodyText + process.env.PAYU_MD5_KEY;
    const expectedSignature = crypto.createHash('md5').update(concatenated).digest('hex');

    if (incomingSignature !== expectedSignature) {
       console.warn('Invalid PayU signature', { incoming: incomingSignature, expected: expectedSignature });
       // In production, you might want to return 400 here, but for debugging we log warning
       if (process.env.NODE_ENV === 'production') {
         return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
       }
    }

    const notification = JSON.parse(bodyText);
    const orderId = notification.order.orderId;
    const status = notification.order.status;

    console.log(`PayU Notification for order ${orderId}: ${status}`);

    const order = await prisma.order.findUnique({
      where: { payuOrderId: orderId },
    });

    if (!order) {
      console.error(`Order not found: ${orderId}`);
      // Return 200 to stop PayU from retrying if order not found (might be test)
      return NextResponse.json({ status: 'OK' });
    }

    if (status === 'COMPLETED' && order.status !== 'COMPLETED') {
      // Update order status
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'COMPLETED' },
      });

      // Grant access to training and send welcome email
      if (order.trainingId && order.customerEmail) {
        try {
          const result = await grantAccess(order.customerEmail, order.trainingId, orderId);
          console.log(`Access granted to ${order.customerEmail} for training ${order.trainingId}. New user: ${result.isNewUser}`);
        } catch (accessError) {
          console.error('Error granting access:', accessError);
          // Don't fail the whole notification - access can be fixed manually
        }
      }
    } else if (status === 'CANCELED') {
       await prisma.order.update({
        where: { id: order.id },
        data: { status: 'CANCELED' },
      });
    }

    return NextResponse.json({ status: 'OK' });
  } catch (error) {
    console.error('PayU Notify Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
