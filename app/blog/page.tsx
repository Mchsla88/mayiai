
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowRight,
  Calendar,
  User,
  Tag,
  TrendingUp,
  BookOpen,
  Shield,
  Lightbulb,
  Users,
  Brain,
  Sparkles
} from 'lucide-react'

const categories = [
  { name: 'Wszystkie', slug: 'wszystkie', count: 24 },
  { name: 'Poradniki', slug: 'poradniki', count: 8 },
  { name: 'Narzędzia', slug: 'narzedzia', count: 6 },
  { name: 'Edukacja', slug: 'edukacja', count: 5 },
  { name: 'Bezpieczeństwo', slug: 'bezpieczenstwo', count: 5 },
]

const featuredPost = {
  title: 'Kompletny Przewodnik: Jak rozmawiać z dzieckiem o AI?',
  excerpt: 'Sztuczna inteligencja już teraz zmienia świat, w którym dorastają nasze dzieci. Jako rodzice mamy obowiązek przygotować je na tę rzeczywistość. W tym obszernym przewodniku znajdziesz wszystko, czego potrzebujesz, by rozpocząć tę ważną rozmowę. Dowiedz się, jak w prosty sposób wyjaśnić dziecku czym jest AI, jakie są jej zastosowania w codziennym życiu, jak rozmawiać o bezpieczeństwie i prywatności, oraz jak wspierać dziecko w nauce o sztucznej inteligencji. Artykuł zawiera praktyczne przykłady rozmów, pytania które możesz zadać dziecku, oraz wskazówki jak dostosować przekaz do wieku dziecka.',
  image: '/dog-mascot-office.png',
  author: 'Ekspert May I AI',
  date: '10 października 2025',
  readTime: '18 min',
  category: 'Poradnik',
  featured: true
}

const blogPosts = [
  {
    title: '5 najlepszych narzędzi AI dla dzieci - bezpieczne i edukacyjne',
    excerpt: 'Przegląd najlepszych, sprawdzonych narzędzi AI, które pomogą Twojemu dziecku w nauce, kreatywności i rozwijaniu umiejętności przyszłości. W artykule omówiono szczegółowo każde narzędzie, jego zastosowanie, zalety i potencjalne zagrożenia. Dowiesz się, jak bezpiecznie korzystać z tych narzędzi, jakie ustawienia prywatności zastosować, oraz jak monitorować aktywność dziecka. Każde narzędzie zostało przetestowane przez naszych ekspertów pod kątem bezpieczeństwa, użyteczności edukacyjnej i odpowiedniości dla różnych grup wiekowych.',
    image: '/dog-1.png',
    author: 'Ekspert May I AI',
    date: '8 października 2025',
    readTime: '15 min',
    category: 'Narzędzia',
    icon: Lightbulb,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    title: 'AI w szkole - co powinni wiedzieć nauczyciele i rodzice?',
    excerpt: 'Kompleksowy przewodnik dla pedagogów i rodziców o tym, jak wprowadzać AI do programu nauczania w bezpieczny i efektywny sposób. Artykuł omawia najnowsze trendy w edukacji z wykorzystaniem AI, przedstawia konkretne przykłady zastosowań w różnych przedmiotach, oraz wyjaśnia jak współpracować ze szkołą w zakresie edukacji AI. Znajdziesz tu również odpowiedzi na pytania dotyczące polityki szkolnej wobec AI, sposobów monitorowania postępów uczniów, oraz metod integracji AI z tradycyjnymi metodami nauczania.',
    image: '/dog-2.png',
    author: 'Ekspert May I AI',
    date: '5 października 2025',
    readTime: '16 min',
    category: 'Edukacja',
    icon: BookOpen,
    color: 'from-blue-500 to-purple-500'
  },
  {
    title: 'Jak chronić prywatność dziecka w erze AI?',
    excerpt: 'Praktyczne wskazówki i najlepsze praktyki dotyczące ochrony danych osobowych i prywatności dzieci korzystających z narzędzi AI. Dowiesz się, jakie informacje są zbierane przez narzędzia AI, jak są one wykorzystywane, oraz jakie masz prawa jako rodzic. Artykuł zawiera checklistę bezpieczeństwa, którą możesz zastosować już dziś, przykłady najlepszych ustawień prywatności dla popularnych narzędzi, oraz porady jak rozmawiać z dzieckiem o prywatności w sposób zrozumiały i konstruktywny.',
    image: '/dog-3.png',
    author: 'Ekspert May I AI',
    date: '3 października 2025',
    readTime: '14 min',
    category: 'Bezpieczeństwo',
    icon: Shield,
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'ChatGPT dla dzieci - czy to bezpieczne?',
    excerpt: 'Analiza popularnego narzędzia AI z perspektywy bezpieczeństwa dzieci. Poznaj zalety, zagrożenia i jak bezpiecznie korzystać. Artykuł szczegółowo omawia funkcje ChatGPT, wyjaśnia jak działa to narzędzie, oraz przedstawia konkretne scenariusze jego wykorzystania w edukacji dzieci. Dowiesz się również o potencjalnych zagrożeniach, takich jak generowanie niewłaściwych treści czy uzależnienie, oraz o tym jak im zapobiegać. Zawiera praktyczny przewodnik po ustawieniach bezpieczeństwa oraz propozycje zasad korzystania z ChatGPT dla całej rodziny.',
    image: '/dog-4.png',
    author: 'Ekspert May I AI',
    date: '1 października 2025',
    readTime: '17 min',
    category: 'Bezpieczeństwo',
    icon: Shield,
    color: 'from-red-500 to-pink-500'
  },
  {
    title: 'AI a rozwój kreatywności u dzieci',
    excerpt: 'Czy AI może wspierać kreatywność dzieci, czy raczej ją ogranicza? Poznaj najnowsze badania i praktyczne zastosowania. W artykule przedstawiono aktualne badania naukowe na temat wpływu AI na rozwój kreatywny dzieci, case studies pokazujące jak AI wspiera twórczość, oraz praktyczne ćwiczenia które możesz wykonać z dzieckiem. Dowiesz się jak używać AI jako narzędzia inspirującego do tworzenia sztuki, muzyki, opowiadań i projektów naukowych. Artykuł rozwiewą mit o tym, że AI zabija kreatywność i pokaże jak może być jej katalizatorem.',
    image: '/dog-5.png',
    author: 'Ekspert May I AI',
    date: '28 września 2025',
    readTime: '13 min',
    category: 'Edukacja',
    icon: Brain,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'Jak nauczyć dziecko krytycznego myślenia o AI?',
    excerpt: 'Krytyczne myślenie to kluczowa umiejętność w erze AI. Dowiedz się, jak rozwijać tę kompetencję u swojego dziecka. Artykuł zawiera konkretne techniki i ćwiczenia, które pomogą dziecku nauczyć się krytycznej oceny informacji generowanych przez AI, rozumienia ograniczeń sztucznej inteligencji, oraz zadawania właściwych pytań. Przedstawiono również strategie rozwijania umiejętności weryfikacji faktów, rozpoznawania fake newsów generowanych przez AI, oraz budowania zdrowego sceptycyzmu wobec technologii. Zawiera przykłady rozmów i zadań dostosowanych do różnych grup wiekowych.',
    image: '/dog-6.png',
    author: 'Ekspert May I AI',
    date: '25 września 2025',
    readTime: '15 min',
    category: 'Poradnik',
    icon: Lightbulb,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Najlepsze aplikacje edukacyjne z AI dla różnych grup wiekowych',
    excerpt: 'Przegląd aplikacji edukacyjnych wykorzystujących AI, podzielonych według grup wiekowych i obszarów nauki. Każda aplikacja została szczegółowo przetestowana i oceniona pod kątem wartości edukacyjnej, bezpieczeństwa i użyteczności. Artykuł zawiera rekomendacje dla przedszkolaków (3-6 lat), dzieci w wieku szkolnym (7-12 lat) oraz nastolatków (13-18 lat). Dla każdej aplikacji znajdziesz opis funkcji, instrukcję instalacji i konfiguracji, wskazówki jak maksymalnie wykorzystać jej potencjał edukacyjny, oraz informacje o kosztach i dostępności.',
    image: '/dog-7.png',
    author: 'Ekspert May I AI',
    date: '22 września 2025',
    readTime: '19 min',
    category: 'Narzędzia',
    icon: Sparkles,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    title: 'Świadome korzystanie z AI - kompletny przewodnik dla rodziców',
    excerpt: 'Wszystko, co musisz wiedzieć o wspieraniu dziecka w świadomym korzystaniu z narzędzi AI. Artykuł omawia jak uczyć dzieci odpowiedzialnego używania technologii AI, jak budować zdrowe nawyki cyfrowe, oraz jak wspierać dziecko w rozwijaniu umiejętności samodzielnego zarządzania czasem spędzanym z AI. Dowiesz się jak rozmawiać o granicach i zasadach, jak wspólnie z dzieckiem tworzyć plan korzystania z AI, oraz jak reagować gdy coś pójdzie nie tak. Zawiera praktyczne scenariusze i przykłady z życia wzięte.',
    image: '/dog-0.png',
    author: 'Ekspert May I AI',
    date: '20 września 2025',
    readTime: '16 min',
    category: 'Bezpieczeństwo',
    icon: Shield,
    color: 'from-green-500 to-teal-500'
  },
  {
    title: 'AI w domu - jak stworzyć bezpieczne środowisko cyfrowe?',
    excerpt: 'Praktyczne wskazówki dotyczące tworzenia bezpiecznego i wspierającego środowiska cyfrowego dla dzieci w domu. Artykuł przedstawia strategie organizacji przestrzeni domowej sprzyjającej bezpiecznemu korzystaniu z AI, omawia jak ustanowić rodzinne zasady dotyczące technologii, oraz jak stworzyć atmosferę otwartej komunikacji na temat AI. Znajdziesz tu również pomysły na rodzinne aktywności z wykorzystaniem AI, które wzmacniają więzi i uczą współpracy, oraz porady jak radzić sobie z konfliktami i wyzwaniami związanymi z technologią w rodzinie.',
    image: '/dog-mascot-office.png',
    author: 'Ekspert May I AI',
    date: '18 września 2025',
    readTime: '14 min',
    category: 'Poradnik',
    icon: Users,
    color: 'from-pink-500 to-rose-500'
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                <BookOpen className="w-4 h-4" />
                Blog o AI dla rodzin
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Blog AI Family Expert
                </span>
              </h1>
              
              <p className="text-xl text-gray-600">
                Praktyczne porady, wskazówki i najnowsze informacje o sztucznej inteligencji dla rodzin. 
                Uczymy się razem i budujemy bezpieczną cyfrową przyszłość.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {categories.map((category) => (
                <div
                  key={category.slug}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-all ${
                    category.slug === 'wszystkie' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-70">({category.count})</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-2 mb-8">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold">Wyróżniony artykuł</h2>
              </div>
              
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-blue-100">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative h-96 md:h-auto bg-gradient-to-br from-blue-100 to-purple-100">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-8 flex flex-col justify-center space-y-6">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                        {featuredPost.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
                      {featuredPost.title}
                    </h3>

                    <p className="text-lg text-gray-600 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center gap-3 pt-4 border-t">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{featuredPost.author}</div>
                        <div className="text-sm text-gray-500">May I AI Family Expert</div>
                      </div>
                    </div>

                    <Button asChild size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group">
                      <Link href="/blog/jak-rozmawiac-z-dzieckiem-o-ai">
                        Czytaj pełny artykuł
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-12">Najnowsze artykuły</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {blogPosts.map((post, i) => {
                  const Icon = post.icon;
                  return (
                    <Card key={i} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${post.color} rounded-full flex items-center justify-center shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium text-xs">
                            {post.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span className="text-xs">{post.date}</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 leading-relaxed line-clamp-3 text-sm">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                          <div className="text-sm text-gray-500">
                            {post.readTime}
                          </div>
                        </div>

                        <Button asChild variant="link" className="p-0 h-auto text-blue-600 group/btn w-full justify-start">
                          <Link href="/blog/jak-rozmawiac-z-dzieckiem-o-ai">
                            Czytaj więcej
                            <ArrowRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button asChild size="lg" variant="outline" className="border-2">
                  <Link href="/blog">
                    Załaduj więcej artykułów
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl font-bold">
                Nie przegap żadnego artykułu!
              </h2>
              <p className="text-xl text-blue-100">
                Zapisz się do newslettera i otrzymuj najnowsze artykuły bezpośrednio na swoją skrzynkę
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto pt-4">
                <input
                  type="email"
                  placeholder="Twój adres email"
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
                <Button type="submit" size="lg" variant="secondary" className="px-8">
                  Zapisz się
                </Button>
              </form>
              <p className="text-sm text-blue-100">
                Dbamy o Twoją prywatność. Możesz zrezygnować w każdej chwili.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
