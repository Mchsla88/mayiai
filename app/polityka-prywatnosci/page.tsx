import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Polityka Prywatności | AI Family Expert Poland',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-blue">
            <h1>Polityka Prywatności AI Family Expert Poland</h1>
            <p className="text-gray-600">Data ostatniej aktualizacji: {new Date().toLocaleDateString('pl-PL')}</p>

            <h2>1. Administrator danych</h2>
            <p>
              Administratorem Twoich danych jest AI Family Expert Poland, 
              e-mail: kontakt@aifamilyexpert.pl
            </p>

            <h2>2. Zakres danych</h2>
            <ul>
              <li><strong>Konto:</strong> e-mail, hasło (zaszyfrowane), status dostępu</li>
              <li><strong>Zakupy:</strong> dane kontaktowe i transakcyjne przekazywane operatorom płatności (Przelewy24, Stripe)</li>
              <li><strong>Newsletter:</strong> e-mail, zgoda, tagi/segmenty</li>
              <li><strong>Dane techniczne:</strong> IP, cookies (zgodnie z Polityką cookies), logi</li>
            </ul>

            <h2>3. Cele i podstawy przetwarzania</h2>
            <ul>
              <li><strong>Realizacja umowy o treści cyfrowe</strong> — art. 6 ust. 1 lit. b RODO</li>
              <li><strong>Obowiązki prawne</strong> (podatki, rachunkowość) — art. 6 ust. 1 lit. c RODO</li>
              <li><strong>Newsletter/marketing</strong> — zgoda art. 6 ust. 1 lit. a i/lub uzasadniony interes art. 6 ust. 1 lit. f RODO</li>
              <li><strong>Bezpieczeństwo Serwisu, dochodzenie roszczeń</strong> — art. 6 ust. 1 lit. f RODO</li>
            </ul>

            <h2>4. Odbiorcy danych</h2>
            <p>
              Hosting, operatorzy płatności (Przelewy24, Stripe), narzędzia analityczne. 
              Transfer poza EOG możliwy (np. USA) — stosujemy odpowiednie zabezpieczenia (SCC).
            </p>

            <h2>5. Okres przechowywania</h2>
            <ul>
              <li><strong>Konto/zakupy:</strong> czas trwania umowy + przedawnienie roszczeń oraz zgodnie z przepisami podatkowymi</li>
              <li><strong>Newsletter:</strong> do cofnięcia zgody/sprzeciwu</li>
              <li><strong>Logi:</strong> nie dłużej niż konieczne dla bezpieczeństwa</li>
            </ul>

            <h2>6. Twoje prawa</h2>
            <p>Masz prawo do:</p>
            <ul>
              <li>Dostępu do swoich danych</li>
              <li>Sprostowania danych</li>
              <li>Usunięcia danych</li>
              <li>Ograniczenia przetwarzania</li>
              <li>Przenoszenia danych</li>
              <li>Sprzeciwu wobec przetwarzania</li>
              <li>Cofnięcia zgody w dowolnym momencie</li>
              <li>Wniesienia skargi do Prezesa UODO</li>
            </ul>

            <h2>7. Newsletter</h2>
            <p>
              Zapis dobrowolny; rezygnacja możliwa w każdej wiadomości. Stosujemy segmentację 
              (np. „Klienci — Ebook") w celu dopasowania treści.
            </p>

            <h2>8. Cookies</h2>
            <p>
              Szczegóły w <a href="/polityka-cookies" className="text-blue-600 hover:underline">Polityce cookies</a>. 
              Preferencjami zarządzasz przez baner zgód.
            </p>

            <h2>9. Zabezpieczenia</h2>
            <p>
              SSL, hashowanie haseł, kontrola dostępu, kopie zapasowe, monitoring.
            </p>

            <h2>10. Kontakt</h2>
            <p>
              W sprawach dotyczących danych osobowych: 
              <a href="mailto:kontakt@aifamilyexpert.pl" className="text-blue-600 hover:underline">
                kontakt@aifamilyexpert.pl
              </a>, temat: „Dane osobowe".
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
