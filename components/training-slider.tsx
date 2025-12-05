'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { BookOpen, Users, Shield, Award, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const trainings = [
  {
    id: 1,
    title: 'Nauka z AI',
    icon: BookOpen,
    description: 'Jak wykorzystać AI do efektywnej nauki i odrabiania lekcji.',
    color: 'from-blue-400 to-blue-600',
    image: '/training-dzieci.jpg',
    href: '/szkolenia/dzieci',
    price: 200
  },
  {
    id: 2,
    title: 'Poradnik AI dla Nauczycieli',
    icon: Users,
    description: 'Narzędzia i metody dla nowoczesnych pedagogów.',
    color: 'from-purple-400 to-purple-600',
    image: '/training-nauczyciele.jpg',
    href: '/szkolenia/nauczyciele',
    price: 100
  },
  {
    id: 3,
    title: 'Bezpieczeństwo w AI',
    icon: Shield,
    description: 'Ochrona danych i bezpieczne korzystanie z technologii.',
    color: 'from-green-400 to-green-600',
    image: '/training-rodzice.jpg',
    href: '/szkolenia/bezpieczenstwo-w-sieci-i-ai',
    price: 50
  },
  {
    id: 4,
    title: 'Młody Influencer',
    icon: Award,
    description: 'Poradnik dla przyszłych twórców internetowych.',
    color: 'from-orange-400 to-orange-600',
    image: '/training-influencer.jpg',
    href: '/szkolenia/mlody-influencer',
    price: 100
  }
]

export function TrainingSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const constraintsRef = useRef(null)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % trainings.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + trainings.length) % trainings.length)
  }

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (hoveredIndex === null) {
        handleNext()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [hoveredIndex])

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nasze <span className="text-purple-600">Szkolenia AI</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Kompleksowe programy edukacyjne dla dzieci, rodziców i nauczycieli
          </p>
        </motion.div>

        {/* 3D Carousel Container */}
        <div className="relative h-[600px] flex items-center justify-center">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 z-30 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 flex items-center justify-center group"
            aria-label="Previous training"
          >
            <ChevronLeft className="w-6 h-6 text-purple-600 group-hover:text-purple-700" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 z-30 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 flex items-center justify-center group"
            aria-label="Next training"
          >
            <ChevronRight className="w-6 h-6 text-purple-600 group-hover:text-purple-700" />
          </button>

          {/* 3D Cards */}
          <div className="relative w-full h-full flex items-center justify-center perspective-[2000px]">
            {trainings.map((training, index) => {
              const IconComponent = training.icon
              const offset = (index - currentIndex + trainings.length) % trainings.length
              const isCurrent = offset === 0
              const isNext = offset === 1
              const isPrev = offset === trainings.length - 1
              const isVisible = isCurrent || isNext || isPrev
              const isHovered = hoveredIndex === index

              // Calculate 3D position
              let x = 0
              let z = 0
              let rotateY = 0
              let scale = 1
              let opacity = 1

              if (isCurrent) {
                x = 0
                z = 0
                rotateY = 0
                scale = isHovered ? 1.05 : 1
                opacity = 1
              } else if (isNext) {
                x = 60
                z = -200
                rotateY = -25
                scale = 0.85
                opacity = 0.7
              } else if (isPrev) {
                x = -60
                z = -200
                rotateY = 25
                scale = 0.85
                opacity = 0.7
              } else {
                opacity = 0
                scale = 0.5
                z = -400
              }

              return (
                <motion.div
                  key={training.id}
                  className="absolute w-full max-w-sm"
                  initial={false}
                  animate={{
                    x: `${x}%`,
                    z,
                    rotateY,
                    scale,
                    opacity,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                    mass: 1,
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    pointerEvents: isVisible ? 'auto' : 'none',
                  }}
                  onClick={() => {
                    if (!isCurrent) {
                      setCurrentIndex(index)
                    }
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <motion.div
                    className={`bg-white rounded-2xl shadow-2xl border-2 ${
                      isCurrent ? 'border-purple-300' : 'border-gray-100'
                    } overflow-hidden cursor-pointer transform-gpu`}
                    whileHover={isCurrent ? { y: -5 } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image Header */}
                    <div className={`h-72 bg-gradient-to-br ${training.color} relative flex items-center justify-center overflow-hidden`}>
                      <div className="absolute inset-0 bg-white/10" />
                      <motion.div
                        className="relative w-full h-full"
                        animate={isCurrent && isHovered ? { scale: 1.05 } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={training.image}
                          alt={training.title}
                          fill
                          className="object-cover drop-shadow-2xl"
                        />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-br ${training.color} rounded-full flex items-center justify-center shadow-lg`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {training.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 mb-6 min-h-[3rem]">
                        {training.description}
                      </p>

                      {/* Pricing */}
                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <div className="text-3xl font-bold text-gray-900">{training.price} zł</div>
                        <div className="text-sm font-semibold text-purple-600">12 miesięcy dostępu</div>
                      </div>

                      {/* CTA Button */}
                      <Button
                        asChild
                        className={`w-full bg-gradient-to-r ${training.color} text-white hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50`}
                        disabled={!isCurrent}
                      >
                        <Link href={isCurrent ? training.href : '#'}>
                          {isCurrent ? 'Zobacz szczegóły' : 'Kliknij aby wybrać'}
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            {trainings.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-purple-600 w-8'
                    : 'bg-purple-200 hover:bg-purple-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
