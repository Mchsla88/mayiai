'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { GraduationCap, ArrowRight, ShoppingCart, Star, Clock, BarChart } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { useCart } from '@/context/cart-context'

interface Training {
  id: string
  slug: string
  title: string
  shortDescription: string
  imageUrl: string | null
  price: number
  hasAccess: boolean
  expiresAt?: string
  level?: string
  duration?: string
}

function OfertaContent() {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [trainings, setTrainings] = useState<Training[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    fetchTrainings()

    if (searchParams.get('status') === 'success') {
      toast.success('Płatność zakończona sukcesem! Dostęp został przyznany.')
      router.replace('/szkolenia')
    }
  }, [searchParams, router])

  const fetchTrainings = async () => {
    try {
      const response = await fetch('/api/trainings', { cache: 'no-store' })
      if (response.ok) {
        const data = await response.json()
        setTrainings(data)
      }
    } catch (error) {
      console.error('Error fetching trainings:', error)
      toast.error('Nie udało się pobrać oferty')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToCart = (training: Training) => {
    addItem({
      id: training.id,
      title: training.title,
      price: Number(training.price),
      imageUrl: training.imageUrl,
      slug: training.slug
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Ładowanie oferty...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              Oferta Szkoleniowa
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Rozwijaj się z May I AI
            </h1>
            <p className="text-xl text-gray-600">
              Praktyczne szkolenia, które pomogą Ci zrozumieć i wykorzystać sztuczną inteligencję.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {trainings.map((training, index) => (
              <motion.div
                key={training.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden flex flex-col group">
                  <Link href={`/oferta/${training.slug}`} className="flex-1 flex flex-col cursor-pointer">
                    {/* Thumbnail */}
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      {training.imageUrl ? (
                        <Image 
                          src={training.imageUrl} 
                          alt={training.title} 
                          fill 
                          className="object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
                          <GraduationCap className="w-16 h-16 text-white/80" />
                        </div>
                      )}
                      {training.hasAccess && (
                        <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                          POSIADASZ DOSTĘP
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                          <BarChart className="w-3 h-3" />
                          {training.level || 'Średniozaawansowany'}
                        </span>
                        <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                          <Clock className="w-3 h-3" />
                          {training.duration || '4h 30m'}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {training.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                        {training.shortDescription}
                      </p>

                      <div className="flex items-center gap-1 text-yellow-400 mb-4">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-gray-400 text-xs ml-1">(5.0)</span>
                      </div>

                      <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-100">
                        <div>
                          <div className="text-xs text-gray-400 line-through">
                            {(Number(training.price) * 1.2).toFixed(0)} zł
                          </div>
                          <div className="text-2xl font-bold text-purple-600">
                            {training.price} zł
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Link>

                  <CardFooter className="p-6 pt-0">
                    {training.hasAccess ? (
                      <Link href={`/szkolenia/${training.slug}`} className="w-full">
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          Przejdź do szkolenia
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    ) : (
                      <div className="flex gap-2 w-full">
                        <Button 
                          onClick={() => handleAddToCart(training)}
                          variant="outline"
                          className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50"
                        >
                          Do koszyka
                        </Button>
                        <Button 
                          onClick={() => {
                            handleAddToCart(training)
                            router.push('/koszyk')
                          }}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          Kup teraz
                        </Button>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function OfertaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <OfertaContent />
    </Suspense>
  )
}
