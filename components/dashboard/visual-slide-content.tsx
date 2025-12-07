'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Star, Sparkles, Shield, Zap, BookOpen, Quote } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
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

  // Framer Motion Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Hero Illustration - if found */}
      {relevantIllustration && (
        <motion.div variants={item} className="relative w-full h-48 md:h-72 rounded-3xl overflow-hidden shadow-2xl mb-8 group transform transition-transform hover:scale-[1.01]">
          <Image
            src={relevantIllustration}
            alt={slide.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
            <div className="flex items-center gap-4">
              <span className="text-6xl filter drop-shadow-md animate-bounce-slow">{illustrationIcon}</span>
              <div>
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg"
                >
                  {slide.title}
                </motion.h3>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tools Section - if detected */}
      {detectedTools.length > 0 && (
        <motion.div variants={item} className="bg-white/50 backdrop-blur-md rounded-3xl p-6 border border-purple-100 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 bg-purple-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-xl text-purple-600">
                <Sparkles className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-gray-800">Narzędzia AI w tym temacie:</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {detectedTools.map((tool, idx) => (
                <motion.a
                  key={idx}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-purple-50 flex flex-col items-center gap-3 text-center"
                >
                  <div className="relative h-16 w-full">
                    <Image
                      src={tool.logo}
                      alt="Tool logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-1.5 text-sm font-semibold text-purple-600 group-hover:text-purple-700 bg-purple-50 px-3 py-1 rounded-full group-hover:bg-purple-100 transition-colors">
                    <span>Otwórz</span>
                    <ExternalLink className="h-3 w-3" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Platforms Section - if detected */}
      {detectedPlatforms.length > 0 && (
        <motion.div variants={item} className="bg-white/50 backdrop-blur-md rounded-3xl p-6 border border-blue-100 shadow-xl relative overflow-hidden">
          <div className="absolute bottom-0 left-0 p-10 bg-blue-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-xl text-blue-600">
                <Zap className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-gray-800">Platformy:</h4>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {detectedPlatforms.map((platform, idx) => (
                <motion.a
                  key={idx}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-blue-50 flex flex-col items-center justify-center gap-3"
                >
                  <div className="relative h-12 w-12">
                    <Image
                      src={platform.logo}
                      alt="Platform logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-500 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                    Otwórz <ExternalLink className="h-3 w-3" />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <motion.div variants={item} className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-img:rounded-3xl prose-img:shadow-lg">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <div className="relative mb-6 mt-4">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-pink-500 rounded-full"></div>
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 m-0 pl-4 flex items-center gap-3">
                  <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
                  {children}
                </h1>
              </div>
            ),
            h2: ({ children }) => (
              <div className="bg-gradient-to-r from-orange-50 to-white p-4 rounded-xl border-l-4 border-orange-500 mb-4 mt-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 m-0 flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-orange-500" />
                  {children}
                </h2>
              </div>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-bold text-gray-700 mb-3 mt-6 flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 rounded-lg text-blue-600">
                  <Zap className="h-4 w-4" />
                </div>
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
                  <span className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full mx-1 font-bold text-gray-800 shadow-sm border border-gray-100 transform hover:scale-105 transition-transform cursor-default">
                    <div className="relative w-5 h-5">
                      <Image src={logo} alt={name} fill className="object-contain" />
                    </div>
                    {children}
                  </span>
                );
              }
              return <strong className="font-bold text-orange-600 bg-orange-50 px-1 rounded">{children}</strong>;
            },
            p: ({ children }) => (
              <p className="text-gray-600 leading-relaxed mb-4 text-lg">{children}</p>
            ),
            blockquote: ({ children }) => (
              <blockquote className="relative bg-blue-50/50 p-6 rounded-2xl border-l-4 border-blue-500 my-6 shadow-sm">
                <Quote className="absolute top-4 right-4 h-8 w-8 text-blue-100 rotate-180" />
                <div className="flex items-start gap-3 relative z-10">
                  <BookOpen className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="text-blue-900 font-medium italic text-lg">{children}</div>
                </div>
              </blockquote>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-3 py-1 rounded-lg inline-flex items-center gap-1.5 font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 no-underline mx-1"
              >
                {children}
                <ExternalLink className="h-3 w-3" />
              </a>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-8 rounded-2xl shadow-xl border border-gray-100">
                <table className="min-w-full bg-white">{children}</table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-700">{children}</thead>
            ),
            th: ({ children }) => (
              <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-500">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-6 py-4 text-gray-600 border-b border-gray-100">{children}</td>
            ),
            code: ({ children, className }) => {
              const isInline = !className;
              if (isInline) {
                return (
                  <code className="bg-gray-100 text-pink-600 px-2 py-0.5 rounded-md font-mono text-sm border border-gray-200">
                    {children}
                  </code>
                );
              }
              return (
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl opacity-20 blur group-hover:opacity-40 transition duration-1000"></div>
                  <code className={`${className} block bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto font-mono text-sm relative z-10 shadow-xl`}>
                    {children}
                  </code>
                </div>
              );
            },
            ul: ({ children }) => <ul className="space-y-3 my-4 list-none pl-0">{children}</ul>,
            ol: ({ children }) => <ol className="space-y-3 my-4 list-decimal pl-5 marker:text-orange-500 marker:font-bold">{children}</ol>,
            li: ({ children }) => (
              <li className="flex items-start gap-3 text-gray-700 text-lg group">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-orange-400 group-hover:scale-125 transition-transform flex-shrink-0" />
                <span className="leading-relaxed">{children}</span>
              </li>
            ),
          }}
        >
          {slide.content}
        </ReactMarkdown>
      </motion.div>

      {/* Info Boxes Detection */}
      {slide.content.includes('ℹ️') && (
        <motion.div variants={item} className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-1 shadow-xl">
          <div className="bg-white rounded-[22px] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl flex-shrink-0">
                <Shield className="h-8 w-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Zapamiętaj!</h4>
                <p className="text-gray-600">To jest kluczowa informacja dla tego tematu. Upewnij się, że dobrze ją rozumiesz.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
