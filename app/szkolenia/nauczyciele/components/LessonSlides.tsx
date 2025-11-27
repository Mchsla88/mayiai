
'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Monitor, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Slide {
  title: string
  content: React.ReactNode
  type: 'intro' | 'activity' | 'discussion' | 'summary' | 'info'
}

interface LessonSlidesProps {
  title: string
  slides: Slide[]
}

export function LessonSlides({ title, slides }: LessonSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mode, setMode] = useState<'teacher' | 'student'>('teacher')

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1)
    }
  }

  const slide = slides[currentSlide]

  const getSlideColor = (type: Slide['type']) => {
    switch (type) {
      case 'intro': return 'bg-purple-50 border-purple-200 text-purple-900'
      case 'activity': return 'bg-green-50 border-green-200 text-green-900'
      case 'discussion': return 'bg-blue-50 border-blue-200 text-blue-900'
      case 'summary': return 'bg-orange-50 border-orange-200 text-orange-900'
      default: return 'bg-gray-50 border-gray-200 text-gray-900'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header / Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border shadow-sm">
        <div>
          <h3 className="font-bold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">Slajd {currentSlide + 1} z {slides.length}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setMode(mode === 'teacher' ? 'student' : 'teacher')}
            className="hidden md:flex gap-2"
          >
            {mode === 'teacher' ? <Monitor className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
            {mode === 'teacher' ? 'Tryb Nauczyciela' : 'Tryb Ucznia'}
          </Button>
        </div>
      </div>

      {/* Slide Area */}
      <div className="relative min-h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-8 md:p-12 h-full flex flex-col"
          >
            {/* Slide Header */}
            <div className={`mb-8 p-4 rounded-xl border-l-4 ${getSlideColor(slide.type)}`}>
              <span className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1 block">
                {slide.type === 'intro' && 'Wprowadzenie'}
                {slide.type === 'activity' && 'Ćwiczenie'}
                {slide.type === 'discussion' && 'Dyskusja'}
                {slide.type === 'summary' && 'Podsumowanie'}
                {slide.type === 'info' && 'Wiedza'}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold">{slide.title}</h2>
            </div>

            {/* Slide Content */}
            <div className={`flex-1 prose prose-lg max-w-none ${mode === 'student' ? 'text-xl' : ''}`}>
              {slide.content}
            </div>

            {/* Teacher Notes (Only in Teacher Mode) */}
            {mode === 'teacher' && (
              <div className="mt-8 pt-6 border-t border-dashed border-gray-300">
                <p className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">Wskazówki dla Nauczyciela</p>
                <p className="text-sm text-gray-600 italic">
                  Pamiętaj, aby dać uczniom czas na zastanowienie się przed przejściem dalej.
                  Obserwuj reakcje klasy.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent flex justify-between items-end">
          <Button 
            variant="ghost" 
            onClick={prevSlide} 
            disabled={currentSlide === 0}
            className="hover:bg-gray-100"
          >
            <ChevronLeft className="w-6 h-6 mr-2" />
            Poprzedni
          </Button>

          {/* Progress Dots */}
          <div className="flex gap-2 mb-3">
            {slides.map((_, idx) => (
              <div 
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-purple-600 w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button 
            onClick={nextSlide} 
            disabled={currentSlide === slides.length - 1}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6"
          >
            Dalej
            <ChevronRight className="w-6 h-6 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
