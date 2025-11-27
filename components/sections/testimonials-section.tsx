
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Anna Kowalska',
    position: 'CEO',
    company: 'TechInnovate Sp. z o.o.',
    image: 'https://aicontentfy-customer-images.s3.eu-central-1.amazonaws.com/4419c92a-2cd0-4188-a100-09b8382746e1.webp',
    content: 'Strategic Consulting pomógł nam przeprowadzić kompleksową transformację cyfrową. Dzięki ich wsparciu zwiększyliśmy efektywność operacyjną o 40% i znacząco poprawiliśmy satysfakcję klientów. Zespół wykazał się niesamowitą ekspertyzą i zaangażowaniem.',
    rating: 5,
    results: {
      metric: 'Wzrost efektywności',
      value: '40%'
    }
  },
  {
    id: 2,
    name: 'Marek Wiśniewski',
    position: 'Dyrektor Zarządzający',
    company: 'Manufacturing Excellence',
    image: 'https://static.vecteezy.com/system/resources/previews/010/167/559/large_2x/professional-businessman-and-businesswoman-partners-shaking-hands-together-with-business-success-deal-and-agreement-hands-business-teamwork-handshaking-at-office-desk-partnership-shaking-hands-photo.jpg',
    content: 'Współpraca z Strategic Consulting była kluczowa dla rozwoju naszej firmy. Ich analiza rynku i strategia ekspansji pozwoliły nam wejść na nowe rynki i zwiększyć przychody o 55% w ciągu 18 miesięcy. Polecam bez wahania.',
    rating: 5,
    results: {
      metric: 'Wzrost przychodów',
      value: '55%'
    }
  },
  {
    id: 3,
    name: 'Katarzyna Nowak',
    position: 'Właścicielka',
    company: 'E-commerce Solutions',
    image: 'https://www.pwc.com/us/en/assets/image/AdobeStock_614800397.jpeg',
    content: 'Dzięki doradcom z Strategic Consulting udało nam się zoptymalizować procesy biznesowe i wdrożyć nowoczesne technologie. Rezultat? Redukcja kosztów o 25% przy jednoczesnym wzroście jakości usług. To była jedna z najlepszych decyzji biznesowych.',
    rating: 5,
    results: {
      metric: 'Redukcja kosztów',
      value: '25%'
    }
  },
  {
    id: 4,
    name: 'Piotr Zieliński',
    position: 'Prezes Zarządu',
    company: 'Financial Services Group',
    image: 'https://aicontentfy-customer-images.s3.eu-central-1.amazonaws.com/4419c92a-2cd0-4188-a100-09b8382746e1.webp',
    content: 'Strategic Consulting wyróżnia się profesjonalizmem i głęboką znajomością polskiego rynku. Ich strategia rozwoju pomogła nam osiągnąć pozycję lidera w naszej branży. Zespół jest zawsze dostępny i gotowy do wsparcia.',
    rating: 5,
    results: {
      metric: 'Pozycja rynkowa',
      value: '#1'
    }
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex] || testimonials[0];

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
            Co Mówią Nasi <span className="text-blue-600">Klienci</span>
          </h2>
          <p className="text-xl text-gray-600">
            Poznaj opinie przedsiębiorców, którzy zaufali Strategic Consulting 
            i osiągnęli wybitne rezultaty biznesowe dzięki naszemu wsparciu.
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          <Card className="border-0 shadow-2xl bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-800" />
            
            <CardContent className="p-8 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                {/* Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Quote Icon */}
                  <Quote className="h-12 w-12 text-blue-600" />
                  
                  {/* Rating */}
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  {/* Testimonial Text */}
                  <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed italic">
                    "{currentTestimonial?.content}"
                  </blockquote>
                  
                  {/* Author Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">
                        {currentTestimonial?.name}
                      </div>
                      <div className="text-gray-600">
                        {currentTestimonial?.position}
                      </div>
                      <div className="text-sm text-gray-500">
                        {currentTestimonial?.company}
                      </div>
                    </div>
                    
                    {/* Results Badge */}
                    <div className="bg-green-100 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {currentTestimonial?.results?.value}
                      </div>
                      <div className="text-xs text-green-700 font-medium">
                        {currentTestimonial?.results?.metric}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Image */}
                <div className="lg:col-span-1">
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={currentTestimonial?.image || '/placeholder.jpg'}
                      alt={`${currentTestimonial?.name} - ${currentTestimonial?.company}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center items-center space-x-6 mt-8"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={prevTestimonial}
            className="rounded-full w-10 h-10 p-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={nextTestimonial}
            className="rounded-full w-10 h-10 p-0"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Statistics Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <div className="bg-blue-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-6">Średnie Rezultaty Naszych Klientów</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">45%</div>
                <div className="text-blue-100">Wzrost przychodów</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">30%</div>
                <div className="text-blue-100">Redukcja kosztów</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">95%</div>
                <div className="text-blue-100">Zadowolenie klientów</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
