import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Polityka Cookies | AI Family Expert Poland',
}

export default function CookiesPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-blue">
            <h1>Polityka Cookies</h1>
            <p className="text-gray-600">Data ostatniej aktualizacji: {new Date().toLocaleDateString('pl-PL')}</p>

            <h2>1. Czym są cookies</h2>
            <p>Cookies to niewielkie pliki tekstowe zapisywane w przeglądarce. Służą do zapewnienia działania Serwisu, analityki i (opcjonalnie) marketingu.</p>

            <h2>2. Kto ustawia cookies</h2>
            <ul>
              <li><strong>Własne:</strong> aifamilyexpert.pl</li>
              <li><strong>Zewnętrzne:</strong> Google Analytics (GA4), operatorzy płatności (Przelewy24, Stripe)</li>
            </ul>

            <h2>3. Rodzaje cookies</h2>
            <ul>
              <li><strong>Niezbędne</strong> — działanie Serwisu (logowanie, checkout). Bez zgody.</li>
              <li><strong>Analityczne</strong> — statystyki (GA4). Wymagana zgoda.</li>
              <li><strong>Marketingowe</strong> — personalizacja reklam. Wymagana zgoda.</li>
            </ul>

            <h2>4. Zarządzanie zgodami</h2>
            <p>Możesz zaakceptować/odrzucić kategorie cookies. Ustawienia zmienisz w dowolnym momencie w ustawieniach przeglądarki.</p>

            <h2>5. Wyłączenie cookies w przeglądarce</h2>
            <p>Możesz usunąć lub zablokować cookies w ustawieniach przeglądarki. Ograniczenie cookies niezbędnych może uniemożliwić korzystanie z kluczowych funkcji.</p>

            <h2>Kontakt</h2>
            <p><a href="mailto:kontakt@aifamilyexpert.pl" className="text-blue-600 hover:underline">kontakt@aifamilyexpert.pl</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
