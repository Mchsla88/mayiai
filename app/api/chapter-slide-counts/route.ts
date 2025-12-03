import { NextResponse } from 'next/server';
import { getChapterSlideCount } from '@/lib/content-parser';
import { chapters } from '@/lib/course-data-mlody';

// Cache the counts for 1 hour
let cachedCounts: Record<string, number> | null = null;
let cacheTime: number = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function GET() {
  try {
    // Return cached data if available and fresh
    const now = Date.now();
    if (cachedCounts && (now - cacheTime) < CACHE_DURATION) {
      return NextResponse.json({ success: true, counts: cachedCounts });
    }

    // Calculate slide counts for all chapters
    const counts: Record<string, number> = {};
    
    for (const chapter of chapters) {
      // Extract chapter number from id (e.g., "chapter-1" -> 1)
      const chapterNum = parseInt(chapter.id.split('-')[1]);
      const slideCount = await getChapterSlideCount(chapterNum);
      counts[chapter.id] = slideCount;
    }

    // Update cache
    cachedCounts = counts;
    cacheTime = now;

    return NextResponse.json({ success: true, counts });
  } catch (error) {
    console.error('Error counting chapter slides:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to count slides' },
      { status: 500 }
    );
  }
}
