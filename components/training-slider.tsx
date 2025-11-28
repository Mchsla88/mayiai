'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, BookOpen, Users, Shield, Video, Star, Play, Award, Sparkles } from 'lucide-react'
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

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % trainings.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + trainings.length) % trainings.length)
  }

  const getSlideIndex = (offset: number) => {
    return (currentIndex + offset + trainings.length) % trainings.length
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto h-[600px] flex items-center justify-center overflow-hidden">
      {/* Navigation Buttons */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between z-30 px-4 pointer-events-none">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="pointer-events-auto bg-white/80 hover:bg-white rounded-full shadow-lg backdrop-blur-sm w-12 h-12"
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="pointer-events-auto bg-white/80 hover:bg-white rounded-full shadow-lg backdrop-blur-sm w-12 h-12"
        >
          <ChevronRight className="w-8 h-8" />
        </Button>
      </div>

      {/* Slider Track */}
      <div className="relative w-full h-full flex items-center justify-center perspective-1000">
        {[-1, 0, 1].map((offset) => {
          const index = getSlideIndex(offset)
          const training = trainings[index]
          const isCenter = offset === 0

          return (
            <motion.div
              key={`${training.id}-${offset}`}
              initial={{ 
                scale: 0.8,
                x: offset * 100 + '%',
                opacity: 0,
                zIndex: 0
              }}
              animate={{ 
                scale: isCenter ? 1 : 0.8,
                x: offset * 110 + '%', // Increased spacing
                opacity: isCenter ? 1 : 0.5,
                zIndex: isCenter ? 10 : 1,
                rotateY: offset * -25
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="absolute w-full max-w-md"
              style={{ 
                left: '50%',
                marginLeft: '-224px' // Half of max-w-md (448px)
              }}
            >
              <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden border-2 transition-all duration-300 ${
                isCenter ? 'border-purple-500/50 ring-4 ring-purple-500/20' : 'border-white/50 grayscale-[0.5]'
              } backdrop-blur-xl`}>
                <div className={`h-48 bg-gradient-to-br ${training.color} relative flex items-center justify-center`}>
                  <div className="relative w-40 h-40">
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
                  <p className="text-gray-600 line-clamp-2">
                    {training.description}
                  </p>
                  <Button 
                    asChild 
                    className={`w-full bg-gradient-to-r ${training.color} text-white hover:opacity-90 transition-opacity ${
                      !isCenter && 'pointer-events-none opacity-50'
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
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentIndex ? 'bg-purple-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
