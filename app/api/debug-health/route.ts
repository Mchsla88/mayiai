
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Check Environment
    const envCheck = {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      hasSecret: !!process.env.NEXTAUTH_SECRET,
      nodeEnv: process.env.NODE_ENV,
    };

    // 2. Check Database
    const userCount = await prisma.user.count();
    
    // 3. Check specific user (optional, safe to log email existence)
    const adminExists = await prisma.user.findFirst({
      where: { email: 'michal@mayiai.pl' },
      select: { id: true }
    });

    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      userCount,
      adminExists: !!adminExists,
      env: envCheck
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
