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
 * Extract content for a specific chapter from course.md
 */
export async function getChapterContent(chapterNum: number): Promise<string> {
  const filePath = path.join(process.cwd(), 'public', 'content', 'course.md');
  const content = fs.readFileSync(filePath, 'utf-8');

  // Find the chapter heading
  const chapterRegex = new RegExp(`^### Rozdział ${chapterNum}:(.+?)$`, 'm');
  const match = content.match(chapterRegex);
  
  if (!match) {
    console.error(`Chapter ${chapterNum} not found`);
    return '';
  }

  const chapterStart = match.index!;
  
  // Find the next chapter or appendices
  const nextChapterRegex = new RegExp(`^### Rozdział ${chapterNum + 1}:|^## Załączniki`, 'm');
  const nextMatch = content.substring(chapterStart + 1).match(nextChapterRegex);
  
  const chapterEnd = nextMatch 
    ? chapterStart + 1 + nextMatch.index!
    : content.indexOf('## Załączniki', chapterStart);

  if (chapterEnd === -1 || chapterEnd <= chapterStart) {
    // This is the last chapter before appendices or the projects chapter
    return content.substring(chapterStart);
  }

  return content.substring(chapterStart, chapterEnd);
}

/**
 * COMPLETELY NEW LOGIC: Split chapter into READABLE, BEAUTIFUL slides
 * - Group 2-4 paragraphs together
 * - Keep stories and dialogs together
 * - Group lists 5-8 items per slide
 * - Target 600-1200 characters per slide
 */
export async function getChapterSlides(chapterNum: number): Promise<Slide[]> {
  const content = await getChapterContent(chapterNum);
  
  if (!content) {
    return [];
  }

  const slides: Slide[] = [];
  
  // Remove chapter title
  const contentWithoutTitle = content.replace(/^###\s+Rozdział\s+\d+:[^\n]+\n/, '');
  
  // Split into blocks (paragraphs, lists, headings)
  const blocks = parseIntoBlocks(contentWithoutTitle);
  
  // Group blocks into slides intelligently
  const groupedSlides = groupBlocksIntoSlides(blocks, chapterNum);
  
  return groupedSlides;
}

interface ContentBlock {
  type: 'heading' | 'paragraph' | 'list' | 'story' | 'dialog' | 'quote' | 'empty';
  content: string;
  level?: number; // For headings (4, 5, 6)
  items?: string[]; // For lists
}

/**
 * Parse content into structured blocks
 */
function parseIntoBlocks(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const lines = content.split('\n');
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (!line) {
      i++;
      continue;
    }
    
    // HEADING (####, #####, ######)
    const headingMatch = line.match(/^(#{4,6})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: 'heading',
        content: headingMatch[2],
        level: headingMatch[1].length
      });
      i++;
      continue;
    }
    
    // LIST (bullet or numbered)
    if (line.match(/^[\*\-•]\s+/) || line.match(/^\d+\.\s+/)) {
      const listItems: string[] = [];
      
      while (i < lines.length) {
        const listLine = lines[i].trim();
        const bulletMatch = listLine.match(/^[\*\-•]\s+(.+)$/);
        const numberMatch = listLine.match(/^\d+\.\s+(.+)$/);
        
        if (bulletMatch) {
          listItems.push(bulletMatch[1]);
          i++;
        } else if (numberMatch) {
          listItems.push(numberMatch[1]);
          i++;
        } else if (!listLine) {
          i++; // Skip empty line within list
          continue;
        } else {
          break; // End of list
        }
      }
      
      blocks.push({
        type: 'list',
        content: listItems.join('\n'),
        items: listItems
      });
      continue;
    }
    
    // STORY or DIALOG - collect multi-line content
    if (line.startsWith('**Historia') || line.startsWith('**Dialog') || line.includes('**Mama:**') || line.includes('**Dziecko:**')) {
      const storyLines: string[] = [line];
      i++;
      
      // Collect until empty line or new section
      while (i < lines.length) {
        const nextLine = lines[i].trim();
        if (!nextLine) {
          // Check if really end or just spacing
          if (i + 1 < lines.length && lines[i + 1].trim().startsWith('**')) {
            storyLines.push(lines[i]);
            i++;
            continue;
          }
          break;
        }
        if (nextLine.match(/^#{4,6}\s+/)) {
          break; // New heading
        }
        storyLines.push(lines[i]);
        i++;
      }
      
      const storyContent = storyLines.join('\n').trim();
      blocks.push({
        type: line.startsWith('**Historia') ? 'story' : 'dialog',
        content: storyContent
      });
      continue;
    }
    
    // REGULAR PARAGRAPH - collect until empty line
    const paragraphLines: string[] = [line];
    i++;
    
    while (i < lines.length) {
      const nextLine = lines[i].trim();
      if (!nextLine || nextLine.match(/^#{4,6}\s+/) || nextLine.match(/^[\*\-•\d]/) || nextLine.startsWith('**')) {
        break;
      }
      paragraphLines.push(lines[i]);
      i++;
    }
    
    blocks.push({
      type: 'paragraph',
      content: paragraphLines.join('\n').trim()
    });
  }
  
  return blocks;
}

/**
 * Extract smart title from content
 */
function extractSmartTitle(content: string, defaultTitle: string = 'Treść'): string {
  // Remove markdown formatting
  const cleanContent = content.replace(/\*\*/g, '').replace(/\*/g, '');
  
  // Take first 50 characters, cut at last complete word
  const snippet = cleanContent.substring(0, 50).trim();
  const lastSpace = snippet.lastIndexOf(' ');
  
  if (lastSpace > 20) {
    return snippet.substring(0, lastSpace) + '...';
  }
  
  return snippet.length > 0 ? snippet + '...' : defaultTitle;
}

/**
 * Group blocks into slides with smart logic
 */
function groupBlocksIntoSlides(blocks: ContentBlock[], chapterNum: number): Slide[] {
  const slides: Slide[] = [];
  let slideCounter = 0;
  let currentTitle = '';
  let lastHeading = '';
  
  let i = 0;
  while (i < blocks.length) {
    const block = blocks[i];
    
    // HEADING - starts new slide context
    if (block.type === 'heading') {
      lastHeading = block.content;
      currentTitle = lastHeading;
      i++;
      continue;
    }
    
    // STORY or DIALOG - gets its own slide with smart title
    if (block.type === 'story' || block.type === 'dialog') {
      const slideTitle = lastHeading || extractSmartTitle(block.content, block.type === 'story' ? 'Historia' : 'Dialog');
      
      slides.push({
        id: `chapter-${chapterNum}-slide-${slideCounter + 1}`,
        title: slideTitle,
        content: block.content,
        backgroundColor: SLIDE_BACKGROUNDS[slideCounter % SLIDE_BACKGROUNDS.length],
        icon: block.type === 'story' ? '📚' : '💬',
      });
      slideCounter++;
      i++;
      continue;
    }
    
    // LIST - group 5-8 items per slide with smart title
    if (block.type === 'list' && block.items) {
      const items = block.items;
      const itemsPerSlide = 6;
      
      // Smart title for list
      const listTitle = lastHeading || extractSmartTitle(items[0], 'Lista');
      
      if (items.length <= 8) {
        // Small list - one slide
        const listContent = items.map((item, idx) => `${idx + 1}. ${item}`).join('\n\n');
        slides.push({
          id: `chapter-${chapterNum}-slide-${slideCounter + 1}`,
          title: listTitle,
          content: listContent,
          backgroundColor: SLIDE_BACKGROUNDS[slideCounter % SLIDE_BACKGROUNDS.length],
          icon: '📋',
        });
        slideCounter++;
      } else {
        // Large list - split into chunks
        for (let j = 0; j < items.length; j += itemsPerSlide) {
          const chunk = items.slice(j, j + itemsPerSlide);
          const chunkContent = chunk.map((item, idx) => `${j + idx + 1}. ${item}`).join('\n\n');
          slides.push({
            id: `chapter-${chapterNum}-slide-${slideCounter + 1}`,
            title: `${listTitle} (część ${Math.floor(j / itemsPerSlide) + 1})`,
            content: chunkContent,
            backgroundColor: SLIDE_BACKGROUNDS[slideCounter % SLIDE_BACKGROUNDS.length],
            icon: '📋',
          });
          slideCounter++;
        }
      }
      i++;
      continue;
    }
    
    // PARAGRAPHS - group 2-4 paragraphs or 600-1200 chars with smart title
    if (block.type === 'paragraph') {
      const groupedContent: string[] = [block.content];
      let charCount = block.content.length;
      let paragraphCount = 1;
      i++;
      
      // Look ahead and group paragraphs
      while (i < blocks.length && paragraphCount < 4 && charCount < 1200) {
        const nextBlock = blocks[i];
        
        // Stop at heading, story, dialog, or list
        if (nextBlock.type !== 'paragraph') {
          break;
        }
        
        groupedContent.push(nextBlock.content);
        charCount += nextBlock.content.length;
        paragraphCount++;
        i++;
        
        // If we have enough content, break
        if (charCount >= 600 && paragraphCount >= 2) {
          break;
        }
      }
      
      const fullContent = groupedContent.join('\n\n');
      const slideTitle = lastHeading || extractSmartTitle(fullContent);
      
      slides.push({
        id: `chapter-${chapterNum}-slide-${slideCounter + 1}`,
        title: slideTitle,
        content: fullContent,
        backgroundColor: SLIDE_BACKGROUNDS[slideCounter % SLIDE_BACKGROUNDS.length],
        icon: SLIDE_ICONS[slideCounter % SLIDE_ICONS.length],
      });
      slideCounter++;
      continue;
    }
    
    i++;
  }
  
  // If no slides created, return default
  if (slides.length === 0) {
    slides.push({
      id: `chapter-${chapterNum}-slide-1`,
      title: 'Treść',
      content: blocks.map(b => b.content).join('\n\n'),
      backgroundColor: SLIDE_BACKGROUNDS[0],
      icon: SLIDE_ICONS[0],
    });
  }
  
  return slides;
}

/**
 * Get introduction content
 */
export async function getIntroductionContent(): Promise<string> {
  const filePath = path.join(process.cwd(), 'public', 'content', 'course.md');
  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract content between "## Wstęp" and "## Część I:" (exact match with colon)
  const introStart = content.indexOf('## Wstęp');
  const introEnd = content.indexOf('## Część I:'); // Must include colon to avoid matching "Część II"

  if (introStart === -1 || introEnd === -1) {
    return '';
  }

  return content.substring(introStart, introEnd);
}

/**
 * Get appendices content
 */
export async function getAppendicesContent(): Promise<string> {
  const filePath = path.join(process.cwd(), 'public', 'content', 'course.md');
  const content = fs.readFileSync(filePath, 'utf-8');

  const appendicesStart = content.indexOf('## Załączniki');
  
  if (appendicesStart === -1) {
    return '';
  }

  return content.substring(appendicesStart);
}

/**
 * Get introduction slides with same smart grouping
 */
export async function getIntroductionSlides(): Promise<Slide[]> {
  const content = await getIntroductionContent();
  
  if (!content) {
    return [];
  }
  
  // Remove intro title
  const contentWithoutTitle = content.replace(/^##\s+Wstęp:[^\n]+\n/, '');
  
  // Parse and group
  const blocks = parseIntoBlocks(contentWithoutTitle);
  const slides = groupBlocksIntoSlides(blocks, 0); // 0 for intro
  
  return slides;
}

/**
 * Count slides for a specific chapter (for metadata display)
 */
export async function getChapterSlideCount(chapterNum: number): Promise<number> {
  try {
    const slides = await getChapterSlides(chapterNum);
    return slides.length;
  } catch (error) {
    console.error(`Error counting slides for chapter ${chapterNum}:`, error);
    return 0;
  }
}
