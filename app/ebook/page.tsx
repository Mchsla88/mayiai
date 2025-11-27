'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BookOpen, Lock, ChevronRight, CheckCircle } from 'lucide-react'

export default function EbookPage() {
  const { data: session, status } = useSession() || {}
  const router = useRouter()
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/ebook')
      return
    }

    // Fetch subscription
    fetch('/api/user/subscription')
      .then(res => res.json())
      .then(data => {
        setSubscription(data.subscription)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [status, router])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ładowanie...</p>
        </div>
      </div>
    )
  }

  const hasActiveSubscription = subscription?.status === 'ACTIVE'

  // Sample chapters
  const chapters = [
    { id: 1, title: 'Wprowadzenie: Czym jest AI?', duration: '10 min' },
    { id: 2, title: 'Bezpieczeństwo i Prywatność', duration: '15 min' },
    { id: 3, title: 'AI w Nauce - Matematyka', duration: '20 min' },
    { id: 4, title: 'AI w Nauce - Języki Obce', duration: '18 min' },
    { id: 5, title: 'Kreatywne Wykorzystanie AI', duration: '25 min' },
    { id: 6, title: 'Kontrola Rodzicielska', duration: '12 min' },
    { id: 7, title: 'Najlepsze Narzędzia AI dla Dzieci', duration: '22 min' },
    { id: 8, title: 'Etyka i Odpowiedzialność', duration: '15 min' },
  ]

  if (!hasActiveSubscription) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <Lock className="w-20 h-20 text-gray-300 mx-auto" />
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">Dostęp Zablokowany</h1>
                <p className="text-lg text-gray-600">
                  Aby czytać ebooka, musisz najpierw go kupić
                </p>
              </div>
              <Card className="border-2 border-blue-200">
                <CardContent className="pt-6 space-y-4">
                  <h2 className="text-2xl font-bold">AI dla Rodziny - Kompletny Przewodnik</h2>
                  <div className="text-4xl font-bold text-blue-600">50 PLN</div>
                  <p className="text-gray-600">Dostęp na 12 miesięcy</p>
                  <Button asChild size="lg" className="w-full">
                    <Link href="/ebooki">
                      Kup teraz
                      <ChevronRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600">
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">Twój Ebook</span>
              </div>
              <h1 className="text-4xl font-bold">
                AI dla Rodziny - Kompletny Przewodnik
              </h1>
              <p className="text-lg text-gray-600">
                Bezpieczna nauka AI dla dzieci i rodziców - krok po kroku
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Dostęp do: {subscription.endDate ? new Date(subscription.endDate).toLocaleDateString('pl-PL') : 'N/A'}</span>
                <span>•</span>
                <span>{chapters.length} rozdziałów</span>
              </div>
            </div>

            {/* Chapters List */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold mb-6">Spis Treści</h2>
              {chapters.map((chapter) => (
                <Card key={chapter.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-blue-600">{chapter.id}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{chapter.title}</h3>
                          <p className="text-sm text-gray-600">{chapter.duration} czytania</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Info Box */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Aktualizacje Treści</h3>
                    <p className="text-sm text-gray-700">
                      Ten ebook jest regularnie aktualizowany o nowe treści i materiały. 
                      Wszystkie aktualizacje są dostępne bez dodatkowych opłat przez cały 
                      okres Twojej subskrypcji.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
