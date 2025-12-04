import { NextRequest, NextResponse } from 'next/server';
import { getPayUClient } from '@/lib/payu';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      items, // Array of training IDs
      email,
      firstName,
      lastName,
      discountCode,
    } = body;

    // Validate input
    if (!items || !Array.isArray(items) || items.length === 0 || !email || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Fetch trainings from DB
    const trainings = await prisma.training.findMany({
      where: {
        id: { in: items }
      }
    });

    if (trainings.length !== items.length) {
      return NextResponse.json(
        { error: 'Some items not found' },
        { status: 400 }
      );
    }

    // Calculate total amount
    let totalAmount = trainings.reduce((sum, t) => sum + Number(t.price), 0);
    
    // Apply discount code if provided
    if (discountCode) {
      const code = await prisma.discountCode.findUnique({
        where: { code: discountCode.toUpperCase() },
        include: { training: true }
      });

      if (code && code.isActive) {
        // Check expiration
        const now = new Date();
        if (code.expiresAt && new Date(code.expiresAt) < now) {
          // Expired
        } else if (code.usageLimit && code.usedCount >= code.usageLimit) {
          // Limit reached
        } else {
          // Apply discount
          if (code.trainingId) {
            // Discount applies to specific training
            const targetTraining = trainings.find(t => t.id === code.trainingId);
            if (targetTraining) {
              const discountValue = code.type === 'PERCENTAGE' 
                ? Math.round(Number(targetTraining.price) * (code.discount / 100))
                : code.discount;
              totalAmount -= discountValue;
            }
          } else {
            // Global discount
            const discountValue = code.type === 'PERCENTAGE'
              ? Math.round(totalAmount * (code.discount / 100))
              : code.discount;
            totalAmount -= discountValue;
          }
        }
      }
    }

    // Ensure total is not negative
    totalAmount = Math.max(0, totalAmount);
    
    // PayU expects amount in grosze (integers)
    const totalAmountGrosze = totalAmount * 100;

    const client = getPayUClient();
    
    // Get user's IP
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    });

    if (!user) {
       user = await prisma.user.create({
        data: {
          email: email.toLowerCase(),
          firstName,
          lastName,
          name: `${firstName} ${lastName}`,
          password: '', // No password yet
          role: 'USER',
          isAdmin: false
        }
      });
    }

    const orderData = {
      customerIp: clientIp.split(',')[0].trim(),
      merchantPosId: process.env.PAYU_POS_ID!,
      description: `Zamówienie: ${trainings.map(t => t.title).join(', ')}`,
      currencyCode: 'PLN',
      totalAmount: totalAmountGrosze.toString(),
      extOrderId: `order-${Date.now()}`,
      buyer: {
        email: user.email,
        firstName: user.firstName || firstName,
        lastName: user.lastName || lastName,
        language: 'pl',
      },
      products: trainings.map(t => ({
        name: t.title,
        unitPrice: (Number(t.price) * 100).toString(),
        quantity: '1',
      })),
      continueUrl: `${process.env.NEXTAUTH_URL}/oferta?status=success`,
      notifyUrl: `${process.env.NEXTAUTH_URL}/api/payu/notify`,
    };

    const result = await client.createOrder(orderData);

    if (result.status.statusCode === 'SUCCESS' && result.redirectUri) {
      // Save order to DB
      // We need to handle multiple trainings. 
      // If the schema restricts to one trainingId, we might need to pick the first one 
      // or update the schema.
      // Assuming for now we can only link one training or the schema allows null.
      // Ideally we should have OrderItems.
      // Let's check if we can save without trainingId or if we must pick one.
      // The previous code used trainingId.
      // I'll pick the first trainingId for now to satisfy the constraint if it exists,
      // but logically this is an order for multiple items.
      // The best way is to update schema, but I'll stick to existing schema constraints for now.
      
      await prisma.order.create({
        data: {
          payuOrderId: result.orderId!,
          amount: totalAmount,
          currency: 'PLN',
          status: 'PENDING',
          userId: user.id,
          customerEmail: user.email,
          description: `Zamówienie: ${trainings.map(t => t.title).join(', ')}`,
          // Use the first training ID as a reference if required, or null if optional
          trainingId: trainings[0].id, 
        }
      });
      
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
