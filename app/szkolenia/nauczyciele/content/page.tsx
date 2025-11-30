'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Target, Brain, Shield, MessageSquare, Search, Palette, 
  GraduationCap, Users, CheckCircle, BookOpen, ChevronRight,
  Clock, Award
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SimpleLoginForm } from '@/components/simple-login-form'
import { useToast } from '@/hooks/use-toast'

export default function TeachersTrainingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeModule, setActiveModule] = useState('wstep')
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  useEffect(() => {
    const authStatus = localStorage.getItem('teachersTrainingAuth')
    setIsAuthenticated(authStatus === 'true')
    
    const saved = localStorage.getItem('teachersCompletedModules')
    if (saved) {
      setCompletedModules(new Set(JSON.parse(saved)))
    }
  }, [])

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
    localStorage.setItem('teachersTrainingAuth', 'true')
  }

  const toggleCompleted = (id: string) => {
    const newCompleted = new Set(completedModules)
    if (newCompleted.has(id)) {
      newCompleted.delete(id)
      toast({
        title: "Moduł oznaczony jako nieukończony",
        description: "Możesz wrócić do tego modułu później"
      })
    } else {
      newCompleted.add(id)
      toast({
        title: "Gratulacje!",
        description: "Moduł ukończony pomyślnie"
      })
    }
    setCompletedModules(newCompleted)
    localStorage.setItem('teachersCompletedModules', JSON.stringify([...newCompleted]))
  }

  if (!isAuthenticated) {
    return <SimpleLoginForm onLogin={handleAuthSuccess} title="Szkolenie AI dla Nauczycieli" />
  }

  const trainingModules = [
    // WSTĘP
    {
      id: 'wstep-1',
      title: 'Wstęp: Kryzys Zaufania',
      icon: <Target className="w-5 h-5" />,
      duration: '10 min',
      category: 'wstep',
      content: `[CONTENT WILL BE VERY LONG - TO BE ADDED]`
    },
    {
      id: 'wstep-2',
      title: 'Wstęp: Odzyskiwanie Czasu',
      icon: <Clock className="w-5 h-5" />,
      duration: '10 min',
      category: 'wstep',
      content: `[CONTENT]`
    },
    {
      id: 'wstep-3',
      title: 'Wstęp: Podstawa Programowa 2026',
      icon: <Award className="w-5 h-5" />,
      duration: '10 min',
      category: 'wstep',
      content: `[CONTENT]`
    },
    // ROZDZIAŁ 1
    {
      id: 'rozdzial-1-1',
      title: 'Rozdział 1.1: Demistyfikacja AI',
      icon: <Brain className="w-5 h-5" />,
      duration: '15 min',
      category: 'rozdzial-1',
      content: `[CONTENT]`
    },
    {
      id: 'rozdzial-1-2',
      title: 'Rozdział 1.2: Pierwszy Kontakt',
      icon: <Brain className="w-5 h-5" />,
      duration: '15 min',
      category: 'rozdzial-1',
      content: `[CONTENT]`
    },
    {
      id: 'rozdzial-1-3',
      title: 'Rozdział 1.3: Przegląd Narzędzi (10 narzędzi)',
      icon: <Brain className="w-5 h-5" />,
      duration: '20 min',
      category: 'rozdzial-1',
      content: `[CONTENT - ALL 10 TOOLS]`
    }
    // ... więcej modułów
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Szkolenie AI dla Nauczycieli
          </h1>
          <p className="text-xl text-gray-600">
            Kompleksowy przewodnik 2024-2026
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {completedModules.size} z {trainingModules.length} modułów ukończonych
          </p>
        </motion.div>

        {/* Module Navigation */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {trainingModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                  activeModule === module.id
                    ? 'border-2 border-purple-500 bg-purple-50'
                    : 'border border-gray-200'
                } ${completedModules.has(module.id) ? 'bg-green-50' : ''}`}
                onClick={() => setActiveModule(module.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="text-purple-600">{module.icon}</div>
                    <div>
                      <h3 className="font-bold text-sm">{module.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{module.duration}</p>
                    </div>
                  </div>
                  {completedModules.has(module.id) && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {trainingModules.map((module) => {
              if (module.id === activeModule) {
                return (
                  <div key={module.id}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 rounded-lg">
                          {module.icon}
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-900">{module.title}</h2>
                          <p className="text-gray-600">{module.duration}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => toggleCompleted(module.id)}
                        variant={completedModules.has(module.id) ? "default" : "outline"}
                      >
                        {completedModules.has(module.id) ? "Ukończono" : "Oznacz jako ukończone"}
                      </Button>
                    </div>

                    <div 
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: module.content }}
                    />
                  </div>
                )
              }
              return null
            })}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
