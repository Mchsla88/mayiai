'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DashboardNavbar } from '@/components/dashboard/navbar';
import { ProgressCard } from '@/components/dashboard/progress-card';
import { chapters, courseParts } from '@/lib/course-data';
import { motion } from 'framer-motion';

interface ChapterProgress {
  chapterId: string;
  progress: number;
  completed: boolean;
}

export default function DashboardPage() {
  const [progressData, setProgressData] = useState<ChapterProgress[]>([]);
  const [achievementsData, setAchievementsData] = useState<string[]>([]);

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('courseProgress');
    if (savedProgress) {
      try {
        setProgressData(JSON.parse(savedProgress));
      } catch (e) {
        console.error('Error parsing progress:', e);
        setProgressData([]);
      }
    }

    // Load achievements from localStorage
    const savedAchievements = localStorage.getItem('achievements');
    if (savedAchievements) {
      try {
        setAchievementsData(JSON.parse(savedAchievements));
      } catch (e) {
        console.error('Error parsing achievements:', e);
        setAchievementsData([]);
      }
    }
  }, []);

  const completedChapters = progressData.filter(p => p.completed).length;
  const totalChapters = chapters.length;
  const totalTime = Math.floor(completedChapters * 20); // Approximate
  const achievementsCount = achievementsData.length;

  const getChapterProgress = (chapterId: string) => {
    const chapterProgress = progressData.find(p => p.chapterId === chapterId);
    return chapterProgress?.progress || 0;
  };

  const isChapterCompleted = (chapterId: string) => {
    const chapterProgress = progressData.find(p => p.chapterId === chapterId);
    return chapterProgress?.completed || false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-yellow-50">
      <DashboardNavbar />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 h-[200px] md:h-[300px]"
        >
          <Image
            src="/influencer-hero.png"
            alt="Młody Influencer Studio"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 text-white">
              Witaj, młody twórco! 🎉
            </h1>
            <p className="text-lg md:text-xl text-gray-200 font-medium">
              Gotowy na kolejną przygodę w świecie kreatywności?
            </p>
          </div>
        </motion.div>

        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <ProgressCard
            completedChapters={completedChapters}
            totalChapters={totalChapters}
            totalTime={totalTime}
            achievementsCount={achievementsCount}
          />
        </motion.div>

        {/* Wstęp */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">
            ✨ Wstęp: Witaj w Świecie Kreatywności!
          </h2>
          <Link href="/szkolenia/mlody-influencer/dashboard/intro">
            <div className="bg-white rounded-3xl p-6 shadow-warm hover:shadow-warm-lg transition-smooth cursor-pointer max-w-md">
              <div className="w-12 h-12 bg-gradient-warm rounded-2xl flex items-center justify-center mb-4 shadow-warm">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Wstęp</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Dlaczego twoje pomysły są wyjątkowe i czym jest bycie młodym influencerem
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>⏱️ 10 min</span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Course Parts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">
            📚 Części Kursu
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {courseParts.map((part, index) => (
              <Link key={part.id} href={`/szkolenia/mlody-influencer/dashboard/part/${part.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-white rounded-3xl p-6 shadow-warm hover:shadow-warm-lg transition-smooth cursor-pointer h-full"
                >
                  <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center mb-4 shadow-warm relative">
                    <Image 
                      src={part.icon} 
                      alt={part.title}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                      CZĘŚĆ {part.id}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {part.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {part.chapters.length} {part.chapters.length === 1 ? 'rozdział' : 'rozdziały'}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-orange-600">
                    <span>Rozpocznij →</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Załączniki */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">
            📎 Załączniki
          </h2>
          <Link href="/szkolenia/mlody-influencer/dashboard/appendices">
            <div className="bg-white rounded-3xl p-6 shadow-warm hover:shadow-warm-lg transition-smooth cursor-pointer max-w-md">
              <div className="w-12 h-12 bg-gradient-blue rounded-2xl flex items-center justify-center mb-4 shadow-warm">
                <span className="text-2xl">📎</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Załączniki</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Pełna lista narzędzi AI, szablony, 100+ promptów, checklisty i więcej
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>⏱️ Materiały pomocnicze</span>
              </div>
            </div>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
