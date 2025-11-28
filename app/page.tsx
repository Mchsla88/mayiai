'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { 
  Shield, 
  BookOpen, 
  Users, 
  Sparkles, 
  Heart, 
  Brain,
  CheckCircle,
  ArrowRight,
  Award,
  Zap,
  Target,
  Star,
  TrendingUp,
  Lock,
  Lightbulb,
  Smile,
  GraduationCap
} from 'lucide-react'
import { OrganizationStructuredData, EducationalOrganizationStructuredData, WebsiteStructuredData } from '@/components/structured-data'
import { ParticlesBackground } from '@/components/animations/ParticlesBackground'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { FloatingElement } from '@/components/animations/FloatingElement'
import { GlassmorphCard } from '@/components/animations/GlassmorphCard'
import { MagneticButton } from '@/components/animations/MagneticButton'
import { useRef } from 'react'
import { TrainingSlider } from '@/components/training-slider'

export default function HomePage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <div className="min-h-screen flex flex-col bg-white" ref={ref}>
      <OrganizationStructuredData />
      <EducationalOrganizationStructuredData />
      <WebsiteStructuredData />
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section - Mega Modern */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 min-h-[100vh] flex items-center py-20 md:py-32">
          <ParticlesBackground />
          
          {/* Animated 3D shapes */}
          <motion.div 
            className="absolute inset-0 overflow-hidden"
            style={{ y: smoothY, opacity }}
          >
            <div className="absolute top-20 left-10 w-96 h-96 bg-purple-400/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-40 right-10 w-96 h-96 bg-pink-400/40 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-40 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </motion.div>

          <div className="w-full max-w-[1800px] mx-auto px-12 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div 
                  className="inline-flex items-center gap-2 px-6 py-3 glass-effect rounded-full text-sm font-medium backdrop-blur-md border border-white/30 shadow-xl"
                  animate={{ 
                    boxShadow: [
                      '0 0 20px rgba(59, 130, 246, 0.3)',
                      '0 0 40px rgba(168, 85, 247, 0.4)',
                      '0 0 20px rgba(59, 130, 246, 0.3)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </motion.div>
                  <span className="text-gradient font-bold">Pierwsza marka edukacyjna AI dla dzieci w Polsce</span>
                </motion.div>
                
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <motion.span 
                    className="text-gradient animate-gradient inline-block"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    Bezpieczna Nauka AI
                  </motion.span>
                  <br />
                  <span className="text-gray-800">dla Twojego Dziecka</span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Pierwsza polska marka edukacyjna skupiona na sztucznej inteligencji dla rodzin. 
                  Pomożemy Ci i Twojemu dziecku bezpiecznie odkryć świat AI - z pasją, zabawą i odpowiedzialnością!
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <MagneticButton>
                    <Button asChild size="lg" className="text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 group relative overflow-hidden">
                      <Link href="/oferta">
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <span className="relative z-10 flex items-center">
                          Sprawdź naszą ofertę
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </span>
                      </Link>
                    </Button>
                  </MagneticButton>
                  <MagneticButton>
                    <Button asChild size="lg" variant="outline" className="text-lg border-2 glass-effect hover:bg-white/50 backdrop-blur-md shadow-xl">
                      <Link href="/o-nas">Dowiedz się więcej</Link>
                    </Button>
                  </MagneticButton>
                </motion.div>

                <motion.div 
                  className="grid grid-cols-3 gap-4 pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {[
                    { icon: Shield, text: '100% Bezpieczne', color: 'text-green-600', delay: 0 },
                    { icon: Heart, text: 'Dla Rodzin', color: 'text-red-500', delay: 0.1 },
                    { icon: Award, text: 'Wartościowe', color: 'text-yellow-600', delay: 0.2 }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center gap-2 p-4 glass-effect rounded-2xl backdrop-blur-md border border-white/30 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group perspective-1000"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.9 + item.delay }}
                      whileHover={{ scale: 1.05, rotateY: 10 }}
                    >
                      <motion.div
                        className="relative"
                        animate={{ rotate: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: item.delay }}
                      >
                        <item.icon className={`w-8 h-8 ${item.color}`} />
                      </motion.div>
                      <span className="text-sm font-semibold text-center">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <FloatingElement duration={4}>
                  <motion.div 
                    className="relative w-full aspect-square max-w-lg mx-auto"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-purple-500/40 to-pink-500/40 rounded-full blur-3xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <Image
                      src="/dog-mascot-office.png"
                      alt="AI Family Expert - Pies przy komputerach"
                      fill
                      className="object-contain drop-shadow-2xl relative z-10"
                      priority
                    />
                  </motion.div>
                </FloatingElement>
              </motion.div>
            </div>
          </div>
        </section>



        {/* Problem Section - Ultra Modern */}
        <section className="py-20 relative overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100"></div>
          
          <div className="w-full px-12 relative z-10">
            <ScrollReveal direction="up">
              <div className="text-center mb-16">
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold mb-6"
                  whileInView={{ scale: [0.9, 1.05, 1] }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className="text-gradient">Dlaczego AI Family Expert?</span>
                </motion.h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  <strong className="text-red-600">69% rodziców</strong> obawia się negatywnego wpływu AI na dzieci, 
                  a <strong className="text-red-600">75% nauczycieli</strong> nie ma żadnego szkolenia z AI. 
                  Nie pozwól, by Twoje dziecko zostało w tyle!
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8 ">
              {[
                {
                  icon: Shield,
                  title: 'Bezpieczeństwo\nPrzede Wszystkim',
                  description: 'Uczymy, jak bezpiecznie korzystać z AI, zachowując pełną kontrolę rodzicielską i chroniąc prywatność Twojego dziecka w cyfrowym świecie.',
                  badge: 'Weryfikowane treści',
                  color: 'blue',
                  gradient: 'from-purple-400 to-pink-600',
                  image: '/dog-classroom.png',
                  delay: 0
                },
                {
                  icon: Lightbulb,
                  title: 'Praktyczna\nEdukacja',
                  description: 'Konkretne przykłady, interaktywne ćwiczenia i gotowe materiały, które możesz użyć od razu z Twoim dzieckiem - bez zbędnej teorii!',
                  badge: 'Natychmiastowe efekty',
                  color: 'purple',
                  gradient: 'from-purple-400 to-purple-600',
                  image: '/dog-office-pro.png',
                  delay: 0.2
                },
                {
                  icon: Users,
                  title: 'Dla Całej\nRodziny',
                  description: 'Materiały dostosowane zarówno dla rodziców, jak i dzieci w różnym wieku. Uczymy się razem i budujemy cyfrową przyszłość!',
                  badge: 'Wspólna przygoda',
                  color: 'pink',
                  gradient: 'from-pink-400 to-pink-600',
                  image: '/dog-home.png',
                  delay: 0.4
                }
              ].map((card, i) => (
                <ScrollReveal key={i} direction="up" delay={card.delay}>
                  <GlassmorphCard className="h-full">
                    <CardContent className="pt-8 text-center space-y-6 h-full flex flex-col">
                      <motion.div 
                        className="relative"
                        whileHover={{ y: -10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <motion.div
                          className={`absolute inset-0 bg-${card.color}-500/20 rounded-full blur-xl`}
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div 
                          className={`relative w-20 h-20 bg-gradient-to-br ${card.gradient} rounded-full flex items-center justify-center mx-auto shadow-2xl`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <card.icon className="w-10 h-10 text-white" />
                        </motion.div>
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-gray-800 whitespace-pre-line">{card.title}</h3>
                      <p className="text-gray-600 leading-relaxed flex-grow">
                        {card.description}
                      </p>
                      
                      <motion.div 
                        className={`flex items-center justify-center gap-2 text-${card.color}-600 font-medium`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>{card.badge}</span>
                      </motion.div>
                    </CardContent>
                  </GlassmorphCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section - Rozbudowany z grafikami */}
        <section className="py-20 bg-white">
          <div className="w-full px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Co Zyskasz Dzięki Nam?
              </h2>
              <p className="text-xl text-gray-600">
                Kompleksowe wsparcie w edukacji AI dla całej rodziny
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 ">
              {[
                {
                  icon: Brain,
                  title: 'Rozwój Kreatywności i Umiejętności',
                  description: 'AI jako narzędzie wspierające kreatywność, krytyczne myślenie i pomysłowość dziecka. Twoje dziecko nauczy się wykorzystywać technologię jako partnera w nauce.',
                  color: 'from-purple-500 to-pink-500',
                  bgColor: 'bg-purple-50',
                  features: ['Kreatywne projekty', 'Rozwiązywanie problemów', 'Innowacyjne myślenie']
                },
                {
                  icon: Shield,
                  title: 'Bezpieczeństwo i Świadomość Cyfrowa',
                  description: 'Wiedza, że Twoje dziecko korzysta z AI w bezpieczny i odpowiedzialny sposób. Nauczysz się wspierać i rozumieć cyfrową aktywność swojego dziecka.',
                  color: 'from-green-500 to-emerald-500',
                  bgColor: 'bg-green-50',
                  features: ['Świadome korzystanie', 'Ochrona danych', 'Bezpieczne narzędzia']
                },
                {
                  icon: TrendingUp,
                  title: 'Przewaga Edukacyjna i Zawodowa',
                  description: 'Twoje dziecko będzie przygotowane na przyszłość z AI. Umiejętności, które zdobędzie już dziś, będą kluczowe w każdej przyszłej karierze.',
                  color: 'from-purple-500 to-pink-500',
                  bgColor: 'bg-purple-50',
                  features: ['Umiejętności przyszłości', 'Lepsze wyniki w nauce', 'Przewaga konkurencyjna']
                },
                {
                  icon: Heart,
                  title: 'Dostęp do Społeczności',
                  description: 'Praktyczne porady, sprawdzone narzędzia i społeczność wspierająca dla rodziców, którzy chcą aktywnie uczestniczyć w cyfrowej edukacji dzieci.',
                  color: 'from-red-500 to-orange-500',
                  bgColor: 'bg-red-50',
                  features: ['Społeczność rodziców', 'Regularne aktualizacje treści', 'Materiały edukacyjne']
                }
              ].map((benefit, i) => (
                <div key={i} className={`flex flex-col gap-6 p-8 ${benefit.bgColor} rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}>
                  <div className="flex gap-6 items-start">
                    <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:rotate-6 transition-transform shadow-lg`}>
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-gray-800">{benefit.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{benefit.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {benefit.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className={`w-4 h-4 bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`} />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Content Section - Ultra Modern */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
          <ParticlesBackground />
          
          <div className="w-full px-12 relative z-10">
            <ScrollReveal direction="up">
              <div className="text-center mb-16">
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold mb-6"
                  whileInView={{ scale: [0.9, 1.05, 1] }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className="text-gradient">Nasza Oferta</span>
                </motion.h2>
                <p className="text-xl text-gray-600">
                  12-miesięczny dostęp do szkoleń z AI dla Twojej rodziny
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <TrainingSlider />
            </ScrollReveal>
          </div>
        </section>

        {/* Consequences Section - Nowa sekcja o konsekwencjach */}
        <section className="py-20 bg-white">
          <div className="w-full px-12">
            <div className="">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  Konsekwencje Ignorowania Edukacji AI
                </h2>
                <p className="text-xl text-gray-600">
                  Czy wiesz, jakie skutki może mieć brak przygotowania dziecka na świat sztucznej inteligencji?
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {[
                  {
                    title: 'Cyfrowe wykluczenie',
                    description: 'Dzieci, które nie będą rozumieć AI, mogą zostać wykluczone z przyszłego rynku pracy. Już teraz 85% zawodów w 2030 roku wymaga będzie umiejętności związanych z technologią.',
                    icon: '🚫',
                    stat: '85% zawodów będzie wymagać umiejętności AI',
                    source: 'Źródło: World Economic Forum, Future of Jobs Report 2023'
                  },
                  {
                    title: 'Brak krytycznego myślenia',
                    description: 'Bez edukacji o AI dzieci nie nauczą się krytycznie oceniać informacji generowanych przez sztuczną inteligencję. To może prowadzić do manipulacji i dezinformacji.',
                    icon: '🧠',
                    stat: '74% dorosłych nie rozumie AI',
                    source: 'Źródło: Pew Research Center 2023'
                  },
                  {
                    title: 'Zagubienie w cyfrowym świecie',
                    description: 'Dzieci bez podstawowej wiedzy o AI mogą stać się biernymi konsumentami technologii, zamiast jej świadomymi użytkownikami i twórcami.',
                    icon: '😟',
                    stat: '92% rodziców czuje się zagubiona',
                    source: 'Źródło: European Commission, Digital Education Report 2024'
                  },
                  {
                    title: 'Utrata przewagi konkurencyjnej',
                    description: 'W świecie, gdzie AI staje się standardem, dzieci bez tej wiedzy będą miały mniejsze szanse na sukces edukacyjny i zawodowy.',
                    icon: '📉',
                    stat: '67% młodych bez kompetencji AI',
                    source: 'Źródło: OECD Skills Outlook 2023'
                  }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border-2 border-red-100 hover:shadow-xl transition-all duration-300">
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-bold">
                        {item.stat}
                      </div>
                      <p className="text-xs text-gray-500 italic">{item.source}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="text-4xl sm:text-5xl md:text-6xl flex-shrink-0">⚠️</div>
                  <div className="flex-1 w-full">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Działaj Teraz, Zanim Będzie Za Późno!</h3>
                    <p className="text-sm sm:text-base md:text-xl text-red-100 mb-4 sm:mb-6 leading-relaxed">
                      Każdy dzień bez edukacji AI to dzień straconych możliwości dla Twojego dziecka. 
                      Świat zmienia się w tempie, którego nie możemy ignorować. Dzieci, które dziś uczą się o AI, 
                      jutro będą liderami, twórcami i innowatorami. Nie pozwól, by Twoje dziecko zostało w tyle!
                    </p>
                    <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-white text-red-600 hover:bg-gray-100">
                      <Link href="/oferta" className="flex items-center justify-center">
                        <span>Zacznij Naukę Już Dziś</span>
                        <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Parent Concerns Section - Nowa sekcja o obawach rodziców */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="w-full px-12">
            <div className="">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  Najczęstsze Obawy Rodziców o AI
                </h2>
                <p className="text-xl text-gray-600">
                  I dlaczego są one błędne, gdy masz odpowiednie wsparcie
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    concern: '"AI zastąpi kreatywność mojego dziecka"',
                    truth: 'To mit! AI to narzędzie, które WSPIERA kreatywność, nie zastępuje jej.',
                    details: 'Badania pokazują, że dzieci, które uczą się używać AI jako narzędzia wspierającego, rozwijają większą kreatywność i innowacyjność. AI pomaga realizować pomysły, które wcześniej były poza zasięgiem. To jak ołówek - nikt nie mówi, że ołówek zastąpi kreatywność, bo to tylko narzędzie. Tak samo jest z AI.',
                    icon: '🎨'
                  },
                  {
                    concern: '"AI jest zbyt skomplikowane dla dzieci"',
                    truth: 'Nieprawda! Dzieci uczą się technologii szybciej niż dorośli.',
                    details: 'Nowoczesne narzędzia AI są zaprojektowane z myślą o intuicyjnym użytkowaniu. Dzieci naturalnie rozumieją technologię - wystarczy im pokazać właściwą drogę. Nasze szkolenia są dostosowane do wieku i poziomu rozwoju dziecka, co sprawia, że nauka jest łatwa i przyjemna.',
                    icon: '🧩'
                  },
                  {
                    concern: '"AI jest niebezpieczne dla prywatności"',
                    truth: 'Może być, ale nie musi! Wszystko zależy od edukacji.',
                    details: 'Nauczając dzieci świadomego korzystania z AI, uczysz je jednocześnie dbałości o prywatność. To jak nauka bezpiecznego korzystania z internetu - nie rezygnujemy z technologii, ale uczymy się jej bezpiecznego używania. Nasze programy kładą ogromny nacisk na bezpieczeństwo i ochronę danych.',
                    icon: '🔒'
                  },
                  {
                    concern: '"Moje dziecko spędzi jeszcze więcej czasu przed ekranem"',
                    truth: 'AI może pomóc w ZMNIEJSZENIU czasu ekranowego!',
                    details: 'Paradoksalnie, świadome użycie AI może pomóc dzieciom efektywniej wykonywać zadania, co daje im WIĘCEJ czasu na aktywności poza ekranem. AI może pomóc w organizacji czasu, planowaniu zadań i szybszej nauce. To nie o ilości czasu chodzi, ale o jakość tego czasu.',
                    icon: '⏰'
                  },
                  {
                    concern: '"Wolę tradycyjną naukę bez technologii"',
                    truth: 'Tradycja + nowoczesność = najlepsza kombinacja!',
                    details: 'Nikt nie mówi o całkowitym zastąpieniu tradycyjnej nauki! Chodzi o UZUPEŁNIENIE jej o umiejętności XXI wieku. Dzieci wciąż potrzebują książek, rozmów i tradycyjnej nauki - AI to dodatkowe narzędzie, które wzbogaca ich edukację. To jak kalkulator w matematyce - nie zastępuje liczenia w pamięci, ale pozwala skupić się na bardziej złożonych problemach.',
                    icon: '📚'
                  },
                  {
                    concern: '"To tylko chwilowa moda, AI nie przetrwa"',
                    truth: 'AI to nie moda - to rewolucja technologiczna!',
                    details: 'AI to nie trend, który przeminie. To fundamentalna zmiana w sposobie, w jaki funkcjonuje świat - podobnie jak internet czy smartfony. Giganci technologiczni inwestują miliardy w rozwój AI, a rządy wprowadzają AI do programów nauczania. Pytanie nie brzmi "czy AI zostanie", ale "czy moje dziecko będzie na to przygotowane".',
                    icon: '🚀'
                  }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-purple-100">
                    <div className="flex items-start gap-6">
                      <div className="text-5xl flex-shrink-0">{item.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-red-600 mb-2">{item.concern}</h3>
                        <div className="text-xl font-bold text-green-600 mb-4">
                          ✅ Prawda: {item.truth}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{item.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-2xl shadow-2xl text-center">
                <h3 className="text-3xl font-bold mb-4">Masz Więcej Pytań?</h3>
                <p className="text-xl text-pink-100 mb-6 leading-relaxed">
                  Rozumiemy Twoje obawy! Każdy rodzic chce dla swojego dziecka jak najlepiej. 
                  Dlatego przygotowaliśmy materiały, które rozwieją wszystkie wątpliwości.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-4 bg-white text-blue-600 hover:bg-gray-100">
                    <Link href="/blog">
                      Przeczytaj Nasz Blog
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600">
                    <Link href="/kontakt">Zapytaj Nas Bezpośrednio</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Preview Section - zamiast newslettera */}
        <section className="py-20 bg-white">
          <div className="w-full px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Najnowsze Wpisy z Bloga
              </h2>
              <p className="text-xl text-gray-600">
                Praktyczne porady, wskazówki i najnowsze informacje o AI dla rodzin
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: 'Jak rozmawiać z dzieckiem o AI?',
                  excerpt: 'Praktyczny przewodnik dla rodziców, którzy chcą wprowadzić temat sztucznej inteligencji w sposób zrozumiały i bezpieczny.',
                  image: '/dog-1.png',
                  date: '10 października 2025',
                  category: 'Poradnik'
                },
                {
                  title: '5 najlepszych narzędzi AI dla dzieci',
                  excerpt: 'Przegląd bezpiecznych i edukacyjnych narzędzi AI, które pomogą Twojemu dziecku w nauce i kreatywności.',
                  image: '/dog-2.png',
                  date: '8 października 2025',
                  category: 'Narzędzia'
                },
                {
                  title: 'AI w szkole - co powinni wiedzieć nauczyciele?',
                  excerpt: 'Kompleksowy przewodnik dla pedagogów o tym, jak wprowadzać AI do programu nauczania w bezpieczny sposób.',
                  image: '/dog-3.png',
                  date: '5 października 2025',
                  category: 'Edukacja'
                }
              ].map((post, i) => (
                <Card key={i} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                  <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                        {post.category}
                      </span>
                      <span className="text-gray-500">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <Button asChild variant="link" className="p-0 h-auto text-blue-600 group/btn">
                      <Link href="/blog">
                        Czytaj więcej
                        <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button asChild size="lg" variant="outline" className="border-2">
                <Link href="/blog">
                  Zobacz wszystkie wpisy
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section - Ultra Modern */}
        <section className="py-20 relative overflow-hidden">
          {/* Animated gradient background */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: '200% 200%' }}
          />
          
          {/* Particle effect overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse-glow"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse-glow animation-delay-2000"></div>
          </div>
          
          <div className="w-full px-12 text-center relative z-10">
            <ScrollReveal direction="up">
              <div className="space-y-8">
                <motion.div 
                  className="inline-flex items-center gap-2 px-6 py-3 glass-effect rounded-full text-lg font-medium text-white shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  Dołącz do rodzin myślących o przyszłości
                </motion.div>
                
                <motion.h2 
                  className="text-4xl md:text-6xl font-bold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  Zacznij Przygodę z AI Już Dziś!
                </motion.h2>
                
                <motion.p 
                  className="text-2xl text-white/90 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Nie pozwól, by Twoje dziecko zostało w tyle. Zacznij edukację AI już dziś 
                  i przygotuj swoją rodzinę na przyszłość!
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-6 justify-center pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <MagneticButton>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6 text-purple-600 hover:bg-white shadow-2xl hover:shadow-white/50 transition-all group relative overflow-hidden">
                        <Link href="/oferta">
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-white to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />
                          <span className="relative z-10 flex items-center">
                            12-miesięczny dostęp do szkoleń
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                          </span>
                        </Link>
                      </Button>
                    </motion.div>
                  </MagneticButton>
                  
                  <MagneticButton>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 glass-effect border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all shadow-2xl backdrop-blur-md">
                        <Link href="/kontakt">Skontaktuj się z nami</Link>
                      </Button>
                    </motion.div>
                  </MagneticButton>
                </motion.div>

                <motion.div 
                  className="flex items-center justify-center gap-8 pt-8 flex-wrap"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {[
                    'Bezpieczne płatności',
                    'Natychmiastowy dostęp',
                    'Wsparcie dla rodzin'
                  ].map((text, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <CheckCircle className="w-6 h-6 text-green-300" />
                      <span className="text-lg text-white font-medium">{text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
