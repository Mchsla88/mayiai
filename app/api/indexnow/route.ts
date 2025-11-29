import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Verify secret token from CMS (security)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CMS_WEBHOOK_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { urls } = body; // Array of changed URLs

  if (!urls || !Array.isArray(urls) || urls.length === 0) {
    return NextResponse.json({ error: 'Invalid URLs' }, { status: 400 });
  }

  // Prepare payload for IndexNow
  const payload = {
    host: 'mayiai.pl',
    key: process.env.INDEXNOW_KEY, // Key generated in Bing Webmaster Tools
    keyLocation: `https://mayiai.pl/${process.env.INDEXNOW_KEY}.txt`,
    urlList: urls,
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(`IndexNow success for ${urls.length} URLs`);
      return NextResponse.json({ success: true });
    } else {
      console.error('IndexNow failed', response.status);
      return NextResponse.json({ error: 'IndexNow API failed' }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
