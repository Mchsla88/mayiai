import { 
  Target, Brain, Shield, MessageSquare, Search, Palette, 
  GraduationCap, Users, CheckCircle, Clock, Award, TrendingUp,
  Lightbulb, Scale, FileText, Rocket, Zap, BookOpen
} from 'lucide-react'
import Image from 'next/image'
import { LessonSlides } from './components/LessonSlides'
import { ModernContent, SectionCard, InfoBox } from './components/ModernContent'

interface TrainingModule {
  id: string
  title: string
  icon: JSX.Element
  duration: string
  category: string
  content: string | React.ReactNode
}

export const trainingModules: TrainingModule[] = [
  // WSTĘP
  {
    id: 'wstep-1',
    title: 'Wstęp: Kryzys Zaufania – Zrozumieć Obawy Nauczycieli',
    icon: <Image src="/icon-rocket-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '10 min',
    category: 'Wstęp',
    content: (
      <ModernContent 
        title="Wstęp: Kryzys Zaufania – Zrozumieć Obawy"
        icon={<Image src="/icon-rocket-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h2 className="text-3xl font-bold mb-6 text-purple-700">Sztuczna Inteligencja w Edukacji: Kompleksowy Przewodnik 2024-2026</h2>
        
        <SectionCard title="Sekcja 1: Kryzys Zaufania" color="red">
          <p className="text-lg font-medium text-red-900 mb-3">
            <strong>75% polskich nauczycieli nie korzysta aktywnie z narzędzi Generatywnej Sztucznej Inteligencji (GSI).</strong>
          </p>
          <p className="text-sm text-red-700 italic">Źródło: Badanie NASK 2024.</p>
        </SectionCard>

        <h4 className="text-xl font-bold text-gray-800 mb-3">Główne Obawy Nauczycieli:</h4>
        <p className="mb-4 text-gray-700">Nauczyciele nie boją się samej technologii, ale jej skutków pedagogicznych:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
          <li>Uzależnienie uczniów od technologii (81%)</li>
          <li>Oszustwa i plagiaty (76%)</li>
          <li>Zanik samodzielnego myślenia (75%)</li>
          <li>Potencjalna manipulacja (76%)</li>
          <li>Spłycenie wiedzy (68%)</li>
        </ul>

        <SectionCard title="Diagnoza: Nieskuteczne Szkolenia" color="yellow">
          <p className="text-gray-700">41% nauczycieli ocenia dotychczasowe szkolenia z AI jako "słabe" lub "przeciętne" (Badanie RAND 2024).</p>
          <p className="text-gray-700 mt-2"><strong>Fundamentalny błąd:</strong> Szkolenia pomijają obawy i przechodzą od razu do nauki obsługi narzędzi, zamiast adresować lęki.</p>
        </SectionCard>
      </ModernContent>
    )
  },
  {
    id: 'wstep-2',
    title: 'Wstęp: Kluczowa Motywacja – Odzyskiwanie Czasu',
    icon: <Image src="/icon-calendar-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '10 min',
    category: 'Wstęp',
    content: (
      <ModernContent 
        title="Wstęp: Kluczowa Motywacja – Odzyskiwanie Czasu"
        icon={<Image src="/icon-calendar-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h3 className="text-2xl font-bold text-purple-700 mb-4">Sekcja 2: Kluczowa Motywacja – Odzyskiwanie Czasu</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <SectionCard title="1. Motywator: Natychmiastowa Korzyść" color="green">
            <p className="text-gray-700">Skuteczne wdrożenie AI musi opierać się na jasnej i natychmiastowej korzyści dla nauczyciela.</p>
            <p className="text-gray-700 mt-2">W kontekście chronicznego przeciążenia zadaniami, najpotężniejszym motywatorem jest <strong>oszczędność czasu</strong>.</p>
          </SectionCard>
          <SectionCard title="2. Konkretne Dane: Ile Czasu?" color="blue">
            <p className="text-gray-700">Nauczyciele, którzy sprawnie wykorzystują AI, oszczędzają średnio <strong className="text-blue-600 text-xl">5,9 godziny tygodniowo</strong> (badania międzynarodowe).</p>
            <p className="text-gray-700 mt-2">W skali roku szkolnego to równowartość <strong>sześciu tygodni pracy</strong>.</p>
          </SectionCard>
        </div>

        <h5 className="text-lg font-bold text-gray-800 mb-3">3. Strategiczna Zmiana: "Mniej Administracji, Więcej Pedagogiki"</h5>
        <p className="mb-4 text-gray-700">Ta oszczędność pozwala na przesunięcie czasu z:</p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Zadań powtarzalnych</li>
            <li>Administracji</li>
            <li>Czynności technicznych (które automatyzuje AI)</li>
          </ul>
        </div>

        <p className="mb-4 text-gray-700">Na rzecz działań o najwyższej wartości (których AI nie zastąpi):</p>
        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Budowania relacji z uczniami</li>
            <li>Kreatywnego planowania angażujących lekcji</li>
            <li>Indywidualnego wsparcia</li>
          </ul>
        </div>

        <SectionCard title="4. Paradoks AI: Odzyskanie 'Ludzkiego' Wymiaru" color="purple">
          <p className="text-gray-700">AI staje się narzędziem do odzyskiwania "ludzkiego" wymiaru nauczania. Redukuje ryzyko wypalenia zawodowego i pozwala nauczycielowi skupić się na tym, co najważniejsze, m.in. na rozwijaniu samodzielnego myślenia uczniów.</p>
        </SectionCard>
      </ModernContent>
    )
  },
  {
    id: 'wstep-3',
    title: 'Wstęp: Konieczność Strategiczna – Podstawa Programowa 2026',
    icon: <Award className="w-5 h-5" />,
    duration: '15 min',
    category: 'Wstęp',
    content: (
      <ModernContent 
        title="Wstęp: Konieczność Strategiczna"
        icon={<Award />}
      >
        <h3 className="text-3xl font-bold mb-6 text-purple-700">Wstęp: Dlaczego to nie jest "kolejna nowinka"?</h3>
        
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Podstawa Programowa 2026</h4>
        <p className="text-gray-700 mb-6">To nie jest tylko ciekawostka technologiczna. Od 2026 roku kompetencje związane z AI stają się częścią podstawy programowej.</p>

        <SectionCard title="Nowe Wymagania" color="purple">
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Krytyczna analiza treści generowanych przez AI.</li>
            <li>Rozumienie szans i zagrożeń (etyka).</li>
            <li>Umiejętność współpracy z AI (prompting).</li>
          </ul>
        </SectionCard>

        <SectionCard title="Co to oznacza dla nauczyciela?" color="blue">
          <p className="text-gray-700">Nie musisz być programistą. Musisz być przewodnikiem, który pokaże uczniom, jak mądrze korzystać z tych narzędzi.</p>
        </SectionCard>
      </ModernContent>
    )
  },

  // ROZDZIAŁ 1
  {
    id: 'rozdzial-1-1',
    title: 'Rozdział 1.1: Demistyfikacja – Czym jest AI, GSI, LLM?',
    icon: <Image src="/icon-tools-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '15 min',
    category: 'Rozdział 1',
    content: (
      <ModernContent 
        title="Rozdział 1. Fundamenty: Czym Jest AI"
        icon={<Image src="/icon-tools-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h2 className="text-3xl font-bold mb-6 text-purple-700">Rozdział 1. Fundamenty: Czym Jest AI i Jak Działa (Bez Żargonu)</h2>
        
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Sekcja 1.1: Demistyfikacja (Czym jest AI, GSI, LLM?)</h4>
        
        <p className="text-lg text-gray-700 mb-6"><strong>Krok 1: Zrozumieć podstawy (bez żargonu)</strong></p>
        <p className="mb-6 text-gray-700">Aby zaufać AI, musimy przestać traktować ją jak "magię". To po prostu technologia. Najważniejsze to odróżnić kilka pojęć:</p>

        <div className="space-y-6 mb-8">
          <SectionCard title="1. Sztuczna Inteligencja (AI)" color="blue">
            <p className="text-gray-700 mb-2"><strong>Co to jest?</strong> To ogólna nazwa na programy komputerowe, które wykonują zadania wymagające "inteligentnego" działania.</p>
            <p className="text-gray-700"><strong>Gdzie ją spotykasz?</strong> Z AI masz do czynienia codziennie. To na przykład:</p>
            <ul className="list-disc list-inside text-gray-700 ml-4 mt-2 space-y-1">
              <li>Nawigacja GPS (znajduje najlepszą trasę)</li>
              <li>Filtry spamu (odróżnia ważne maile od śmieci)</li>
              <li>Rekomendacje filmów (np. na Netflix)</li>
            </ul>
          </SectionCard>

          <SectionCard title="2. Uczenie Maszynowe (ML)" color="green">
            <p className="text-gray-700 mb-2"><strong>Co to jest?</strong> To sposób, w jaki AI się uczy. To część AI.</p>
            <p className="text-gray-700 mb-2"><strong>Jak to działa?</strong> Zamiast programować twarde reguły (np. "jeśli to, zrób tamto"), "trenujemy" program na ogromnej ilości danych.</p>
            <div className="bg-white p-4 rounded-lg mt-3 border border-green-100">
              <p className="text-gray-600 italic text-sm"><strong>Przykład:</strong> Pokazujesz komputerowi tysiące zdjęć psów i kotów. W końcu sam uczy się rozpoznawać wzorce i odróżniać jedne od drugich.</p>
            </div>
          </SectionCard>

          <SectionCard title="3. Generatywna AI (GSI)" color="purple">
            <p className="text-gray-700 mb-2"><strong>Co to jest?</strong> To nowy typ AI, który wywołał rewolucję.</p>
            <p className="text-gray-700 mb-2"><strong>Co robi?</strong> Ta AI nie tylko analizuje dane, ale potrafi <em>tworzyć (generować)</em> zupełnie nowe rzeczy – teksty, obrazy, muzykę, kod.</p>
            <p className="text-gray-700"><strong>To właśnie z nią pracujemy w szkole</strong> (np. ChatGPT).</p>
          </SectionCard>

          <SectionCard title="4. Duży Model Językowy (LLM)" color="orange">
            <p className="text-gray-700 mb-2"><strong>Co to jest?</strong> To "mózg" lub "silnik" napędzający narzędzia takie jak ChatGPT czy Gemini.</p>
            <p className="text-gray-700 mb-2"><strong>Jak działa?</strong> To tak, jakbyś miał "autouzupełnianie na sterydach".</p>
            <p className="text-gray-700"><strong>Jak "myśli"?</strong> Model został wytrenowany na niemal całym internecie. Kiedy zadajesz mu pytanie, on statystycznie przewiduje, jakie jest najbardziej prawdopodobne następne słowo. Potem kolejne i kolejne, budując całą odpowiedź.</p>
          </SectionCard>
        </div>

        <SectionCard title="⚠️ Kluczowa Rzecz (Ważne!)" color="red">
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>AI <strong>nie "rozumie"</strong> świata i nie "myśli" jak człowiek.</li>
            <li>To genialny system <strong>zgadywania następnego słowa</strong> na podstawie prawdopodobieństwa.</li>
            <li>Dlatego czasem wymyśla fakty lub popełnia błędy (nazywamy to <strong>"halucynacjami"</strong>).</li>
          </ul>
        </SectionCard>
      </ModernContent>
    )
  },
  {
    id: 'rozdzial-1-2',
    title: 'Rozdział 1.2: Pierwszy Kontakt – Bezpieczne "Celowe Granie"',
    icon: <Image src="/icon-bulb-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '15 min',
    category: 'Rozdział 1',
    content: (
      <ModernContent 
        title="Rozdział 1.2: Pierwszy Kontakt"
        icon={<Image src="/icon-bulb-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Sekcja 1.2: Pierwszy Kontakt – Bezpieczne "Celowe Granie" (Purposeful Play)</h4>
        
        <p className="text-gray-700 mb-6">Najgorszym podejściem do pierwszego szkolenia AI jest przytłoczenie nauczycieli technicznymi detalami lub zadaniami o wysokiej stawce (np. "zaprojektuj program nauczania"). Skuteczne programy wdrożeniowe zaczynają od <strong>"celowego grania" (purposeful play)</strong> w środowisku o niskiej stawce. Celem jest przekształcenie sceptycyzmu w ciekawość.</p>

        <SectionCard title="💡 Aktywność na 'pierwsze doświadczenie'" color="green">
          <p className="text-2xl font-bold text-gray-900 mb-4">Porozmawiaj z AI o swoim hobby.</p>
          <p className="text-gray-700">To prosta, ale genialna aktywność!</p>
        </SectionCard>

        <h5 className="text-lg font-bold text-gray-800 mb-3">Interaktywny Przykład: Twoje Pierwsze Doświadczenie</h5>
        
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <p className="font-bold text-gray-900 mb-3">Krok 1: Otwórz narzędzie</p>
          <p className="text-gray-700 mb-4">Otwórz dowolne, darmowe narzędzie GSI (np. Google Gemini, Microsoft Copilot lub darmową wersję ChatGPT).</p>
          
          <p className="font-bold text-gray-900 mb-3">Krok 2: Napisz prompt (polecenie)</p>
          <p className="text-gray-700 mb-4">Zamiast pytać o pracę, napisz prompt (polecenie) związany z Twoimi <strong>prywatnymi zainteresowaniami</strong>.</p>
          
          <div className="space-y-4">
            <SectionCard title="Przykład 1" color="blue">
              <p className="italic text-gray-700">"Zaplanuj dla mnie idealny weekend w Krakowie. Interesuję się historią średniowiecza i lubię włoską kuchnię. Zaproponuj 3 miejsca do zwiedzania i 2 restauracje."</p>
            </SectionCard>
            
            <SectionCard title="Przykład 2" color="green">
              <p className="italic text-gray-700">"Jestem początkującym ogrodnikiem i chcę założyć mały ogródek na balkonie. Mój balkon ma wystawę południową. Jakie 5 roślin będzie najłatwiejszych w uprawie i jak o nie dbać?"</p>
            </SectionCard>
            
            <SectionCard title="Przykład 3" color="purple">
              <p className="italic text-gray-700">"Stwórz 7-dniowy plan treningowy dla osoby, która chce zacząć biegać, aby przygotować się do biegu na 5 km."</p>
            </SectionCard>
          </div>
        </div>

        <SectionCard title="🔍 Zaobserwuj:" color="yellow">
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Jak AI strukturyzuje odpowiedź</li>
            <li>Jaki stosuje język</li>
            <li>Jak szybko dostarcza spersonalizowany wynik</li>
          </ul>
        </SectionCard>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h5 className="font-bold text-gray-800 mb-3">Dlaczego ten krok jest kluczowy?</h5>
          <p className="text-gray-700 mb-4">Ten pierwszy krok jest kluczowy <strong>psychologicznie</strong>:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Nie ma tu ryzyka popełnienia błędu pedagogicznego</li>
            <li>Nie ma presji oceny</li>
            <li>Jest to <strong>bezpieczne, osobiste</strong> i często zaskakująco użyteczne doświadczenie</li>
            <li>Buduje <strong>pozytywne pierwsze wrażenie</strong> i motywuje do dalszej eksploracji</li>
          </ul>
        </div>
      </ModernContent>
    )
  },
  {
    id: 'rozdzial-1-3',
    title: 'Rozdział 1.3: Przegląd 10 Narzędzi dla Nauczyciela (PEŁNA LISTA)',
    icon: <Image src="/icon-rocket-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '25 min',
    category: 'Rozdział 1',
    content: (
      <ModernContent 
        title="Rozdział 1.3: Przegląd Narzędzi"
        icon={<Image src="/icon-rocket-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h4 className="text-2xl font-bold text-gray-800 mb-6">Sekcja 1.3: Przegląd Narzędzi Nauczyciela</h4>
        
        <p className="text-gray-700 mb-6">Po pierwszym, bezpiecznym kontakcie, warto poznać ekosystem narzędzi, które będą przewijać się w tym przewodniku. Skupimy się na tych, które są wymienione w programach szkoleniowych jako <strong>kluczowe dla edukacji</strong>.</p>

        <SectionCard title="📅 Lista aktualna na: 15 listopada 2025" color="purple">
          <p className="text-gray-700">Poniższa lista zawiera najbardziej aktualne informacje o dostępności i możliwościach narzędzi AI.</p>
        </SectionCard>

        <h4 className="text-2xl font-bold text-purple-700 border-b-4 border-purple-300 pb-3 mb-6">1. PODSTAWOWE MODELE AI (WIELKA CZWÓRKA)</h4>
        <p className="text-gray-700 mb-6">To fundamenty, od których każdy nauczyciel powinien zacząć.</p>

        <div className="space-y-6 mb-8">
          <SectionCard title="🧠 1. ChatGPT (OpenAI)" color="green">
            <p className="text-gray-700 mb-4"><strong>Aktualne Możliwości (15.11.2025):</strong> W darmowej wersji oferuje model klasy GPT-4, generowanie obrazów (przez DALL-E 4), analizę danych (można wgrywać np. pliki Excel z wynikami testów) oraz rozmowę głosową.</p>
            
            <p className="font-bold text-gray-800 mb-2">Zastosowanie w szkole:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4 ml-4">
              <li><strong>Przygotowanie:</strong> Generowanie scenariuszy lekcji, pisanie testów, tworzenie przykładowych wypracowań, różnicowanie zadań</li>
              <li><strong>Praca z dziećmi:</strong> (Pod nadzorem) Symulowanie dialogów, burze mózgów, generowanie ilustracji</li>
            </ul>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-gray-800 mb-1">Krótka instrukcja:</p>
              <ol className="list-decimal list-inside text-gray-600 text-sm space-y-1 ml-4">
                <li>Wejdź na chat.openai.com</li>
                <li>Załóż darmowe konto (np. przez Google)</li>
                <li>Wpisz: "Jesteś nauczycielem polskiego. Stwórz 5 kreatywnych tematów na rozprawkę dla 8 klasy na podstawie 'Zemsty' Fredry."</li>
              </ol>
            </div>
          </SectionCard>

          <SectionCard title="🎬 2. Gemini (Google)" color="blue">
            <p className="text-gray-700 mb-4"><strong>Aktualne Możliwości (15.11.2025):</strong></p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Wideo (model Veo):</strong> Generowanie fotorealistycznych lub animowanych klipów wideo (do ok. 30 sekund) z tekstu</li>
              <li><strong>Obrazy (model Imagen 3):</strong> Tworzenie obrazów. Supermoc: perfekcyjne renderowanie tekstu na grafikach (idealne do schematów i map myśli)</li>
              <li><strong>Internet i Google Workspace:</strong> Dostęp do aktualnych informacji i integracja z Dyskiem, Gmailem oraz YouTube</li>
            </ul>
            
            <p className="font-bold text-gray-800 mb-2">Zastosowanie w szkole:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4 ml-4">
              <li>Tworzenie krótkich filmów instruktażowych</li>
              <li>Generowanie czytelnych map myśli i schematów do wydruku</li>
              <li>Wizualizowanie procesów (fizyka, biologia)</li>
            </ul>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium text-gray-800 mb-1">Przykładowe polecenia:</p>
              <p className="text-gray-600 text-sm italic">"Stwórz 10-sekundowe wideo pokazujące obrót Ziemi wokół Słońca, z widoczną orbitą"</p>
              <p className="text-gray-600 text-sm italic">"Stwórz schemat komórki roślinnej z wyraźnymi etykietami: jądro, ściana komórkowa, chloroplast"</p>
            </div>
          </SectionCard>

          <SectionCard title="📄 3. Claude (Anthropic)" color="orange">
            <p className="text-gray-700 mb-4"><strong>Specjalizacja:</strong> Analiza, streszczanie i porównywanie długich dokumentów (lektur, podstaw programowych, artykułów naukowych).</p>
            <p className="text-gray-700 mb-4">Darmowa wersja pozwala na przesłanie kilku dużych plików jednocześnie (np. 3x PDF po 100 stron) i prowadzenie "rozmowy" na ich temat.</p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="font-bold text-blue-900 mb-2">💡 Wskazówka dla nauczyciela:</p>
              <p className="text-gray-700">Wgraj PDF z podstawą programową i poproś o "Wygeneruj pomysły na projekty interdyscyplinarne na podstawie tych zapisów"</p>
            </div>
          </SectionCard>

          <SectionCard title="💻 4. Microsoft CoPilot" color="blue">
            <p className="text-gray-700 mb-4">Oferuje darmowy dostęp do zaawansowanych modeli klasy GPT-4/5 oraz generowanie obrazów (DALL-E) bez opłat. Jest wbudowany w Windows i przeglądarkę Edge. W darmowych wersjach edukacyjnych Office 365 pomaga pisać w Wordzie i tworzyć szkice prezentacji w PowerPoint.</p>
            
            <p className="text-gray-600 italic text-sm">"Stwórz wersję roboczą prezentacji na 10 slajdów o starożytnym Egipcie"</p>
          </SectionCard>
        </div>

        <h4 className="text-2xl font-bold text-purple-700 border-b-4 border-purple-300 pb-3 mb-6">2. NARZĘDZIA SPECJALISTYCZNE I KREATYWNE</h4>

        <div className="space-y-6 mb-8">
          <SectionCard title="⚠️ 5. Grok (xAI)" color="yellow">
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
              <p className="font-bold text-yellow-900 mb-2">⚠️ OSTRZEŻENIE:</p>
              <p className="text-gray-700">Nie jest to narzędzie do samodzielnej pracy przez dzieci ze względu na ryzyko generowania treści nieodpowiednich lub stronniczych.</p>
            </div>
            <p className="text-gray-700">Może być użyte na lekcjach WOS/etyki jako narzędzie do nauki krytycznego myślenia - porównanie odpowiedzi Groka i Gemini na ten sam temat rozpoczyna dyskusję o "bias" (stronniczości) w AI.</p>
          </SectionCard>

          <SectionCard title="🎨 6. Canva (z Magic Studio AI)" color="purple">
            <p className="text-gray-700 mb-4">Funkcje AI (Magiczne Studio) są dostępne w darmowej wersji dla Oświaty (Canva dla Edukacji).</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Generowanie obrazów i krótkich wideo z tekstu</li>
              <li>Magiczna edycja (np. "usuń ten obiekt ze zdjęcia")</li>
              <li>Zmiana formatu (np. "zmień ten dokument tekstowy w prezentację")</li>
            </ul>
          </SectionCard>

          <SectionCard title="🔎 7. Perplexity AI" color="green">
            <p className="text-gray-700 mb-4">Przeszukuje internet w czasie rzeczywistym i udziela skondensowanej odpowiedzi, <strong>ZAWSZE podając źródła (cytaty)</strong>, z których korzystał.</p>
            <div className="bg-teal-50 p-4 rounded-lg">
              <p className="font-bold text-teal-900 mb-2">Zastosowanie w szkole:</p>
              <p className="text-gray-700">Uczy higieny cyfrowej i researchu. Nauczyciel pokazuje uczniom: "Zobaczcie, AI nie wymyśla odpowiedzi, tylko bazuje na tych źródłach. Sprawdźmy je."</p>
            </div>
          </SectionCard>

          <SectionCard title="🎬 8. Kling (Kuaishou)" color="red">
            <p className="text-gray-700">Znane z niesamowitego realizmu i skomplikowanych ruchów kamery. Dostęp darmowy jest zazwyczaj limitowany, ale technologia ta jest już integrowana z innymi platformami (jak Canva czy Gemini z Veo).</p>
          </SectionCard>
        </div>

        <h4 className="text-2xl font-bold text-purple-700 border-b-4 border-purple-300 pb-3 mb-6">3. SZYBKIE ALTERNATYWY</h4>
        <p className="text-gray-700 mb-6">Warto je znać, gdy główne modele są przeciążone lub nie dają rady z zadaniem.</p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h5 className="font-bold text-gray-800 mb-2">🚀 9. DeepSeek</h5>
            <p className="text-sm text-gray-600">Błyskawicznie szybka alternatywa, świetna do zadań logicznych i informatyki. Nie generuje obrazów.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h5 className="font-bold text-gray-800 mb-2">🐉 10. Qwen (Alibaba)</h5>
            <p className="text-sm text-gray-600">Alternatywa dla Claude do analizy długich dokumentów (można wgrywać pliki PDF). Świetnie radzi sobie po polsku.</p>
          </div>
        </div>
      </ModernContent>
    )
  },

  // ROZDZIAŁ 2
  {
    id: 'rozdzial-2-1',
    title: 'Rozdział 2.1: Wprowadzenie do Etyki AI w Szkole',
    icon: <Image src="/icon-shield-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '10 min',
    category: 'Rozdział 2',
    content: (
      <ModernContent 
        title="Rozdział 2.1: Etyka AI"
        icon={<Image src="/icon-shield-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h3 className="text-3xl font-bold mb-6 text-purple-700">Rozdział 2. Etyczny Kompas Nauczyciela w Erze AI</h3>
        
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Sekcja 2.1: Wprowadzenie do Etyki AI w Szkole</h4>
        
        <p className="text-gray-700 mb-6">Po zbudowaniu podstawowego zaufania i zrozumienia technologii, niezbędne jest natychmiastowe przejście do jej ram etycznych. To właśnie tutaj leżą najpoważniejsze obawy nauczycieli.</p>
        
        <SectionCard title="⚠️ Kluczowa Prawda" color="red">
          <p className="text-gray-700">Technologia jest jedynie narzędziem. <strong>To nauczyciel pozostaje strażnikiem etyki, pedagogiki i bezpieczeństwa uczniów.</strong></p>
        </SectionCard>

        <p className="text-gray-700 mb-6">Zrozumienie zagrożeń nie ma na celu odstraszenia od technologii, ale <strong>uzbrojenie nauczyciela</strong> w wiedzę i strategie, które pozwolą mu korzystać z AI w sposób świadomy, bezpieczny i odpowiedzialny.</p>

        <SectionCard title="Programy szkoleniowe muszą rezerwować dedykowany czas na omówienie:" color="purple">
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li><strong>RODO</strong> - ochrona danych osobowych uczniów</li>
            <li><strong>Plagiaty</strong> - filozofia 80/20</li>
            <li><strong>Stronniczość (Bias)</strong> - sprawiedliwość AI</li>
            <li><strong>Deepfake</strong> - rozpoznawanie fałszywych treści</li>
          </ul>
        </SectionCard>

        <p className="text-lg font-bold text-gray-900 mb-4">W następnej sekcji przejdziemy do praktycznych scenariuszy...</p>
      </ModernContent>
    )
  },
  {
    id: 'rozdzial-2-2',
    title: 'Rozdział 2.2: Warsztat Etyczny – 4 Kluczowe Scenariusze',
    icon: <Image src="/icon-shield-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '25 min',
    category: 'Rozdział 2',
    content: (
      <ModernContent 
        title="Rozdział 2.2: Warsztat Etyczny"
        icon={<Image src="/icon-shield-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h4 className="text-2xl font-bold text-gray-800 mb-6">Sekcja 2.2: Warsztat Etyczny (Praktyczne Scenariusze)</h4>
        
        <p className="text-gray-700 mb-6"><strong>Teoria etyki jest bezużyteczna bez praktyki.</strong> Poniżej przedstawiamy cztery kluczowe wyzwania etyczne wraz z praktycznymi przykładami i rozwiązaniami.</p>

        <div className="space-y-8">
          <SectionCard title="⚖️ Zagadnienie 1: RODO i Prywatność Uczniów" color="blue">
            <p className="font-bold text-gray-900 mb-2">Problem:</p>
            <p className="text-gray-700 mb-4">Nauczyciel chce użyć AI do analizy, oceny lub personalizacji pracy ucznia.</p>
            
            <div className="bg-red-50 p-4 rounded-lg mb-4 border-l-4 border-red-400">
              <p className="font-bold text-red-900 mb-2">❌ Zagrożenie (Scenariusz):</p>
              <p className="text-gray-700">Nauczyciel Języka Polskiego kopiuje wypracowanie ucznia (zawierające jego imię, nazwisko, osobiste przemyślenia) do publicznej wersji ChatGPT z prośbą: "Oceń tę pracę i wskaż błędy".</p>
              <p className="text-red-800 mt-2 font-medium">Dane osobowe ucznia opuszczają bezpieczny ekosystem szkoły. To <strong>rażące naruszenie RODO</strong> i prawa do prywatności!</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
              <p className="font-bold text-green-900 mb-3">✅ Rozwiązanie (Praktyka):</p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li><strong>Zasada Anonimizacji:</strong> Nigdy nie wprowadzać danych identyfikujących uczniów do publicznych modeli AI. Najpierw zanonimizować tekst.</li>
                <li><strong>Konta Instytucjonalne:</strong> Korzystać z narzędzi AI w ramach pakietów instytucjonalnych (Microsoft 365 dla edukacji, Google Workspace for Education) - te wersje "enterprise" gwarantują, że dane nie są wykorzystywane do trenowania modeli publicznych.</li>
              </ol>
            </div>
          </SectionCard>

          <SectionCard title="📝 Zagadnienie 2: Plagiat vs. Augmentacja (Filozofia 80/20)" color="orange">
            <p className="font-bold text-gray-900 mb-2">Problem:</p>
            <p className="text-gray-700 mb-4">Uczeń oddaje pracę w całości wygenerowaną przez AI. To jedna z głównych obaw nauczycieli (76%).</p>
            
            <div className="bg-red-50 p-4 rounded-lg mb-4">
              <p className="font-bold text-red-900 mb-2">❌ Zagrożenie:</p>
              <p className="text-gray-700">Nauczyciel zadaje esej o przyczynach wybuchu I Wojny Światowej. Uczeń wpisuje temat w AI, kopiuje tekst i oddaje jako własny.</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl mb-4 border-2 border-purple-300">
              <h6 className="text-lg font-bold text-purple-900 mb-3">💡 Filozofia 80/20</h6>
              <p className="text-gray-700 mb-3">AI może wykonać <strong>80% "surowej" pracy</strong> (zebranie faktów, wstępny szkic), ale kluczowe <strong>20% musi dodać człowiek</strong> (krytyczna analiza, weryfikacja, własna refleksja, unikalny styl).</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
              <p className="font-bold text-green-900 mb-3">✅ Rozwiązanie - Zmiana Zadań:</p>
              <p className="text-gray-700 mb-2">Zamiast: <span className="line-through">"Napisz esej o..."</span></p>
              <p className="text-gray-700 mb-3">Zadanie powinno brzmieć:</p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4 text-sm">
                <li>"Użyj AI, aby wygenerować listę 5 głównych przyczyn wybuchu I Wojny Światowej." <span className="text-blue-600">(80% pracy AI)</span></li>
                <li>"Wybierz dwie przyczyny, które uważasz za najważniejsze, i znajdź dla nich potwierdzenie w podręczniku." <span className="text-purple-600">(Weryfikacja)</span></li>
                <li>"Napisz dwa akapity własnej analizy, argumentując, dlaczego te przyczyny były kluczowe." <span className="text-green-600">(20% pracy ucznia)</span></li>
                <li>"Dołącz wygenerowaną listę AI jako załącznik i zacytuj użyte narzędzie."</li>
              </ol>
              <p className="text-gray-700 mt-3 italic">Zadanie przesuwa się z "pisania" na "myślenie", "weryfikowanie" i "redagowanie"!</p>
            </div>
          </SectionCard>

          <SectionCard title="🎭 Zagadnienie 3: Deepfake i Dezinformacja" color="red">
            <p className="font-bold text-gray-900 mb-2">Problem:</p>
            <p className="text-gray-700 mb-4">Uczniowie mają problem z odróżnieniem treści prawdziwych od fałszywych (deepfake audio/wideo, obrazy generowane przez AI).</p>
            
            <div className="bg-red-50 p-4 rounded-lg mb-4">
              <p className="font-bold text-red-900 mb-2">❌ Zagrożenie:</p>
              <p className="text-gray-700">W sieci krąży wideo, na którym znany polityk wygłasza kontrowersyjne opinie. Uczniowie przyjmują to za fakt, nie wiedząc, że to deepfake.</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
              <p className="font-bold text-green-900 mb-3">✅ Rozwiązanie (Praktyka):</p>
              
              <h6 className="font-bold text-gray-800 mb-2">1. Nauka "Cyfrowej Intuicji"</h6>
              <p className="text-gray-700 mb-3">Ucz uczniów zwracania uwagi na nienaturalne detale:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4 ml-4 text-sm">
                <li><strong>Obrazy AI:</strong> Nienaturalne dłonie (za dużo/mało palców), dziwne artefakty w tle, nienaturalne cienie, "martwe" oczy</li>
                <li><strong>Wideo:</strong> Brak mrugania, dziwne synchronizowanie ust, nienaturalna kadencja głosu</li>
              </ul>

              <h6 className="font-bold text-gray-800 mb-2">2. Gra "Prawda czy AI?"</h6>
              <p className="text-gray-700 text-sm">Pokaż uczniom serię obrazów/tekstów – niektóre prawdziwe, niektóre AI. Niech głosują i uzasadniają swoje odpowiedzi. To buduje umiejętności krytycznej analizy!</p>
            </div>
          </SectionCard>
        </div>
      </ModernContent>
    )
  },

  // ROZDZIAŁ 3
  {
    id: 'rozdzial-3-1',
    title: 'Rozdział 3.1: Wprowadzenie – "Śmieci na Wejściu, Śmieci na Wyjściu"',
    icon: <Image src="/icon-chat-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '10 min',
    category: 'Rozdział 3',
    content: (
      <ModernContent 
        title="Rozdział 3.1: Wprowadzenie"
        icon={<Image src="/icon-chat-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h3 className="text-3xl font-bold mb-6 text-purple-700">Rozdział 3. Sztuka Dialogu z AI: Mistrzostwo w Prompt Engineeringu</h3>
        
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Sekcja 3.1: Dlaczego jakość pytania ma znaczenie?</h4>
        
        <p className="text-gray-700 mb-6">Po opanowaniu podstaw i ram etycznych, przechodzimy do kluczowej kompetencji technicznej: <strong>inżynierii promptów (prompt engineering)</strong>, czyli sztuki tworzenia efektywnych poleceń.</p>

        <SectionCard title="⚠️ Zasada GIGO: 'Garbage In, Garbage Out'" color="red">
          <p className="text-gray-700">Jakość odpowiedzi, którą otrzymujemy z modelu LLM, jest w 90% zależna od jakości polecenia. Obowiązuje tu fundamentalna zasada informatyki: <strong>"Śmieci na wejściu, śmieci na wyjściu"</strong>.</p>
          <p className="text-gray-700 mt-2">Jeśli zadamy ogólne, niejasne pytanie, otrzymamy ogólną, niejasną i często bezużyteczną odpowiedź.</p>
        </SectionCard>

        <p className="text-gray-700 mb-6">Wielu nauczycieli zniechęca się do AI, ponieważ ich pierwsze próby dają słabe rezultaty. Zazwyczaj nie jest to wina technologii, ale braku umiejętności precyzyjnego formułowania poleceń.</p>

        <SectionCard title="🎓 To więcej niż technika – to pedagogika" color="blue">
          <p className="text-gray-700">Opanowanie promptingu uczy:</p>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1 ml-4">
            <li>Precyzyjnego myślenia</li>
            <li>Definiowania celów</li>
            <li>Określania kontekstu</li>
          </ul>
          <p className="text-gray-700 mt-3">Jest to bezpośrednia odpowiedź na obawę o "zanik myślenia" u uczniów.</p>
        </SectionCard>
      </ModernContent>
    )
  },
  {
    id: 'rozdzial-3-2',
    title: 'Rozdział 3.2: Framework 5S – Przepis na Idealny Prompt',
    icon: <Image src="/icon-chat-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '15 min',
    category: 'Rozdział 3',
    content: (
      <ModernContent 
        title="Rozdział 3.2: Framework 5S"
        icon={<Image src="/icon-chat-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h4 className="text-2xl font-bold text-gray-800 mb-6">Sekcja 3.2: Framework 5S (Set, Specify, Structure, Supply, Assess)</h4>
        
        <p className="text-gray-700 mb-6">Aby przejść od słabych promptów do promptów eksperckich, rekomendujemy ustrukturyzowane podejście <strong>Framework 5S</strong>.</p>

        <div className="space-y-4 mb-8">
          <SectionCard title="1. Set scene (Ustal Scenę / Rolę)" color="purple">
            <p className="text-gray-700">Powiedz AI, kim ma być. Nadanie roli radykalnie zmienia ton i głębię odpowiedzi.</p>
            <p className="text-sm text-gray-500 mt-1 italic">Np. "Jesteś ekspertem od dydaktyki...", "Jesteś życzliwym tutorem..."</p>
          </SectionCard>

          <SectionCard title="2. Specify (Sprecyzuj Zadanie i Kontekst)" color="blue">
            <p className="text-gray-700">Co dokładnie ma zrobić AI? Dla kogo?</p>
            <p className="text-sm text-gray-500 mt-1 italic">Np. "Stwórz plan lekcji... dla 7. klasy szkoły podstawowej, liczącej 26 uczniów".</p>
          </SectionCard>

          <SectionCard title="3. Structure (Ustrukturyzuj Format)" color="green">
            <p className="text-gray-700">Jak ma wyglądać odpowiedź? W punktach? W tabeli? Jako jeden akapit?</p>
          </SectionCard>

          <SectionCard title="4. Supply examples (Dostarcz Przykłady)" color="orange">
            <p className="text-gray-700">Jeśli chcesz uzyskać bardzo specyficzny format, podaj AI przykład.</p>
            <p className="text-sm text-gray-500 mt-1 italic">Np. "Oto przykład pytania, jakie lubię: [...]".</p>
          </SectionCard>

          <SectionCard title="5. Assess (Oceń / Chain-of-thought)" color="red">
            <p className="text-gray-700">Poproś AI, aby "myślało krok po kroku" lub wyjaśniło swoje rozumowanie.</p>
            <p className="text-sm text-gray-500 mt-1 italic">Zamiast "Daj mi odpowiedź", poproś "Wyjaśnij, jak dojść do tej odpowiedzi".</p>
          </SectionCard>
        </div>
      </ModernContent>
    )
  },
  {
    id: 'rozdzial-3-3',
    title: 'Rozdział 3.3: Warsztat – Transformacja Słabych Promptów',
    icon: <Image src="/icon-chat-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '20 min',
    category: 'Rozdział 3',
    content: (
      <ModernContent 
        title="Rozdział 3.3: Warsztat"
        icon={<Image src="/icon-chat-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h4 className="text-2xl font-bold text-gray-800 mb-6">Sekcja 3.3: Stół Warsztatowy – Transformacja Promptów</h4>
        
        <p className="text-gray-700 mb-6">Najlepszą nauką jest praktyka. Zobacz, jak zmienić słabe polecenie w mistrzowski prompt 5S.</p>

        <div className="space-y-8">
          {/* Przykład 1 */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <div className="mb-4">
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">Słaby Prompt</span>
              <p className="text-lg font-medium text-gray-900 mt-2">"Napisz plan lekcji o fotosyntezie."</p>
            </div>
            
            <div className="border-t border-gray-300 my-4"></div>

            <div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">Prompt Ekspercki (5S)</span>
              <div className="bg-white p-4 rounded-lg border border-green-200 mt-3 text-gray-700 text-sm leading-relaxed">
                <p><strong>(S)et scene:</strong> Jesteś doświadczonym nauczycielem biologii w 7. klasie szkoły podstawowej.</p>
                <p className="mt-2"><strong>(S)pecify:</strong> Stwórz 45-minutowy, angażujący scenariusz lekcji o fotosyntezie dla 13-latków. Lekcja ma być interaktywna i wykorzystywać metody aktywizujące.</p>
                <p className="mt-2"><strong>(S)tructure:</strong> Scenariusz powinien być w formie tabeli z 3 kolumnami: Etap lekcji (czas), Aktywność Nauczyciela, Aktywność Uczniów.</p>
                <p className="mt-2"><strong>(S)upply:</strong> Uwzględnij aktywność 'think-pair-share' oraz krótkie wideo z YouTube (podaj link).</p>
                <p className="mt-2"><strong>(A)ssess:</strong> Zakończ scenariusz 3 pytaniami sprawdzającymi zrozumienie tematu.</p>
              </div>
            </div>
          </div>

          {/* Przykład 2 */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <div className="mb-4">
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">Słaby Prompt</span>
              <p className="text-lg font-medium text-gray-900 mt-2">"Napisz e-mail do rodzica."</p>
            </div>
            
            <div className="border-t border-gray-300 my-4"></div>

            <div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">Prompt Ekspercki (5S)</span>
              <div className="bg-white p-4 rounded-lg border border-green-200 mt-3 text-gray-700 text-sm leading-relaxed">
                <p><strong>(S)et scene:</strong> Jesteś wychowawcą 5. klasy. Twój ton jest empatyczny, profesjonalny i wspierający.</p>
                <p className="mt-2"><strong>(S)pecify:</strong> Napisz krótki e-mail do rodziców ucznia, który ma problemy z oddawaniem prac domowych na czas. Celem e-maila jest poinformowanie o sytuacji i zaproszenie na spotkanie, aby wspólnie znaleźć rozwiązanie.</p>
                <p className="mt-2"><strong>(S)tructure:</strong> 1. Pozytywny wstęp (coś, co uczeń robi dobrze). 2. Delikatne przedstawienie problemu (bez obwiniania). 3. Propozycja spotkania (podaj dwa terminy). 4. Pozytywne zakończenie.</p>
                <p className="mt-2"><strong>(A)ssess:</strong> Upewnij się, że e-mail nie brzmi konfrontacyjnie.</p>
              </div>
            </div>
          </div>
        </div>
      </ModernContent>
    )
  },

  // ROZDZIAŁ 4
  {
    id: 'rozdzial-4-1',
    title: 'Rozdział 4.1: Problem "Halucynacji" AI',
    icon: <Image src="/icon-shield-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '10 min',
    category: 'Rozdział 4',
    content: (
      <ModernContent 
        title="Rozdział 4.1: Problem 'Halucynacji' AI"
        icon={<Image src="/icon-shield-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h3 className="text-3xl font-bold mb-6 text-purple-700">Rozdział 4. Krytyczna Ocena Treści: Jak Ufać, Ale Sprawdzać</h3>
        
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Sekcja 4.1: Problem "Halucynacji" AI</h4>
        
        <p className="text-gray-700 mb-6">Opanowanie promptingu to połowa sukcesu. Druga połowa to świadomość, że AI, nawet przy najlepszym prompcie, może się mylić, a nawet "zmyślać".</p>

        <SectionCard title="⚠️ Czym są 'halucynacje'?" color="yellow">
          <p className="text-gray-700">Halucynacja ma miejsce, gdy model LLM generuje tekst, który jest płynny, logicznie brzmiący i bardzo przekonujący, ale <strong>całkowicie fałszywy</strong>.</p>
          <p className="text-gray-700 mt-2">Może wymyślić fakty, postacie historyczne, badania naukowe, a nawet cytaty i źródła bibliograficzne.</p>
        </SectionCard>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h5 className="font-bold text-gray-800 mb-3">Dlaczego tak się dzieje?</h5>
          <p className="text-gray-700">Model nie "wie", co jest prawdą; wie tylko, co statystycznie powinno być kolejnym słowem.</p>
          <p className="text-gray-700 mt-2"><strong>Wniosek:</strong> AI nie jest wyrocznią; jest asystentem. Jest niezwykle produktywnym, ale czasem nadgorliwym stażystą. Rolą nauczyciela-eksperta jest weryfikacja pracy tego stażysty.</p>
        </div>
      </ModernContent>
    )
  },
  {
    id: 'rozdzial-4-2',
    title: 'Rozdział 4.2: Checklista F.L.O.B.',
    icon: <Image src="/icon-shield-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '15 min',
    category: 'Rozdział 4',
    content: (
      <ModernContent 
        title="Rozdział 4.2: Checklista F.L.O.B."
        icon={<Image src="/icon-shield-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h4 className="text-2xl font-bold text-gray-800 mb-6">Sekcja 4.2: Checklista Weryfikacji Treści (F.L.O.B.)</h4>
        
        <p className="text-gray-700 mb-6">Jak weryfikować treści generowane przez AI? Stosuj prosty akronim <strong>F.L.O.B.</strong> przed użyciem jakiegokolwiek materiału.</p>

        <div className="grid md:grid-cols-2 gap-6">
          <SectionCard title="F - Fakty" color="blue">
            <p className="text-gray-700 font-medium">Czy podane informacje są prawdziwe?</p>
            <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
              <li>Czy AI podaje źródła?</li>
              <li>Czy te źródła istnieją?</li>
              <li>Czy daty i nazwiska są poprawne?</li>
            </ul>
          </SectionCard>

          <SectionCard title="L - Logika" color="purple">
            <p className="text-gray-700 font-medium">Czy argumentacja jest spójna?</p>
            <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
              <li>Czy tekst nie zawiera sprzeczności?</li>
              <li>Czy wnioski wynikają z przesłanek?</li>
            </ul>
          </SectionCard>

          <SectionCard title="O - Obiektywizm" color="orange">
            <p className="text-gray-700 font-medium">Czy treść jest wolna od uprzedzeń?</p>
            <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
              <li>Czy nie promuje stereotypów?</li>
              <li>Czy przedstawia różne punkty widzenia?</li>
            </ul>
          </SectionCard>

          <SectionCard title="B - Branża (Poziom)" color="green">
            <p className="text-gray-700 font-medium">Czy treść jest odpowiednia dla ucznia?</p>
            <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
              <li>Czy język jest dostosowany do wieku?</li>
              <li>Czy jest zgodna z podstawą programową?</li>
            </ul>
          </SectionCard>
        </div>
      </ModernContent>
    )
  },
  {
    id: 'rozdzial-4-3',
    title: 'Rozdział 4.3: Ćwiczenie – Ocena 3 Tekstów',
    icon: <FileText className="w-5 h-5" />,
    duration: '15 min',
    category: 'Rozdział 4',
    content: (
      <ModernContent 
        title="Rozdział 4.3: Ćwiczenie"
        icon={<FileText />}
      >
        <h4 className="text-2xl font-bold text-gray-800 mb-6">Sekcja 4.3: Interaktywne Ćwiczenie</h4>
        
        <p className="text-gray-700 mb-6">Aby przećwiczyć tę umiejętność, wykonaj samodzielnie to zadanie. Wygeneruj 3 teksty i oceń je checklistą F.L.O.B.</p>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h5 className="font-bold text-gray-900 mb-3">Zadanie 1: Tekst Historyczny</h5>
            <p className="text-gray-600 italic mb-3">Prompt: "Napisz krótką notatkę biograficzną o Marii Skłodowskiej-Curie, wymieniając jej 3 najważniejsze odkrycia i podając 2 źródła."</p>
            <p className="text-sm text-purple-700 font-bold">🔍 Sprawdź (F): Czy podane źródła faktycznie istnieją?</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h5 className="font-bold text-gray-900 mb-3">Zadanie 2: Tekst Naukowy</h5>
            <p className="text-gray-600 italic mb-3">Prompt: "Wyjaśnij w 100 słowach, na czym polega proces globalnego ocieplenia."</p>
            <p className="text-sm text-purple-700 font-bold">🔍 Sprawdź (L): Czy wyjaśnienie jest precyzyjne i logiczne?</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h5 className="font-bold text-gray-900 mb-3">Zadanie 3: Tekst Humanistyczny</h5>
            <p className="text-gray-600 italic mb-3">Prompt: "Zinterpretuj wiersz 'Stepy Akermańskie' Adama Mickiewicza."</p>
            <p className="text-sm text-purple-700 font-bold">🔍 Sprawdź (O): Czy interpretacja jest obiektywna, czy AI narzuca jeden punkt widzenia?</p>
          </div>
        </div>
      </ModernContent>
    )
  },

  // ROZDZIAŁ 5
  {
    id: 'rozdzial-5-1',
    title: 'Rozdział 5.1: Scenariusz 1 - "Opowiadania i Komiksy"',
    icon: <Image src="/icon-bulb-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '15 min',
    category: 'Rozdział 5',
    content: (
      <ModernContent 
        title="Rozdział 5.1: Scenariusz 1"
        icon={<Image src="/icon-bulb-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h3 className="text-3xl font-bold mb-6 text-purple-700">Rozdział 5. Kreatywny Bank Lekcji</h3>
        
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Scenariusz 1: Opowiadania i Komiksy</h4>
        <p className="text-gray-600 mb-4"><strong>Przedmioty:</strong> J. Polski, Plastyka, Godz. Wychowawcza</p>
        
        <SectionCard title="🎯 Cel" color="purple">
          <p className="text-gray-700 mb-4">Rozwijanie kreatywności, ćwiczenie narracji, tworzenie dłuższych prac pisemnych i wizualnych, współpraca w grupie.</p>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="font-bold text-blue-900 mb-2">🤖 Praca z AI (80%):</p>
              <p className="text-gray-700 text-sm mb-2">Uczniowie używają ChatGPT/Copilot jako partnera do burzy mózgów.</p>
              <p className="text-gray-600 italic text-sm">Prompt: "Pomóż nam wymyślić fabułę do 5-stronicowego komiksu o psie z przyszłości. Jaki jest główny problem? Jak go rozwiąże?"</p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="font-bold text-red-900 mb-2">🎨 Tworzenie Grafiki (80%):</p>
              <p className="text-gray-700 text-sm mb-2">Uczniowie używają Canva AI lub Bing Image Creator.</p>
              <p className="text-gray-600 italic text-sm">Prompt: "Stwórz obraz psa-cyborga w stylu komiksowym, który ląduje na szkolnym boisku."</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="font-bold text-green-900 mb-2">✏️ Praca Uczniów (20%):</p>
              <p className="text-gray-700 text-sm">Uczniowie projektują okładkę, składają tekst i obrazy, redagują tekst AI (aby był bardziej "ludzki") i sprawdzają spójność fabuły.</p>
            </div>
          </div>
        </SectionCard>
      </ModernContent>
    )
  },
  {
    id: 'rozdzial-5-2',
    title: 'Rozdział 5.2: Scenariusz 2 - "Analiza Danych i Eksperymenty"',
    icon: <Image src="/icon-bulb-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '15 min',
    category: 'Rozdział 5',
    content: (
      <ModernContent 
        title="Rozdział 5.2: Scenariusz 2"
        icon={<Image src="/icon-bulb-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Scenariusz 2: Analiza Danych i Eksperymenty</h4>
        <p className="text-gray-600 mb-4"><strong>Przedmioty:</strong> Matematyka, Fizyka, Geografia</p>
        
        <SectionCard title="🎯 Cel" color="purple">
          <p className="text-gray-700 mb-4">Analiza dużych zbiorów danych, szukanie korelacji, wizualizacja danych.</p>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="font-bold text-blue-900 mb-2">🤖 Praca z AI (60%):</p>
              <p className="text-gray-700 text-sm mb-2">Uczniowie wprowadzają dane do AI (np. temperatury z ostatniego miesiąca) i proszą o analizę.</p>
              <p className="text-gray-600 italic text-sm">Prompt: "Mam dane o temperaturach... Oblicz średnią, medianę i znajdź najcieplejszy dzień. Wyjaśnij, dlaczego mediana różni się od średniej."</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="font-bold text-green-900 mb-2">✏️ Praca Uczniów (40%):</p>
              <p className="text-gray-700 text-sm">Uczniowie weryfikują obliczenia (na mniejszej próbce), tworzą wykresy w zeszycie/Excelu na podstawie danych i wyciągają wnioski.</p>
            </div>
          </div>
        </SectionCard>
      </ModernContent>
    )
  },
  {
    id: 'rozdzial-5-3',
    title: 'Rozdział 5.3: Scenariusz 3 - "Projektowanie Gier Edukacyjnych"',
    icon: <Image src="/icon-bulb-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '15 min',
    category: 'Rozdział 5',
    content: (
      <ModernContent 
        title="Rozdział 5.3: Scenariusz 3"
        icon={<Image src="/icon-bulb-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Scenariusz 3: Projektowanie Gier Edukacyjnych</h4>
        <p className="text-gray-600 mb-4"><strong>Przedmioty:</strong> Informatyka, Historia, J. Obce</p>
        
        <SectionCard title="🎯 Cel" color="purple">
          <p className="text-gray-700 mb-4">Nauka logicznego myślenia, utrwalanie wiedzy przedmiotowej poprzez zabawę.</p>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="font-bold text-blue-900 mb-2">🤖 Praca z AI (50%):</p>
              <p className="text-gray-700 text-sm mb-2">AI generuje pytania do quizu lub zagadki logiczne.</p>
              <p className="text-gray-600 italic text-sm">Prompt: "Stwórz 10 pytań o II Wojnie Światowej w formacie JSON, gdzie jedno jest bardzo trudne."</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="font-bold text-green-900 mb-2">✏️ Praca Uczniów (50%):</p>
              <p className="text-gray-700 text-sm">Uczniowie programują grę w Scratchu/Pythonie, która wykorzystuje te pytania, lub tworzą grę planszową.</p>
            </div>
          </div>
        </SectionCard>
      </ModernContent>
    )
  },
  {
    id: 'rozdzial-5-4',
    title: 'Rozdział 5.4: Scenariusz 4 - "Technika SCAMPER"',
    icon: <Image src="/icon-bulb-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '15 min',
    category: 'Rozdział 5',
    content: (
      <ModernContent 
        title="Rozdział 5.4: Scenariusz 4"
        icon={<Image src="/icon-bulb-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Scenariusz 4: Kreatywne Myślenie – Technika SCAMPER</h4>
        <p className="text-gray-600 mb-4"><strong>Przedmioty:</strong> Przedsiębiorczość, Godz. Wychowawcza</p>
        
        <SectionCard title="🎯 Cel" color="orange">
          <p className="text-gray-700 mb-4">Ćwiczenie technik kreatywnego myślenia, rozwój pomysłowości.</p>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
            <p className="font-bold text-gray-800 mb-2">💡 Co to SCAMPER?</p>
            <p className="text-gray-600 text-sm">Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, Reverse.</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="font-bold text-blue-900 mb-2">Prompt Ucznia:</p>
            <p className="text-gray-600 italic text-sm">"Używamy techniki SCAMPER, aby ulepszyć 'szkolną ławkę'. Podaj nam 3 pomysły na 'Combine' (Co można połączyć z ławką?) i 3 pomysły na 'Modify' (Jak można ją zmodyfikować?)."</p>
          </div>
          
          <p className="text-gray-700 mt-4 text-sm">Uczniowie zbierają propozycje AI, oceniają je i rozwijają najlepsze.</p>
        </SectionCard>
      </ModernContent>
    )
  },
  {
    id: 'rozdzial-5-5',
    title: 'Rozdział 5.5: Scenariusz 5 - "Mój Wymarzony Wynalazek"',
    icon: <Image src="/icon-rocket-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '15 min',
    category: 'Rozdział 5',
    content: (
      <ModernContent 
        title="Rozdział 5.5: Scenariusz 5"
        icon={<Image src="/icon-rocket-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Scenariusz 5: Mój Wymarzony Wynalazek</h4>
        <p className="text-gray-600 mb-4"><strong>Przedmioty:</strong> Technika, Fizyka, Informatyka</p>
        
        <SectionCard title="🎯 Cel" color="purple">
          <p className="text-gray-700 mb-4">Rozwijanie kreatywności, myślenia projektowego, umiejętności prezentacji.</p>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="font-bold text-blue-900 mb-2">🤖 Praca z AI (70%):</p>
              <p className="text-gray-700 text-sm mb-2">Uczniowie używają AI do generowania pomysłów na wynalazki, ich nazw, funkcji, a nawet wizualizacji.</p>
              <p className="text-gray-600 italic text-sm">Prompt: "Wymyśl 3 innowacyjne wynalazki, które rozwiążą problem zaśmiecania oceanów. Podaj ich nazwy i krótkie opisy. Stwórz obraz jednego z nich w stylu futurystycznym."</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="font-bold text-green-900 mb-2">✏️ Praca Uczniów (30%):</p>
              <p className="text-gray-700 text-sm">Uczniowie wybierają najlepszy pomysł, dopracowują go, tworzą prezentację lub model (fizyczny/cyfrowy) i prezentują go klasie.</p>
            </div>
          </div>
          <div className="mt-4 bg-pink-50 p-4 rounded-lg border border-pink-200">
            <p className="font-bold text-pink-900 mb-2">Finał:</p>
            <p className="text-gray-700 text-sm">Uczniowie tworzą "wirtualną wystawę" wynalazków.</p>
          </div>
        </SectionCard>
      </ModernContent>
    )
  },

  // ROZDZIAŁ 6
  {
    id: 'rozdzial-6-klasa-4',
    title: 'Rozdział 6.1: Klasa IV - "Głuchy Telefon z AI" - Pierwsze Spotkanie',
    icon: <Image src="/icon-chat-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '45 min',
    category: 'Rozdział 6',
    content: (
      <LessonSlides 
        title='Klasa IV: "Pierwsze Spotkanie z Magicznym Ołówkiem"'
        slides={[
          {
            title: "Wprowadzenie i Cele",
            type: "intro",
            content: (
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <h5 className="font-bold text-blue-900 mb-2">📋 Realizowane Wymaganie MEN/IBE:</h5>
                  <p className="text-gray-700">Uczeń <strong>tworzy treści</strong> z wykorzystaniem prostych narzędzi sztucznej inteligencji, w tym obrazy, multimedia i teksty.</p>
                </div>
                <div className="bg-purple-100 p-6 rounded-xl">
                  <h5 className="font-bold text-purple-900 mb-3">🎯 Cel Nadrzędny: Demistyfikacja</h5>
                  <p className="text-gray-700 mb-2"><strong>Język:</strong> Prosty, odwołujący się do magii, ale natychmiast ją "odczarowujący".</p>
                  <p className="text-gray-700">Używaj pojęć: "magiczny ołówek", "pomocnik", "generator obrazków".</p>
                </div>
              </div>
            )
          },
          {
            title: 'Część 1: Gra "Narysuj mi..." (5 minut)',
            type: "activity",
            content: (
              <div className="bg-white p-6 rounded-xl border-2 border-green-200">
                <p className="text-gray-700 mb-4 text-lg"><strong>Działanie:</strong> Poproś 3 uczniów do tablicy.</p>
                <div className="bg-gray-50 p-4 rounded-lg italic text-gray-600 mb-4">
                  "Poproszę Was, abyście jednocześnie narysowali na tablicy... psa. Macie 30 sekund!"
                </div>
                <p className="text-gray-700 mt-3"><strong>Obserwacja:</strong> Trzy zupełnie różne psy.</p>
                <p className="text-gray-700 mt-2 font-bold text-lg">Pytanie: "Dlaczego tak się stało?" → Wniosek: "Bo polecenie było nieprecyzyjne!"</p>
              </div>
            )
          },
          {
            title: 'Część 2: "Głuchy Telefon" (10 minut)',
            type: "activity",
            content: (
              <div className="space-y-4">
                <p className="text-gray-700 text-lg"><strong>Narzędzie:</strong> Bing Image Creator lub Canva AI</p>
                <p className="text-gray-700"><strong>Działanie:</strong> Uruchom na projektorze generator obrazów.</p>
                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                  <p className="font-bold text-red-900 text-xl mb-2">Test 1: Wpiszmy samo słowo "zamek"</p>
                  <p className="text-gray-700">Wynik: Nudne, generyczne obrazy - AI "zgadywała" co masz na myśli!</p>
                </div>
              </div>
            )
          },
          {
            title: 'Część 3: "Dodajemy Kolorów!" (15 minut)',
            type: "activity",
            content: (
              <div className="space-y-6">
                <p className="text-gray-700 text-lg">"Spróbujmy jeszcze raz, ale teraz <strong>WY</strong> podajecie szczegóły!"</p>
                <p className="text-gray-700">Zbieraj pomysły: "Na chmurze!", "Pilnuje go smok!", "Z lodu!"</p>
                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500 shadow-sm">
                  <p className="font-bold text-green-900 mb-2">Przykładowy Prompt:</p>
                  <p className="italic text-gray-700 text-lg">"Lodowy zamek, który stoi na puszystej chmurze, pilnowany przez małego, zielonego smoka, w stylu bajki Disneya"</p>
                  <p className="text-green-700 mt-4 font-bold">✨ Efekt: Spektakularne, spójne wyniki!</p>
                </div>
              </div>
            )
          },
          {
            title: 'Część 4: Gra "Zostań Mistrzem Promptów" (10 minut)',
            type: "activity",
            content: (
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                  <p className="font-bold text-purple-900 mb-4 text-xl">📝 Przepis na Mistrzowski Prompt:</p>
                  <div className="flex flex-wrap gap-2 text-lg font-medium text-gray-700">
                    <span className="bg-white px-3 py-1 rounded shadow-sm">KTO/CO?</span> + 
                    <span className="bg-white px-3 py-1 rounded shadow-sm">CO ROBI?</span> + 
                    <span className="bg-white px-3 py-1 rounded shadow-sm">GDZIE?</span> + 
                    <span className="bg-white px-3 py-1 rounded shadow-sm">JAKI STYL?</span>
                  </div>
                </div>
                <p className="text-gray-700 text-lg">Zadanie: "Różowy słoń na Marsie jeździ na deskorolce narysowany jak komiks"</p>
              </div>
            )
          },
          {
            title: "Wniosek Końcowy",
            type: "summary",
            content: (
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white shadow-xl">
                <h6 className="font-bold text-2xl mb-4">🎓 Kluczowa lekcja:</h6>
                <p className="text-xl leading-relaxed">
                  <strong>AI nie jest mądra. AI jest posłuszna.</strong><br/>
                  Im lepszą instrukcję (prompt) jej damy, tym lepszy obrazek dostaniemy.
                </p>
              </div>
            )
          }
        ]}
      />
    )
  },
  {
    id: 'rozdzial-6-klasa-5',
    title: 'Rozdział 6.2: Klasa V - "Sorter 1.0" - Mój Pierwszy Trening AI',
    icon: <Brain className="w-5 h-5" />,
    duration: '45 min',
    category: 'Rozdział 6',
    content: (
      <LessonSlides 
        title='Klasa V: "Mój Pierwszy Trening AI"'
        slides={[
          {
            title: "Wprowadzenie i Cele",
            type: "intro",
            content: (
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                  <h5 className="font-bold text-green-900 mb-2">📋 Realizowane Wymaganie:</h5>
                  <p className="text-gray-700"><strong>Trenuje</strong> prosty model sztucznej inteligencji i <strong>obserwuje</strong>, jak dane wpływają na jego wyniki.</p>
                </div>
                <div className="bg-blue-100 p-6 rounded-xl">
                  <h5 className="font-bold text-blue-900 mb-3">🎯 Cel: Doświadczenie</h5>
                  <p className="text-gray-700">Uczeń ma zobaczyć, że AI jest "pustą tablicą" - jej wiedza pochodzi TYLKO z danych!</p>
                  <p className="text-gray-700 mt-2"><strong>Metafory:</strong> "AI to szczeniak, którego uczymy", "dane to jedzenie dla AI"</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="font-bold text-yellow-900 mb-1">🛠️ Narzędzie:</p>
                  <p className="text-gray-700"><strong>Teachable Machine</strong> (Google) - tryb "Image Project"</p>
                  <p className="text-sm text-gray-600 mt-1">teachablemachine.withgoogle.com - darmowe, wizualne, działa w przeglądarce!</p>
                </div>
              </div>
            )
          },
          {
            title: 'Część 1: "Skąd On To Wie?" (5 min)',
            type: "activity",
            content: (
              <div className="bg-white p-6 rounded-xl border-2 border-green-200">
                <p className="text-gray-700 mb-4 text-lg"><strong>Pytanie:</strong> "Skąd aparat w telefonie mamy wie, że trzeba zrobić zdjęcie gdy wszyscy się uśmiechną?"</p>
                <p className="text-gray-700 italic text-lg mb-4">"Bo ktoś go tego <strong>nauczył</strong>! Pokazał mu tysiące zdjęć."</p>
                <p className="text-green-700 font-bold text-xl">"Dziś MY to zrobimy!"</p>
              </div>
            )
          },
          {
            title: "Część 2: Przygotowanie (5 min)",
            type: "activity",
            content: (
              <div className="space-y-4">
                <p className="text-gray-700 text-lg">Otwórz Teachable Machine → "Image Project"</p>
                <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <p className="font-bold text-blue-900 mb-2">Wyzwanie:</p>
                  <p className="text-gray-700">Nauczymy AI odróżniać Wasze gesty!</p>
                  <ul className="list-disc list-inside text-gray-700 mt-2 ml-4">
                    <li>Kategoria 1: "Otwarta Dłoń"</li>
                    <li>Kategoria 2: "Zaciśnięta Pięść"</li>
                  </ul>
                </div>
              </div>
            )
          },
          {
            title: 'Część 3: "Karmienie AI Danymi" (15 min)',
            type: "activity",
            content: (
              <div className="space-y-6">
                <p className="text-gray-700 text-xl font-bold">Ochotnik do kamery!</p>
                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-200">
                  <p className="font-bold text-purple-900 mb-2">Dla kategorii "Otwarta Dłoń":</p>
                  <p className="text-gray-700">"Trzymajcie 'Hold to Record' i zróbcie 30-40 zdjęć. Obracajcie dłoń, przybliżajcie, oddalajcie!"</p>
                </div>
                <p className="text-gray-700">Powtórz dla kategorii "Pięść", a potem kliknij <strong>Train Model</strong>.</p>
              </div>
            )
          },
          {
            title: 'Część 4: Testowanie - MOMENT "AHA!" (10 min)',
            type: "activity",
            content: (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="font-bold text-green-800">✅ Test 1: Otwarta dłoń</p>
                    <p className="text-sm text-gray-600">Wynik: 100% "Otwarta Dłoń"</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="font-bold text-green-800">✅ Test 2: Pięść</p>
                    <p className="text-sm text-gray-600">Wynik: 100% "Pięść"</p>
                  </div>
                </div>
                
                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 shadow-md">
                  <p className="font-bold text-red-900 mb-2 text-xl">🤔 KLUCZOWY MOMENT:</p>
                  <p className="text-gray-700 mb-2 text-lg">"A teraz... co się stanie gdy pokażę coś czego NIE uczyliśmy? Np. <strong>kciuk w górę</strong>?"</p>
                  <p className="text-red-700 font-bold mt-2">Model "zgłupieje" - paski będą skakać (60% Dłoń / 40% Pięść)</p>
                </div>
              </div>
            )
          },
          {
            title: "Wniosek Końcowy",
            type: "summary",
            content: (
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 rounded-2xl text-white shadow-xl">
                <h6 className="font-bold text-2xl mb-4">🎓 Kluczowa lekcja:</h6>
                <p className="text-xl leading-relaxed mb-4">
                  <strong>AI wie tylko tyle, ile jej pokażemy.</strong>
                </p>
                <p className="text-lg opacity-90">
                  "Wiedza" AI zależy od danych, którymi ją "nakarmiliśmy".<br/>
                  Żeby nauczyć "kciuk w górę" → musimy dodać nową kategorię z zdjęciami kciuka!
                </p>
              </div>
            )
          }
        ]}
      />
    )
  },
  {
    id: 'rozdzial-6-klasa-6',
    title: 'Rozdział 6.3: Klasa VI - "Detektywi AI" + "Ukryte Koszty Technologii"',
    icon: <Search className="w-5 h-5" />,
    duration: '90 min (2 lekcje)',
    category: 'Rozdział 6',
    content: (
      <LessonSlides 
        title='Klasa VI: "Detektywi AI i Ukryte Koszty"'
        slides={[
          {
            title: "Wprowadzenie i Cele",
            type: "intro",
            content: (
              <div className="space-y-6">
                <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                  <h5 className="font-bold text-orange-900 mb-2">📋 Realizowane Wymaganie:</h5>
                  <p className="text-gray-700">Rozwijanie umiejętności bezpiecznego i odpowiedzialnego korzystania z technologii z uwzględnieniem ich <strong>ograniczeń oraz wpływu na środowisko</strong>.</p>
                </div>
                <div className="bg-purple-100 p-6 rounded-xl">
                  <h5 className="font-bold text-purple-900 mb-2">🎯 Cel: Zdrowy Sceptycyzm</h5>
                  <p className="text-gray-700">Język: "Co tu jest nie tak?", "Gdzie jest haczyk?", "Artefakty", "Sygnały ostrzegawcze"</p>
                </div>
              </div>
            )
          },
          {
            title: '🌍 Lekcja A: "Gdzie Mieszka AI?" (45 min)',
            type: "intro",
            content: (
              <div className="flex items-center justify-center h-full">
                <h2 className="text-4xl font-bold text-blue-600 text-center">Część 1: Ślad Węglowy i Centra Danych</h2>
              </div>
            )
          },
          {
            title: 'Część 1: "Gdzie Mieszka AI?" (10 min)',
            type: "activity",
            content: (
              <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
                <p className="text-gray-700 mb-4 text-lg"><strong>Pytanie:</strong> "Gdzie fizycznie powstają te obrazki z klasy IV?"</p>
                <div className="bg-blue-50 p-6 rounded-xl">
                  <p className="font-bold text-blue-900 text-xl mb-2">💡 Odpowiedź:</p>
                  <p className="text-gray-700 text-lg">Oto <strong>dom AI</strong> - gigantyczna "fabryka" pełna tysięcy komputerów (Centrum Danych).</p>
                  <p className="text-gray-600 mt-2">Te komputery strasznie się grzeją - trzeba je chłodzić!</p>
                </div>
              </div>
            )
          },
          {
            title: 'Część 2: "Karta Faktów AI" (15 min)',
            type: "info",
            content: (
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <p className="font-bold text-yellow-900 text-lg">⚡ Fakt 1 (Prąd):</p>
                  <p className="text-gray-700">Jedno pytanie do ChatGPT zużywa <strong>10x więcej energii</strong> niż szukanie w Google!</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="font-bold text-blue-900 text-lg">💧 Fakt 2 (Woda):</p>
                  <p className="text-gray-700">Jedna długa rozmowa z AI "wypija" <strong>półlitrową butelkę świeżej wody</strong> (chłodzenie serwerów).</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="font-bold text-red-900 text-lg">🌍 Fakt 3 (Skala):</p>
                  <p className="text-gray-700">Do 2026 wszystkie centra danych AI będą zużywać tyle prądu co... <strong>cała Japonia!</strong></p>
                </div>
              </div>
            )
          },
          {
            title: 'Część 3: "Wróg czy Przyjaciel Planety?" (15 min)',
            type: "discussion",
            content: (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                  <p className="font-bold text-red-700 mb-4 text-xl">❌ Minusy:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Zjada dużo prądu</li>
                    <li>Pije wodę</li>
                    <li>Tworzy elektrośmieci</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <p className="font-bold text-green-700 mb-4 text-xl">✅ Plusy:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>Strażnik Lasu:</strong> Wykrywa nielegalne wycinanie</li>
                    <li><strong>Opiekun Zwierząt:</strong> Liczy zagrożone gatunki</li>
                    <li><strong>Łowca Kłusowników:</strong> Przewiduje zagrożenia</li>
                  </ul>
                </div>
              </div>
            )
          },
          {
            title: '🔍 Lekcja B: "Detektyw Artefaktów" (45 min)',
            type: "intro",
            content: (
              <div className="flex items-center justify-center h-full">
                <h2 className="text-4xl font-bold text-purple-600 text-center">Część 2: Rozpoznawanie Fałszu</h2>
              </div>
            )
          },
          {
            title: 'Gra "Prawda czy Fałsz?" (25 min)',
            type: "activity",
            content: (
              <div className="bg-white p-6 rounded-xl border-2 border-purple-200">
                <p className="text-gray-700 mb-4 text-lg">Przygotuj 6-8 obrazów (połowa prawdziwych, połowa AI).</p>
                <div className="bg-purple-50 p-6 rounded-xl text-center">
                  <p className="font-bold text-purple-900 text-2xl mb-4">Głosowanie!</p>
                  <p className="text-gray-700 text-lg">Ręka w górę: "PRAWDA" czy "AI"?</p>
                </div>
                <p className="text-gray-600 mt-4 italic text-center">Po każdym głosowaniu ujawniasz prawdę!</p>
              </div>
            )
          },
          {
            title: '"Checklista Detektywa AI" (15 min)',
            type: "info",
            content: (
              <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-200">
                <p className="font-bold text-orange-900 mb-4 text-xl">🔍 Sygnały Ostrzegawcze (Artefakty):</p>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">👉</span>
                    <span><strong>Dziwne Dłonie:</strong> 6 palców, dziwne kształty.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">👉</span>
                    <span><strong>Dziwne Tło:</strong> Rozmazane, nielogiczne obiekty.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">👉</span>
                    <span><strong>Nielogiczne Napisy:</strong> "Bazgroły" zamiast liter.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">👉</span>
                    <span><strong>Błędy Fizyki:</strong> Cień w złą stronę, złe odbicia.</span>
                  </li>
                </ul>
              </div>
            )
          },
          {
            title: "Wniosek Końcowy",
            type: "summary",
            content: (
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-2xl text-white shadow-xl">
                <h6 className="font-bold text-2xl mb-4">🎓 Kluczowa lekcja:</h6>
                <p className="text-xl leading-relaxed">
                  <strong>Nie wszystko, co widzę w internecie, jest prawdą.</strong><br/>
                  Muszę być detektywem i szukać "artefaktów AI"!
                </p>
              </div>
            )
          }
        ]}
      />
    )
  },
  {
    id: 'rozdzial-6-klasa-7',
    title: 'Rozdział 6.4: Klasa VII - "AI to Mój Asystent" - Polityka 80/20 i F.L.O.B.',
    icon: <FileText className="w-5 h-5" />,
    duration: '45 min',
    category: 'Rozdział 6',
    content: (
      <LessonSlides 
        title='Klasa VII: "AI to Mój Asystent, a Nie Zastępca"'
        slides={[
          {
            title: "Wprowadzenie i Cele",
            type: "intro",
            content: (
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                  <h5 className="font-bold text-green-900 mb-2">📋 Realizowane Wymaganie:</h5>
                  <p className="text-gray-700">Wykorzystuje narzędzia AI do <strong>wspomagania</strong> tworzenia treści, <strong>edytuje je i ocenia</strong> ich trafność oraz zgodność ze specyfikacją problemu.</p>
                </div>
                <div className="bg-blue-100 p-6 rounded-xl">
                  <h5 className="font-bold text-blue-900 mb-3">🎯 Cel: Odpowiedzialność i Weryfikacja</h5>
                  <p className="text-gray-700 mb-2"><strong>Założenie:</strong> Uczniowie już używają AI do zadań domowych.</p>
                  <p className="text-gray-700">Twoja rola: Nie zakazywanie, ale nauczenie <strong>odpowiedzialnego korzystania</strong>.</p>
                  <p className="text-gray-700 mt-2 font-bold">Przejście: "AI zrobi to za mnie" → "AI zrobi to ze mną"</p>
                </div>
              </div>
            )
          },
          {
            title: "Kluczowe Pojęcia",
            type: "info",
            content: (
              <div className="space-y-6">
                <div className="bg-purple-50 p-6 rounded-xl border-2 border-purple-300">
                  <p className="font-bold text-purple-900 text-xl mb-2">Polityka 80/20:</p>
                  <p className="text-gray-700 text-lg">AI wykonuje 80% pracy wstępnej (szkic, pomysły), ale kluczowe 20% (redakcja, weryfikacja, myślenie) należy do CIEBIE.</p>
                </div>
                <div className="bg-red-50 p-6 rounded-xl border-2 border-red-300">
                  <p className="font-bold text-red-900 text-xl mb-2">Halucynacje AI:</p>
                  <p className="text-gray-700 text-lg">AI "zmyśla" fakty, cytaty lub źródła, które wyglądają wiarygodnie, ale są fałszywe.</p>
                </div>
              </div>
            )
          },
          {
            title: 'Część 1: Metafora "Stażysty" (10 min)',
            type: "activity",
            content: (
              <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
                <div className="bg-blue-50 p-6 rounded-lg mb-4 italic text-gray-700 text-lg">
                  "Wyobraźcie sobie, że jesteście Redaktorem Naczelnym gazety. Zatrudniacie super-szybkiego, ale nieuważnego stażystę - to jest AI. On pisze artykuł w 10 sekund."
                </div>
                <p className="text-gray-700 mb-4 text-xl font-bold">Pytanie: "Czy jako szef opublikujecie tekst od razu, bez czytania?"</p>
                <p className="text-red-600 font-bold text-2xl">Nie! Waszą pracą jest go sprawdzić.</p>
                <p className="text-gray-600 mt-2">Jeśli będzie błąd - to WASZA wina (Redaktora), nie stażysty!</p>
              </div>
            )
          },
          {
            title: 'Część 2: Warsztat "na żywo" (10 min)',
            type: "activity",
            content: (
              <div className="space-y-4">
                <p className="text-gray-700 text-lg">Wygeneruj NA ŻYWO (na projektorze) tekst z Twojej lekcji:</p>
                <div className="bg-gray-100 p-4 rounded-lg italic text-gray-600 text-lg border border-gray-300">
                  Przykład: "Scharakteryzuj 3 główne cechy Ebenezera Scrooge'a"
                </div>
                <p className="text-gray-700 text-lg font-bold">Wyświetl tekst klasie → teraz czas na weryfikację!</p>
              </div>
            )
          },
          {
            title: 'Część 3: "Arkusz Redakcyjny F.L.O.B." (20 min)',
            type: "activity",
            content: (
              <div className="space-y-4">
                <p className="text-gray-700 mb-4 text-lg">"Oto tekst od 'stażysty'. Czas na Wasze 20% pracy - musicie być Redaktorem!"</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-xl border border-green-300">
                    <p className="font-bold text-green-900 text-lg">F - FAKTY</p>
                    <p className="text-gray-700">Czy daty i nazwiska są poprawne? Sprawdź w podręczniku!</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-300">
                    <p className="font-bold text-blue-900 text-lg">L - LOGIKA</p>
                    <p className="text-gray-700">Czy tekst odpowiada na polecenie? Czy jest spójny?</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl border border-purple-300">
                    <p className="font-bold text-purple-900 text-lg">O - ORYGINALNOŚĆ</p>
                    <p className="text-gray-700">Czy tekst jest "nudny"? Dodaj własny styl!</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-xl border border-red-300">
                    <p className="font-bold text-red-900 text-lg">B - BŁĘDY</p>
                    <p className="text-gray-700">Gramatyka, styl, powtórzenia.</p>
                  </div>
                </div>
              </div>
            )
          },
          {
            title: "Wniosek Końcowy",
            type: "summary",
            content: (
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 rounded-2xl text-white shadow-xl">
                <h6 className="font-bold text-2xl mb-4">🎓 Kluczowa lekcja:</h6>
                <p className="text-xl leading-relaxed mb-4">
                  <strong>Surowy tekst AI to dopiero początek pracy, a nie jej koniec.</strong>
                </p>
                <p className="text-lg opacity-90">
                  Moja praca (te 20%) to weryfikacja faktów i dodanie własnego myślenia.
                </p>
              </div>
            )
          }
        ]}
      />
    )
  },
  {
    id: 'rozdzial-6-klasa-8',
    title: 'Rozdział 6.5: Klasa VIII - "Świadomy Obywatel AI" - Bias i Etyka',
    icon: <Users className="w-5 h-5" />,
    duration: '90 min (2 lekcje)',
    category: 'Rozdział 6',
    content: (
      <LessonSlides 
        title='Klasa VIII: "Świadomy Obywatel AI"'
        slides={[
          {
            title: "Wprowadzenie i Cele",
            type: "intro",
            content: (
              <div className="space-y-6">
                <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                  <h5 className="font-bold text-red-900 mb-2">📋 Realizowane Wymagania:</h5>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Trenuje model, <strong>analizuje</strong> jego działanie oraz <strong>modyfikuje dane</strong> aby poprawić precyzję</li>
                    <li>Próbuje <strong>odróżnić treści</strong> tworzone przez człowieka od AI oraz porównuje ich <strong>styl i jakość</strong></li>
                  </ul>
                </div>
                <div className="bg-purple-100 p-6 rounded-xl">
                  <h5 className="font-bold text-purple-900 mb-2">🎯 Cel: Świadomość i Etyka</h5>
                  <p className="text-gray-700">Język: "Stronniczość (Bias)", "precyzja", "sprawiedliwość", "etyka", "deepfake"</p>
                </div>
              </div>
            )
          },
          {
            title: '🧪 Lekcja A: "Sorter 2.0 - Stronniczość" (45 min)',
            type: "intro",
            content: (
              <div className="flex items-center justify-center h-full">
                <h2 className="text-4xl font-bold text-red-600 text-center">Część 1: Jak AI może być niesprawiedliwa?</h2>
              </div>
            )
          },
          {
            title: 'Część 1: "Psujemy AI" (15 min)',
            type: "activity",
            content: (
              <div className="bg-white p-6 rounded-xl border-2 border-red-200">
                <p className="text-gray-700 mb-4 text-lg">"Pamiętacie 'Sorter' z klasy V? Dziś zrobimy wersję 2.0, ale najpierw... <strong>celowo</strong> nauczymy AI czegoś głupiego!"</p>
                <div className="bg-red-50 p-6 rounded-xl">
                  <p className="font-bold text-red-900 mb-2">🛠️ Teachable Machine - Celowe Źle Dane:</p>
                  <ul className="list-disc list-inside text-gray-700 text-lg">
                    <li><strong>Kategoria "Papier":</strong> 30 zdjęć TYLKO białych kartek</li>
                    <li><strong>Kategoria "Plastik":</strong> 30 zdjęć TYLKO zielonych butelek</li>
                  </ul>
                </div>
              </div>
            )
          },
          {
            title: "Część 2: Analiza Działania (10 min)",
            type: "activity",
            content: (
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="font-bold text-green-800">Test 1: Biała kartka</p>
                  <p className="text-sm text-gray-600">✅ 100% "Papier"</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="font-bold text-green-800">Test 2: Zielona butelka</p>
                  <p className="text-sm text-gray-600">✅ 100% "Plastik"</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border-2 border-red-400 text-center">
                  <p className="font-bold text-red-800">Test 3: Biała torba</p>
                  <p className="text-sm text-red-700">❌ 95% "Papier" - BŁĄD!</p>
                </div>
              </div>
            )
          },
          {
            title: 'Część 3: Dyskusja "Dlaczego?" (10 min)',
            type: "discussion",
            content: (
              <div className="space-y-6">
                <p className="text-gray-700 text-xl font-bold">Pytanie: "Dlaczego AI się pomyliła? Przecież to plastik!"</p>
                <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400">
                  <p className="font-bold text-yellow-900 text-xl mb-2">💡 Wniosek:</p>
                  <p className="text-gray-700 text-lg">"Bo nauczyliśmy ją, że '<strong>Papier = Biały</strong>', a '<strong>Plastik = Zielony</strong>'!"</p>
                  <p className="text-red-700 mt-2 font-bold text-xl">Nasze dane były STRONNICZE (BIASED)!</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-bold text-blue-900">📚 Pojęcie: "Bias in, Bias out"</p>
                  <p className="text-gray-700">Jeśli AI uczy się na stronniczych danych, będzie podejmować niesprawiedliwe decyzje!</p>
                </div>
              </div>
            )
          },
          {
            title: "Część 4: Naprawa Modelu (10 min)",
            type: "activity",
            content: (
              <div className="bg-white p-6 rounded-xl border-2 border-green-200">
                <p className="text-gray-700 mb-2 text-lg"><strong>Rozwiązanie:</strong> "Model potrzebuje więcej i <strong>bardziej różnorodnych</strong> danych!"</p>
                <div className="bg-green-50 p-6 rounded-xl mt-4">
                  <p className="font-bold text-green-900 mb-2">🔧 Akcja - Dodaj po 50 RÓŻNORODNYCH zdjęć:</p>
                  <ul className="list-disc list-inside text-gray-700 text-lg">
                    <li>Do "Papier": gazety, tektury, <strong>kolorowe</strong> kartki</li>
                    <li>Do "Plastik": <strong>białe</strong> torby, przezroczyste folie</li>
                  </ul>
                </div>
              </div>
            )
          },
          {
            title: '🎭 Lekcja B: "Prawda czy AI? - Poziom Ekspert" (45 min)',
            type: "intro",
            content: (
              <div className="flex items-center justify-center h-full">
                <h2 className="text-4xl font-bold text-purple-600 text-center">Część 2: Etyka i Twórczość</h2>
              </div>
            )
          },
          {
            title: 'Gra "Poezja: Prawda czy AI?" (15 min)',
            type: "activity",
            content: (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="font-bold text-gray-800 mb-2">Wiersz A (AI)</p>
                    <p className="text-sm text-gray-700 italic">Złote promienie przebijają horyzont... (Perfekcyjne, ale nudne)</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="font-bold text-gray-800 mb-2">Wiersz B (Człowiek)</p>
                    <p className="text-sm text-gray-700 italic">Kogut pieje... (Nietypowe metafory, emocje)</p>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="font-bold text-yellow-900 mb-2">🔍 Porównanie Stylu:</p>
                  <ul className="list-disc list-inside text-gray-700">
                    <li><strong>AI:</strong> "Perfekcyjna", ale używa klisz. Płytka.</li>
                    <li><strong>Człowiek:</strong> Autentyczny, czuć emocje.</li>
                  </ul>
                </div>
              </div>
            )
          },
          {
            title: 'Debata "Etyka AI" (20 min)',
            type: "discussion",
            content: (
              <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                <p className="font-bold text-red-900 mb-4 text-xl">💭 Tezy do Debaty:</p>
                <ol className="list-decimal list-inside text-gray-700 space-y-4 text-lg">
                  <li>Czy AI powinna być używana do <strong>oceniania waszych sprawdzianów</strong>?</li>
                  <li>Czy AI powinna decydować kto dostanie <strong>pracę lub kredyt w banku</strong>?</li>
                  <li>Co jest groźniejsze: "halucynacje" AI czy "deepfake"?</li>
                </ol>
              </div>
            )
          },
          {
            title: "Wniosek Końcowy",
            type: "summary",
            content: (
              <div className="bg-gradient-to-r from-red-600 to-purple-600 p-8 rounded-2xl text-white shadow-xl">
                <h6 className="font-bold text-2xl mb-4">🎓 Kluczowa lekcja:</h6>
                <p className="text-xl leading-relaxed mb-4">
                  <strong>AI jest tylko (i aż) narzędziem.</strong>
                </p>
                <p className="text-lg opacity-90">
                  To <strong>WY - ludzie</strong> - jesteście odpowiedzialni za to jak ją trenujecie i do czego jej używacie.
                </p>
              </div>
            )
          }
        ]}
      />
    )
  },

  // ROZDZIAŁ 7
  {
    id: 'rozdzial-7-1',
    title: 'Rozdział 7.1: Komunikacja z Rodzicami',
    icon: <Image src="/icon-chat-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '15 min',
    category: 'Rozdział 7',
    content: (
      <ModernContent 
        title="Rozdział 7.1: Komunikacja z Rodzicami"
        icon={<Image src="/icon-chat-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h3 className="text-3xl font-bold mb-6 text-purple-700">Rozdział 7. AI Poza Klasą: Budowanie Społeczności</h3>
        
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Sekcja 7.1: Komunikacja z Rodzicami</h4>
        
        <p className="text-gray-700 mb-6">Skuteczne wdrożenie AI wymaga transparentności. Rodzice nie powinni być zaskoczeni, że ich dzieci używają AI w szkole.</p>

        <SectionCard title="Klucz: Transparentność" color="blue">
          <p className="text-gray-700">Rodzice często boją się: plagiatów, uzależnienia i zaniku myślenia. Nauczyciel musi proaktywnie zaadresować te obawy, wyjaśniając <strong>DLACZEGO</strong> (podstawa 2026) i <strong>JAK</strong> (etycznie, krytycznie) używamy AI.</p>
        </SectionCard>
      </ModernContent>
    )
  },
  {
    id: 'rozdzial-7-2',
    title: 'Rozdział 7.2: Gotowa Prezentacja dla Rodziców',
    icon: <Image src="/icon-chat-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '15 min',
    category: 'Rozdział 7',
    content: (
      <ModernContent 
        title="Rozdział 7.2: Prezentacja dla Rodziców"
        icon={<Image src="/icon-chat-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h4 className="text-2xl font-bold text-gray-800 mb-6">Sekcja 7.2: Gotowa Prezentacja dla Rodziców (5 Slajdów)</h4>
        
        <div className="space-y-6">
          <SectionCard title="Slajd 1: Tytuł" color="purple">
            <h5 className="text-xl font-bold text-gray-900 mb-2">AI w Naszej Szkole: Przygotowanie na Przyszłość</h5>
            <p className="text-gray-700 mb-2"><strong>Treść:</strong> AI to technologia, która pomaga nam analizować informacje. To nie "magia".</p>
            <p className="text-gray-700"><strong>Dlaczego teraz?</strong> 1. Świat się zmienia. 2. Od 2026 to wymóg podstawy programowej.</p>
          </SectionCard>

          <SectionCard title="Slajd 2: Nasz Cel" color="purple">
            <h5 className="text-xl font-bold text-gray-900 mb-2">Mądrzejsza Nauka, Nie Łatwiejsze Ściąganie</h5>
            <p className="text-gray-700">AI nie zastępuje myślenia, ale je wzmacnia. Pomaga w personalizacji i rozwija kreatywność (uczniowie skupiają się na pomysłach, AI pomaga w wykonaniu).</p>
          </SectionCard>

          <SectionCard title="Slajd 3: Bezpieczeństwo" color="purple">
            <h5 className="text-xl font-bold text-gray-900 mb-2">Bezpieczeństwo i Etyka Przede Wszystkim</h5>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li><strong>Plagiaty?</strong> Zmieniamy zadania na "zweryfikuj AI".</li>
              <li><strong>Dezinformacja?</strong> Uczymy krytycznego myślenia (szukanie błędów AI).</li>
              <li><strong>Prywatność?</strong> Nigdy nie podajemy danych osobowych uczniów.</li>
            </ul>
          </SectionCard>

          <SectionCard title="Slajd 4: Rola Rodzica" color="purple">
            <h5 className="text-xl font-bold text-gray-900 mb-2">Współpraca</h5>
            <p className="text-gray-700">Rozmawiajcie z dziećmi o narzędziach. Ćwiczcie krytyczne myślenie ("Czy to zdjęcie w sieci jest prawdziwe?"). Promujcie higienę cyfrową.</p>
          </SectionCard>
        </div>
      </ModernContent>
    )
  },
  {
    id: 'rozdzial-7-3',
    title: 'Rozdział 7.3: Budowanie Społeczności',
    icon: <Image src="/icon-chat-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '15 min',
    category: 'Rozdział 7',
    content: (
      <ModernContent 
        title="Rozdział 7.3: Budowanie Społeczności"
        icon={<Image src="/icon-chat-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Sekcja 7.3: Budowanie Społeczności Nauczycielskiej</h4>
        
        <p className="text-gray-700 mb-6">Nauczyciel nie może zostać z tym sam. Wdrożenie AI to gra zespołowa.</p>

        <div className="grid md:grid-cols-3 gap-4">
          <SectionCard title="Bank Zasobów" color="green">
            <p className="text-sm text-gray-600">Wspólny dysk/folder, gdzie dzielimy się działającymi promptami i scenariuszami.</p>
          </SectionCard>

          <SectionCard title="Mentoring" color="blue">
            <p className="text-sm text-gray-600">Łączenie "cyfrowych entuzjastów" z tymi, którzy potrzebują wsparcia.</p>
          </SectionCard>

          <SectionCard title="Webinary" color="purple">
            <p className="text-sm text-gray-600">Krótkie spotkania "Piątek z AI" - dzielenie się sukcesami i problemami.</p>
          </SectionCard>
        </div>
      </ModernContent>
    )
  },

  // ROZDZIAŁ 8
  {
    id: 'rozdzial-8-1',
    title: 'Rozdział 8: Twój Plan Rozwoju (Nauczyciel 2.0)',
    icon: <Image src="/icon-rocket-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '15 min',
    category: 'Rozdział 8',
    content: (
      <ModernContent 
        title="Rozdział 8.1: Przyszłość Edukacji"
        icon={<Image src="/icon-rocket-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h3 className="text-3xl font-bold mb-6 text-purple-700">Rozdział 8. Przyszłość Edukacji z AI</h3>
        
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Sekcja 8.1: Co nas czeka?</h4>
        <p className="text-gray-600 mb-4">Edukacja zmienia się na naszych oczach. AI to nie chwilowa moda, to nowa rzeczywistość.</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <SectionCard title="Personalizacja (Tutorzy AI)" color="blue">
            <p className="text-gray-700">Każdy uczeń będzie miał swojego osobistego asystenta AI, który:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
              <li>Dostosuje tempo nauki do jego możliwości.</li>
              <li>Wytłumaczy trudne zagadnienia na przykładach z jego zainteresowań (np. fizyka na przykładzie piłki nożnej).</li>
              <li>Będzie dostępny 24/7.</li>
            </ul>
          </SectionCard>

          <SectionCard title="Zmiana Roli Nauczyciela" color="purple">
            <p className="text-gray-700">Nauczyciel przestanie być "wykładowcą" (źródłem wiedzy), a stanie się:</p>
            <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
              <li>Mentorem i przewodnikiem.</li>
              <li>Facylitatorem dyskusji i projektów.</li>
              <li>Ekspertem od relacji międzyludzkich i emocji (czego AI nie potrafi).</li>
            </ul>
          </SectionCard>
        </div>
      </ModernContent>
    )
  },
  {
    id: 'rozdzial-8-2',
    title: 'Rozdział 8.2: Twój Plan Rozwoju',
    icon: <Image src="/icon-calendar-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '15 min',
    category: 'Rozdział 8',
    content: (
      <ModernContent 
        title="Rozdział 8.2: Twoja Droga"
        icon={<Image src="/icon-calendar-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Sekcja 8.2: Twój Plan Rozwoju</h4>
        <p className="text-gray-600 mb-4">Nie musisz umieć wszystkiego od razu. Zacznij małymi krokami.</p>
        
        <SectionCard title="Plan Działania na Najbliższy Tydzień" color="green">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold flex-shrink-0">1</div>
              <div>
                <p className="font-bold text-gray-800">Załóż konto</p>
                <p className="text-gray-600 text-sm">Zarejestruj się w ChatGPT lub Gemini (jeśli jeszcze tego nie zrobiłeś).</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold flex-shrink-0">2</div>
              <div>
                <p className="font-bold text-gray-800">Jeden Prompt Dziennie</p>
                <p className="text-gray-600 text-sm">Codziennie poproś AI o jedną małą rzecz (np. pomysł na rozgrzewkę, mail do rodziców, ciekawostkę).</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold flex-shrink-0">3</div>
              <div>
                <p className="font-bold text-gray-800">Podziel się z Uczniami</p>
                <p className="text-gray-600 text-sm">Pokaż uczniom na lekcji, jak AI generuje coś ciekawego. Zobacz ich reakcję!</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </ModernContent>
    )
  },

  // ZAKOŃCZENIE
  {
    id: 'zakonczenie-1',
    title: 'Zakończenie: Podsumowanie Kursu',
    icon: <Image src="/icon-rocket-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '5 min',
    category: 'Zakończenie',
    content: (
      <ModernContent 
        title="Zakończenie: Podsumowanie Kursu"
        icon={<Image src="/icon-rocket-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h3 className="text-3xl font-bold mb-6 text-purple-700">Zakończenie Szkolenia</h3>
        
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Podsumowanie Drogi</h4>
        
        <p className="text-gray-700 mb-6">Gratulacje! Przeszedłeś drogę od obaw i niepewności, przez zrozumienie podstaw, aż po zaawansowane scenariusze lekcyjne.</p>

        <SectionCard title="Co zabierasz ze sobą?" color="green">
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Wiedzę, że <strong>AI to narzędzie</strong>, a nie zastępstwo.</li>
            <li>Umiejętność tworzenia <strong>dobrych promptów (R.O.L.A.)</strong>.</li>
            <li>Świadomość zagrożeń (halucynacje, bias, RODO).</li>
            <li>Gotowe scenariusze lekcji dla Twojej klasy.</li>
          </ul>
        </SectionCard>
      </ModernContent>
    )
  },
  {
    id: 'zakonczenie-2',
    title: 'Zakończenie: Certyfikat',
    icon: <Image src="/icon-shield-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '5 min',
    category: 'Zakończenie',
    content: (
      <ModernContent 
        title="Zakończenie"
        icon={<Image src="/icon-shield-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h3 className="text-3xl font-bold mb-6 text-purple-700">Gratulacje! Ukończyłeś Kurs!</h3>
        
        <p className="text-gray-600 mb-6 text-lg">Właśnie zrobiłeś ogromny krok w stronę nowoczesnej edukacji. Pamiętaj, że technologia to tylko narzędzie – to Ty, Twoja pasja i Twoje relacje z uczniami są najważniejsze.</p>
        
        <SectionCard title="Twój Certyfikat" color="purple">
          <p className="text-gray-700 mb-4">Poniżej możesz pobrać swój certyfikat ukończenia szkolenia "AI w Edukacji".</p>
          <div className="bg-gray-100 p-8 rounded-lg border-2 border-dashed border-gray-300 text-center">
            <p className="text-gray-500 italic">[Miejsce na moduł generowania certyfikatu PDF]</p>
            <button className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold shadow-md">
              Pobierz Certyfikat
            </button>
          </div>
        </SectionCard>

        <div className="mt-8 text-center">
          <h4 className="text-xl font-bold text-gray-800 mb-2">Co Dalej?</h4>
          <p className="text-gray-600">Dołącz do naszej społeczności nauczycieli na Facebooku i dziel się swoimi sukcesami!</p>
          <button className="mt-4 px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
            Dołącz do Grupy
          </button>
        </div>
      </ModernContent>
    )
  },
  {
    id: 'zakonczenie-3',
    title: 'Zakończenie: Co Dalej? (Społeczność)',
    icon: <Image src="/icon-chat-3d.png" alt="Icon" width={32} height={32} className="object-contain" />,
    duration: '5 min',
    category: 'Zakończenie',
    content: (
      <ModernContent 
        title="Zakończenie: Społeczność"
        icon={<Image src="/icon-chat-3d.png" alt="Icon" width={40} height={40} className="object-contain" />}
      >
        <h4 className="text-2xl font-bold text-gray-800 mb-4">Co Dalej? Dołącz do Nas!</h4>
        
        <p className="text-gray-700 mb-6">Edukacja to gra zespołowa. Nie zostawaj z tą wiedzą sam!</p>

        <div className="grid md:grid-cols-2 gap-6">
          <SectionCard title="Grupa Wsparcia" color="blue">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <p className="text-gray-600 text-sm">Dołącz do naszej grupy na Facebooku dla nauczycieli wdrażających AI.</p>
          </SectionCard>

          <SectionCard title="Newsletter" color="purple">
            <Rocket className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <p className="text-gray-600 text-sm">Zapisz się na cotygodniową dawkę nowych promptów i narzędzi.</p>
          </SectionCard>
        </div>
      </ModernContent>
    )
  },
]