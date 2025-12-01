'use client'

import { useState, useEffect, useRef } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  Play,
  CheckCircle,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Sparkles,
  GraduationCap,
  Award,
  Clock,
  Users,
  LogOut
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { SimpleLoginForm } from '@/components/simple-login-form'
import { trainingModules } from './training-modules-data'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// Training Content Component
function TrainingContent() {
  const [activeModule, setActiveModule] = useState(trainingModules[0].id)
  const moduleRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const scrollToModule = (moduleId: string) => {
    const element = moduleRefs.current[moduleId]
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
      setActiveModule(moduleId)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('mlody_influencer_auth')
    window.location.reload()
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 py-16">
          <div className="container mx-auto px-4">
            {/* Logout Button - Top Right */}
            <div className="absolute top-4 right-4 z-10">
              <Button
                onClick={handleLogout}
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/30"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Wyloguj
              </Button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Szkolenie Online
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Młody Influencer: Twój Start w Świecie Twórców
              </h1>
              
              <p className="text-xl text-white/90 mb-6">
                Bezpieczeństwo, kreatywność i narzędzia AI dla przyszłych gwiazd internetu
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Table of Contents - Sticky Sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-3">
                <div className="sticky top-24 space-y-4">
                  <Card className="border-2 border-purple-200 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                        <h3 className="font-bold text-lg">Spis Treści</h3>
                      </div>
                      
                      <nav className="space-y-2">
                        {trainingModules.map((module, index) => (
                          <motion.button
                            key={module.id}
                            onClick={() => scrollToModule(module.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg transition-all group ${
                              activeModule === module.id
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                            }`}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}>
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                activeModule === module.id
                                  ? 'bg-white/20'
                                  : 'bg-purple-100 text-purple-600'
                              }`}>
                                <span className="text-sm font-bold">{index + 1}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium truncate">
                                  {module.title}
                                </div>
                                <div className={`text-xs flex items-center gap-1 ${
                                  activeModule === module.id ? 'text-white/80' : 'text-gray-500'
                                }`}>
                                  <Clock className="w-3 h-3" />
                                  {module.duration}
                                </div>
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </nav>

                      {/* Stats */}
                      <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Łączny czas:</span>
                          <span className="font-bold text-purple-600">~105 minut</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Poziom:</span>
                          <span className="font-bold text-purple-600">Początkujący</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.aside>

              {/* Modules Content */}
              <div className="lg:col-span-9 space-y-12">
                <AnimatePresence mode="wait">
                  {trainingModules.map((module, index) => (
                    <motion.div
                      key={module.id}
                      ref={(el) => { moduleRefs.current[module.id] = el }}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="scroll-mt-24">
                      <Card className="border-2 border-purple-200 shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
                        <CardContent className="p-0">
                          {/* Module Header */}
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6 text-white">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                    <span className="font-bold">{index + 1}</span>
                                  </div>
                                  <h2 className="text-2xl font-bold">{module.title}</h2>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-white/80">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {module.duration}
                                  </span>
                                </div>
                              </div>
                              
                              {(module as any).video || (module as any).audio ? (
                                <div className="flex-shrink-0">
                                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <Play className="w-6 h-6" />
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </div>

                          {/* Module Content Grid */}
                          <div className="flex flex-col">
                            {/* Video First - Full Width */}
                            {(module as any).video ? (
                              <div className="bg-black flex items-center justify-center p-4">
                                <div className="w-full max-w-6xl">
                                  <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
                                    <video
                                      controls
                                      className="w-full h-full"
                                      poster={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'%3E%3Crect fill='%236B21A8' width='1600' height='900'/%3E%3Ctext fill='white' font-size='32' font-family='Arial' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E${module.title}%3C/text%3E%3C/svg%3E`}>
                                      <source src={(module as any).video} type="video/mp4" />
                                      Twoja przeglądarka nie obs\u0142uguje odtwarzacza wideo.
                                    </video>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-8">
                                <div className="text-center">
                                  <BookOpen className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                                  <p className="text-gray-600">
                                    Materiały edukacyjne
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Text Content Below */}
                            <div className="p-8 bg-white">
                              <div className="training-content">
                                {module.content}
                              </div>
                            </div>
                          </div>

                          {/* Module Footer */}
                          <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <GraduationCap className="w-5 h-5" />
                                <span>Moduł {index + 1} z {trainingModules.length}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// Main Page Component
export default function SzkoleniePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/auth/login?callbackUrl=/szkolenia/mlody-influencer')
      return
    }
    
    setIsAuthenticated(true)
  }, [session, status, router])

  useEffect(() => {
    // Check if user is already authenticated (from localStorage)
    const auth = localStorage.getItem('mlody_influencer_auth')
    if (auth === 'true' && session) {
      setIsAuthenticated(true)
    }
  }, [session])

  const handleLogin = () => {
    localStorage.setItem('mlody_influencer_auth', 'true')
    setIsAuthenticated(true)
  }

  // Show loading while checking auth
  if (status === 'loading' || (session && !isAuthenticated)) {
    return null // NextAuth will redirect
  }

  if (!isAuthenticated) {
    return <SimpleLoginForm onLogin={handleLogin} title="Kurs Młody Influencer" />
  }

  return <TrainingContent />
}
