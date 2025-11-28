
import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Opis */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative w-12 h-12 transition-transform group-hover:scale-105">
                <Image
                  src="/logo1.png"
                  alt="May I AI Family Expert"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-blue-400">May I</span>
                <span className="font-bold text-base text-white">AI Family Expert</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Pierwsza marka edukacyjna AI dla dzieci w Polsce
            </p>
            
            {/* Social Media */}
            <div className="flex gap-3">
              <a 
                href="https://linkedin.com/company/mayiai-pl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/mayiai_pl?igsh=MTZkYzc2MGVqOTYwdw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>

            </div>
          </div>

          {/* Nawigacja */}
          <div>
            <h3 className="font-semibold mb-4">Nawigacja</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Strona główna</Link></li>
              <li><Link href="/o-nas" className="hover:text-white transition-colors">O nas</Link></li>
              <li><Link href="/oferta" className="hover:text-white transition-colors">Oferta</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/kontakt" className="hover:text-white transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* Dokumenty prawne */}
          <div>
            <h3 className="font-semibold mb-4">Informacje</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/polityka-prywatnosci" className="hover:text-white transition-colors">Polityka prywatności</Link></li>
              <li><Link href="/polityka-cookies" className="hover:text-white transition-colors">Polityka cookies</Link></li>
              <li><Link href="/regulamin" className="hover:text-white transition-colors">Regulamin serwisu</Link></li>
              <li><Link href="/regulamin-sprzedazy" className="hover:text-white transition-colors">Regulamin sprzedaży</Link></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: kontakt@mayiai.pl</li>
              <li>Warszawa, Polska</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} May I AI Family Expert Poland. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  )
}
