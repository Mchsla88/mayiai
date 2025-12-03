'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Circle, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VisualSlideContent } from './visual-slide-content';
import type { Slide } from '@/lib/content-parser';

interface SlideViewProps {
  slides: Slide[];
  onComplete?: () => void;
  startIndex?: number;
}

export function SlideView({ slides, onComplete, startIndex = 0 }: SlideViewProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(startIndex);
  const [direction, setDirection] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAutoReadEnabled, setIsAutoReadEnabled] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const currentSlide = slides[currentSlideIndex];

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthesisRef.current = window.speechSynthesis;
    }
  }, []);

  // Auto-read when slide changes (if enabled)
  useEffect(() => {
    if (isAutoReadEnabled && currentSlide) {
      readSlideContent();
    }
    return () => {
      stopReading();
    };
  }, [currentSlideIndex, isAutoReadEnabled]);

  const readSlideContent = () => {
    if (!speechSynthesisRef.current || !currentSlide) return;

    // Stop any ongoing speech
    stopReading();

    // Clean the content from markdown formatting
    const cleanContent = cleanMarkdown(currentSlide.content);
    const textToRead = `${currentSlide.title}. ${cleanContent}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'pl-PL'; // Polish language
    utterance.rate = 0.9; // Slightly slower for better comprehension
    utterance.pitch = 1.1; // Slightly higher pitch for child-friendly tone
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesisRef.current.speak(utterance);
  };

  const stopReading = () => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleAutoRead = () => {
    const newState = !isAutoReadEnabled;
    setIsAutoReadEnabled(newState);
    if (!newState) {
      stopReading();
    }
  };

  const cleanMarkdown = (text: string): string => {
    return text
      .replace(/#{1,6}\s/g, '') // Remove headers
      .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold
      .replace(/\*(.+?)\*/g, '$1') // Remove italic
      .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links but keep text
      .replace(/`(.+?)`/g, '$1') // Remove code formatting
      .replace(/^[-*+]\s/gm, '') // Remove list markers
      .replace(/^\d+\.\s/gm, '') // Remove numbered list markers
      .replace(/\n{2,}/g, '. ') // Replace multiple newlines with period
      .replace(/\n/g, ' ') // Replace single newlines with space
      .trim();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentSlideIndex > 0) {
        goToPreviousSlide();
      } else if (e.key === 'ArrowRight' && currentSlideIndex < slides.length - 1) {
        goToNextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, slides.length]);

  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setDirection(1);
      setCurrentSlideIndex((prev) => prev + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setDirection(-1);
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlideIndex ? 1 : -1);
    setCurrentSlideIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  if (!currentSlide) return null;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slide Content */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 },
          }}
          className="absolute inset-0 flex flex-col"
        >
          {/* Slide Background with Gradient */}
          <div
            className={`flex-1 bg-gradient-to-br ${currentSlide.backgroundColor} p-8 md:p-12 overflow-y-auto relative`}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
              <div className="absolute top-10 left-10 text-9xl">{currentSlide.icon}</div>
              <div className="absolute bottom-10 right-10 text-9xl rotate-12">
                {currentSlide.icon}
              </div>
            </div>

            {/* Content Container */}
            <div className="relative max-w-5xl mx-auto">
              {/* Slide Header */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-8 text-center"
              >
                <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-4">
                  <span className="text-4xl">{currentSlide.icon}</span>
                  <span className="text-sm font-medium text-gray-600">
                    Slajd {currentSlideIndex + 1} z {slides.length}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {currentSlide.title}
                </h2>
              </motion.div>

              {/* Slide Content */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-white"
              >
                <VisualSlideContent 
                  slide={currentSlide}
                  slideNumber={currentSlideIndex + 1}
                  totalSlides={slides.length}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-6 z-10">
        {/* Previous Button */}
        <Button
          onClick={goToPreviousSlide}
          disabled={currentSlideIndex === 0}
          variant="secondary"
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg bg-white/90 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group relative"
              aria-label={`Przejdź do slajdu ${index + 1}`}
            >
              <Circle
                className={`h-3 w-3 transition-all duration-300 ${
                  index === currentSlideIndex
                    ? 'fill-orange-500 text-orange-500 scale-125'
                    : 'text-gray-300 hover:text-orange-300 hover:scale-110'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Next Button */}
        <Button
          onClick={goToNextSlide}
          variant="secondary"
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg bg-orange-500 hover:bg-orange-600 text-white"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gray-200/50 z-10">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentSlideIndex + 1) / slides.length) * 100}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Keyboard Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs text-gray-600 shadow-lg"
      >
        ⌨️ Użyj strzałek ← → do nawigacji
      </motion.div>

      {/* Text-to-Speech Controls */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-20 right-4 flex flex-col gap-2"
      >
        {/* Auto-read Toggle */}
        <Button
          onClick={toggleAutoRead}
          size="lg"
          variant={isAutoReadEnabled ? "default" : "secondary"}
          className={`rounded-full w-14 h-14 shadow-lg transition-all ${
            isAutoReadEnabled 
              ? 'bg-orange-500 hover:bg-orange-600 text-white' 
              : 'bg-white/90 hover:bg-white'
          }`}
          title={isAutoReadEnabled ? "Wyłącz automatyczne czytanie" : "Włącz automatyczne czytanie"}
        >
          {isAutoReadEnabled ? (
            <Volume2 className={`h-6 w-6 ${isSpeaking ? 'animate-pulse' : ''}`} />
          ) : (
            <VolumeX className="h-6 w-6" />
          )}
        </Button>

        {/* Manual Read Button (only show when auto-read is off) */}
        {!isAutoReadEnabled && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <Button
              onClick={readSlideContent}
              size="lg"
              variant="secondary"
              className="rounded-full w-14 h-14 shadow-lg bg-white/90 hover:bg-white"
              title="Przeczytaj ten slajd"
            >
              <Volume2 className={`h-6 w-6 text-blue-600 ${isSpeaking ? 'animate-pulse' : ''}`} />
            </Button>
          </motion.div>
        )}

        {/* Speaking Indicator */}
        {isSpeaking && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow-lg font-medium"
          >
            🔊 Czytam...
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
