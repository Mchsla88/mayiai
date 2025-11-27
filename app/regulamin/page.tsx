import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Regulamin Serwisu | AI Family Expert Poland',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-blue">
            <h1>Regulamin Serwisu</h1>
            <p className="text-gray-600">Data ostatniej aktualizacji: {new Date().toLocaleDateString('pl-PL')}</p>

            <h2>1. Postanowienia ogólne</h2>
            <p>Niniejszy Regulamin określa zasady korzystania z serwisu internetowego AI Family Expert Poland, prowadzonego pod adresem aifamilyexpert.pl</p>

            <h2>2. Funkcjonalności Serwisu</h2>
            <ul>
              <li>Dostęp do treści publicznych (blog, artykuły)</li>
              <li>Dostęp do treści płatnych (Ebook online) po założeniu konta i dokonaniu płatności</li>
              <li>Formularz kontaktowy i zapisu do newslettera</li>
              <li>Obsługa płatności online za pośrednictwem operatorów płatności (Przelewy24, Stripe)</li>
            </ul>

            <h2>3. Konto użytkownika</h2>
            <ul>
              <li>Założenie konta wymaga podania adresu e-mail i hasła oraz akceptacji Regulaminu i Polityki prywatności</li>
              <li>Użytkownik jest zobowiązany do zachowania poufności danych logowania</li>
              <li>Administrator może zablokować lub usunąć konto w przypadku naruszenia prawa lub niniejszego Regulaminu</li>
            </ul>

            <h2>4. Zasady korzystania z treści</h2>
            <ul>
              <li>Treści dostępne w Serwisie są chronione prawem autorskim. Wszelkie prawa zastrzeżone.</li>
              <li>Zakazuje się kopiowania, udostępniania, odsprzedaży lub rozpowszechniania treści bez zgody Administratora</li>
              <li>Dostęp do Ebook online ma charakter czasowy (12 miesięcy od zakupu) i indywidualny</li>
            </ul>

            <h2>5. Wymagania techniczne</h2>
            <p>Do korzystania z Serwisu niezbędne są: urządzenie z dostępem do Internetu, przeglądarka internetowa, aktywny adres e-mail, włączona obsługa cookies.</p>

            <h2>6. Odpowiedzialność</h2>
            <p>Treści edukacyjne mają charakter informacyjny i nie stanowią porady prawnej, medycznej ani psychologicznej. Administrator dokłada starań, aby Serwis działał nieprzerwanie, lecz nie gwarantuje dostępności w każdym czasie.</p>

            <h2>7. Zgłaszanie naruszeń i reklamacje</h2>
            <p>Problemy techniczne i naruszenia Regulaminu prosimy zgłaszać na adres: <a href="mailto:kontakt@aifamilyexpert.pl" className="text-blue-600 hover:underline">kontakt@aifamilyexpert.pl</a></p>

            <h2>8. Zmiany Regulaminu</h2>
            <p>Administrator może zmienić Regulamin z ważnych przyczyn. O zmianach poinformujemy na stronie Serwisu.</p>

            <h2>9. Prawo właściwe</h2>
            <p>Regulamin podlega prawu polskiemu. Spory rozstrzyga sąd powszechny właściwy według przepisów.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
