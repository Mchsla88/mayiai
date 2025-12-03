import { NextRequest, NextResponse } from 'next/server';
import { getIntroductionSlides } from '@/lib/content-parser';

export async function GET(request: NextRequest) {
  try {
    const slides = await getIntroductionSlides();
    
    return NextResponse.json({
      success: true,
      slides,
      count: slides.length
    });
  } catch (error) {
    console.error('Error loading intro slides:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load intro slides' },
      { status: 500 }
    );
  }
}
