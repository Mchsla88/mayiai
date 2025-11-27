
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Phone, Mail, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const benefits = [
  'Bezpłatna 30-minutowa konsultacja',
  'Analiza aktualnej sytuacji biznesowej',
  'Rekomendacje dopasowane do Twojej firmy',
  'Bez zobowiązań i ukrytych kosztów'
];

const contactOptions = [
  {
    icon: Phone,
    title: 'Zadzwoń',
    description: 'Porozmawiaj z ekspertem',
    action: '+48 123 456 789',
    href: 'tel:+48123456789'
  },
  {
    icon: Mail,
    title: 'Napisz',
    description: 'Wyślij zapytanie',
    action: 'kontakt@strategic-consulting.pl',
    href: 'mailto:kontakt@strategic-consulting.pl'
  },
  {
    icon: Calendar,
    title: 'Umów spotkanie',
    description: 'Zarezerwuj termin',
    action: 'Kalendarz online',
    href: '/kontakt'
  }
];

export default function CTASection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="section-padding bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='https://i.ytimg.com/vi/qmHLUP5ZoLs/sddefault.jpg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Gotowy na Następny <span className="text-yellow-400">Poziom</span>?
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Nie czekaj na konkurencję. Rozpocznij transformację swojego biznesu już dziś 
              z naszą bezpłatną konsultacją strategiczną.
            </p>
          </motion.div>

          {/* Main CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-8 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Content */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                        Bezpłatna Konsultacja Strategiczna
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        Skorzystaj z doświadczenia naszych ekspertów i otrzymaj profesjonalną 
                        ocenę możliwości rozwoju swojej firmy.
                      </p>
                    </div>

                    {/* Benefits */}
                    <ul className="space-y-3">
                      {benefits.map((benefit, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                          className="flex items-center space-x-3"
                        >
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Primary CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <Button 
                        size="lg" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg w-full sm:w-auto group"
                        asChild
                      >
                        <Link href="/kontakt">
                          Umów Bezpłatną Konsultację
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </motion.div>
                  </div>

                  {/* Contact Options */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-900 mb-6">
                      Lub skontaktuj się bezpośrednio:
                    </h4>
                    {contactOptions.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      >
                        <a
                          href={option.href}
                          className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group"
                        >
                          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                            <option.icon className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900">{option.title}</div>
                            <div className="text-sm text-gray-600">{option.description}</div>
                            <div className="text-sm text-blue-600 font-medium">{option.action}</div>
                          </div>
                          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Secondary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">
                Pobierz Darmowy E-book o Strategii Biznesowej
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Praktyczny przewodnik po strategiach rozwoju dla polskich firm. 
                Metody, narzędzia i case studies w jednym miejscu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold"
                  asChild
                >
                  <Link href="/ebook">
                    Dostęp do E-book
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-900"
                  asChild
                >
                  <Link href="/uslugi">
                    Zobacz Nasze Usługi
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-12 text-center"
          >
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">150+</div>
                <div className="text-xs text-blue-200">Projektów</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">95%</div>
                <div className="text-xs text-blue-200">Zadowolonych</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">12+</div>
                <div className="text-xs text-blue-200">Lat doświadczenia</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
