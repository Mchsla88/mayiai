'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BookOpen, Calendar, User, GraduationCap, ArrowRight, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

interface UserTraining {
  id: string
  slug: string
  title: string
  shortDescription: string
  imageUrl: string | null
  source: 'granted' | 'purchased'
  expiresAt?: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [trainings, setTrainings] = useState<UserTraining[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (status === 'unauthenticated') {
      router.push('/auth/login')
      return
    }

    // Fetch user trainings
    fetch('/api/user/trainings', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setTrainings(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching trainings:', err)
        setLoading(false)
      })
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Panel użytkownika</h1>
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
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Twoje szkolenia</p>
                      <p className="text-lg font-semibold">
                        {trainings.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-green-600" />
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
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Twoje Szkolenia</h2>
              
              {trainings.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trainings.map((training, index) => (
                    <motion.div
                      key={training.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full border-2 border-transparent hover:border-purple-200 transition-all hover:shadow-lg group flex flex-col">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                              <GraduationCap className="w-5 h-5 text-white" />
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                              training.source === 'granted' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {training.source === 'granted' ? 'Przydzielone' : 'Wykupione'}
                            </div>
                          </div>
                          <CardTitle className="text-lg line-clamp-2">{training.title}</CardTitle>
                          <CardDescription className="line-clamp-2">{training.shortDescription}</CardDescription>
                        </CardHeader>
                        <CardContent className="mt-auto">
                          {training.expiresAt && (
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                              <Clock className="w-3 h-3" />
                              <span>Dostęp do {new Date(training.expiresAt).toLocaleDateString('pl-PL')}</span>
                            </div>
                          )}
                          <Link href={`/szkolenia/${training.slug}`} className="w-full">
                            <Button className="w-full bg-white text-purple-600 border-2 border-purple-100 hover:bg-purple-50 hover:border-purple-200 group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600 transition-all">
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
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <BookOpen className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Brak aktywnych szkoleń</h3>
                      <p className="text-gray-500 mt-1">
                        Nie masz jeszcze dostępu do żadnych szkoleń.
                      </p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/szkolenia">Zobacz ofertę szkoleń</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
