'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Clock, 
  BarChart, 
  CheckCircle, 
  ShoppingCart, 
  ArrowRight,
  Star,
  ShieldCheck
} from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

interface Training {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  imageUrl: string | null
  price: any // Decimal or number
  duration: string
  level: string
  modulesCount?: number
  learningOutcomes?: string[]
  program?: {
    title: string;
    description: string;
    duration?: string;
  }[]
}

export function TrainingDetails({ training }: { training: Training }) {
  const { addItem } = useCart()
  const router = useRouter()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem({
      id: training.id,
      title: training.title,
      price: Number(training.price),
      imageUrl: training.imageUrl,
      slug: training.slug
    })
    setTimeout(() => setIsAdding(false), 500)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push('/koszyk')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Image and Key Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                {training.imageUrl ? (
                  <Image 
                    src={training.imageUrl} 
                    alt={training.title} 
                    fill 
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
                    <GraduationCap className="w-24 h-24 text-white/80" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 col-span-2">
                  <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Dostęp</div>
                    <div className="font-semibold">12 miesięcy</div>
                  </div>
                </div>
                {training.modulesCount && (
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3 col-span-2">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Liczba modułów</div>
                      <div className="font-semibold">{training.modulesCount} modułów lekcyjnych</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Learning Outcomes */}
              {training.learningOutcomes && training.learningOutcomes.length > 0 && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Czego się nauczysz?
                  </h3>
                  <ul className="space-y-3">
                    {training.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-600">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>

            {/* Right Column: Content and Actions */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  Bestseller
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{training.title}</h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {training.shortDescription}
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-6">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Cena regularna</div>
                    <div className="text-lg text-gray-400 line-through decoration-red-500">
                      {(Number(training.price) * 1.2).toFixed(0)} zł
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-600 font-bold mb-1">Oszczędzasz 20%</div>
                    <div className="text-4xl font-bold text-gray-900">
                      {Number(training.price)} zł
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button 
                    onClick={handleBuyNow}
                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-200"
                  >
                    Kup teraz
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    onClick={handleAddToCart}
                    variant="outline"
                    className="w-full h-12 text-lg border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    <ShoppingCart className="mr-2 w-5 h-5" />
                    {isAdding ? 'Dodano!' : 'Dodaj do koszyka'}
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 pt-4 border-t">
                  <ShieldCheck className="w-4 h-4" />
                  <span>30-dniowa gwarancja satysfakcji</span>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-gray-600">
                <h3 className="text-gray-900 font-bold text-xl mb-4">O tym szkoleniu</h3>
                <p className="whitespace-pre-line">{training.fullDescription}</p>
              </div>

              {/* Program */}
              {training.program && training.program.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">Program szkolenia</h3>
                  <div className="space-y-3">
                    {training.program.map((module, index) => (
                      <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 hover:border-purple-200 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-gray-900">{module.title}</h4>
                          {module.duration && (
                            <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {module.duration}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
