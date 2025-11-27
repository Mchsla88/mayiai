
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Target, BarChart3, TrendingUp, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useInView } from 'react-intersection-observer';

const services = [
  {
    id: 'konsulting-strategiczny',
    title: 'Konsulting Strategiczny',
    description: 'Kompleksowe doradztwo w zakresie strategii biznesowej, planowania rozwoju i osiągania celów długoterminowych.',
    icon: Target,
    image: 'https://assets.entrepreneur.com/content/3x2/2000/1690540045-Shutterstock-2101931002.jpg?format=pjeg&auto=webp&crop=16:9',
    features: [
      'Analiza strategiczna i diagnoza',
      'Planowanie długoterminowe',
      'Implementacja strategii',
      'Monitoring i optymalizacja'
    ],
    benefits: 'Średnio 35% wzrost efektywności operacyjnej',
    href: '/uslugi/konsulting-strategiczny'
  },
  {
    id: 'analiza-rynku',
    title: 'Analiza Rynku',
    description: 'Dogłębna analiza otoczenia konkurencyjnego, identyfikacja szans rynkowych i pozycjonowanie firmy.',
    icon: BarChart3,
    image: 'https://www.precedenceresearch.com/insightimg/data-analytics-market-size.webp',
    features: [
      'Badania konkurencji',
      'Analiza segmentacji',
      'Identyfikacja trendów',
      'Rekomendacje strategiczne'
    ],
    benefits: 'Wzrost udziału w rynku o 25%',
    href: '/uslugi/analiza-rynku'
  },
  {
    id: 'transformacja-cyfrowa',
    title: 'Transformacja Cyfrowa',
    description: 'Modernizacja procesów biznesowych, implementacja nowoczesnych technologii i zwiększenie konkurencyjności.',
    icon: TrendingUp,
    image: 'https://cdn.prod.website-files.com/67ce97e7604527424a0f1bfc/689380cf6c1d1eb33fc36e52_ai-%252B-rpa-%252B-digital-transformation-_-the-trifecta-of-business-growth-digital-transformation_-driving-change-across-industries-394216186.jpeg',
    features: [
      'Audit cyfrowy',
      'Roadmap transformacji',
      'Implementacja technologii',
      'Change management'
    ],
    benefits: 'Redukcja kosztów o 30%',
    href: '/uslugi/transformacja-cyfrowa'
  },
  {
    id: 'strategie-rozwoju',
    title: 'Strategie Rozwoju',
    description: 'Planowanie ekspansji, rozwój nowych produktów/usług oraz optymalizacja modeli biznesowych.',
    icon: Users,
    image: 'https://thumbs.dreamstime.com/b/hand-gestures-towards-upward-trending-graph-symbolizing-market-success-investment-growth-financial-growth-visualization-354663041.jpg',
    features: [
      'Strategie wzrostu',
      'Ekspansja geograficzna',
      'Rozwój produktów',
      'Modele biznesowe'
    ],
    benefits: 'Zwiększenie przychodów o 45%',
    href: '/uslugi/strategie-rozwoju'
  }
];

export default function ServicesSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="section-padding bg-gray-50">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Nasze Usługi <span className="text-blue-600">Konsultingowe</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Oferujemy kompleksowe doradztwo strategiczne dopasowane do potrzeb Twojej firmy. 
            Każda usługa to praktyczne rozwiązania przynoszące mierzalne rezultaty biznesowe.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full group hover:shadow-2xl transition-all duration-300 border-0 bg-white">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="relative h-48 w-full">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center">
                        <service.icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Co obejmuje:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-900">{service.benefits}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button 
                    asChild 
                    className="w-full group bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Link href={service.href}>
                      Dowiedz się więcej
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Nie wiesz, która usługa jest dla Ciebie?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Umów bezpłatną konsultację z naszym ekspertem. Przeanalizujemy Twoją sytuację biznesową 
              i zaproponujemy najbardziej odpowiednie rozwiązania.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-blue-600 hover:bg-gray-100"
                asChild
              >
                <Link href="/kontakt">
                  Bezpłatna Konsultacja
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600"
                asChild
              >
                <Link href="/o-firmie">
                  O naszym zespole
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
