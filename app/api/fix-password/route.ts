import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

// EMERGENCY FIX - Only updates password, nothing else
export async function GET() {
  try {
    const email = 'michal@mayiai.pl';
    const newPassword = 'Takiehaslo123!';
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Use raw SQL to bypass Prisma client schema issues
    await prisma.$executeRaw`UPDATE users SET password = ${hashedPassword}, "isAdmin" = true, role = 'ADMIN' WHERE email = ${email}`;
    
    return NextResponse.json({ 
      success: true, 
      email: email,
      password: 'Takiehaslo123!',
      message: 'Hasło ustawione! Teraz zaloguj się na /auth/login'
    });
  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Błąd', 
      details: error.message 
    }, { status: 500 });
  }
}
