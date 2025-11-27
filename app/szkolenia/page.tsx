'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { GraduationCap, Users, ArrowRight, Sparkles, Brain } from 'lucide-react'
import Link from 'next/link'

export default function TrainingLandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Centrum Edukacji AI
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Wybierz Swoją Ścieżkę Rozwoju
            </h1>
            <p className="text-xl text-gray-600">
              Oferujemy specjalistyczne szkolenia z wykorzystania sztucznej inteligencji, 
              dostosowane do Twoich potrzeb i roli w edukacji.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Karta Nauczyciela */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                
                <CardHeader>
                  <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                    <GraduationCap className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-2xl">Szkolenie dla Nauczycieli</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Kompleksowy kurs wdrażania AI w pracy dydaktycznej
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      Tworzenie scenariuszy lekcji z AI
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      Personalizacja materiałów dydaktycznych
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      Automatyzacja sprawdzania wiedzy
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      Certyfikat ukończenia
                    </li>
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Link href="/szkolenia/nauczyciele" className="w-full">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 h-12 text-lg group-hover:shadow-lg transition-all">
                      Rozpocznij szkolenie
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Karta Ucznia/Rodzica */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full border-2 border-pink-100 hover:border-pink-300 transition-all hover:shadow-xl group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                
                <CardHeader>
                  <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-pink-600 transition-colors">
                    <Users className="w-8 h-8 text-pink-600 group-hover:text-white transition-colors" />
                  </div>
                  <CardTitle className="text-2xl">Szkolenie dla Dzieci i Rodziców</CardTitle>
                  <CardDescription className="text-base mt-2">
                    Wsparcie w nauce domowej i odrabianiu lekcji
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      Inteligentny korepetytor AI
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      Interaktywne powtórki materiału
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      Bezpieczne korzystanie z technologii
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      Nauka przez zabawę
                    </li>
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Link href="/szkolenia/dzieci" className="w-full">
                    <Button className="w-full bg-pink-600 hover:bg-pink-700 h-12 text-lg group-hover:shadow-lg transition-all">
                      Rozpocznij szkolenie
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
