import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Regulamin Sprzedaży | AI Family Expert Poland',
}

export default function SalesTermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-blue">
            <h1>Regulamin Sprzedaży Dostępu do Treści Cyfrowych</h1>
            <p className="text-gray-600">Data ostatniej aktualizacji: {new Date().toLocaleDateString('pl-PL')}</p>

            <h2>1. Postanowienia ogólne</h2>
            <p>Sprzedawcą jest AI Family Expert Poland. Regulamin określa zasady zawierania umów o dostarczanie treści cyfrowych (Ebook online) za pośrednictwem Serwisu aifamilyexpert.pl</p>

            <h2>2. Definicje</h2>
            <ul>
              <li><strong>Ebook online</strong> — sekcja premium Serwisu obejmująca zestaw rozdziałów i materiałów dostępnych wyłącznie po zalogowaniu</li>
              <li><strong>Konsument/Przedsiębiorca</strong> — zgodnie z ustawą z dnia 30 maja 2014 r. o prawach konsumenta</li>
            </ul>

            <h2>3. Przedmiot świadczenia</h2>
            <ul>
              <li>Dostarczenie treści cyfrowej w postaci dostępu online do Ebooka przez 12 miesięcy od momentu zakupu</li>
              <li>Dostęp jest czasowy, indywidualny, niewyłączny, nieprzenoszalny i nie obejmuje pliku PDF</li>
            </ul>

            <h2>4. Warunki zakupu i płatności</h2>
            <ul>
              <li><strong>Cena:</strong> 50 zł netto (brutto po doliczeniu VAT zgodnie z przepisami)</li>
              <li><strong>Płatności:</strong> Przelewy24 (w tym BLIK, szybkie przelewy) oraz Stripe (Apple Pay, Google Pay)</li>
              <li>Umowa zostaje zawarta z chwilą otrzymania potwierdzenia płatności przez Sprzedawcę</li>
            </ul>

            <h2>5. Realizacja świadczenia</h2>
            <ul>
              <li>Uruchomienie dostępu następuje niezwłocznie po zaksięgowaniu płatności</li>
              <li>Dostęp wygasa po 12 miesiącach od zakupu. Brak automatycznego odnowienia</li>
            </ul>

            <h2>6. Odstąpienie od umowy</h2>
            <p>Po rozpoczęciu świadczenia dostarczania treści cyfrowej Konsument traci prawo do odstąpienia, jeśli wyraził zgodę na rozpoczęcie świadczenia przed upływem terminu do odstąpienia (art. 38 pkt 13 ustawy o prawach konsumenta).</p>

            <h2>7. Reklamacje</h2>
            <p>Reklamacje prosimy zgłaszać na <a href="mailto:kontakt@aifamilyexpert.pl" className="text-blue-600 hover:underline">kontakt@aifamilyexpert.pl</a>, podając opis problemu i dane zamówienia. Termin rozpatrzenia: do 14 dni kalendarzowych.</p>

            <h2>8. Wymagania techniczne</h2>
            <p>Urządzenie z Internetem, aktualna przeglądarka, aktywne konto e-mail. Rekomendujemy włączenie cookies funkcjonalnych.</p>

            <h2>9. Licencja i zakaz udostępniania</h2>
            <p>Dostęp służy wyłącznie do użytku własnego Kupującego. Zakazane jest udostępnianie treści osobom trzecim, kopiowanie, publikowanie lub odsprzedaż.</p>

            <h2>10. Prawo właściwe</h2>
            <p>Do umów stosuje się prawo polskie. Spory rozstrzygają sądy powszechne właściwe według przepisów.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
