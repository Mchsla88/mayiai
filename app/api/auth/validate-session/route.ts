import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    
    if (!token || !token.sub) {
      return NextResponse.json({ valid: false, reason: 'no_session' });
    }
    
    const sessionId = token.sessionId as string | undefined;
    
    if (!sessionId) {
      // Old sessions without sessionId - allow but log
      console.log('[SESSION_CHECK] Legacy session without sessionId for user:', token.sub);
      return NextResponse.json({ valid: true, legacy: true });
    }
    
    // Check if session ID matches the active one in database
    const user = await prisma.user.findUnique({
      where: { id: token.sub },
      select: { activeSessionId: true, email: true }
    });
    
    if (!user) {
      return NextResponse.json({ valid: false, reason: 'user_not_found' });
    }
    
    if (user.activeSessionId !== sessionId) {
      console.log('[SESSION_CHECK] Session invalidated for user:', user.email);
      return NextResponse.json({ 
        valid: false, 
        reason: 'session_invalidated',
        message: 'Twoje konto zostało zalogowane na innym urządzeniu.'
      });
    }
    
    return NextResponse.json({ valid: true });
    
  } catch (error) {
    console.error('[SESSION_CHECK] Error:', error);
    return NextResponse.json({ valid: false, reason: 'error' }, { status: 500 });
  }
}
