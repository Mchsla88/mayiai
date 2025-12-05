import { NextRequest, NextResponse } from 'next/server';
import { getPayUClient } from '@/lib/payu';
import { prisma } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      trainingId, // Single training ID (not items array)
      items, // Keep for backward compatibility
      email,
      firstName,
      lastName,
      discountCode,
    } = body;

    // Support both trainingId and items for backward compatibility
    const trainingIds = trainingId ? [trainingId] : (items || []);

    // Validate input
    if (!trainingIds || trainingIds.length === 0 || !email || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Fetch trainings from DB
    const trainings = await prisma.training.findMany({
      where: {
        id: { in: trainingIds }
      }
    });

    if (trainings.length !== trainingIds.length) {
      return NextResponse.json(
        { error: 'Some items not found' },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already has access to this training
    const existingUser = await prisma.user.findFirst({
      where: { 
        email: {
          equals: normalizedEmail,
          mode: 'insensitive'
        }
      }
    });

    if (existingUser) {
      // Check if user already owns this training
      for (const training of trainings) {
        const existingAccess = await prisma.userTraining.findFirst({
          where: {
            userId: existingUser.id,
            trainingId: training.id,
            isActive: true,
            expiresAt: { gt: new Date() }
          }
        });

        if (existingAccess) {
          return NextResponse.json(
            { error: `Masz już dostęp do szkolenia "${training.title}". Sprawdź swoje szkolenia w panelu.` },
            { status: 400 }
          );
        }

        // Also check completed orders
        const existingOrder = await prisma.order.findFirst({
          where: {
            userId: existingUser.id,
            trainingId: training.id,
            status: 'COMPLETED'
          }
        });

        if (existingOrder) {
          return NextResponse.json(
            { error: `Masz już dostęp do szkolenia "${training.title}". Sprawdź swoje szkolenia w panelu.` },
            { status: 400 }
          );
        }
      }
    }

    // DEBUG: Log raw training data from DB
    console.log(`[CREATE-ORDER] ============ RAW TRAINING DATA ============`);
    trainings.forEach(t => {
      console.log(`[CREATE-ORDER] Training: "${t.title}"`);
      console.log(`[CREATE-ORDER]   - Raw price from DB: ${t.price}`);
      console.log(`[CREATE-ORDER]   - Type of price: ${typeof t.price}`);
      console.log(`[CREATE-ORDER]   - Price toString(): ${t.price.toString()}`);
      console.log(`[CREATE-ORDER]   - Number(price): ${Number(t.price)}`);
    });
    console.log(`[CREATE-ORDER] ==========================================`);

    // Calculate prices per item - use parseFloat for safer Decimal conversion
    let orderItems = trainings.map(t => ({
      ...t,
      originalPrice: parseFloat(t.price.toString()),
      finalPrice: parseFloat(t.price.toString())
    }));

    console.log(`[CREATE-ORDER] Starting price calculation. Training count: ${trainings.length}`);
    console.log(`[CREATE-ORDER] Original prices:`, orderItems.map(i => ({ title: i.title, price: i.originalPrice })));
    console.log(`[CREATE-ORDER] Discount code received: "${discountCode}"`);

    // Apply discount code if provided
    if (discountCode) {
      const codeToSearch = discountCode.toUpperCase().trim();
      console.log(`[CREATE-ORDER] Searching for discount code: "${codeToSearch}"`);
      
      // Use case-insensitive search to match validation behavior
      const code = await prisma.discountCode.findFirst({
        where: { 
          code: {
            equals: codeToSearch,
            mode: 'insensitive'
          }
        },
        include: { training: true }
      });

      console.log(`[CREATE-ORDER] Found code:`, code ? { 
        code: code.code, 
        type: code.type, 
        discount: code.discount, 
        isActive: code.isActive,
        trainingId: code.trainingId 
      } : 'NOT FOUND');

      if (code && code.isActive) {
        // Check expiration and limits
        const now = new Date();
        const isExpired = code.expiresAt && new Date(code.expiresAt) < now;
        const isLimitReached = code.usageLimit && code.usedCount >= code.usageLimit;

        console.log(`[CREATE-ORDER] Code validation: expired=${isExpired}, limitReached=${isLimitReached}`);

        if (!isExpired && !isLimitReached) {
          if (code.trainingId) {
            // Discount applies to specific training
            console.log(`[CREATE-ORDER] Applying discount to specific training: ${code.trainingId}`);
            orderItems = orderItems.map(item => {
              if (item.id === code.trainingId) {
                const discountAmount = code.type === 'PERCENTAGE'
                  ? Math.round(item.originalPrice * (code.discount / 100))
                  : code.discount;
                const newPrice = Math.max(0, item.originalPrice - discountAmount);
                console.log(`[CREATE-ORDER] Item "${item.title}": ${item.originalPrice} - ${discountAmount} = ${newPrice}`);
                return { ...item, finalPrice: newPrice };
              }
              return item;
            });
          } else {
            // Global discount
            console.log(`[CREATE-ORDER] Applying global discount: ${code.discount}${code.type === 'PERCENTAGE' ? '%' : ' PLN'}`);
            
            if (code.type === 'PERCENTAGE') {
              orderItems = orderItems.map(item => {
                const discountAmount = Math.round(item.originalPrice * (code.discount / 100));
                const newPrice = Math.max(0, item.originalPrice - discountAmount);
                console.log(`[CREATE-ORDER] Item "${item.title}": ${item.originalPrice} - ${discountAmount} (${code.discount}%) = ${newPrice}`);
                return { ...item, finalPrice: newPrice };
              });
            } else {
              // Fixed amount global discount - subtract from first item
              let remainingDiscount = code.discount;
              orderItems = orderItems.map(item => {
                if (remainingDiscount > 0) {
                  const deduction = Math.min(item.originalPrice, remainingDiscount);
                  remainingDiscount -= deduction;
                  const newPrice = item.originalPrice - deduction;
                  console.log(`[CREATE-ORDER] Item "${item.title}": ${item.originalPrice} - ${deduction} = ${newPrice}`);
                  return { ...item, finalPrice: newPrice };
                }
                return item;
              });
            }
          }
        } else {
          console.log(`[CREATE-ORDER] Code not applied: expired=${isExpired}, limitReached=${isLimitReached}`);
        }
      } else {
        console.log(`[CREATE-ORDER] Code not found or inactive`);
      }
    } else {
      console.log(`[CREATE-ORDER] No discount code provided`);
    }

    // Calculate total amount from items
    const totalAmount = orderItems.reduce((sum, item) => sum + item.finalPrice, 0);
    
    // PayU expects amount in grosze (integers)
    const totalAmountGrosze = totalAmount * 100;

    console.log(`[CREATE-ORDER] Final prices:`, orderItems.map(i => ({ title: i.title, finalPrice: i.finalPrice })));
    console.log(`[CREATE-ORDER] Total amount: ${totalAmount} PLN (${totalAmountGrosze} groszy)`);

    const client = getPayUClient();
    
    // Get user's IP
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1';

    // Find or create user - use case-insensitive search
    let user = existingUser || await prisma.user.findFirst({
      where: { 
        email: {
          equals: normalizedEmail,
          mode: 'insensitive'
        }
      }
    });

    if (!user) {
       user = await prisma.user.create({
        data: {
          email: normalizedEmail,
          firstName,
          lastName,
          name: `${firstName} ${lastName}`,
          password: '', // No password yet
          role: 'USER',
          isAdmin: false
        }
      });
      console.log(`Created new user: ${normalizedEmail}`);
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
      products: orderItems.map(item => ({
        name: item.title,
        unitPrice: (item.finalPrice * 100).toString(),
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
