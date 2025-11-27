'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  BookOpen,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Clock,
  Award,
  Download,
  Video,
  FileText,
  Sparkles,
  Shield,
  TrendingUp,
  Lock,
  Unlock,
  Eye,
  EyeOff
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'

function PasswordForm({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (password === 'Takiehaslo1!') {
        toast({
          title: "Dostęp przyznany! 🎉",
          description: "Witaj w ofercie szkoleniowej!",
        })
        onUnlock()
      } else {
        toast({
          title: "Błąd dostępu",
          description: "Nieprawidłowe hasło",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-4 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md border-0 shadow-2xl">
            <CardContent className="p-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Dostęp do Oferty
                </h2>
                <p className="text-gray-600 mt-2">
                  Wprowadź hasło, aby zobaczyć pełną ofertę szkoleniową
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="password" className="text-gray-700 font-medium">
                    Hasło dostępu
                  </Label>
                  <div className="relative mt-2">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Wprowadź hasło"
                      className="h-12 pr-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Unlock className="w-5 h-5" />
                        </motion.div>
                        Sprawdzanie...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Unlock className="w-5 h-5" />
                        Odblokuj dostęp
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  )
}

export default function OfertaPage() {
  const [isUnlocked, setIsUnlocked] = useState(false)

  if (!isUnlocked) {
    return <PasswordForm onUnlock={() => setIsUnlocked(true)} />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Kompleksowa oferta edukacyjna
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Szkolenia
                </span>
                <br />
                <span className="text-gray-800">z AI dla Rodzin</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Wybierz idealną opcję dla swojej rodziny. Kompleksowe szkolenia - 
                wszystko czego potrzebujesz, by bezpiecznie wprowadzić AI w życie dziecka.
              </p>
            </div>
          </div>
        </section>

        {/* Szkolenia Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <GraduationCap className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                <h2 className="text-4xl font-bold mb-4">Szkolenia z AI</h2>
                <p className="text-xl text-gray-600">
                  Interaktywne szkolenia dla rodziców, nauczycieli i dzieci
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    title: 'AI dla Rodziców',
                    duration: '4 godziny',
                    level: 'Podstawowy',
                    description: 'Naucz się, jak bezpiecznie wprowadzić AI w życie dziecka',
                    features: [
                      'Podstawy bezpieczeństwa AI',
                      'Kontrola rodzicielska',
                      'Rekomendowane narzędzia',
                      '12 miesięcy dostępu do materiałów'
                    ],
                    color: 'from-blue-500 to-cyan-500',
                    bgColor: 'bg-blue-50'
                  },
                  {
                    title: 'AI dla Nauczycieli',
                    duration: '8 godzin',
                    level: 'Średniozaawansowany',
                    description: 'Wprowadź AI do programu nauczania w swojej szkole',
                    features: [
                      'Metodyka nauczania AI',
                      'Projekty dla uczniów',
                      'Materiały do lekcji',
                      'Dostęp do społeczności'
                    ],
                    color: 'from-purple-500 to-pink-500',
                    bgColor: 'bg-purple-50',
                    popular: true
                  },
                  {
                    title: 'Bezpieczeństwo z AI',
                    duration: '12 godzin',
                    level: 'Zaawansowany',
                    description: 'Kompleksowa ochrona i bezpieczne korzystanie z AI',
                    features: [
                      'Zaawansowane zabezpieczenia',
                      'Ochrona prywatności',
                      'Etyka i bezpieczeństwo AI',
                      'Mentoring 1-na-1'
                    ],
                    color: 'from-pink-500 to-red-500',
                    bgColor: 'bg-pink-50'
                  }
                ].map((course, i) => (
                  <Card key={i} className={`border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${course.popular ? 'border-purple-400 scale-105' : 'border-gray-200'} relative overflow-hidden`}>
                    {course.popular && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                        NAJPOPULARNIEJSZY
                      </div>
                    )}
                    <div className={`h-3 bg-gradient-to-r ${course.color}`}></div>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                      </div>

                      <div className="flex gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {course.level}
                        </div>
                      </div>

                      <div className="space-y-2 py-4">
                        {course.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button 
                        asChild
                        size="lg" 
                        className={`w-full ${course.popular ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' : 'bg-gray-800 hover:bg-gray-900'}`}
                      >
                        <Link href="/kontakt">
                          Zapytaj o szczegóły
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Dodatkowe informacje */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-purple-100">
                  <CardContent className="p-6 space-y-4">
                    <Video className="w-12 h-12 text-purple-600" />
                    <h3 className="text-xl font-bold">Format szkoleń</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        Szkolenia dostępne 24/7 online
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        Nagrania dostępne przez 12 miesięcy
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        Materiały do pobrania w PDF
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        Dostęp do grupy wsparcia
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-purple-100">
                  <CardContent className="p-6 space-y-4">
                    <Award className="w-12 h-12 text-purple-600" />
                    <h3 className="text-xl font-bold">Co otrzymasz</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        Kompleksowe materiały edukacyjne
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        Praktyczne ćwiczenia i zadania
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        Wsparcie społeczności
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        Aktualizacje treści przez rok
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Nie możesz się zdecydować?
              </h2>
              <p className="text-xl text-blue-100">
                Skontaktuj się z nami, a pomożemy wybrać idealną opcję dla Twojej rodziny
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg" variant="secondary" className="text-lg">
                  <Link href="/kontakt">
                    Skontaktuj się z nami
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
