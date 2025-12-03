
import { NextResponse } from 'next/server';
import { getChapterSlides } from '@/lib/content-parser';

export async function GET() {
  try {
    const slides = await getChapterSlides(1);
    return NextResponse.json({ success: true, count: slides.length, slides: slides.slice(0, 1) });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
