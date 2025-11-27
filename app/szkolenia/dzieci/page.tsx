
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



// Login Form removed - using SimpleLoginForm component instead

// Training Content Component
function TrainingContent() {
  const [activeModule, setActiveModule] = useState(trainingModules[0].id)
  const [completedModules, setCompletedModules] = useState<string[]>([])
  const [showEndVideo, setShowEndVideo] = useState(false)
  const moduleRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const endVideoRef = useRef<HTMLVideoElement | null>(null)

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

  const markAsCompleted = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      const newCompleted = [...completedModules, moduleId]
      setCompletedModules(newCompleted)
      toast({
        title: "Moduł ukończony! ✅",
        description: "Gratulacje! Możesz przejść do następnego modułu.",
      })
      
      // Check if all modules are completed
      if (newCompleted.length === trainingModules.length) {
        setTimeout(() => {
          setShowEndVideo(true)
          if (endVideoRef.current) {
            endVideoRef.current.play()
          }
        }, 1000)
      }
    } else {
      // Allow unchecking
      setCompletedModules(completedModules.filter(id => id !== moduleId))
    }
  }

  const handleVideoEnd = () => {
    setShowEndVideo(false)
  }

  const progress = (completedModules.length / trainingModules.length) * 100

  const handleLogout = () => {
    localStorage.removeItem('training_auth')
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
              className="max-w-4xl mx-auto text-center text-white"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Szkolenie Online
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Wykorzystanie AI do Efektywnej Nauki
              </h1>
              
              <p className="text-xl text-white/90 mb-6">
                Kompleksowe szkolenie z wykorzystania Claude i Gemini w edukacji
              </p>

              {/* Progress Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Postęp szkolenia</span>
                  <span className="font-bold">{Math.round(progress)}%</span>
                </div>
                <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
                  />
                </div>
                <div className="flex items-center gap-2 justify-center mt-3 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>{completedModules.length} z {trainingModules.length} modułów ukończonych</span>
                </div>
              </div>
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
                className="lg:col-span-3"
              >
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
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                completedModules.includes(module.id)
                                  ? 'bg-green-500 text-white'
                                  : activeModule === module.id
                                  ? 'bg-white/20'
                                  : 'bg-purple-100 text-purple-600'
                              }`}>
                                {completedModules.includes(module.id) ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  <span className="text-sm font-bold">{index + 1}</span>
                                )}
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
                          <span className="font-bold text-purple-600">~76 minut</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Poziom:</span>
                          <span className="font-bold text-purple-600">Początkujący</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Download PDF */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Card className="border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50">
                      <CardContent className="p-6 text-center">
                        <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                        <h4 className="font-bold text-blue-700 mb-2">
                          Prompty AI
                        </h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Pobierz plik z promptami i wyjaśnieniami
                        </p>
                        <a href="/prompty_ai_szkolenie.html" target="_blank" download>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Pobierz PDF z promptami
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  </motion.div>
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
                      className="scroll-mt-24"
                    >
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
                                  {completedModules.includes(module.id) && (
                                    <span className="flex items-center gap-1 text-green-300">
                                      <CheckCircle className="w-4 h-4" />
                                      Ukończono
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              {(module.video || (module as any).audio) && (
                                <div className="flex-shrink-0">
                                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <Play className="w-6 h-6" />
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Module Content Grid */}
                          <div className="flex flex-col">
                            {/* Video First - Full Width */}
                            {module.video ? (
                              <div className="bg-black flex items-center justify-center p-4">
                                <div className="w-full max-w-6xl">
                                  <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
                                    <video
                                      controls
                                      className="w-full h-full"
                                      poster={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1600' height='900'%3E%3Crect fill='%236B21A8' width='1600' height='900'/%3E%3Ctext fill='white' font-size='32' font-family='Arial' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E${module.title}%3C/text%3E%3C/svg%3E`}
                                    >
                                      <source src={module.video} type="video/mp4" />
                                      Twoja przeglądarka nie obsługuje odtwarzacza wideo.
                                    </video>
                                  </div>
                                  <p className="text-sm text-gray-300 mt-4 text-center">
                                    Obejrzyj materiał wideo, aby kontynuować
                                  </p>
                                </div>
                              </div>
                            ) : (module as any).audio1 && (module as any).audio2 ? (
                              <div className="bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center p-8">
                                <div className="w-full max-w-4xl">
                                  <div className="space-y-6">
                                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Play className="w-10 h-10 text-white" />
                                      </div>
                                      <h4 className="text-2xl font-bold text-white mb-4 text-center">Instrukcja Głosowa 1</h4>
                                      <p className="text-white/80 mb-6 text-center">Podsumowanie i wskazówki praktyczne</p>
                                      <audio
                                        controls
                                        className="w-full max-w-xl mx-auto"
                                        style={{ filter: 'invert(1) hue-rotate(180deg)' }}
                                      >
                                        <source src={(module as any).audio1} type="audio/mpeg" />
                                        Twoja przeglądarka nie obsługuje odtwarzacza audio.
                                      </audio>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Play className="w-10 h-10 text-white" />
                                      </div>
                                      <h4 className="text-2xl font-bold text-white mb-4 text-center">Instrukcja Głosowa 2</h4>
                                      <p className="text-white/80 mb-6 text-center">Zaawansowane techniki i strategie</p>
                                      <audio
                                        controls
                                        className="w-full max-w-xl mx-auto"
                                        style={{ filter: 'invert(1) hue-rotate(180deg)' }}
                                      >
                                        <source src={(module as any).audio2} type="audio/mpeg" />
                                        Twoja przeglądarka nie obsługuje odtwarzacza audio.
                                      </audio>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (module as any).audio ? (
                              <div className="bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center p-8">
                                <div className="w-full max-w-3xl text-center">
                                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                      <Play className="w-10 h-10 text-white" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-4">Instrukcja Głosowa</h4>
                                    <p className="text-white/80 mb-6">Przesłuchaj szczegółową instrukcję głosową dla tego modułu</p>
                                    <audio
                                      controls
                                      className="w-full max-w-xl mx-auto"
                                      style={{ filter: 'invert(1) hue-rotate(180deg)' }}
                                    >
                                      <source src={(module as any).audio} type="audio/mpeg" />
                                      Twoja przeglądarka nie obsługuje odtwarzacza audio.
                                    </audio>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-8">
                                <div className="text-center">
                                  <BookOpen className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                                  <p className="text-gray-600">
                                    Ten moduł zawiera tylko materiały tekstowe
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
                              
                              <label className="flex items-center gap-3 cursor-pointer group">
                                <input
                                  type="checkbox"
                                  checked={completedModules.includes(module.id)}
                                  onChange={() => markAsCompleted(module.id)}
                                  className="w-6 h-6 rounded border-2 border-purple-400 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                                />
                                <span className={`text-sm font-medium transition-colors ${
                                  completedModules.includes(module.id) 
                                    ? 'text-green-600' 
                                    : 'text-gray-700 group-hover:text-purple-600'
                                }`}>
                                  {completedModules.includes(module.id) ? (
                                    <>
                                      <CheckCircle className="w-4 h-4 inline mr-1" />
                                      Oznacz jako ukończone
                                    </>
                                  ) : (
                                    'Oznacz jako ukończone'
                                  )}
                                </span>
                              </label>
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

      {/* End Video Modal - Full Screen */}
      <AnimatePresence>
        {showEndVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          >
            <video
              ref={endVideoRef}
              className="w-full h-full object-contain"
              onEnded={handleVideoEnd}
              autoPlay
            >
              <source src="/koniec.mp4" type="video/mp4" />
              Twoja przeglądarka nie obsługuje odtwarzacza wideo.
            </video>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Main Page Component
export default function SzkoleniePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is already authenticated (from localStorage)
    const auth = localStorage.getItem('training_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    localStorage.setItem('training_auth', 'true')
    setIsAuthenticated(true)
  }

  if (!isAuthenticated) {
    return <SimpleLoginForm onLogin={handleLogin} title="Szkolenie dla Dzieci i Rodziców" />
  }

  return <TrainingContent />
}
