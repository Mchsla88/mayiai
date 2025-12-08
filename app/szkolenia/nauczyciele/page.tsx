'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { 
  Target, Brain, Shield, MessageSquare, Search, Palette, 
  GraduationCap, Users, CheckCircle, BookOpen, Clock, Award,
  TrendingUp, Lightbulb, Scale, FileText, Rocket
} from 'lucide-react'
import { SimpleLoginForm } from '@/components/simple-login-form'
import { CertificateGenerator } from '@/components/certificate-generator'
import toast from 'react-hot-toast'
import { useSession, signOut } from 'next-auth/react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Navbar } from '@/components/navbar'

// Import modules from separate file
import { trainingModules } from './training-modules-data'

import { Suspense } from 'react'

// ... imports remain the same

function TeachersContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Derived state from URL to support browser history
  const moduleParam = searchParams.get('module')
  const activeModule = trainingModules.find(m => m.id === moduleParam) ? moduleParam! : 'wstep-1'
  
  // Redirect unauthenticated users to login (unless locally authenticated)
  useEffect(() => {
    if (status === 'loading') return
    
    // Check local auth first
    const mainAuth = localStorage.getItem('main_training_auth')
    if (mainAuth === 'true') {
      setIsAuthenticated(true)
      return
    }

    // If session exists, check for specific permission
    if (session?.user) {
      const hasAccess = 
        session.user.isAdmin || 
        session.user.role === 'ADMIN' || 
        session.user.allowedTrainings?.includes('nauczyciele');
        
      if (hasAccess) {
        setIsAuthenticated(true)
      }
    }
  }, [session, status])

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
    localStorage.setItem('teachersTrainingAuth', 'true')
  }

  useEffect(() => {
    const auth = localStorage.getItem('teachersTrainingAuth')
    const mainAuth = localStorage.getItem('main_training_auth')
    if (auth === 'true' || mainAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogout = () => {
    try {
      localStorage.removeItem('teachersTrainingAuth')
      localStorage.removeItem('main_training_auth')
      localStorage.removeItem('mlodyInfluencerAuth')
      localStorage.removeItem('training_auth')
      
      setIsAuthenticated(false)
      toast.success('Wylogowano pomyślnie')

      if (session) {
        window.location.href = '/api/auth/signout?callbackUrl=/'
      } else {
        window.location.href = '/'
      }
    } catch (error) {
      console.error('Logout error:', error)
      window.location.href = '/'
    }
  }

  const handleModuleSelect = (id: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('module', id)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // Show loading while checking auth
  if (status === 'loading' || (session && !isAuthenticated)) {
    return null // NextAuth will redirect
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">
          <SimpleLoginForm onLogin={handleAuthSuccess} title="Poradnik AI dla Nauczycieli" />
        </div>
      </div>
    )
  }

  const currentModule = trainingModules.find(m => m.id === activeModule)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 pt-24 relative">
        {/* Logout Button */}
        <div className="absolute top-4 right-4 z-10">
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            size="sm"
            className="bg-white/80 backdrop-blur-sm hover:bg-red-50 hover:text-red-600 border-gray-200"
          >
            Wyloguj
          </Button>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden shadow-2xl mb-12 border border-white/20"
        >
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src="/teachers-hero.png"
              alt="AI dla Nauczycieli"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                  <div className="flex items-start gap-2 mb-4">
                      <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-medium text-purple-200">
                          Edycja 2024-2026
                      </div>
                  </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight tracking-tight">
                  Poradnik AI<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    dla Nauczycieli
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-lg shadow-black drop-shadow-md">
                  Kompleksowy przewodnik po świecie sztucznej inteligencji w edukacji. Odkryj nowoczesne metody nauczania.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Module Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4 sticky top-4 max-h-[calc(100vh-100px)] overflow-y-auto">
              <h3 className="font-bold text-lg mb-4 text-gray-900">Spis Treści</h3>
              <div className="space-y-2">
                {trainingModules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => handleModuleSelect(module.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all text-sm ${
                      activeModule === module.id
                        ? 'bg-purple-100 border-2 border-purple-500 text-purple-900'
                        : 'hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <div className={`mt-0.5 ${activeModule === module.id ? 'text-purple-600' : 'text-gray-500'}`}>
                        {module.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{module.title}</div>
                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {module.duration}
                        </div>
                      </div>

                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                {currentModule && (
                  <>
                    <div className="flex items-start justify-between mb-6 pb-6 border-b">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                          {currentModule.icon}
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{currentModule.title}</h2>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {currentModule.duration}
                            </span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                              {currentModule.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {typeof currentModule.content === 'string' ? (
                        <div 
                          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-purple-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
                          dangerouslySetInnerHTML={{ __html: currentModule.content }}
                        />
                      ) : (
                        <div className="modern-module-wrapper">
                          {currentModule.content}
                        </div>
                      )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t">
                      <Button
                        variant="outline"
                        onClick={() => {
                          const currentIndex = trainingModules.findIndex(m => m.id === activeModule)
                          if (currentIndex > 0) {
                            handleModuleSelect(trainingModules[currentIndex - 1].id)
                          }
                        }}
                        disabled={trainingModules.findIndex(m => m.id === activeModule) === 0}
                      >
                        ← Poprzedni moduł
                      </Button>
                      <Button
                        variant="default"
                        onClick={() => {
                          const currentIndex = trainingModules.findIndex(m => m.id === activeModule)
                          if (currentIndex < trainingModules.length - 1) {
                            handleModuleSelect(trainingModules[currentIndex + 1].id)
                          }
                        }}
                        disabled={trainingModules.findIndex(m => m.id === activeModule) === trainingModules.length - 1}
                      >
                        Następny moduł →
                      </Button>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function TeachersTrainingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Ładowanie szkolenia...</div>}>
      <TeachersContent />
    </Suspense>
  )
}
