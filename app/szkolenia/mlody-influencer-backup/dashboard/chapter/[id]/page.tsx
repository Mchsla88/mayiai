import { notFound } from 'next/navigation';
import { chapters } from '@/lib/course-data';
import { getChapterSlides } from '@/lib/content-parser';
import { ChapterView } from './chapter-view';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return chapters.map((chapter) => ({
    id: chapter.id,
  }));
}

interface ChapterPageProps {
  params: Promise<{ id: string }>;
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const resolvedParams = await params;
  const chapter = chapters.find((c) => c?.id === resolvedParams?.id);

  if (!chapter) {
    notFound();
  }

  // Extract chapter number from id (e.g., "chapter-1" -> 1)
  const chapterNum = parseInt(chapter.id.split('-')[1]);

  // Get slides from markdown file
  const slides = await getChapterSlides(chapterNum);

  return <ChapterView chapter={chapter} slides={slides} />;
}
