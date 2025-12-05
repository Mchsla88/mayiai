import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

// One-time password reset endpoint
// DELETE THIS FILE AFTER USE!
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  
  // Security: Only allow with secret key
  if (secret !== 'reset-admin-2024-temp') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
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
      message: `Password reset for ${user.email}`,
      hint: 'DELETE app/api/admin/reset-temp/route.ts AFTER USE!'
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
  }
}
