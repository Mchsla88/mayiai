'use client';

import { useEffect, useState } from 'react';
import { DashboardNavbar } from '@/components/dashboard/navbar';
import { SlideView } from '@/components/dashboard/slide-view';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Slide } from '@/lib/content-parser';

export default function IntroPage() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch intro slides from API
    fetch('/api/intro-slides')
      .then(res => res.json())
      .then(data => {
        setSlides(data.slides || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading intro:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-yellow-50 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <Sparkles className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <p className="text-xl text-gray-600">Ładowanie wstępu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-yellow-50">
      <DashboardNavbar />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-4 justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Wstęp</h1>
              <p className="text-lg text-gray-600">Witaj w świecie kreatywności! ✨</p>
            </div>
          </div>
        </motion.div>

        {slides.length > 0 && (
          <SlideView
            slides={slides}
            onComplete={() => {
              // Navigate to next chapter when intro is completed
              window.location.href = '/szkolenia/mlody-influencer/dashboard/chapter/chapter-1';
            }}
          />
        )}
      </main>
    </div>
  );
}
