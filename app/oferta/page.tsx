'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  BookOpen,
  Users,
  Sparkles,
  Video,
  Award,
  CheckCircle,
  ArrowRight,
  GraduationCap
} from 'lucide-react'

export default function OfertaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md border border-white/20 text-purple-700 rounded-full text-sm font-medium shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                Kompleksowa oferta edukacyjna
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold tracking-tight"
              >
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Szkolenia
                </span>
                <br />
                <span className="text-gray-900">z AI dla Rodzin</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                Nowoczesna edukacja w przystępnej formie. Wybierz szkolenie i wprowadź swoją rodzinę w świat sztucznej inteligencji.
              </motion.p>
            </div>
          </div>
          
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl" />
          </div>
        </section>

        {/* Szkolenia Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
              {[
                {
                  title: 'Łatwa Szkoła z AI',
                  description: 'Jak wykorzystać AI do efektywnej nauki i odrabiania lekcji.',
                  icon: BookOpen,
                  color: 'from-blue-500 to-indigo-600',
                  shadow: 'shadow-blue-500/20',
                  href: '/szkolenia/dzieci'
                },
                {
                  title: 'Nauczyciel z AI',
                  description: 'Narzędzia i metody dla nowoczesnych pedagogów.',
                  icon: Users,
                  color: 'from-purple-500 to-violet-600',
                  shadow: 'shadow-purple-500/20',
                  href: '/szkolenia/nauczyciele'
                },
                {
                  title: 'Bezpieczeństwo w AI',
                  description: 'Ochrona danych i bezpieczne korzystanie z technologii.',
                  icon: Sparkles,
                  color: 'from-emerald-500 to-teal-600',
                  shadow: 'shadow-emerald-500/20',
                  href: '#'
                },
                {
                  title: 'Filmy/ Zdjecia z AI',
                  description: 'Tworzenie kreatywnych treści multimedialnych z pomocą AI.',
                  icon: Video,
                  color: 'from-pink-500 to-rose-600',
                  shadow: 'shadow-pink-500/20',
                  href: '#'
                },
                {
                  title: 'Młody Influencer',
                  description: 'Budowanie marki osobistej i tworzenie contentu z AI.',
                  icon: Award,
                  color: 'from-orange-500 to-amber-600',
                  shadow: 'shadow-orange-500/20',
                  href: '#'
                }
              ].map((training, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 bg-white/60 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${training.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    <CardContent className="p-8 flex flex-col h-full relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${training.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                        <training.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-purple-700 transition-colors">
                        {training.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                        {training.description}
                      </p>
                      
                      <div className="space-y-6">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-gray-900">100 zł</span>
                          <span className="text-gray-500 font-medium">/ szkolenie</span>
                        </div>

                        <ul className="space-y-3 text-sm text-gray-600">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Dostęp online 24/7
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            Certyfikat ukończenia
                          </li>
                        </ul>

                        <Button 
                          asChild 
                          className={`w-full bg-gradient-to-r ${training.color} hover:opacity-90 h-12 text-lg shadow-lg hover:shadow-xl transition-all text-white rounded-xl`}
                        >
                          <Link href={training.href}>
                            Wybierz szkolenie
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="bg-white/40 backdrop-blur-md border-0 shadow-lg">
                <CardContent className="p-8 flex items-start gap-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Wygodny format wideo</h3>
                    <p className="text-gray-600">
                      Wszystkie lekcje są nagrane w wysokiej jakości. Możesz je oglądać na komputerze, tablecie lub telefonie w dowolnym momencie.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/40 backdrop-blur-md border-0 shadow-lg">
                <CardContent className="p-8 flex items-start gap-6">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Certyfikat ukończenia</h3>
                    <p className="text-gray-600">
                      Po zakończeniu każdego szkolenia otrzymasz imienny certyfikat potwierdzający zdobyte umiejętności.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10" />
              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold">
                  Nie wiesz co wybrać?
                </h2>
                <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                  Skontaktuj się z nami, a pomożemy dobrać odpowiednie szkolenie do Twoich potrzeb i poziomu zaawansowania.
                </p>
                <Button asChild size="lg" variant="secondary" className="text-lg h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all">
                  <Link href="/kontakt">
                    Napisz do nas
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
