
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { InstagramClient } from '@/lib/instagram/client';
import { InstagramProcessor } from '@/lib/instagram/processor';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token) {
    console.log('[InstagramWebhook] Verifying webhook...');
    
    // Check if any config matches this verify token
    const config = await prisma.instagramConfig.findFirst({
      where: { verifyToken: token }
    });

    if (config) {
        console.log('[InstagramWebhook] Verified!');
        return new NextResponse(challenge, { status: 200 });
    } else {
        console.log('[InstagramWebhook] Invalid verify token');
        return new NextResponse('Forbidden', { status: 403 });
    }
  }

  return new NextResponse('Bad Request', { status: 400 });
}

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-hub-signature-256');
    const body = await req.text();

    // Verify signature using App Secret (from Env)
    // Note: This secret is the "App Secret" from Meta App Basic Settings
    const appSecret = process.env.INSTAGRAM_APP_SECRET;

    if (!appSecret) {
        console.error('[InstagramWebhook] INSTAGRAM_APP_SECRET not set');
        return new NextResponse('Server Configuration Error', { status: 500 });
    }

    if (!signature || !InstagramClient.verifySignature(body, signature, appSecret)) {
        console.warn('[InstagramWebhook] Invalid signature');
        return new NextResponse('Forbidden', { status: 403 });
    }

    const event = JSON.parse(body);

    // Process event asynchronously to return 200 OK quickly to Meta
    // In serverless, we should ideally await it or use background jobs. 
    // Vercel might kill the process if we don't await, so we await.
    // Ideally we'd use a queue (QStash etc), but for now await is safer than fire-and-forget in lambda.
    await InstagramProcessor.processEvent(event);

    return new NextResponse('EVENT_RECEIVED', { status: 200 });
  } catch (error) {
    console.error('[InstagramWebhook] Error processing event:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
