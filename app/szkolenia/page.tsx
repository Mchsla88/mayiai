'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { GraduationCap, ArrowRight, CheckCircle, Lock } from 'lucide-react'
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
}

function SzkoleniaContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [trainings, setTrainings] = useState<Training[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirect unauthenticated users to oferta page
    if (status === 'unauthenticated') {
      router.push('/oferta')
      return
    }

    if (status === 'authenticated') {
      fetchTrainings()
    }
  }, [status, router])

  const fetchTrainings = async () => {
    try {
      const response = await fetch('/api/trainings', { cache: 'no-store' })
      if (response.ok) {
        const data = await response.json()
        // Filter only trainings with access
        setTrainings(data.filter((t: Training) => t.hasAccess))
      }
    } catch (error) {
      console.error('Error fetching trainings:', error)
      toast.error('Nie udało się pobrać listy szkoleń')
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading
  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Ładowanie Twoich szkoleń...</p>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
              <CheckCircle className="w-4 h-4" />
              Twoje Szkolenia
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Witaj, {session?.user?.name || 'Użytkowniku'}!
            </h1>
            <p className="text-xl text-gray-600">
              Oto lista Twoich aktywnych szkoleń. Wybierz kurs i kontynuuj naukę.
            </p>
          </motion.div>

          {trainings.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {trainings.map((training, index) => (
                <motion.div
                  key={training.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-xl group flex flex-col">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Dostęp aktywny
                        </div>
                      </div>
                      <CardTitle className="text-xl">{training.title}</CardTitle>
                      <CardDescription>{training.shortDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <Link href={`/szkolenia/${training.slug}`}>
                        <Button className="w-full bg-green-600 hover:bg-green-700 transition-all">
                          Przejdź do szkolenia
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-6">Nie masz jeszcze żadnych aktywnych szkoleń.</p>
              <Link href="/oferta">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600">
                  Zobacz ofertę szkoleń
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
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
