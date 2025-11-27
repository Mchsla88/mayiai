
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle, TrendingUp, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
  'Strategia dostosowana do Twojej firmy',
  'Zespół ekspertów z 10+ letnim doświadczeniem',
  'Wsparcie w całym procesie implementacji',
  'Mierzalne rezultaty już w pierwszym kwartale'
];

const stats = [
  { number: 150, label: 'Zrealizowanych projektów', suffix: '+' },
  { number: 95, label: 'Zadowolonych klientów', suffix: '%' },
  { number: 45, label: 'Średni wzrost przychodów', suffix: '%' },
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="hero-gradient text-white relative overflow-hidden">
        <div className="section-container section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-16 bg-gray-200 rounded mb-6 animate-pulse" />
            <div className="h-32 bg-gray-200 rounded mb-8 animate-pulse" />
            <div className="flex gap-4 justify-center">
              <div className="h-12 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-12 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-gradient text-white relative overflow-hidden min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="https://assets.entrepreneur.com/content/3x2/2000/1690540045-Shutterstock-2101931002.jpg?format=pjeg&auto=webp&crop=16:9"
            alt="Profesjonalni konsultanci strategiczni w nowoczesnym biurze"
            fill
            className="object-cover opacity-20"
            priority
            sizes="100vw"
          />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-transparent z-10" />

      <div className="section-container relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl lg:text-6xl font-bold leading-tight"
              >
                Przekształcamy{' '}
                <span className="text-gradient bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  strategie
                </span>{' '}
                w{' '}
                <span className="text-gradient bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  sukces
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl"
              >
                Profesjonalne doradztwo strategiczne dla polskich firm. 
                Zwiększ przychody, zoptymalizuj procesy i przygotuj się na przyszłość z naszymi ekspertami.
              </motion.p>
            </div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-3"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-200">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 text-lg group transition-all duration-300"
                asChild
              >
                <Link href="/kontakt">
                  Bezpłatna Konsultacja
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg group transition-all duration-300"
                asChild
              >
                <Link href="/ebook">
                  <Play className="mr-2 h-5 w-5" />
                  Pobierz E-book Strategii
                </Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl lg:text-3xl font-bold text-yellow-400">
                    <AnimatedNumber value={stat.number} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl" />
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <Target className="h-8 w-8 text-yellow-400 mb-2" />
                    <h4 className="text-lg font-semibold mb-2">Strategia</h4>
                    <p className="text-sm text-gray-300">Kompleksowe planowanie rozwoju firmy</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <TrendingUp className="h-8 w-8 text-green-400 mb-2" />
                    <h4 className="text-lg font-semibold mb-2">Wzrost</h4>
                    <p className="text-sm text-gray-300">Zwiększanie przychodów i rentowności</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <Users className="h-8 w-8 text-blue-400 mb-2" />
                    <h4 className="text-lg font-semibold mb-2">Zespół</h4>
                    <p className="text-sm text-gray-300">Doświadczeni konsultanci</p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <CheckCircle className="h-8 w-8 text-purple-400 mb-2" />
                    <h4 className="text-lg font-semibold mb-2">Rezultaty</h4>
                    <p className="text-sm text-gray-300">Mierzalne efekty biznesowe</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Animated Number Component
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const increment = value / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue}</span>;
}
