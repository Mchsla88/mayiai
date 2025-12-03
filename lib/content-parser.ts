import fs from 'fs';
import path from 'path';

export interface Slide {
  id: string;
  title: string;
  content: string;
  backgroundColor: string;
  icon: string;
}

const SLIDE_BACKGROUNDS = [
  'from-orange-100 via-amber-50 to-yellow-50',
  'from-blue-100 via-cyan-50 to-sky-50',
  'from-green-100 via-emerald-50 to-teal-50',
  'from-purple-100 via-pink-50 to-rose-50',
  'from-yellow-100 via-orange-50 to-amber-50',
  'from-rose-100 via-pink-50 to-purple-50',
  'from-teal-100 via-blue-50 to-cyan-50',
  'from-indigo-100 via-purple-50 to-pink-50',
];

const SLIDE_ICONS = ['🌟', '💡', '🎯', '🚀', '✨', '🎨', '📚', '🔥', '🌈', '⭐', '🛡️', '👨‍👩‍👧', '💬', '📖', '🤖'];

/**
 * Robust function to get raw content for a chapter
 */
export async function getChapterContent(chapterNum: number): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'trainings', 'mlody-influencer-content.md');
    
    if (!fs.existsSync(filePath)) {
      console.error(`Content file not found at: ${filePath}`);
      return '';
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Flexible regex to find chapter start
    // Matches: "### Rozdział 1:", "### Rozdział 1.", "### Rozdział 1 "
    const chapterRegex = new RegExp(`^###\\s+Rozdział\\s+${chapterNum}[:.]?\\s*(.*)$`, 'm');
    const match = content.match(chapterRegex);
    
    if (!match) {
      console.warn(`Chapter ${chapterNum} not found in content file.`);
      return '';
    }

    const chapterStart = match.index!;
    
    // Find the next chapter or appendices to determine end
    const nextChapterRegex = new RegExp(`^###\\s+Rozdział\\s+${chapterNum + 1}[:.]?|^##\\s+Załączniki`, 'm');
    const nextMatch = content.substring(chapterStart + 1).match(nextChapterRegex);
    
    let chapterEnd;
    if (nextMatch) {
      chapterEnd = chapterStart + 1 + nextMatch.index!;
    } else {
      // If no next chapter, look for end of file or some other marker
      // Assuming appendices is at the end, if not found, take rest of file
      const appendicesStart = content.indexOf('## Załączniki', chapterStart);
      chapterEnd = appendicesStart !== -1 ? appendicesStart : content.length;
    }

    return content.substring(chapterStart, chapterEnd).trim();
  } catch (error) {
    console.error('Error reading chapter content:', error);
    return '';
  }
}

/**
 * SIMPLIFIED & ROBUST LOGIC: Split chapter into slides
 * Instead of complex AI-like grouping, we use deterministic structural splitting.
 */
export async function getChapterSlides(chapterNum: number): Promise<Slide[]> {
  const content = await getChapterContent(chapterNum);
  
  if (!content) {
    // Return a fallback slide instead of empty array to avoid 404s if possible
    return [{
      id: `chapter-${chapterNum}-error`,
      title: `Rozdział ${chapterNum}`,
      content: "Treść tego rozdziału jest w trakcie przygotowania lub wystąpił błąd podczas ładowania.",
      backgroundColor: SLIDE_BACKGROUNDS[0],
      icon: '⚠️'
    }];
  }

  const slides: Slide[] = [];
  let slideCounter = 0;

  // Remove the main chapter title from the content to avoid it being the first slide
  // The regex matches the first line which is the chapter title
  const contentBody = content.replace(/^###\s+Rozdział\s+\d+[:.]?.*$/m, '').trim();

  // Split by lower level headings (####, #####) or double newlines if no headings
  // We want to create a new slide for every significant section
  
  // Strategy:
  // 1. Split by headings (####)
  // 2. If a section is too long, split by paragraphs
  
  const sections = contentBody.split(/^(?=#{4,6}\s)/m);

  for (const section of sections) {
    if (!section.trim()) continue;

    // Check if section is too long (e.g. > 1500 chars), if so split by paragraphs
    if (section.length > 1500) {
      const paragraphs = section.split(/\n\n+/);
      let currentChunk = '';
      
      for (const p of paragraphs) {
        if ((currentChunk + p).length > 1000) {
           if (currentChunk) {
             addSlide(slides, currentChunk, chapterNum, slideCounter++);
             currentChunk = '';
           }
        }
        currentChunk += p + '\n\n';
      }
      if (currentChunk) {
        addSlide(slides, currentChunk, chapterNum, slideCounter++);
      }
    } else {
      addSlide(slides, section, chapterNum, slideCounter++);
    }
  }

  // Fallback if no slides were created
  if (slides.length === 0) {
    addSlide(slides, contentBody, chapterNum, slideCounter++);
  }
  
  return slides;
}

function addSlide(slides: Slide[], content: string, chapterNum: number, index: number) {
  // Extract a title from the content
  let title = 'Treść';
  let cleanContent = content.trim();

  // Check if content starts with a heading
  const headingMatch = cleanContent.match(/^(#{4,6})\s+(.+)$/m);
  if (headingMatch && cleanContent.indexOf(headingMatch[0]) === 0) {
    title = headingMatch[2];
    // Remove the heading from content to avoid duplication
    cleanContent = cleanContent.substring(headingMatch[0].length).trim();
  } else {
    // Try to find a bold text at start
    const boldMatch = cleanContent.match(/^\*\*(.+?)\*\*/);
    if (boldMatch) {
      title = boldMatch[1];
    } else {
      // Use first few words
      title = cleanContent.split('\n')[0].substring(0, 40).replace(/[^\w\spl]/gi, '') + '...';
    }
  }

  slides.push({
    id: `chapter-${chapterNum}-slide-${index + 1}`,
    title: title,
    content: cleanContent,
    backgroundColor: SLIDE_BACKGROUNDS[index % SLIDE_BACKGROUNDS.length],
    icon: SLIDE_ICONS[index % SLIDE_ICONS.length],
  });
}

// Keep existing helpers for compatibility
export async function getIntroductionContent(): Promise<string> {
  // Simplified implementation
  try {
     const filePath = path.join(process.cwd(), 'public', 'trainings', 'mlody-influencer-content.md');
     if (!fs.existsSync(filePath)) return '';
     const content = fs.readFileSync(filePath, 'utf-8');
     const match = content.match(/## Wstęp(.*?)(?=## Część I)/s);
     return match ? match[1].trim() : '';
  } catch (e) { return ''; }
}

export async function getAppendicesContent(): Promise<string> {
   try {
     const filePath = path.join(process.cwd(), 'public', 'trainings', 'mlody-influencer-content.md');
     if (!fs.existsSync(filePath)) return '';
     const content = fs.readFileSync(filePath, 'utf-8');
     const match = content.match(/## Załączniki(.*)/s);
     return match ? match[1].trim() : '';
  } catch (e) { return ''; }
}

export async function getIntroductionSlides(): Promise<Slide[]> {
  const content = await getIntroductionContent();
  if (!content) return [];
  // Reuse the logic (simplified)
  return [{
      id: 'intro-1',
      title: 'Wstęp',
      content: content,
      backgroundColor: SLIDE_BACKGROUNDS[0],
      icon: '👋'
  }];
}

export async function getChapterSlideCount(chapterNum: number): Promise<number> {
  const slides = await getChapterSlides(chapterNum);
  return slides.length;
}
