'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { DashboardNavbar } from '@/components/dashboard/navbar';
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs';
import { SlideView } from '@/components/dashboard/slide-view';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  BookOpen,
  Home,
  X,
} from 'lucide-react';
import { Chapter, courseParts, chapters } from '@/lib/course-data';
import { Slide } from '@/lib/content-parser';
import { toast } from 'sonner';

interface ChapterViewProps {
  chapter: Chapter;
  slides: Slide[];
}

export function ChapterView({ chapter, slides }: ChapterViewProps) {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [showSlides, setShowSlides] = useState(false);
  const [startSlideIndex, setStartSlideIndex] = useState(0);

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('courseProgress');
    if (savedProgress) {
      try {
        const progressData = JSON.parse(savedProgress);
        const chapterProgress = progressData.find(
          (p: any) => p.chapterId === chapter.id
        );
        if (chapterProgress) {
          setIsCompleted(chapterProgress.completed || false);
          setProgress(chapterProgress.progress || 0);
        }
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, [chapter.id]);

  const markAsComplete = () => {
    setIsSaving(true);
    try {
      // Load existing progress
      const savedProgress = localStorage.getItem('courseProgress');
      let progressData = savedProgress ? JSON.parse(savedProgress) : [];

      // Update or add chapter progress
      const existingIndex = progressData.findIndex(
        (p: any) => p.chapterId === chapter.id
      );

      if (existingIndex >= 0) {
        progressData[existingIndex] = {
          chapterId: chapter.id,
          progress: 100,
          completed: true,
        };
      } else {
        progressData.push({
          chapterId: chapter.id,
          progress: 100,
          completed: true,
        });
      }

      // Save to localStorage
      localStorage.setItem('courseProgress', JSON.stringify(progressData));

      setIsCompleted(true);
      setProgress(100);
      toast.success('🎉 Rozdział ukończony! Sprawny z Ciebie!');

      // Check for achievements
      checkAchievements(progressData.length);
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Wystąpił błąd podczas zapisywania postępu');
    } finally {
      setIsSaving(false);
    }
  };

  const checkAchievements = (completedCount: number) => {
    const savedAchievements = localStorage.getItem('unlockedAchievements');
    let achievements = savedAchievements ? JSON.parse(savedAchievements) : [];
    
    // Check for new achievements
    if (completedCount === 1 && !achievements.find((a: any) => a.achievementId === 'first-step')) {
      achievements.push({ achievementId: 'first-step', unlockedAt: new Date().toISOString() });
      toast.success('🏆 Nowe osiągnięcie: Pierwszy Krok!');
    }
    
    if (completedCount === 3 && !achievements.find((a: any) => a.achievementId === 'three-chapters')) {
      achievements.push({ achievementId: 'three-chapters', unlockedAt: new Date().toISOString() });
      toast.success('🏆 Nowe osiągnięcie: Trzy Rozdziały!');
    }
    
    if (completedCount === 10 && !achievements.find((a: any) => a.achievementId === 'half-way')) {
      achievements.push({ achievementId: 'half-way', unlockedAt: new Date().toISOString() });
      toast.success('🏆 Nowe osiągnięcie: W Połowie Drogi!');
    }
    
    if (completedCount === 20 && !achievements.find((a: any) => a.achievementId === 'full-course')) {
      achievements.push({ achievementId: 'full-course', unlockedAt: new Date().toISOString() });
      toast.success('🏆 Nowe osiągnięcie: Pełny Kurs!');
    }
    
    localStorage.setItem('unlockedAchievements', JSON.stringify(achievements));
  };

  // Find the part this chapter belongs to
  const currentPart = courseParts.find(part => part.chapters.includes(parseInt(chapter.id.replace('chapter-', ''))));
  
  // Find next chapter
  const currentChapterIndex = chapters.findIndex(ch => ch.id === chapter.id);
  const nextChapter = currentChapterIndex >= 0 && currentChapterIndex < chapters.length - 1 
    ? chapters[currentChapterIndex + 1] 
    : null;

  const handleSlideComplete = () => {
    setShowSlides(false);
    markAsComplete();
  };

  // If showing slides, render fullscreen slide view
  if (showSlides) {
    return (
      <div className="fixed inset-0 z-50 bg-white">
        {/* Close Button */}
        <button
          onClick={() => setShowSlides(false)}
          className="absolute top-4 left-4 z-50 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          aria-label="Zamknij widok slajdów"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        {/* Chapter Info Badge */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{chapter?.icon || '📖'}</span>
            <div className="text-sm">
              <div className="font-bold text-gray-900">{chapter?.title}</div>
              <div className="text-gray-600">{slides.length} slajdów</div>
            </div>
          </div>
        </div>

        <SlideView slides={slides} onComplete={handleSlideComplete} startIndex={startSlideIndex} />
      </div>
    );
  }

  // Otherwise, show chapter overview
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-yellow-50">
      <DashboardNavbar />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Strona główna', href: '/dashboard', icon: <Home className="w-4 h-4" /> },
            { 
              label: `${currentPart?.icon || '📚'} ${currentPart?.title || 'Kurs'}`, 
              href: currentPart ? `/dashboard/part/${currentPart.id}` : '/dashboard'
            },
            { label: chapter?.title || 'Rozdział' },
          ]}
        />

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="rounded-2xl gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Wstecz
          </Button>
        </motion.div>

        {/* Chapter Overview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="p-8 md:p-12 rounded-3xl shadow-warm-lg bg-gradient-to-br from-orange-100 via-blue-100 to-purple-100 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200/30 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-200/30 to-transparent rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-gradient-warm rounded-3xl flex items-center justify-center text-5xl shadow-warm animate-float">
                  {chapter?.icon || '📖'}
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                    {chapter?.title || 'Rozdział'}
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    {chapter?.description || 'Poznaj nowe umiejętności'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-2xl">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Czas</div>
                    <div className="font-bold">{chapter?.estimatedTime || '15 min'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-2xl">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Slajdów</div>
                    <div className="font-bold">{slides.length}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-4 rounded-2xl">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className="font-bold">
                      {isCompleted ? 'Ukończono' : 'Do wykonania'}
                    </div>
                  </div>
                </div>
              </div>

              {!isCompleted && progress > 0 && (
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Postęp w rozdziale</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setShowSlides(true)}
                  size="lg"
                  className="flex-1 rounded-2xl gap-3 bg-gradient-warm text-white shadow-warm hover:shadow-warm-lg transition-smooth text-lg py-6"
                >
                  <ArrowRight className="w-5 h-5" />
                  {isCompleted ? 'Przejrzyj ponownie' : 'Rozpocznij rozdział'}
                </Button>

                {isCompleted && nextChapter && (
                  <Button
                    onClick={() => router.push(`/szkolenia/mlody-influencer/dashboard/chapter/${nextChapter.id}`)}
                    size="lg"
                    variant="outline"
                    className="rounded-2xl gap-3 text-lg py-6"
                  >
                    Następny rozdział
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Chapter Preview - Show first few slide titles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="text-3xl">📋</span>
            Czego się nauczysz
          </h2>
          <div className="grid gap-3">
            {slides.slice(0, 5).map((slide, index) => (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => {
                  setStartSlideIndex(index);
                  setShowSlides(true);
                }}
                className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md"
                >
                  {index + 1}
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{slide.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Kliknij, aby przejść do tego slajdu</p>
                </div>
                <motion.span 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-2xl"
                >
                  {slide.icon}
                </motion.span>
              </motion.div>
            ))}
            {slides.length > 5 && (
              <div className="text-center text-sm text-muted-foreground py-2">
                ... i jeszcze {slides.length - 5} slajdów więcej!
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
