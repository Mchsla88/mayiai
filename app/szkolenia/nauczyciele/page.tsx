'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Target, Brain, Shield, MessageSquare, Search, Palette, 
  GraduationCap, Users, CheckCircle, BookOpen, Clock, Award,
  TrendingUp, Lightbulb, Scale, FileText, Rocket
} from 'lucide-react'
import { SimpleLoginForm } from '@/components/simple-login-form'
import { CertificateGenerator } from '@/components/certificate-generator'
import toast from 'react-hot-toast'

// Import modules from separate file
import { trainingModules } from './training-modules-data'

export default function TeachersTrainingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeModule, setActiveModule] = useState('wstep-1')
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set())

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
      toast('Moduł oznaczony jako nieukończony')
    } else {
      newCompleted.add(id)
      toast.success('Gratulacje! Moduł ukończony pomyślnie 🎉')
    }
    setCompletedModules(newCompleted)
    localStorage.setItem('teachersCompletedModules', JSON.stringify([...newCompleted]))
  }

  const progress = Math.round((completedModules.size / trainingModules.length) * 100)

  if (!isAuthenticated) {
    return <SimpleLoginForm onLogin={handleAuthSuccess} title="Szkolenie AI dla Nauczycieli" />
  }

  const currentModule = trainingModules.find(m => m.id === activeModule)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Szkolenie AI dla Nauczycieli
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Kompleksowy Przewodnik 2024-2026
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>{completedModules.size} z {trainingModules.length} modułów</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
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
                    onClick={() => setActiveModule(module.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all text-sm ${
                      activeModule === module.id
                        ? 'bg-purple-100 border-2 border-purple-500 text-purple-900'
                        : 'hover:bg-gray-50 border border-gray-200'
                    } ${completedModules.has(module.id) ? 'bg-green-50' : ''}`}
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
                      {completedModules.has(module.id) && (
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      )}
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
                      <Button
                        onClick={() => toggleCompleted(currentModule.id)}
                        variant={completedModules.has(currentModule.id) ? "default" : "outline"}
                        className="flex-shrink-0"
                      >
                        {completedModules.has(currentModule.id) ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Ukończono
                          </>
                        ) : (
                          "Oznacz jako ukończone"
                        )}
                      </Button>
                    </div>

                    {currentModule.id === 'zakonczenie-2' ? (
                      <CertificateGenerator />
                    ) : (
                      typeof currentModule.content === 'string' ? (
                        <div 
                          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-purple-600 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
                          dangerouslySetInnerHTML={{ __html: currentModule.content }}
                        />
                      ) : (
                        <div className="modern-module-wrapper">
                          {currentModule.content}
                        </div>
                      )
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t">
                      <Button
                        variant="outline"
                        onClick={() => {
                          const currentIndex = trainingModules.findIndex(m => m.id === activeModule)
                          if (currentIndex > 0) {
                            setActiveModule(trainingModules[currentIndex - 1].id)
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
                            setActiveModule(trainingModules[currentIndex + 1].id)
                            if (!completedModules.has(currentModule.id)) {
                              toggleCompleted(currentModule.id)
                            }
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
