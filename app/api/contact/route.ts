
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    
    const { 
      name, 
      email, 
      companyName, 
      phone, 
      subject, 
      message, 
      formType = 'GENERAL_INQUIRY' 
    } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Wszystkie wymagane pola muszą być wypełnione' },
        { status: 400 }
      );
    }

    // Save form submission to database
    const submission = await prisma.contactFormSubmission.create({
      data: {
        userId: session?.user?.id || null,
        name,
        email: email.toLowerCase(),
        companyName: companyName || null,
        phone: phone || null,
        subject,
        message,
        formType,
        status: 'NEW',
        source: 'website_form'
      }
    });

    return NextResponse.json(
      { 
        message: 'Formularz został wysłany pomyślnie. Skontaktujemy się z Tobą w ciągu 24 godzin.',
        submissionId: submission.id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas wysyłania formularza' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: 'Brak uprawnień' },
        { status: 403 }
      );
    }

    const submissions = await prisma.contactFormSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            companyName: true
          }
        }
      }
    });

    return NextResponse.json({ submissions });

  } catch (error) {
    console.error('Get contact submissions error:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas pobierania zgłoszeń' },
      { status: 500 }
    );
  }
}
