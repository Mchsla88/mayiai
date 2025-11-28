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





export default function OfertaPage() {
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
                <p className="text-xl text-gray-600 mb-2">
                  Interaktywne szkolenia dla rodziców, nauczycieli i dzieci
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  Wykup 12 miesięczny dostęp do szkoleń
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
                {[
                  {
                    title: 'Łatwa Szkoła z AI',
                    description: 'Jak wykorzystać AI do efektywnej nauki i odrabiania lekcji.',
                    icon: BookOpen,
                    color: 'from-blue-400 to-blue-600',
                    href: '/szkolenia/dzieci'
                  },
                  {
                    title: 'Nauczyciel z AI',
                    description: 'Narzędzia i metody dla nowoczesnych pedagogów.',
                    icon: Users,
                    color: 'from-purple-400 to-purple-600',
                    href: '/szkolenia/nauczyciele'
                  },
                  {
                    title: 'Bezpieczeństwo w AI',
                    description: 'Ochrona danych i bezpieczne korzystanie z technologii.',
                    icon: Sparkles,
                    color: 'from-green-400 to-green-600',
                    href: '#'
                  },
                  {
                    title: 'Filmy/ Zdjecia z AI',
                    description: 'Tworzenie kreatywnych treści multimedialnych z pomocą AI.',
                    icon: Video,
                    color: 'from-pink-400 to-pink-600',
                    href: '#'
                  },
                  {
                    title: 'Młody Influencer',
                    description: 'Budowanie marki osobistej i tworzenie contentu z AI.',
                    icon: Award,
                    color: 'from-orange-400 to-orange-600',
                    href: '#'
                  }
                ].map((training, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full border-2 border-gray-100 hover:border-purple-300 transition-all hover:shadow-xl group relative overflow-hidden flex flex-col">
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${training.color} opacity-10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110`} />
                      
                      <CardContent className="p-6 flex-grow flex flex-col">
                        <div className={`w-14 h-14 bg-gradient-to-br ${training.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                          <training.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{training.title}</h3>
                        <p className="text-gray-600 mb-6 flex-grow">
                          {training.description}
                        </p>
                        
                        <ul className="space-y-3 text-gray-600 mb-6">
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            Praktyczna wiedza
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            Dostęp online 24/7
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            Materiały dodatkowe
                          </li>
                          <li className="flex items-start gap-2 font-semibold text-purple-600">
                            <span className="text-purple-500 mt-1">✓</span>
                            12 miesięczny dostęp do szkoleń
                          </li>
                        </ul>

                        <div className="mb-4 text-center">
                          <span className="text-lg font-bold text-gray-900 block">Wszystkie za 100 zł</span>
                        </div>

                        <Button 
                          asChild 
                          className={`w-full bg-gradient-to-r ${training.color} hover:opacity-90 h-12 text-lg group-hover:shadow-lg transition-all text-white mt-auto`}
                        >
                          <Link href={training.href}>
                            Rozpocznij szkolenie
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
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
