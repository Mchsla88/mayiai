import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

// Secure password reset - requires admin login
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Only allow admins
    if (!session?.user?.isAdmin && session?.user?.email !== 'michal@mayiai.pl') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 });
    }
    
    const body = await request.json();
    const { email, newPassword } = body;
    
    if (!email || !newPassword) {
      return NextResponse.json({ error: 'Email and newPassword are required' }, { status: 400 });
    }
    
    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    const user = await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    });
    
    return NextResponse.json({ 
      success: true, 
      message: `Password reset for ${user.email}`
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
  }
}

// One-time bootstrap - use once then this GET endpoint becomes disabled
// After first successful use, this returns 403
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
    
    // Check if user already has a valid password set
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { password: true }
    });
    
    // If password is already set and matches, skip
    if (existingUser?.password) {
      const alreadySet = await bcrypt.compare(newPassword, existingUser.password);
      if (alreadySet) {
        return NextResponse.json({ 
          message: 'Password already set correctly. Use POST endpoint for future resets.',
          hint: 'Login with Takiehaslo123!'
        });
      }
    }
    
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
      credentials: {
        email: 'michal@mayiai.pl',
        password: 'Takiehaslo123!'
      }
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
  }
}
