
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, ArrowRight, Award, Users, Target, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';

const values = [
  {
    icon: Target,
    title: 'Strategiczne Myślenie',
    description: 'Patrzymy na Twój biznes holistycznie, łącząc cele krótkoterminowe z wizją długofalową.'
  },
  {
    icon: Users,
    title: 'Partnerskie Podejście',
    description: 'Nie jesteśmy tylko doradcami - stajemy się częścią Twojego zespołu na czas projektu.'
  },
  {
    icon: Award,
    title: 'Doskonałość Wykonania',
    description: 'Każdy projekt traktujemy jako wizytówkę naszej ekspertyzy i zaangażowania.'
  },
  {
    icon: Lightbulb,
    title: 'Innowacyjność',
    description: 'Wykorzystujemy najnowsze metody i narzędzia, aby zapewnić przewagę konkurencyjną.'
  }
];

const achievements = [
  'Zespół ekspertów z międzynarodowym doświadczeniem',
  'Specjalizacja w transformacji cyfrowej polskich firm',
  'Autorskie metodologie dostosowane do lokalnego rynku',
  'Portfolio klientów z różnych branż i wielkości',
  'Partnerstwa strategiczne z wiodącymi uniwersytetami'
];

export default function AboutSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div>
                <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                  O Strategic Consulting
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Budujemy Przyszłość <span className="text-blue-600">Polskiego Biznesu</span>
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Strategic Consulting to wiodąca polska firma doradcza, specjalizująca się w strategicznym 
                rozwoju przedsiębiorstw. Od ponad dekady pomagamy firmom przekształcać wyzwania w możliwości, 
                a ambicje w osiągnięcia.
              </p>
              
              <p className="text-gray-600 leading-relaxed">
                Nasz zespół składa się z doświadczonych konsultantów, którzy łączą międzynarodową wiedzę 
                z głębokim zrozumieniem polskiego rynku. Dzięki temu oferujemy rozwiązania, które są 
                jednocześnie innowacyjne i praktyczne w implementacji.
              </p>
            </div>

            {/* Achievements List */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Dlaczego warto nam zaufać:</h3>
              <ul className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/o-firmie">
                  Poznaj Nasz Zespół
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/kontakt">
                  Umów Konsultację
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Main Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://www.twoday.com/hs-fs/hubfs/Modern-work-4-3-A.jpg?width=1280&height=1280&name=Modern-work-4-3-A.jpg"
                  alt="Zespół Strategic Consulting - profesjonalni konsultanci"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 border">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">12+</div>
                  <div className="text-sm text-gray-600">lat doświadczenia</div>
                </div>
              </div>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300"
                >
                  <value.icon className="h-8 w-8 text-blue-600 mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                    {value.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 lg:p-12 text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              Nasza Misja
            </h3>
            <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-8">
              „Tworzymy wartość dla polskich przedsiębiorców poprzez strategiczne doradztwo, 
              które łączy globalną wiedzę z lokalną ekspertyzą. Naszym celem jest wspieranie 
              firm w osiąganiu trwałego wzrostu i budowaniu przewagi konkurencyjnej."
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-700">Strategia</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-700">Wykonanie</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-700">Rezultaty</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
