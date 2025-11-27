'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BookOpen, Calendar, User, ShoppingCart, Clock } from 'lucide-react'

export default function DashboardPage() {
  const { data: session, status } = useSession() || {}
  const router = useRouter()
  const [subscription, setSubscription] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (status === 'unauthenticated') {
      router.push('/auth/login')
      return
    }

    // Fetch user subscription
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Panel użytkownika</h1>
                <p className="text-gray-600 mt-1">
                  Witaj, {session?.user?.name || session?.user?.email}!
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status konta</p>
                      <p className="text-lg font-semibold">Aktywne</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Zakupione ebooki</p>
                      <p className="text-lg font-semibold">
                        {hasActiveSubscription ? '1' : '0'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Członek od</p>
                      <p className="text-lg font-semibold">
                        {session?.user?.email ? new Date().toLocaleDateString('pl-PL', { year: 'numeric', month: 'short' }) : '-'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Ebooki */}
              <Card>
                <CardHeader>
                  <CardTitle>Twoje Ebooki</CardTitle>
                  <CardDescription>Zakupione materiały edukacyjne</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {hasActiveSubscription ? (
                    <div className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold">AI dla Rodziny - Kompletny Przewodnik</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Dostęp do: {subscription.endDate ? new Date(subscription.endDate).toLocaleDateString('pl-PL') : 'N/A'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          Aktywny
                        </div>
                      </div>
                      <Button asChild className="w-full">
                        <Link href="/ebook">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Czytaj ebooka
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8 space-y-4">
                      <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto" />
                      <p className="text-gray-600">Nie masz jeszcze żadnych ebooków</p>
                      <Button asChild>
                        <Link href="/ebooki">Przeglądaj ebooki</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Szkolenia */}
              <Card>
                <CardHeader>
                  <CardTitle>Szkolenia</CardTitle>
                  <CardDescription>Warsztaty i kursy online</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-8 space-y-4">
                    <Clock className="w-16 h-16 text-gray-300 mx-auto" />
                    <p className="text-gray-600">Wkrótce dostępne!</p>
                    <p className="text-sm text-gray-500">
                      Pracujemy nad nowymi szkoleniami AI dla dzieci i rodzin
                    </p>
                    <Button asChild variant="outline">
                      <Link href="/szkolenia">Zobacz więcej</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            {!hasActiveSubscription && (
              <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardContent className="py-8 text-center space-y-4">
                  <h2 className="text-2xl font-bold">Rozpocznij Naukę AI Już Dziś!</h2>
                  <p className="text-blue-100">
                    Kup naszego ebooka i zyskaj dostęp do wszystkich materiałów przez 12 miesięcy
                  </p>
                  <Button asChild size="lg" variant="secondary">
                    <Link href="/ebooki">
                      Kup ebooka za 50 PLN
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
