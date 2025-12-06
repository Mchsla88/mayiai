import { NextResponse } from 'next/server';
import { testEmailConnection, sendWelcomeEmail } from '@/lib/email-smtp';

// Test endpoint to verify SMTP configuration
// GET /api/test-email - test SMTP connection
// POST /api/test-email - send test email (requires { email: "..." } in body)

export async function GET() {
  console.log('[TEST-EMAIL] Testing SMTP connection...');
  
  try {
    const isConnected = await testEmailConnection();
    
    if (isConnected) {
      return NextResponse.json({
        status: 'success',
        message: 'SMTP connection verified successfully',
        smtp: {
          host: process.env.SMTP_HOST || 'NOT SET',
          port: process.env.SMTP_PORT || 'NOT SET',
          user: process.env.SMTP_USER ? 'SET' : 'NOT SET',
          pass: process.env.SMTP_PASS ? 'SET' : 'NOT SET',
          from: process.env.SMTP_FROM || 'NOT SET',
        }
      });
    } else {
      return NextResponse.json({
        status: 'error',
        message: 'SMTP connection failed',
        smtp: {
          host: process.env.SMTP_HOST || 'NOT SET',
          port: process.env.SMTP_PORT || 'NOT SET',
          user: process.env.SMTP_USER ? 'SET' : 'NOT SET',
          pass: process.env.SMTP_PASS ? 'SET' : 'NOT SET',
        }
      }, { status: 500 });
    }
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      message: error.message,
      code: error.code,
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    
    console.log(`[TEST-EMAIL] Sending test email to ${email}`);
    
    const result = await sendWelcomeEmail(
      email,
      'TEST-HASŁO-123',
      'Testowe Szkolenie'
    );
    
    return NextResponse.json({
      status: 'success',
      message: `Test email sent to ${email}`,
      messageId: result.messageId,
    });
  } catch (error: any) {
    console.error('[TEST-EMAIL] Error:', error);
    return NextResponse.json({
      status: 'error',
      message: error.message,
      code: error.code,
    }, { status: 500 });
  }
}
