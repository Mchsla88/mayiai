
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react'

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <article className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Button asChild variant="ghost" className="mb-8">
                <Link href="/blog">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Powrót do bloga
                </Link>
              </Button>

              <div className="relative h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl overflow-hidden mb-8">
                <Image
                  src="/dog-mascot-office.png"
                  alt="Artykuł blogowy"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                  Poradnik
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>10 października 2025</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>12 min czytania</span>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Jak rozmawiać z dzieckiem o AI?
              </h1>

              <div className="flex items-center gap-3 mb-8 pb-8 border-b">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Dr Anna Kowalska</div>
                  <div className="text-sm text-gray-500">Ekspert AI Family Expert</div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  Sztuczna inteligencja już teraz zmienia świat, w którym dorastają nasze dzieci. 
                  Jako rodzice mamy obowiązek przygotować je na tę rzeczywistość. W tym obszernym 
                  przewodniku znajdziesz wszystko, czego potrzebujesz, by rozpocząć tę ważną rozmowę.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6">Dlaczego warto rozmawiać z dzieckiem o AI?</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  AI jest już wszędzie wokół nas - w telefonach, komputerach, grach, asystentach głosowych. 
                  Dzieci korzystają z technologii AI każdego dnia, często nawet o tym nie wiedząc. Dlatego 
                  tak ważne jest, aby rozumieli, czym jest AI i jak bezpiecznie z niej korzystać.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6">Od czego zacząć?</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Rozpocznij rozmowę w naturalny sposób. Możesz wykorzystać sytuacje z codziennego życia, 
                  na przykład gdy dziecko korzysta z asystenta głosowego lub gra w grę, która wykorzystuje AI. 
                  Wyjaśnij prostymi słowami, że AI to programy komputerowe, które potrafią się uczyć i 
                  wykonywać zadania podobne do tych, które robią ludzie.
                </p>

                <h2 className="text-3xl font-bold mt-12 mb-6">Kluczowe tematy do omówienia</h2>
                <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6">
                  <li>Czym jest sztuczna inteligencja i jak działa</li>
                  <li>Gdzie spotykamy AI w codziennym życiu</li>
                  <li>Jakie są zalety i ograniczenia AI</li>
                  <li>Jak bezpiecznie korzystać z narzędzi AI</li>
                  <li>Znaczenie prywatności i ochrony danych</li>
                </ul>

                <h2 className="text-3xl font-bold mt-12 mb-6">Praktyczne wskazówki</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Pamiętaj, że każde dziecko jest inne i potrzebuje indywidualnego podejścia. Dostosuj 
                  poziom skomplikowania rozmowy do wieku i poziomu rozwoju dziecka. Używaj przykładów 
                  z jego codziennego życia i bądź otwarty na pytania.
                </p>

                <div className="bg-blue-50 p-8 rounded-2xl mt-12">
                  <h3 className="text-2xl font-bold mb-4 text-blue-900">Gotowy na kolejny krok?</h3>
                  <p className="text-gray-700 mb-6">
                    Jeśli chcesz dowiedzieć się więcej o bezpiecznej nauce AI dla dzieci, sprawdź naszą ofertę 
                    ebooków i szkoleń.
                  </p>
                  <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Link href="/oferta">
                      Zobacz naszą ofertę
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
