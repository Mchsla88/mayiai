'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { GraduationCap, ArrowRight, ShoppingCart, Lock, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

interface Training {
  id: string
  slug: string
  title: string
  shortDescription: string
  imageUrl: string | null
  price: number
  hasAccess: boolean
  expiresAt?: string
  comingSoon?: boolean
}

function SzkoleniaContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [trainings, setTrainings] = useState<Training[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState<string | null>(null)

  useEffect(() => {
    // Remove authentication check to allow guests to view offer
    // if (status === 'unauthenticated') {
    //   router.push('/auth/login')
    //   return
    // }

    fetchTrainings()

    // Check for payment success
    if (searchParams.get('status') === 'success') {
      toast.success('Płatność zakończona sukcesem! Dostęp został przyznany.')
      // Remove query param
      router.replace('/szkolenia')
    }
  }, [status, router, searchParams])

  const fetchTrainings = async () => {
    try {
      const response = await fetch('/api/trainings', { cache: 'no-store' })
      if (response.ok) {
        const data = await response.json()
        setTrainings(data)
      }
    } catch (error) {
      console.error('Error fetching trainings:', error)
      toast.error('Nie udało się pobrać listy szkoleń')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePurchase = async (trainingId: string) => {
    // If not authenticated, redirect to login
    if (status === 'unauthenticated') {
      toast.info('Zaloguj się, aby dokonać zakupu')
      router.push('/auth/login?callbackUrl=/szkolenia')
      return
    }

    try {
      setIsProcessing(trainingId)
      const response = await fetch('/api/payu/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trainingId }),
      })

      const data = await response.json()

      if (response.ok && data.redirectUri) {
        window.location.href = data.redirectUri
      } else {
        toast.error(data.error || 'Wystąpił błąd podczas inicjowania płatności')
      }
    } catch (error) {
      console.error('Purchase error:', error)
      toast.error('Wystąpił błąd połączenia')
    } finally {
      setIsProcessing(null)
    }
  }

  // Show loading
  if (status === 'loading' && !trainings.length) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Ładowanie...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
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
              Centrum Szkoleniowe
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {session?.user ? `Witaj, ${session.user.name || session.user.email?.split('@')[0]}!` : 'Wybierz swoją ścieżkę rozwoju'}
            </h1>
            <p className="text-xl text-gray-600">
              {session?.user 
                ? `Masz dostęp do ${trainings.filter(t => t.hasAccess).length} szkoleń`
                : 'Zaloguj się, aby uzyskać dostęp do swoich szkoleń lub wybierz kurs z oferty poniżej.'
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {trainings.map((training, index) => (
              <motion.div
                key={training.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full border-2 transition-all hover:shadow-xl group flex flex-col ${
                  training.hasAccess 
                    ? 'border-green-200 hover:border-green-400' 
                    : 'border-purple-200 hover:border-purple-400'
                }`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        training.hasAccess 
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                          : 'bg-gradient-to-br from-purple-500 to-pink-500'
                      }`}>
                        {training.hasAccess ? (
                           <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                           <Lock className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        training.hasAccess 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {training.hasAccess ? '✓ Dostęp aktywny' : `${training.price} PLN`}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{training.title}</CardTitle>
                    <CardDescription>{training.shortDescription}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    {training.hasAccess ? (
                      <Link href={`/szkolenia/${training.slug}`}>
                        <Button className="w-full bg-green-600 hover:bg-green-700 transition-all">
                          Przejdź do szkolenia
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    ) : training.comingSoon ? (
                      <Button 
                        disabled
                        className="w-full bg-gray-200 text-gray-400 cursor-not-allowed"
                      >
                        Wkrótce
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handlePurchase(training.id)}
                        disabled={isProcessing === training.id}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 group-hover:shadow-lg transition-all"
                      >
                        {isProcessing === training.id ? (
                          <>Przetwarzanie...</>
                        ) : (
                          <>
                            Kup teraz
                            <ShoppingCart className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </Button>
                    )}
                  </CardContent>
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

export default function SzkoleniaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <SzkoleniaContent />
    </Suspense>
  )
}
