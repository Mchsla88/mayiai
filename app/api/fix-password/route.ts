import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

// EMERGENCY FIX - Delete after use!
export async function GET() {
  try {
    const email = 'michal@mayiai.pl';
    const newPassword = 'Takiehaslo123!';
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const user = await prisma.user.update({
      where: { email },
      data: { 
        password: hashedPassword,
        isAdmin: true,
        role: 'ADMIN'
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      email: user.email,
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
