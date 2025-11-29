'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { 
  GraduationCap, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  BookOpen, 
  Sparkles, 
  Play, 
  Award 
} from 'lucide-react'
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
            <p className="text-xl text-gray-600 mb-8">
              Oferujemy specjalistyczne szkolenia z wykorzystania sztucznej inteligencji, 
              dostosowane do Twoich potrzeb i roli w edukacji.
            </p>
            
            <div className="flex justify-center gap-4">
              <Button asChild variant="outline" className="border-purple-200 hover:bg-purple-50 text-purple-700">
                <Link href="/auth/login">
                  Masz już konto? Zaloguj się
                </Link>
              </Button>
            </div>
          </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
                  icon: Play,
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
                    
                    <CardHeader>
                      <div className={`w-14 h-14 bg-gradient-to-br ${training.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                        <training.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl">{training.title}</CardTitle>
                      <CardDescription className="text-base mt-2">
                        {training.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-grow">
                      <ul className="space-y-3 text-gray-600">
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
                      </ul>
                    </CardContent>
                    
                    <CardFooter>
                      <Link href={training.href} className="w-full">
                        <Button className={`w-full bg-gradient-to-r ${training.color} hover:opacity-90 h-12 text-lg group-hover:shadow-lg transition-all text-white`}>
                          Rozpocznij szkolenie
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
