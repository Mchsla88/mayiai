'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SimpleLoginForm } from '@/components/simple-login-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { GraduationCap, Clock, ArrowRight, Sparkles, Award, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

interface UserTraining {
  id: string
  slug: string
  title: string
  shortDescription: string
  imageUrl: string | null
  source: 'granted' | 'purchased'
  expiresAt?: string
}

export default function SzkoleniaPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [trainings, setTrainings] = useState<UserTraining[]>([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check local auth
    const localAuth = localStorage.getItem('main_training_auth')
    if (localAuth === 'true') {
      setIsAuthenticated(true)
      // Load hardcoded trainings for admin/local user
      setTrainings([
        {
          id: 'nauczyciele',
          slug: 'nauczyciele',
          title: 'Szkolenie dla Nauczycieli',
          shortDescription: 'Wykorzystanie AI w edukacji',
          imageUrl: null,
          source: 'granted'
        },
        {
          id: 'dzieci',
          slug: 'dzieci',
          title: 'Szkolenie dla Dzieci i Rodziców',
          shortDescription: 'Podstawy AI dla najmłodszych',
          imageUrl: null,
          source: 'granted'
        },
        {
          id: 'mlody-influencer',
          slug: 'mlody-influencer',
          title: 'Młody Influencer',
          shortDescription: 'Tworzenie contentu i budowanie marki osobistej z AI',
          imageUrl: null,
          source: 'granted'
        }
      ])
      setIsLoading(false)
      return
    }

    if (status === 'loading') return

    if (session?.user) {
      fetchUserTrainings()
    } else {
      setIsLoading(false)
    }
  }, [session, status])

  const fetchUserTrainings = async () => {
    try {
      const response = await fetch('/api/user/trainings', { cache: 'no-store' })
      if (response.ok) {
        const data = await response.json()
        setTrainings(data)
      }
    } catch (error) {
      console.error('Error fetching trainings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = () => {
    localStorage.setItem('main_training_auth', 'true')
    setIsAuthenticated(true)
    // Reload to apply state if needed, but state update should handle it
    // router.refresh() 
    // Manually trigger data load
    setTrainings([
        {
          id: 'nauczyciele',
          slug: 'nauczyciele',
          title: 'Szkolenie dla Nauczycieli',
          shortDescription: 'Wykorzystanie AI w edukacji',
          imageUrl: null,
          source: 'granted'
        },
        {
          id: 'dzieci',
          slug: 'dzieci',
          title: 'Szkolenie dla Dzieci i Rodziców',
          shortDescription: 'Podstawy AI dla najmłodszych',
          imageUrl: null,
          source: 'granted'
        },
        {
          id: 'mlody-influencer',
          slug: 'mlody-influencer',
          title: 'Młody Influencer',
          shortDescription: 'Tworzenie contentu i budowanie marki osobistej z AI',
          imageUrl: null,
          source: 'granted'
        }
      ])
  }

  // Show loading
  if (status === 'loading' || (session && isLoading)) {
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

  // Show login form for unauthenticated users
  if (!session && !isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-12">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Platforma Szkoleń AI
              </div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Twoje Szkolenia
              </h1>
              <p className="text-gray-600">
                Zaloguj się aby zobaczyć przypisane do Ciebie szkolenia
              </p>
            </div>
            <SimpleLoginForm 
              onLogin={handleLogin} 
              title="" 
            />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Show user's trainings
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
              Twoje Szkolenia
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Witaj, {session?.user?.name || session?.user?.email || 'Użytkowniku'}!
            </h1>
            <p className="text-xl text-gray-600">
              {trainings.length === 0 
                ? 'Nie masz jeszcze przypisanych szkoleń'
                : `Masz dostęp do ${trainings.length} ${trainings.length === 1 ? 'szkolenia' : 'szkoleń'}`
              }
            </p>
          </motion.div>

          {trainings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="border-2 border-dashed border-gray-300">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Brak szkoleń</h3>
                  <p className="text-gray-600 mb-6">
                    Skontaktuj się z administratorem aby uzyskać dostęp do szkoleń<br />
                    lub zakup szkolenie przez platformę.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Link href="/kontakt">
                      <Button variant="outline">
                        Kontakt
                      </Button>
                    </Link>
                    <Link href="/">
                      <Button>
                        Strona główna
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {trainings.map((training, index) => (
                <motion.div
                  key={training.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-2 border-purple-200 hover:border-purple-400 transition-all hover:shadow-xl group">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          training.source === 'granted' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {training.source === 'granted' ? '✓ Przydzielone' : '🛒 Wykupione'}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{training.title}</CardTitle>
                      <CardDescription>{training.shortDescription}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {training.expiresAt && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                          <Clock className="w-4 h-4" />
                          <span>Dostęp do {new Date(training.expiresAt).toLocaleDateString('pl-PL')}</span>
                        </div>
                      )}
                      <Link href={`/szkolenia/${training.slug}`}>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 group-hover:shadow-lg transition-all">
                          Rozpocznij szkolenie
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
