import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { grantAccess } from '@/lib/access';

export async function POST(req: Request) {
  console.log('==========================================');
  console.log('📥 [PAYU NOTIFY] Received notification');
  console.log('==========================================');
  
  try {
    const bodyText = await req.text();
    console.log('[PAYU NOTIFY] Raw body:', bodyText);
    
    const signatureHeader = req.headers.get('OpenPayu-Signature');
    console.log('[PAYU NOTIFY] Signature header:', signatureHeader);

    if (!signatureHeader) {
      console.error('[PAYU NOTIFY] ❌ Missing OpenPayu-Signature header');
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
    const concatenated = bodyText + process.env.PAYU_MD5_KEY;
    const expectedSignature = crypto.createHash('md5').update(concatenated).digest('hex');

    console.log('[PAYU NOTIFY] Signature check:', { 
      incoming: incomingSignature, 
      expected: expectedSignature,
      match: incomingSignature === expectedSignature 
    });

    if (incomingSignature !== expectedSignature) {
       console.warn('[PAYU NOTIFY] ⚠️ Invalid PayU signature');
       if (process.env.NODE_ENV === 'production') {
         return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
       }
    }

    const notification = JSON.parse(bodyText);
    const orderId = notification.order.orderId;
    const status = notification.order.status;

    console.log(`[PAYU NOTIFY] Order ${orderId} status: ${status}`);

    const order = await prisma.order.findUnique({
      where: { payuOrderId: orderId },
    });

    console.log('[PAYU NOTIFY] Found order in DB:', order ? {
      id: order.id,
      status: order.status,
      customerEmail: order.customerEmail,
      trainingId: order.trainingId,
    } : 'NOT FOUND');

    if (!order) {
      console.error(`[PAYU NOTIFY] ❌ Order not found: ${orderId}`);
      return NextResponse.json({ status: 'OK' });
    }

    if (status === 'COMPLETED' && order.status !== 'COMPLETED') {
      console.log('[PAYU NOTIFY] ✅ Payment COMPLETED - updating order and granting access');
      
      // Update order status
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'COMPLETED' },
      });
      console.log('[PAYU NOTIFY] Order status updated to COMPLETED');

      // Grant access to training and send welcome email
      if (order.trainingId && order.customerEmail) {
        console.log(`[PAYU NOTIFY] 📧 Calling grantAccess for ${order.customerEmail}, training: ${order.trainingId}`);
        try {
          const result = await grantAccess(order.customerEmail, order.trainingId, orderId);
          console.log(`[PAYU NOTIFY] ✅ Access granted. New user: ${result.isNewUser}`);
        } catch (accessError) {
          console.error('[PAYU NOTIFY] ❌ Error granting access:', accessError);
        }
      } else {
        console.warn('[PAYU NOTIFY] ⚠️ Missing trainingId or customerEmail, cannot grant access');
      }
    } else if (status === 'CANCELED') {
       console.log('[PAYU NOTIFY] Payment CANCELED');
       await prisma.order.update({
        where: { id: order.id },
        data: { status: 'CANCELED' },
       });
    } else {
      console.log(`[PAYU NOTIFY] Status "${status}" - no action needed (order status: ${order.status})`);
    }

    console.log('[PAYU NOTIFY] ✅ Notification processed successfully');
    console.log('==========================================');
    return NextResponse.json({ status: 'OK' });
  } catch (error) {
    console.error('[PAYU NOTIFY] ❌ Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
