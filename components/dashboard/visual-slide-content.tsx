'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Star, Clock, Sparkles, Shield, Heart, Zap, Award, BookOpen, Users } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Slide } from '@/lib/content-parser';

interface VisualSlideContentProps {
  slide: Slide;
  slideNumber: number;
  totalSlides: number;
}

// Tool/Platform Detection Maps
const AI_TOOLS = {
  'Scratch': { logo: '/ai-tools/scratch-logo.png', url: 'https://scratch.mit.edu', color: 'from-orange-400 to-orange-600' },
  'Canva': { logo: '/ai-tools/canva-logo.png', url: 'https://www.canva.com', color: 'from-blue-400 to-purple-600' },
  'Notion': { logo: '/ai-tools/notion-logo.png', url: 'https://www.notion.so', color: 'from-gray-700 to-black' },
  'Storybird': { logo: '/ai-tools/storybird-logo.png', url: 'https://storybird.com', color: 'from-teal-400 to-blue-500' },
  'Pixton': { logo: '/ai-tools/pixton-logo.png', url: 'https://www.pixton.com', color: 'from-red-400 to-pink-600' },
  'TinkerCAD': { logo: '/ai-tools/tinkercad-logo.png', url: 'https://www.tinkercad.com', color: 'from-blue-500 to-cyan-500' },
  'Tinkercad': { logo: '/ai-tools/tinkercad-logo.png', url: 'https://www.tinkercad.com', color: 'from-blue-500 to-cyan-500' },
  'Roblox Studio': { logo: '/ai-tools/roblox-studio-logo.png', url: 'https://www.roblox.com/create', color: 'from-red-500 to-red-700' },
  'AI Dungeon': { logo: '/ai-tools/ai-dungeon-logo.png', url: 'https://play.aidungeon.io', color: 'from-purple-500 to-indigo-600' },
};

const PLATFORMS = {
  'YouTube': { logo: '/platform-logos/youtube.png', url: 'https://www.youtube.com', color: 'from-red-500 to-red-700' },
  'TikTok': { logo: '/platform-logos/tiktok.png', url: 'https://www.tiktok.com', color: 'from-black to-gray-800' },
  'Instagram': { logo: '/platform-logos/instagram.png', url: 'https://www.instagram.com', color: 'from-purple-500 to-pink-500' },
  'Facebook': { logo: '/platform-logos/facebook.png', url: 'https://www.facebook.com', color: 'from-blue-600 to-blue-800' },
  'Twitter': { logo: '/platform-logos/twitter.png', url: 'https://i.pinimg.com/736x/a4/7b/9c/a47b9c37b03dc2a9fea7f1afebf4a5df.jpg', color: 'from-blue-400 to-blue-600' },
  'LinkedIn': { logo: '/platform-logos/linkedin.png', url: 'https://www.linkedin.com', color: 'from-blue-700 to-blue-900' },
  'Pinterest': { logo: '/platform-logos/pinterest.png', url: 'https://www.pinterest.com', color: 'from-red-600 to-red-800' },
  'Snapchat': { logo: '/platform-logos/snapchat.png', url: 'https://www.snapchat.com', color: 'from-yellow-400 to-yellow-600' },
};

const ILLUSTRATIONS = [
  { keywords: ['bezpiecz', 'ochrona', 'prywatność', 'hasło', 'dane'], image: '/illustrations/digital-safety.png', icon: '🛡️' },
  { keywords: ['internet', 'sieć', 'online', 'www'], image: '/illustrations/exploring-internet.png', icon: '🌐' },
  { keywords: ['tworzeni', 'kreaty', 'projekt', 'pomysł'], image: '/illustrations/content-creation.png', icon: '🎨' },
  { keywords: ['narzędzi', 'aplikacj', 'program', 'ai'], image: '/illustrations/creative-tools.png', icon: '🛠️' },
  { keywords: ['rodzic', 'mama', 'tata', 'opiekun'], image: '/illustrations/parent-child-together.png', icon: '👪' },
  { keywords: ['nauka', 'nauki', 'ucz się', 'szkoła'], image: '/illustrations/learning-progress.png', icon: '📚' },
  { keywords: ['social media', 'media społecznościowe', 'post'], image: '/illustrations/social-media-fun.png', icon: '📱' },
  { keywords: ['historia', 'opowiadanie', 'story'], image: '/illustrations/storytelling.png', icon: '📖' },
  { keywords: ['wideo', 'film', 'nagrywanie'], image: '/illustrations/video-recording.png', icon: '🎥' },
  { keywords: ['zespół', 'współpraca', 'razem'], image: '/illustrations/teamwork-collaboration.png', icon: '🤝' },
  { keywords: ['osiągnięci', 'sukces', 'nagroda'], image: '/illustrations/achievement-trophy.png', icon: '🏆' },
  { keywords: ['gra', 'zabawa', 'gaming'], image: '/illustrations/gaming-fun.png', icon: '🎮' },
];

export function VisualSlideContent({ slide, slideNumber, totalSlides }: VisualSlideContentProps) {
  const [detectedTools, setDetectedTools] = useState<typeof AI_TOOLS[keyof typeof AI_TOOLS][]>([]);
  const [detectedPlatforms, setDetectedPlatforms] = useState<typeof PLATFORMS[keyof typeof PLATFORMS][]>([]);
  const [relevantIllustration, setRelevantIllustration] = useState<string | null>(null);
  const [illustrationIcon, setIllustrationIcon] = useState<string>('✨');

  useEffect(() => {
    const content = (slide.title + ' ' + slide.content).toLowerCase();

    // Detect AI Tools
    const tools = Object.entries(AI_TOOLS)
      .filter(([name]) => content.includes(name.toLowerCase()))
      .map(([, tool]) => tool);
    setDetectedTools(tools);

    // Detect Platforms
    const platforms = Object.entries(PLATFORMS)
      .filter(([name]) => content.includes(name.toLowerCase()))
      .map(([, platform]) => platform);
    setDetectedPlatforms(platforms);

    // Detect Relevant Illustration
    for (const illustration of ILLUSTRATIONS) {
      if (illustration.keywords.some(keyword => content.includes(keyword))) {
        setRelevantIllustration(illustration.image);
        setIllustrationIcon(illustration.icon);
        break;
      }
    }
  }, [slide]);

  // Check if content has bold text (tool mentions)
  const hasBoldText = slide.content.includes('**');

  return (
    <div className="space-y-6">
      {/* Hero Illustration - if found */}
      {relevantIllustration && (
        <div className="relative w-full h-48 md:h-64 rounded-2xl overflow-hidden shadow-xl mb-6">
          <Image
            src={relevantIllustration}
            alt={slide.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <div className="flex items-center gap-3">
              <span className="text-5xl">{illustrationIcon}</span>
              <h3 className="text-2xl font-bold text-white">{slide.title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Tools Section - if detected */}
      {detectedTools.length > 0 && (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-4 border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <h4 className="text-xl font-bold text-purple-900">Narzędzia AI w tym slajdzie:</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {detectedTools.map((tool, idx) => (
              <a
                key={idx}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-400"
              >
                <div className="relative h-16 mb-2">
                  <Image
                    src={tool.logo}
                    alt="Tool logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex items-center justify-center gap-1 text-sm text-purple-600 group-hover:text-purple-800">
                  <span className="font-medium">Otwórz</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Platforms Section - if detected */}
      {detectedPlatforms.length > 0 && (
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-4 border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-6 w-6 text-blue-600" />
            <h4 className="text-xl font-bold text-blue-900">Platformy społecznościowe:</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {detectedPlatforms.map((platform, idx) => (
              <a
                key={idx}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-400"
              >
                <div className="relative h-12 mb-2">
                  <Image
                    src={platform.logo}
                    alt="Platform logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex items-center justify-center gap-1 text-sm text-blue-600 group-hover:text-blue-800">
                  <ExternalLink className="h-3 w-3" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Main Content - enhanced markdown rendering */}
      {/* CRITICAL: No list rendering here - each list item is its own slide */}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Star className="h-8 w-8 text-yellow-500" />
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-orange-500" />
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                {children}
              </h3>
            ),
            strong: ({ children }) => {
              const text = String(children);
              const toolMatch = Object.entries(AI_TOOLS).find(([name]) => text === name);
              const platformMatch = Object.entries(PLATFORMS).find(([name]) => text === name);

              if (toolMatch || platformMatch) {
                const match = (toolMatch || platformMatch)!;
                const logo = match[1].logo;
                const name = match[0];
                return (
                  <span className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-pink-100 px-3 py-1 rounded-full mx-1 font-bold text-orange-700 border-2 border-orange-300">
                    <div className="relative w-5 h-5">
                      <Image src={logo} alt={name} fill className="object-contain" />
                    </div>
                    {children}
                  </span>
                );
              }
              return <strong className="font-bold text-orange-600">{children}</strong>;
            },
            p: ({ children }) => (
              <p className="text-gray-700 leading-relaxed mb-4 text-lg">{children}</p>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-xl my-4 italic">
                <div className="flex items-start gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>{children}</div>
                </div>
              </blockquote>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1 font-medium"
              >
                {children}
                <ExternalLink className="h-4 w-4" />
              </a>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-6 rounded-xl shadow-lg">
                <table className="min-w-full border-collapse bg-white">{children}</table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">{children}</thead>
            ),
            th: ({ children }) => (
              <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider border-b-2 border-orange-600">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-6 py-4 text-gray-700 border-b border-gray-200">{children}</td>
            ),
            code: ({ children, className }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="bg-gray-100 text-pink-600 px-2 py-1 rounded font-mono text-sm">
                    {children}
                  </code>
                );
              }
              return (
                <code className={`${className} block bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto font-mono text-sm`}>
                  {children}
                </code>
              );
            },
            // CRITICAL: Disable list rendering since each list item is its own slide
            ul: ({ children }) => <div className="space-y-2">{children}</div>,
            ol: ({ children }) => <div className="space-y-2">{children}</div>,
            li: ({ children }) => (
              <div className="text-gray-700 text-lg leading-relaxed">
                {children}
              </div>
            ),
          }}
        >
          {slide.content}
        </ReactMarkdown>
      </div>

      {/* Info Boxes Detection */}
      {slide.content.includes('ℹ️') && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-4 border-blue-300 shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h4 className="text-xl font-bold text-blue-900">Ważna informacja</h4>
          </div>
        </div>
      )}
    </div>
  );
}
