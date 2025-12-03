import { NextRequest, NextResponse } from 'next/server';
import { getPayUClient } from '@/lib/payu';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('OpenPayu-Signature') || '';
    const body = await req.text();
    
    const client = getPayUClient();
    
    // Verify signature
    if (!client.verifyNotification(body, signature)) {
      console.error('Invalid PayU notification signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    }

    const data = JSON.parse(body);
    const order = data.order;

    // Only process COMPLETED orders
    if (order.status !== 'COMPLETED') {
      return NextResponse.json({ received: true });
    }

    // Extract training slug from extOrderId
    const extOrderId = order.extOrderId;
    const match = extOrderId.match(/training-([^-]+)/);
    if (!match) {
      console.error('Invalid extOrderId format:', extOrderId);
      return NextResponse.json({ error: 'Invalid order ID' }, { status: 400 });
    }

    const trainingSlug = match[1];
    const buyerEmail = order.buyer.email;
    const firstName = order.buyer.firstName;
    const lastName = order.buyer.lastName;

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: buyerEmail },
    });

    if (!user) {
      // Create new user
      const tempPassword = Math.random().toString(36).slice(-8);
      user = await prisma.user.create({
        data: {
          email: buyerEmail,
          firstName,
          lastName,
          password: tempPassword, // Will be hashed by Prisma middleware if exists
        },
      });

      // Send welcome email with credentials
      await resend.emails.send({
        from: 'May I AI <noreply@mayiai.pl>',
        to: buyerEmail,
        subject: 'Dostęp do szkolenia - May I AI',
        html: `
          <h1>Witaj ${firstName}!</h1>
          <p>Dziękujemy za zakup szkolenia. Oto Twoje dane dostępu:</p>
          <ul>
            <li><strong>Email:</strong> ${buyerEmail}</li>
            <li><strong>Hasło tymczasowe:</strong> ${tempPassword}</li>
          </ul>
          <p>Zaloguj się na: ${process.env.NEXTAUTH_URL}/szkolenia</p>
          <p>Zalecamy zmianę hasła po pierwszym logowaniu w ustawieniach konta.</p>
        `,
      });
    }

    // Find training
    const training = await prisma.training.findFirst({
      where: { slug: trainingSlug },
    });

    if (!training) {
      console.error('Training not found:', trainingSlug);
      return NextResponse.json({ error: 'Training not found' }, { status: 404 });
    }

    // Grant access for 12 months
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 12);

    await prisma.userTraining.create({
      data: {
        userId: user.id,
        trainingId: training.id,
        isActive: true,
        expiresAt,
      },
    });

    // Send confirmation email
    await resend.emails.send({
      from: 'May I AI <noreply@mayiai.pl>',
      to: buyerEmail,
      subject: `Potwierdzenie dostępu: ${training.title}`,
      html: `
        <h1>Gratulacje ${firstName}!</h1>
        <p>Masz już dostęp do szkolenia: <strong>${training.title}</strong></p>
        <p>Dostęp ważny do: ${expiresAt.toLocaleDateString('pl-PL')}</p>
        <a href="${process.env.NEXTAUTH_URL}/szkolenia/${training.slug}">Rozpocznij szkolenie</a>
      `,
    });

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Payment callback error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
