'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BookOpen, Users, Shield, Play, Award } from 'lucide-react'
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
    href: '/szkolenia/bezpieczenstwo-w-sieci-i-ai'
  },
  {
    id: 4,
    title: 'Młody Influencer',
    icon: Award,
    description: 'Budowanie marki osobistej i tworzenie contentu z AI.',
    color: 'from-orange-400 to-orange-600',
    image: '/dog-5.png',
    href: '/szkolenia/mlody-influencer'
  }
]

export function TrainingSlider() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {trainings.map((training, index) => {
            const IconComponent = training.icon
            return (
              <motion.div
                key={training.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-purple-300 overflow-hidden h-full flex flex-col">
                  {/* Image Header */}
                  <div className={`h-48 bg-gradient-to-br ${training.color} relative flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/10" />
                    <div className="relative w-32 h-32 transition-transform duration-500 group-hover:scale-110">
                      <Image
                        src={training.image}
                        alt={training.title}
                        fill
                        className="object-contain drop-shadow-xl"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-4 flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${training.color} rounded-full flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {training.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-6 flex-1">
                      {training.description}
                    </p>

                    {/* Pricing */}
                    <div className="mb-4 pb-4 border-b border-gray-200">
                      <div className="text-3xl font-bold text-gray-900">100 zł</div>
                      <div className="text-sm font-semibold text-purple-600">12 miesięcy dostępu</div>
                    </div>

                    {/* CTA Button */}
                    <Button 
                      asChild 
                      className={`w-full bg-gradient-to-r ${training.color} text-white hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg`}
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
      </div>
    </section>
  )
}
