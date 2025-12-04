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
import { PurchaseDialog } from '@/components/purchase-dialog'

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

function OfertaContent() {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [trainings, setTrainings] = useState<Training[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [purchaseDialog, setPurchaseDialog] = useState<{
    isOpen: boolean
    trainingId: string
    trainingTitle: string
    trainingPrice: number
  }>({
    isOpen: false,
    trainingId: '',
    trainingTitle: '',
    trainingPrice: 0,
  })

  useEffect(() => {
    fetchTrainings()

    // Check for payment success
    if (searchParams.get('status') === 'success') {
      toast.success('Płatność zakończona sukcesem! Dostęp został przyznany.')
      router.replace('/szkolenia') // Redirect to dashboard after purchase
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

  const handlePurchase = (training: Training) => {
    setPurchaseDialog({
      isOpen: true,
      trainingId: training.id,
      trainingTitle: training.title,
      trainingPrice: Number(training.price),
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
              Oferta Szkoleniowa
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Inwestuj w swoją przyszłość z AI
            </h1>
            <p className="text-xl text-gray-600">
              Wybierz szkolenie dopasowane do Twoich potrzeb i rozpocznij naukę już dziś.
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
                <Card className="h-full border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-xl group flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-white" />
                      </div>
                      <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {training.price} PLN
                      </div>
                    </div>
                    <CardTitle className="text-xl">{training.title}</CardTitle>
                    <CardDescription>{training.shortDescription}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    {/* Image placeholder if needed, currently using icon */}
                    
                    {training.hasAccess ? (
                      <Link href={`/szkolenia/${training.slug}`}>
                        <Button className="w-full bg-green-600 hover:bg-green-700 transition-all">
                          Posiadasz dostęp - Przejdź
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        onClick={() => handlePurchase(training)}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 group-hover:shadow-lg transition-all"
                      >
                        Kup teraz
                        <ShoppingCart className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <PurchaseDialog
        isOpen={purchaseDialog.isOpen}
        onClose={() => setPurchaseDialog({ ...purchaseDialog, isOpen: false })}
        trainingId={purchaseDialog.trainingId}
        trainingTitle={purchaseDialog.trainingTitle}
        trainingPrice={purchaseDialog.trainingPrice}
      />

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
