'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, BookOpen, Users, Shield, Video, Award, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const trainings = [
  {
    id: 1,
    title: 'Łatwa Szkoła z AI',
    icon: BookOpen,
    description: 'Jak wykorzystać AI do efektywnej nauki i odrabiania lekcji.',
    color: 'from-blue-400 to-blue-600',
    image: '/dog-1.png',
    href: '/szkolenia/dzieci'
  },
  {
    id: 2,
    title: 'Nauczyciel z AI',
    icon: Users,
    description: 'Narzędzia i metody dla nowoczesnych pedagogów.',
    color: 'from-purple-400 to-purple-600',
    image: '/dog-2.png',
    href: '/szkolenia/nauczyciele'
  },
  {
    id: 3,
    title: 'Bezpieczeństwo w AI',
    icon: Shield,
    description: 'Ochrona danych i bezpieczne korzystanie z technologii.',
    color: 'from-green-400 to-green-600',
    image: '/dog-3.png',
    href: '#'
  },
  {
    id: 4,
    title: 'Filmy/ Zdjecia z AI',
    icon: Play,
    description: 'Tworzenie kreatywnych treści multimedialnych z pomocą AI.',
    color: 'from-pink-400 to-pink-600',
    image: '/dog-4.png',
    href: '#'
  },
  {
    id: 5,
    title: 'Młody Influencer',
    icon: Award,
    description: 'Budowanie marki osobistej i tworzenie contentu z AI.',
    color: 'from-orange-400 to-orange-600',
    image: '/dog-5.png',
    href: '#'
  }
]

export function TrainingSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % trainings.length)
  }, [])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + trainings.length) % trainings.length)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlay, nextSlide])

  const getSlideIndex = (offset: number) => {
    return (currentIndex + offset + trainings.length) % trainings.length
  }

  const visibleSlides = [-1, 0, 1].map(offset => {
    const index = getSlideIndex(offset)
    return { ...trainings[index], offset, key: trainings[index].id }
  })

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto h-[600px] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Navigation Buttons */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between z-30 px-4 pointer-events-none">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => { e.stopPropagation(); prevSlide(); }}
          className="pointer-events-auto bg-white/80 hover:bg-white rounded-full shadow-lg backdrop-blur-sm w-12 h-12 transition-transform hover:scale-110"
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => { e.stopPropagation(); nextSlide(); }}
          className="pointer-events-auto bg-white/80 hover:bg-white rounded-full shadow-lg backdrop-blur-sm w-12 h-12 transition-transform hover:scale-110"
        >
          <ChevronRight className="w-8 h-8" />
        </Button>
      </div>

      {/* Slider Track */}
      <div className="relative w-full h-full flex items-center justify-center perspective-1000">
        <AnimatePresence initial={false} mode="popLayout">
          {visibleSlides.map((training) => {
            const isCenter = training.offset === 0
            
            return (
              <motion.div
                key={training.key}
                layoutId={`slide-${training.id}`}
                initial={{ 
                  scale: 0.8,
                  x: direction > 0 ? '100%' : '-100%',
                  opacity: 0,
                  zIndex: 0,
                  rotateY: direction > 0 ? -25 : 25
                }}
                animate={{ 
                  scale: isCenter ? 1 : 0.8,
                  x: `${training.offset * 110}%`,
                  opacity: isCenter ? 1 : 0.5,
                  zIndex: isCenter ? 10 : 1,
                  rotateY: training.offset * -25
                }}
                exit={{ 
                  scale: 0.8,
                  x: direction > 0 ? '-100%' : '100%',
                  opacity: 0,
                  zIndex: 0,
                  rotateY: direction > 0 ? 25 : -25
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className="absolute w-full max-w-md left-1/2 -ml-[224px]"
              >
                <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden border-2 transition-all duration-300 ${
                  isCenter ? 'border-purple-500/50 ring-4 ring-purple-500/20' : 'border-white/50 grayscale-[0.5]'
                } backdrop-blur-xl h-full`}>
                  <div className={`h-48 bg-gradient-to-br ${training.color} relative flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/10" />
                    <div className="relative w-40 h-40 transition-transform duration-500 hover:scale-110">
                      <Image
                        src={training.image}
                        alt={training.title}
                        fill
                        className="object-contain drop-shadow-xl"
                      />
                    </div>
                  </div>
                  <div className="p-8 text-center space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {training.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 min-h-[3rem]">
                      {training.description}
                    </p>
                    <Button 
                      asChild 
                      className={`w-full bg-gradient-to-r ${training.color} text-white hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg ${
                        !isCenter ? 'pointer-events-none opacity-50' : ''
                      }`}
                    >
                      <Link href={training.href}>
                        Zobacz szczegóły
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {trainings.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1)
              setCurrentIndex(idx)
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-purple-600 w-8' : 'bg-gray-300 w-2 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
