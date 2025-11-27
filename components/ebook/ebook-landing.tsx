
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { 
  BookOpen, 
  CheckCircle, 
  Star, 
  Clock, 
  Download, 
  Users, 
  TrendingUp,
  Target,
  BarChart3,
  Lightbulb,
  ArrowRight,
  CreditCard,
  Shield,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EbookLandingProps {
  showPurchase?: boolean;
}

const benefits = [
  {
    icon: Target,
    title: 'Praktyczne Strategie',
    description: 'Sprawdzone metody rozwoju biznesu'
  },
  {
    icon: BarChart3,
    title: 'Analiza i Narzędzia',
    description: 'Gotowe szablony i frameworks'
  },
  {
    icon: TrendingUp,
    title: 'Case Studies',
    description: 'Przykłady z polskich firm'
  },
  {
    icon: Lightbulb,
    title: 'Innowacyjne Podejście',
    description: 'Najnowsze trendy w strategii'
  }
];

const features = [
  'Kompletny przewodnik po strategiach rozwoju',
  'Praktyczne narzędzia i szablony do pobrania',
  'Case studies polskich firm',
  'Metodologie krok po kroku',
  'Dostęp przez 12 miesięcy',
  'Regularne aktualizacje treści'
];

const testimonials = [
  {
    name: 'Anna Kowalska',
    company: 'TechStart Sp. z o.o.',
    content: 'E-book pomógł mi stworzyć konkretny plan rozwoju firmy. Bardzo praktyczne podejście!',
    rating: 5
  },
  {
    name: 'Marek Wiśniewski',
    company: 'Manufacturing Pro',
    content: 'Najlepsza inwestycja w rozwój mojego biznesu. Jasne, konkretne wskazówki.',
    rating: 5
  }
];

export default function EbookLanding({ showPurchase = false }: EbookLandingProps) {
  const { data: session } = useSession() || {};
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    // TODO: Implement Przelewy24 payment integration
    // For now, redirect to contact
    window.location.href = '/kontakt';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Ekskluzywny E-book
                </Badge>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
                  Strategia <span className="text-blue-600">Biznesowa</span>
                  <br />
                  dla Polskich Firm
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Kompleksowy przewodnik po nowoczesnych strategiach rozwoju biznesu. 
                  Praktyczne narzędzia, sprawdzone metody i case studies w jednym miejscu.
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">6 rozdziałów, ~4 godziny czytania</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span className="text-gray-600">500+ zadowolonych czytelników</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="text-gray-600">4.9/5 średnia ocena</span>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-4">
                {showPurchase ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl font-bold text-gray-900">297 PLN</div>
                      <div className="text-sm text-gray-500">
                        <span className="line-through">497 PLN</span>
                        <Badge className="ml-2 bg-red-100 text-red-800">-40%</Badge>
                      </div>
                    </div>
                    <Button 
                      size="lg" 
                      className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4"
                      onClick={handlePurchase}
                      disabled={isLoading}
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Kup Teraz - 12 miesięcy dostępu
                    </Button>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Shield className="h-4 w-4" />
                        <span>Bezpieczne płatności</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="h-4 w-4" />
                        <span>Gwarancja satysfakcji</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4">
                    {session?.user ? (
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4" asChild>
                        <Link href="/ebook">
                          <BookOpen className="mr-2 h-5 w-5" />
                          Przejdź do E-book
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    ) : (
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4" asChild>
                        <Link href="/auth/register">
                          <Download className="mr-2 h-5 w-5" />
                          Uzyskaj Dostęp
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    )}
                    <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
                      <Link href="#preview">
                        Zobacz Podgląd
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl transform rotate-6 shadow-2xl" />
                <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl p-8 transform -rotate-2">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Strategia Biznesowa</h3>
                    <p className="text-gray-600 text-sm">Przewodnik dla Polskich Firm</p>
                    <div className="space-y-2">
                      {['Wprowadzenie', 'Analiza strategiczna', 'Transformacja cyfrowa', 'Strategie wzrostu', 'Implementacja', 'Monitoring'].map((chapter, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          <span className="text-sm text-gray-700">{chapter}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Co Zyskujesz z E-book?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Praktyczne narzędzia i sprawdzone strategie, które pomogą Ci rozwinąć biznes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="preview" className="section-padding bg-gray-50">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Wszystko Czego Potrzebujesz w Jednym Miejscu
                </h2>
                <p className="text-lg text-gray-600">
                  Kompleksowy przewodnik stworzony przez ekspertów z wieloletnim doświadczeniem 
                  w doradztwie strategicznym dla polskich firm.
                </p>
              </div>

              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="p-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Spis Treści</CardTitle>
                  <CardDescription className="text-blue-100">
                    6 rozdziałów pełnych praktycznej wiedzy
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    'Rozdział 1: Wprowadzenie do Konsultingu Strategicznego',
                    'Rozdział 2: Analiza Strategiczna i Diagnostyka',
                    'Rozdział 3: Transformacja Cyfrowa w Strategii',
                    'Rozdział 4: Strategie Wzrostu i Ekspansji',
                    'Rozdział 5: Implementacja i Change Management',
                    'Rozdział 6: Monitoring i Optymalizacja Strategii'
                  ].map((chapter, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-semibold">{index + 1}</span>
                      </div>
                      <span className="text-blue-100 text-sm">{chapter}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Co Mówią Czytelnicy
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <CardContent className="space-y-4">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.content}"</p>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
