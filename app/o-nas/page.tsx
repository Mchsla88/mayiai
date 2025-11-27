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
import { 
  Target,
  Heart,
  Award,
  Users,
  TrendingUp,
  Shield,
  Sparkles,
  BookOpen,
  CheckCircle,
  Star,
  ArrowRight,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react'

function ONasContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  Poznaj nas bliżej
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Kim Jesteśmy?
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Jesteśmy pierwszą polską marką edukacyjną, która skupia się wyłącznie 
                  na bezpiecznej nauce sztucznej inteligencji dla dzieci i rodzin. 
                  Nasza misja to przygotowanie młodego pokolenia na przyszłość z AI.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Link href="/kontakt">
                      Skontaktuj się z nami
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="relative w-full aspect-square max-w-lg mx-auto">
                  <Image
                    src="/dog-1.png"
                    alt="AI Family Expert - Nasza maskotka"
                    fill
                    className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Target className="w-16 h-16 mx-auto mb-6 text-blue-600" />
              <h2 className="text-4xl font-bold mb-6">Nasza Misja</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Wierzymy, że każde dziecko zasługuje na bezpieczne i świadome wprowadzenie 
                w świat sztucznej inteligencji. Naszą misją jest edukowanie rodzin i nauczycieli, 
                dostarczanie praktycznych narzędzi i budowanie społeczności wokół odpowiedzialnego 
                wykorzystania AI.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: Shield,
                  title: 'Bezpieczeństwo',
                  description: 'Priorytetem jest bezpieczeństwo i prywatność dzieci w cyfrowym świecie',
                  color: 'from-green-500 to-emerald-500',
                  image: '/dog-2.png'
                },
                {
                  icon: BookOpen,
                  title: 'Edukacja',
                  description: 'Dostarczamy wysokiej jakości materiały edukacyjne oparte na najnowszych badaniach',
                  color: 'from-blue-500 to-purple-500',
                  image: '/dog-3.png'
                },
                {
                  icon: Heart,
                  title: 'Społeczność',
                  description: 'Budujemy wspierającą społeczność rodziców, nauczycieli i ekspertów',
                  color: 'from-pink-500 to-red-500',
                  image: '/dog-4.png'
                }
              ].map((value, i) => (
                <Card key={i} className="border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                    <Image
                      src={value.image}
                      alt={value.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform shadow-lg`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold">Nasza Historia</h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      AI Family Expert powstał z potrzeby. Jako rodzice i pedagodzy zauważyliśmy 
                      rosnący niepokój wokół wpływu sztucznej inteligencji na dzieci. 69% rodziców 
                      obawia się negatywnego wpływu AI, a 75% nauczycieli nie ma żadnego szkolenia 
                      w tym obszarze.
                    </p>
                    <p>
                      Postanowiliśmy to zmienić. W 2024 roku zebraliśmy zespół ekspertów z dziedziny 
                      AI, pedagogiki i psychologii dziecięcej, aby stworzyć pierwsze w Polsce 
                      kompleksowe rozwiązanie edukacyjne.
                    </p>
                    <p>
                      Dziś jesteśmy dumni, że pomagamy już ponad 280,000 polskim rodzinom 
                      w bezpiecznym odkrywaniu świata sztucznej inteligencji.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-8 pt-6">
                    <div>
                      <div className="text-4xl font-bold text-blue-600">280,000+</div>
                      <div className="text-gray-600">Rodzin</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-purple-600">15+</div>
                      <div className="text-gray-600">Szkoleń</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-pink-600">4.9/5</div>
                      <div className="text-gray-600">Ocena</div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative w-full aspect-square">
                    <Image
                      src="/dog-5.png"
                      alt="AI Family Expert - Nasza historia"
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">Nasze Wartości</h2>
                <p className="text-xl text-gray-600">
                  To, co nas wyróżnia i czym się kierujemy w codziennej pracy
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    icon: Shield,
                    title: 'Bezpieczeństwo Dzieci',
                    description: 'Bezpieczeństwo i prywatność dzieci są naszym najwyższym priorytetem. Każdy materiał jest dokładnie weryfikowany pod kątem bezpieczeństwa.',
                    features: ['Kontrola rodzicielska', 'Ochrona danych', 'Weryfikowane treści']
                  },
                  {
                    icon: CheckCircle,
                    title: 'Jakość i Rzetelność',
                    description: 'Wszystkie nasze materiały są tworzone przez ekspertów i oparte na najnowszych badaniach naukowych.',
                    features: ['Zespół ekspertów', 'Badania naukowe', 'Regularne aktualizacje']
                  },
                  {
                    icon: Users,
                    title: 'Wspierająca Społeczność',
                    description: 'Budujemy społeczność, w której rodzice i nauczyciele mogą wymieniać się doświadczeniami i wspierać się nawzajem.',
                    features: ['Grupy wsparcia', 'Forum dyskusyjne', 'Webinary ekspertów']
                  },
                  {
                    icon: TrendingUp,
                    title: 'Innowacyjność',
                    description: 'Nieustannie rozwijamy nasze materiały i metody, aby odpowiadać na zmieniające się potrzeby cyfrowego świata.',
                    features: ['Nowe technologie', 'Innowacyjne metody', 'Ciągły rozwój']
                  }
                ].map((value, i) => (
                  <Card key={i} className="border-2 border-gray-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl">
                    <CardContent className="p-8 space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <value.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                      <div className="space-y-2 pt-4">
                        {value.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">Nasz Zespół</h2>
                <p className="text-xl text-gray-600">
                  Eksperci z różnych dziedzin, połączeni wspólną pasją
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: 'Dr Anna Kowalska',
                    role: 'Założycielka & CEO',
                    expertise: 'Pedagogika i psychologia dziecięca',
                    image: '/dog-6.png'
                  },
                  {
                    name: 'Piotr Nowak',
                    role: 'Head of AI Education',
                    expertise: 'Sztuczna inteligencja i machine learning',
                    image: '/dog-7.png'
                  },
                  {
                    name: 'Magdalena Wiśniewska',
                    role: 'Chief Content Officer',
                    expertise: 'Content marketing i edukacja cyfrowa',
                    image: '/dog-0.png'
                  }
                ].map((member, i) => (
                  <Card key={i} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                    <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6 text-center space-y-2">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-blue-600 font-medium">{member.role}</p>
                      <p className="text-sm text-gray-600">{member.expertise}</p>
                      <div className="flex justify-center gap-1 pt-4">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Dołącz do Naszej Społeczności!
              </h2>
              <p className="text-xl text-blue-100">
                Zacznij bezpieczną przygodę z AI już dziś wraz z 280,000+ polskimi rodzinami
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button asChild size="lg" variant="secondary" className="text-lg">
                  <Link href="/oferta">
                    Zobacz naszą ofertę
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600">
                  <Link href="/kontakt">Skontaktuj się</Link>
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

export default function ONasPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'Takiehaslo1!') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Nieprawidłowe hasło')
      setPassword('')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Navbar />
        
        <main className="flex-1 flex items-center justify-center px-4 pt-16">
          <Card className="w-full max-w-md shadow-2xl border-0">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Strona Chroniona
                </h2>
                <p className="text-gray-600">
                  Wprowadź hasło aby zobaczyć tę stronę
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Hasło
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10"
                      placeholder="Wprowadź hasło"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {error && (
                    <p className="text-sm text-red-600 mt-1">{error}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Odblokuj
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    )
  }

  return <ONasContent />
}
