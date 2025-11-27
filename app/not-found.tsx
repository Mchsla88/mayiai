
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, Search } from 'lucide-react'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="relative w-64 h-64 mx-auto">
            <Image
              src="/dog-mascot.png"
              alt="404 - Strona nie znaleziona"
              fill
              className="object-contain drop-shadow-2xl"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ups! Strona nie została znaleziona
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wygląda na to, że strona, której szukasz, nie istnieje lub została przeniesiona.
              Nie martw się - pomożemy Ci znaleźć to, czego potrzebujesz!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg">
              <Link href="/">
                <Home className="mr-2 w-5 h-5" />
                Wróć do strony głównej
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg border-2">
              <Link href="/oferta">
                <Search className="mr-2 w-5 h-5" />
                Zobacz naszą ofertę
              </Link>
            </Button>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">Popularne strony:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button asChild variant="link" className="text-blue-600 hover:text-blue-700">
                <Link href="/o-nas">O nas</Link>
              </Button>
              <Button asChild variant="link" className="text-blue-600 hover:text-blue-700">
                <Link href="/blog">Blog</Link>
              </Button>
              <Button asChild variant="link" className="text-blue-600 hover:text-blue-700">
                <Link href="/ebooki">Ebooki</Link>
              </Button>
              <Button asChild variant="link" className="text-blue-600 hover:text-blue-700">
                <Link href="/szkolenia">Szkolenia</Link>
              </Button>
              <Button asChild variant="link" className="text-blue-600 hover:text-blue-700">
                <Link href="/kontakt">Kontakt</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
