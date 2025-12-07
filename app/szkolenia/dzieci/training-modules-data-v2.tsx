import React from 'react'
import { 
  BookOpen, Play, CheckCircle, Lock, Unlock, Eye, EyeOff, Sparkles, 
  GraduationCap, Award, Clock, Users, LogOut, Zap, Target, Shield, 
  MessageSquare, Search, Palette, Lightbulb, Scale, FileText, Rocket, 
  TrendingUp, Check, Brain, Cpu, Layers, Image as ImageIcon, Video, AlertTriangle, Globe, Fingerprint, Leaf, HelpCircle, Terminal
} from 'lucide-react'
import { ModernContent, SectionCard, InfoBox } from '../nauczyciele/components/ModernContent'

export interface TrainingModule {
  id: string
  title: string
  duration: string
  video: string | null
  audio1?: string
  audio2?: string
  content: React.ReactNode
}

export const trainingModules: TrainingModule[] = [
  {
    id: 'wstep',
    title: 'Moduł 1: Wstęp - Jak uczyć się z AI?',
    duration: '5 min',
    video: '/wstep.mp4',
    content: (
      <ModernContent 
        title="Szkolenie: Wykorzystanie AI do Efektywnej Nauki"
        icon={<Sparkles />}
      >
        <h3 className="text-2xl font-bold mb-4 text-purple-600">Szkolenie: Wykorzystanie Sztucznej Inteligencji (AI) do Efektywnej Nauki i Weryfikacji Wiedzy</h3>
        
        <div className="space-y-6">
          <SectionCard title="Cel szkolenia" color="purple">
            <p className="text-gray-700 leading-relaxed">
              Nauczenie uczestników, jak tworzyć spersonalizowane materiały edukacyjne przy użyciu modelu językowego Claude 
              oraz jak przeprowadzać interaktywne sesje sprawdzające wiedzę z wykorzystaniem Asystenta Gemini.
            </p>
          </SectionCard>

          <SectionCard title="Dla kogo" color="blue">
            <p className="text-gray-700 leading-relaxed">
              Rodzice, korepetytorzy, nauczyciele oraz uczniowie, którzy chcą w nowoczesny sposób wspierać proces edukacji.
            </p>
          </SectionCard>

          <SectionCard title="Co zyskasz" color="green">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Umiejętność tworzenia spersonalizowanych materiałów edukacyjnych</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Praktyczną wiedzę o wykorzystaniu AI w edukacji</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Narzędzia do interaktywnego testowania wiedzy</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Dostęp do społeczności i wsparcia</span>
              </li>
            </ul>
          </SectionCard>
        </div>
      </ModernContent>
    )
  },
  {
    id: 'modul1-krok1',
    title: 'Moduł 2: Tworzenie materiałów - Rejestracja',
    duration: '8 min',
    video: '/1-film.mp4',
    content: (
      <ModernContent 
        title="Tworzenie Spersonalizowanych Materiałów"
        icon={<FileText />}
      >
        <h3 className="text-2xl font-bold mb-4 text-purple-600">Tworzenie Spersonalizowanych Materiałów do Nauki z Claude.ai</h3>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          W tym module stworzymy od podstaw materiał do nauki, idealnie dopasowany do wieku ucznia i zgodny z polską podstawą programową.
        </p>

        <SectionCard title="Krok 1: Rejestracja i pierwsze kroki" color="blue">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <p className="text-gray-700 pt-1">Otwórz przeglądarkę internetową i wejdź na stronę: <strong className="text-blue-600">www.claude.ai</strong></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <p className="text-gray-700 pt-1">Załóż darmowe konto, logując się za pomocą swojego konta Google lub podając adres e-mail i postępując zgodnie z instrukcjami.</p>
            </div>
          </div>
        </SectionCard>

        <InfoBox icon={<Lightbulb />}>
          <strong>Wskazówka:</strong> Zalecamy użycie konta Google - to najszybszy sposób rejestracji!
        </InfoBox>
      </ModernContent>
    )
  },
  {
    id: 'modul1-krok2',
    title: 'Moduł 3: Tworzenie materiałów - Generowanie zagadnień',
    duration: '10 min',
    video: '/2-film.mp4',
    content: (
      <ModernContent 
        title="Generowanie kluczowych zagadnień"
        icon={<Target />}
      >
        <h3 className="text-2xl font-bold mb-4 text-purple-600">Generowanie kluczowych zagadnień z podstawy programowej</h3>
        
        <SectionCard title="Krok 2: Tworzenie Promptu" color="purple">
          <p className="text-gray-700 mb-4">
            Po zalogowaniu zobaczysz główne okno czatu. W polu wpisywania tekstu (wierszu poleceń) wprowadź następujące polecenie (prompt), 
            uzupełniając dane w nawiasach:
          </p>

          <div className="bg-white p-4 rounded-lg border-2 border-purple-200 font-mono text-sm">
            <p className="text-gray-800">
              Jesteś ekspertem od polskiego systemu edukacji. Znajdź i przedstaw w punktach kluczowe zagadnienia z podstawy programowej 
              Ministerstwa Edukacji Narodowej (MEN) dla przedmiotu <strong className="bg-yellow-200 px-1">[wpisz przedmiot, np. Historia]</strong> 
              dla klasy <strong className="bg-yellow-200 px-1">[wpisz klasę, np. 4 szkoły podstawowej]</strong> 
              na temat <strong className="bg-yellow-200 px-1">[wpisz temat, np. Mieszko I i początki Polski]</strong>.
            </p>
          </div>
        </SectionCard>

        <SectionCard title="Kolejne kroki" color="green">
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <span>Kliknij ikonę strzałki, aby wysłać polecenie</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <span>Poczekaj chwilę, aż Claude przetworzy Twoje zapytanie</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
              <span>Otrzymasz listę zagadnień zgodną z podstawą programową</span>
            </li>
          </ol>
        </SectionCard>
      </ModernContent>
    )
  },
  {
    id: 'modul1-krok3',
    title: 'Moduł 4: Tworzenie materiałów - Przekształcanie wiedzy',
    duration: '12 min',
    video: '/3-film.mp4',
    content: (
      <ModernContent 
        title="Przekształcanie w materiał edukacyjny"
        icon={<Rocket />}
      >
        <h3 className="text-2xl font-bold mb-4 text-purple-600">Przekształcanie zagadnień w materiał edukacyjny przyjazny dziecku</h3>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Gdy otrzymasz odpowiedź z kluczowymi zagadnieniami, pozostaw ją w oknie czatu i wpisz poniżej kolejne polecenie:
        </p>

        <SectionCard title="Prompt do przekształcenia materiału" color="green">
          <div className="bg-white p-4 rounded-lg border-2 border-green-200 font-mono text-sm">
            <p className="text-gray-800">
              Na podstawie powyższych zagadnień, stwórz rozszerzoną listę punktów, które trzeba zapamiętać. 
              Przedstaw je w sposób niezwykle łatwy do zapamiętania dla <strong className="bg-yellow-200 px-1">[wpisz wiek dziecka, np. 10-latka]</strong>. 
              Użyj prostego języka, porównań, metafor, a nawet mnemotechnik. 
              Każdy kluczowy termin lub data muszą być jasno wytłumaczone.
            </p>
          </div>
        </SectionCard>

        <InfoBox icon={<GraduationCap />}>
          <strong>Rezultat:</strong> Claude stworzy teraz szczegółowy i przystępny materiał, idealny do nauki dla dziecka. 
          Materiał będzie zawierał proste wyjaśnienia, przykłady z życia i łatwe do zapamiętania skojarzenia.
        </InfoBox>
      </ModernContent>
    )
  },
  {
    id: 'modul1-krok4',
    title: 'Moduł 5: Tworzenie materiałów - Zapisywanie (PDF)',
    duration: '6 min',
    video: '/4-film.mp4',
    content: (
      <ModernContent 
        title="Zapisywanie gotowego materiału"
        icon={<CheckCircle />}
      >
        <h3 className="text-2xl font-bold mb-6 text-purple-600">Zapisywanie gotowego materiału</h3>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Po wygenerowaniu materiału, zapisz go w wygodnym formacie PDF, aby móc z niego korzystać w dowolnym miejscu i czasie.
        </p>

        <SectionCard title="Jak zapisać materiał" color="purple">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <p className="text-gray-700 pt-1">Po wygenerowaniu materiału znajdź pod odpowiedzią przycisk <strong>"Copy"</strong> (Kopiuj)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <p className="text-gray-700 pt-1">Obok przycisku "Copy" znajduje się ikona strzałki w dół. <strong>Kliknij ją</strong></p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
              <p className="text-gray-700 pt-1">Z menu wybierz opcję <strong>"Download as PDF"</strong> (Pobierz jako PDF)</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
              <p className="text-gray-700 pt-1">Zapisz plik na swoim komputerze w łatwo dostępnym miejscu</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Gratulacje!" color="green">
          <p className="text-gray-700 leading-relaxed">
            Masz teraz gotowy, spersonalizowany plik PDF, który możesz wydrukować, przesłać na tablet/telefon lub używać na komputerze.
          </p>
        </SectionCard>
      </ModernContent>
    )
  },
  {
    id: 'modul2-krok1',
    title: 'Moduł 6: Testowanie wiedzy - Przygotowanie narzędzi',
    duration: '7 min',
    video: '/5-film.mp4',
    content: (
      <ModernContent 
        title="Interaktywne Sprawdzanie Wiedzy"
        icon={<MessageSquare />}
      >
        <h3 className="text-2xl font-bold mb-4 text-purple-600">Interaktywne Sprawdzanie Wiedzy z Gemini</h3>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          W tej części wykorzystamy stworzony plik PDF, aby przeprowadzić z uczniem interaktywny test wiedzy 
          przy użyciu Asystenta Gemini w trybie głosowym lub pisemnym.
        </p>

        <SectionCard title="Na telefonie" color="blue">
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Pobierz aplikację <strong>Gemini</strong> ze sklepu Google Play (Android) lub App Store (iOS)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Zaloguj się na to samo konto Google, którego będziesz używać na komputerze</span>
            </li>
          </ul>
        </SectionCard>

        <SectionCard title="Na komputerze" color="purple">
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Uruchom przeglądarkę internetową i wejdź na stronę: <strong className="text-purple-600">gemini.google.com</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Zaloguj się na swoje konto Google</span>
            </li>
          </ul>
        </SectionCard>
      </ModernContent>
    )
  },
  {
    id: 'modul2-krok2',
    title: 'Moduł 7: Testowanie wiedzy - Konfiguracja Gemini',
    duration: '8 min',
    video: '/6-film.mp4',
    content: (
      <ModernContent 
        title="Przygotowanie sesji testowej"
        icon={<Rocket />}
      >
        <h3 className="text-2xl font-bold mb-4 text-purple-600">Przygotowanie sesji testowej</h3>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          W oknie czatu Gemini na komputerze, w polu "Zapytaj Gemini", wpisz poniższe polecenie. <strong>Nie wciskaj jeszcze Enter!</strong>
        </p>

        <SectionCard title="Kluczowy prompt do testu wiedzy" color="purple">
          <div className="bg-white p-4 rounded-lg border-2 border-purple-200 font-mono text-sm max-h-[400px] overflow-y-auto">
            <p className="text-gray-800 whitespace-pre-wrap">
              Przygotuj zestaw pytań sprawdzających wiedzę na podstawie przesłanego pliku. Pytania mają być różnorodne, każde pytanie zadajesz po odpowiedzi na poprzednie:
              {'\n\n'}• Pięć pytań otwartych, wymagających krótkiej odpowiedzi. Aby była prawidłowa, odpowiedź musi składać się z minimum dwóch słów.
              {'\n'}• Pięć pytań testowych z jedną poprawną odpowiedzią. Jeśli odpowiedź będzie niepełna lub niepoprawna, odpowiedz "błędna odpowiedź" i uzasadnij czemu.
              {'\n'}• Dwa pytania typu "prawda/fałsz".
              {'\n\n'}Po otrzymaniu każdej odpowiedzi, sprawdź, czy była w pełni prawidłowa. Jeśli tak, przejdź do następnego pytania. Jeśli odpowiedź nie jest prawidłowa, powiedz: "błędna odpowiedź" i dokładnie uzasadnij dlaczego.
              {'\n\n'}Po serii pytań napisz podsumowanie testu, omawiając błędne odpowiedzi. Następnie zapytaj, czy kontynuujemy sprawdzanie wiedzy. Jeśli odpowiedź będzie "tak", przygotuj następny, inny zestaw pytań. Powtarzaj to pytanie po każdym zakończonym teście.
              {'\n\n'}Test zaczynasz od pytania: "Czy możemy zacząć?". Rozmowa jest z dzieckiem, więc bądź dokładny i daj dużo czasu na odpowiedź.
              {'\n\n'}WAŻNE: Jeśli odpowiedź na pytanie nie brzmi prawidłowo, upewnij się, że to ostateczna odpowiedź. Jeśli dziecko powie "nie", poinformuj je, że gdy odpowiedź będzie ostateczna, ma powiedzieć słowo "gotowe". Nie przerywaj wypowiedzi, dopóki nie usłyszysz tego słowa.
              {'\n\n'}Rozmowa ma odbywać się w 100% w języku polskim, a asystent głosowy ma odpowiadać również w 100% po polsku.
            </p>
          </div>
        </SectionCard>

        <SectionCard title="Następne kroki" color="green">
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <span>Teraz załącz plik PDF stworzony w Module 1. Kliknij ikonę plusa [+] w polu tekstowym, wybierz "Prześlij pliki" i wskaż zapisany dokument.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <span>Po załączeniu pliku, wciśnij Enter, aby wysłać polecenie wraz z plikiem.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
              <span>Poczekaj 2-3 minuty, aż Gemini przetworzy dane.</span>
            </li>
          </ol>
        </SectionCard>

        <InfoBox icon={<Lightbulb />}>
          <strong>Wskazówka:</strong> Możesz skopiować prompt powyżej i wkleić go do Gemini. 
          Upewnij się, że plik PDF został poprawnie załączony przed wysłaniem.
        </InfoBox>
      </ModernContent>
    )
  },
  {
    id: 'modul2-krok3',
    title: 'Moduł 8: Testowanie wiedzy - Asystent głosowy',
    duration: '9 min',
    video: '/7-film.mp4',
    content: (
      <ModernContent 
        title="Uruchomienie Asystenta Głosowego"
        icon={<MessageSquare />}
      >
        <h3 className="text-2xl font-bold mb-4 text-purple-600">Uruchomienie Asystenta Głosowego na telefonie</h3>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Teraz uruchomimy asystenta głosowego, który będzie prowadził interaktywny test na wzór rozmowy z nauczycielem.
        </p>

        <SectionCard title="Jak uruchomić asystenta" color="purple">
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <span>Otwórz aplikację <strong>Gemini</strong> na telefonie</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <span>Kliknij ikonę menu (trzy kreski) w lewym górnym rogu i wybierz ostatnią rozmowę (tę, którą właśnie rozpocząłeś na komputerze)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
              <span>Wejdź w rozmowę. Na dole ekranu zobaczysz ikonę mikrofonu 🎤 i obok niej logo asystenta głosowego (ikona słuchawek lub podobna)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
              <span>Kliknij ikonę asystenta głosowego, aby rozpocząć interaktywną rozmowę</span>
            </li>
          </ol>
        </SectionCard>

        <InfoBox icon={<Users />}>
          <strong>Ważne:</strong> Upewnij się, że w pokoju jest cicho, aby uniknąć zakłóceń podczas rozmowy z asystentem.
        </InfoBox>
      </ModernContent>
    )
  },
  {
    id: 'modul2-krok4',
    title: 'Moduł 9: Testowanie wiedzy - Symulacja egzaminu',
    duration: '8 min',
    video: '/8-film.mp4',
    content: (
      <ModernContent 
        title="Rozpoczęcie interaktywnego testu"
        icon={<Play />}
      >
        <h3 className="text-2xl font-bold mb-4 text-purple-600">Rozpoczęcie interaktywnego testu</h3>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Czas rozpocząć prawdziwy test! Asystent Gemini będzie zadawał pytania na podstawie przesłanego materiału.
        </p>

        <SectionCard title="Jak rozpocząć test" color="green">
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <span>Powiedz do telefonu komendę: <strong>"Rozpocznij nowy test"</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <span>Asystent Gemini powinien teraz zadać pierwsze pytanie: <em>"Czy możemy zacząć?"</em></span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
              <span>Odpowiadaj na pytania głosowo - asystent będzie prowadził test zgodnie z instrukcjami</span>
            </li>
          </ol>
        </SectionCard>

        <SectionCard title="Przykładowy przebieg" color="blue">
          <div className="space-y-2 text-sm text-gray-600 italic">
            <p>Asystent: "Czy możemy zacząć?"</p>
            <p>Uczeń: "Tak"</p>
            <p>Asystent: "Pierwsze pytanie: Kim był Mieszko I?"</p>
            <p>Uczeń: "Pierwszym historycznym władcą Polski..."</p>
          </div>
        </SectionCard>
      </ModernContent>
    )
  },
  {
    id: 'wazne-wskazowki',
    title: 'Moduł 10: Dobre praktyki i wskazówki',
    duration: '17 min',
    video: null,
    audio1: '/9-slajd.mp3',
    audio2: '/10-slajd.mp3',
    content: (
      <ModernContent 
        title="Ważne Wskazówki i Dobre Praktyki"
        icon={<Award />}
      >
        <h3 className="text-2xl font-bold mb-4 text-purple-600">Ważne Wskazówki i Dobre Praktyki</h3>
        
        <div className="space-y-6 mb-6">
          <SectionCard title="Instrukcja głosowa 1: Podsumowanie" color="blue">
            <p className="text-gray-700">
              Przesłuchaj pierwszą instrukcję głosową, która szczegółowo omawia wszystkie kluczowe aspekty wykorzystania AI w edukacji.
            </p>
          </SectionCard>

          <SectionCard title="Instrukcja głosowa 2: Zaawansowane techniki" color="purple">
            <p className="text-gray-700">
              Poznaj zaawansowane techniki i strategie wykorzystania AI, które pomogą Ci w bardziej efektywnej nauce.
            </p>
          </SectionCard>

          <InfoBox icon={<Lightbulb />}>
            <strong>Wskazówka:</strong> Możesz słuchać tych instrukcji podczas jazdy samochodem, spaceru lub wykonywania innych czynności.
          </InfoBox>
        </div>
        
        <h3 className="text-2xl font-bold mb-4 text-purple-600">Najważniejsze Wskazówki</h3>
        
        <div className="space-y-4">
          <SectionCard title='"Halucynacje" AI' color="red">
            <p className="text-gray-700 leading-relaxed">
              Pamiętaj, że modele AI, zwłaszcza podczas długich rozmów, mogą czasem generować nieprecyzyjne informacje. 
              Jeśli zauważysz, że asystent zaczyna się mylić, zakończ test i rozpocznij go od nowa, 
              powtarzając Krok 4 z Modułu 2.
            </p>
          </SectionCard>

          <SectionCard title="Nadzór" color="blue">
            <p className="text-gray-700 leading-relaxed">
              Zawsze nadzoruj sesję nauki i testowania, zwłaszcza w przypadku młodszych dzieci. 
              AI to potężne narzędzie, ale nie zastąpi wsparcia i weryfikacji ze strony rodzica lub opiekuna.
            </p>
          </SectionCard>

          <SectionCard title="Personalizacja" color="purple">
            <p className="text-gray-700 leading-relaxed mb-4">
              Zachęcaj do modyfikowania poleceń. Możesz prosić o:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Inne typy pytań (np. wielokrotnego wyboru, prawda/fałsz)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Dodanie elementów grywalizacji (punkty, poziomy trudności)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Dostosowanie języka do jeszcze młodszych lub starszych uczniów</span>
              </li>
            </ul>
          </SectionCard>

          <SectionCard title="Gratulacje ukończenia szkolenia!" color="green">
            <p className="text-gray-700 leading-relaxed">
              Poznałeś wszystkie kluczowe aspekty wykorzystania AI w edukacji. 
              Teraz możesz tworzyć spersonalizowane materiały i prowadzić interaktywne sesje testowe. 
              Powodzenia w dalszej nauce!
            </p>
          </SectionCard>
        </div>
      </ModernContent>
    )
  },
  {
    id: 'lektury-szkolne',
    title: 'Moduł 11: Język Polski - Lektury szkolne 📚',
    duration: '10 min',
    video: null,
    content: (
      <ModernContent 
        title="Lektury szkolne"
        icon={<BookOpen />}
      >
        <h3 className="text-2xl font-bold mb-4 text-purple-600">Lektury szkolne 📚</h3>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Aby szybko przeanalizować i zrozumieć treść dowolnej lektury, użyj poniższych poleceń. 
          AI pomoże Ci stworzyć idealne podsumowanie dostosowane do Twojego wieku!
        </p>

        <SectionCard title="Krok 1: Znajdź zagadnienia z podstawy programowej" color="blue">
          <p className="text-gray-700 mb-4">
            Wklej poniższe polecenie do Claude.ai, uzupełniając dane w nawiasach:
          </p>
          <div className="bg-white p-4 rounded-lg border-2 border-blue-200 font-mono text-sm">
            <p className="text-gray-800">
              Jesteś ekspertem od polskiego systemu edukacji. Znajdź i przedstaw w punktach kluczowe zagadnienia z podstawy programowej 
              Ministerstwa Edukacji Narodowej (MEN) dla przedmiotu <strong className="bg-yellow-200 px-1">[język polski]</strong> dla klasy 
              <strong className="bg-yellow-200 px-1">[4 szkoły podstawowej]</strong> na temat wiedzy z lektury szkolnej 
              "<strong className="bg-yellow-200 px-1">[Akademia Pana Kleksa]</strong>"
            </p>
          </div>
        </SectionCard>

        <SectionCard title="Krok 2: Stwórz szczegółowe podsumowanie lektury" color="purple">
          <p className="text-gray-700 mb-4">
            Po otrzymaniu zagadnień, skopiuj i wklej poniższe polecenie:
          </p>
          <div className="bg-white p-4 rounded-lg border-2 border-purple-200 font-mono text-sm">
            <p className="text-gray-800">
              Przeanalizuj lekturę szkolną "<strong className="bg-yellow-200 px-1">[Tytuł lektury, np. 'Akademia Pana Kleksa']</strong>" 
              dla klasy <strong className="bg-yellow-200 px-1">[numer klasy]</strong>. Stwórz zwięzłe podsumowanie zawierające absolutnie niezbędne informacje do zapamiętania:
            </p>
            <ol className="list-decimal list-inside mt-2 text-gray-700 space-y-1">
              <li>Główni bohaterowie (z krótką charakterystyką).</li>
              <li>Wydarzenia w porządku chronologicznym.</li>
              <li>Kluczowe motywy i problematyka utworu.</li>
              <li>Świat przedstawiony (miejsce i czas akcji).</li>
            </ol>
          </div>
        </SectionCard>

        <SectionCard title="Krok 3: Stwórz rozszerzoną wersję do nauki" color="green">
          <p className="text-gray-700 mb-4">
            Następnie wklej to polecenie, aby stworzyć wersję przyjazną dla dziecka:
          </p>
          <div className="bg-white p-4 rounded-lg border-2 border-green-200 font-mono text-sm">
            <p className="text-gray-800">
              Na podstawie powyższych zagadnień, stwórz bardzo rozszerzoną listę punktów, które trzeba zapamiętać. 
              Rozbuduj opis bohaterów oraz ważnych sytuacji z książki. Opisz kluczowe motywy i problematykę utworu 
              oraz świat przedstawiony (miejsce i czas akcji).
              <br /><br />
              Przedstaw je w sposób niezwykle łatwy do zapamiętania dla <strong className="bg-yellow-200 px-1">[np. 10-latka]</strong>. 
              Użyj prostego języka, porównań, metafor, a nawet mnemotechnik. Każdy kluczowy termin lub data muszą być jasno wytłumaczone.
            </p>
          </div>
        </SectionCard>

        <InfoBox icon={<Lightbulb />}>
          <strong>Wskazówka:</strong> Możesz użyć tego samego schematu dla każdej lektury szkolnej - od "Małego Księcia" po "Pana Tadeusza"!
        </InfoBox>
      </ModernContent>
    )
  },
  {
    id: 'gramatyka-ortografia',
    title: 'Moduł 12: Język Polski - Gramatyka i Ortografia ✍️',
    duration: '10 min',
    video: null,
    content: (
      <ModernContent 
        title="Gramatyka i Ortografia"
        icon={<FileText />}
      >
        <h3 className="text-2xl font-bold mb-4 text-purple-600">Gramatyka i Ortografia ✍️</h3>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Te polecenia oparte są na skutecznym schemacie "tłumaczenie + przykłady + ćwiczenia", 
          aby ułatwić zrozumienie i utrwalenie zasad gramatycznych oraz ortograficznych.
        </p>

        <SectionCard title="Nauka gramatyki" color="purple">
          <p className="text-gray-700 mb-4">
            Skopiuj i wklej poniższe polecenie, aby nauczyć się dowolnego zagadnienia gramatycznego:
          </p>
          <div className="bg-white p-4 rounded-lg border-2 border-purple-200 font-mono text-sm">
            <p className="text-gray-800">
              Wytłumacz w najprostszy możliwy sposób, jak 11-latkowi, zagadnienie gramatyczne: 
              <strong className="bg-yellow-200 px-1">[wpisz zagadnienie, np. "Części mowy - czasownik, rzeczownik, przymiotnik"]</strong>.
              <br /><br />
              Twoje wyjaśnienie musi zawierać:
            </p>
            <ol className="list-decimal list-inside mt-2 text-gray-700 space-y-1">
              <li>Bardzo prostą definicję.</li>
              <li>Minimum 5 klarownych przykładów użycia w zdaniach.</li>
              <li>Krótkie ćwiczenie interaktywne: podaj 5 zdań i poproś o wskazanie w nich <strong className="bg-yellow-200 px-1">[np. czasowników]</strong>. Na końcu podaj odpowiedzi.</li>
            </ol>
          </div>
        </SectionCard>

        <SectionCard title="Przykładowe zagadnienia do nauki" color="blue">
          <p className="text-gray-700 mb-4">
            Oto lista zagadnień, które możesz wpisać w miejsce nawiasu:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Części mowy (rzeczownik, czasownik, przymiotnik, przysłówek)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Części zdania (podmiot, orzeczenie, dopełnienie)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Odmiana przez przypadki</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Czas przeszły, teraźniejszy i przyszły</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Zasady pisowni "ó" i "u"</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Zasady pisowni "rz" i "ż"</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Wielka i mała litera</span>
            </li>
          </ul>
        </SectionCard>

        <SectionCard title="Jak korzystać" color="green">
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
              <span>Skopiuj polecenie powyżej i wklej je do Claude.ai</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
              <span>Zamień tekst w nawiasach kwadratowych na konkretne zagadnienie</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
              <span>Przeczytaj wyjaśnienie i wykonaj ćwiczenie</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
              <span>Sprawdź odpowiedzi i powtórz, jeśli trzeba</span>
            </li>
          </ol>
        </SectionCard>

        <InfoBox icon={<GraduationCap />}>
          <strong>Rezultat:</strong> Dzięki tej metodzie dziecko otrzyma jasne wyjaśnienie, praktyczne przykłady 
          oraz możliwość natychmiastowego przetestowania swojej wiedzy. To idealne połączenie teorii z praktyką!
        </InfoBox>
      </ModernContent>
    )
  },
  {
    id: 'akademia-poziom-1',
    title: 'Moduł 13: Akademia Przyszłości - Poziom 1 (Architektura Umysłu)',
    duration: '15 min',
    video: null,
    content: (
      <ModernContent 
        title="Poziom 1: Architektura Umysłu"
        icon={<Brain />}
      >
        <h3 className="text-2xl font-bold mb-4 text-purple-600">Architektura Umysłu: Jak to działa "pod maską"? 🧠</h3>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Wcześniej dowiedziałeś się, że AI to "naczytana papuga". Teraz zajrzyjmy głębiej i zobaczmy, co sprawia, że ta papuga jest tak niesamowicie mądra!
        </p>

        <SectionCard title="1.1. Sieci Neuronowe – Mózg z Matematyki" color="purple">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-purple-100 p-3 rounded-xl">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-700 mb-3">
                Twój mózg składa się z neuronów, które przesyłają sobie sygnały. Komputerowa sieć neuronowa to próba naśladowania tego procesu za pomocą liczb.
              </p>
              <ul className="space-y-3">
                <li className="bg-white p-3 rounded-lg border border-purple-100 shadow-sm">
                  <strong className="text-purple-700">Warstwy (Layers):</strong> Wyobraź sobie sito. Wrzucasz zdjęcie psa. 
                  Pierwsze sito widzi tylko krawędzie. Drugie widzi kształty (koła, trójkąty). 
                  Trzecie składa to w "oko" i "ucho". Ostatnia warstwa krzyczy: "To jest pies!".
                </li>
                <li className="bg-white p-3 rounded-lg border border-purple-100 shadow-sm">
                  <strong className="text-purple-700">Wagi (Weights):</strong> To siła połączenia. 
                  Jeśli AI często widzi, że słowo "Harry" stoi obok "Potter", połączenie między nimi staje się bardzo grube i silne.
                </li>
              </ul>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="1.2. LLM – Wielki Model Językowy" color="blue">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Cpu className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-700 mb-3">
                To oficjalna nazwa narzędzi takich jak ChatGPT. LLM to skrót od <em>Large Language Model</em>.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border border-blue-100">
                  <h5 className="font-bold text-blue-700 mb-1">Trening</h5>
                  <p className="text-sm text-gray-600">Trwa miesiącami i zużywa tyle prądu, co małe miasto! Komputer czyta wtedy prawie cały internet.</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-100">
                  <h5 className="font-bold text-blue-700 mb-1">Parametry</h5>
                  <p className="text-sm text-gray-600">To "pokrętła" wewnątrz modelu. GPT-4 ma ich biliony. Im więcej parametrów, tym model mądrzejszy.</p>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        <InfoBox icon={<Sparkles />}>
          <h4 className="font-bold text-lg mb-2">🧪 Zadanie praktyczne: Zabawa w "Autouzupełnianie"</h4>
          <p className="mb-2">Weź kartkę. Napisz początek zdania: <strong>"Wielki smok wylądował na..."</strong>.</p>
          <p className="mb-2">Poproś 3 kolegów lub domowników, by dokończyli zdanie. Każdy poda co innego (np. wieży, łące, kanapce).</p>
          <p><strong>Wniosek:</strong> AI robi to samo – oblicza, które zakończenie jest najbardziej prawdopodobne w danej sytuacji!</p>
        </InfoBox>
      </ModernContent>
    )
  },
  {
    id: 'akademia-poziom-2',
    title: 'Moduł 14: Akademia Przyszłości - Poziom 2 (Zbrojownia)',
    duration: '20 min',
    video: null,
    content: (
      <ModernContent 
        title="Poziom 2: Zbrojownia"
        icon={<Rocket />}
      >
        <h3 className="text-2xl font-bold mb-4 text-purple-600">Zbrojownia: Zaawansowana obsługa narzędzi 🛠️</h3>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Poznaj szczegółowe instrukcje do Twoich narzędzi. To Twój ekwipunek na cyfrową przygodę!
        </p>

        <SectionCard title="2.1. Narzędzia Tekstowe (Twoi Asystenci)" color="blue">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border-l-4 border-green-500 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-5 h-5 text-green-600" />
                <h4 className="font-bold text-lg">ChatGPT</h4>
              </div>
              <p className="text-gray-600 mb-2"><strong>Najlepsze do:</strong> Kreatywności, burzy mózgów, wyjaśniania pojęć.</p>
              <p className="text-sm bg-green-50 p-2 rounded text-green-800">
                <strong>🌟 Tajna funkcja:</strong> "Custom Instructions" - Możesz mu kazać zawsze zwracać się do Ciebie po imieniu i tłumaczyć wszystko na przykładach z Twojej ulubionej gry!
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border-l-4 border-orange-500 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-orange-600" />
                <h4 className="font-bold text-lg">Claude</h4>
              </div>
              <p className="text-gray-600 mb-2"><strong>Najlepsze do:</strong> Analizy długich lektur, bezpiecznej rozmowy, kodowania.</p>
              <p className="text-sm bg-orange-50 p-2 rounded text-orange-800">
                <strong>🌟 Tajna funkcja:</strong> Wklejanie plików - Możesz wkleić mu PDF z regulaminem gry planszowej i zapytać: "Czy ten ruch jest legalny?".
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border-l-4 border-blue-500 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-lg">Gemini</h4>
              </div>
              <p className="text-gray-600 mb-2"><strong>Najlepsze do:</strong> Aktualnej wiedzy, współpracy z Google Maps i YouTube.</p>
              <p className="text-sm bg-blue-50 p-2 rounded text-blue-800">
                <strong>🌟 Tajna funkcja:</strong> Sprawdzanie faktów - Często ma przycisk "G" pod odpowiedzią, który pozwala sprawdzić w Google, czy nie kłamie.
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="2.2. Narzędzia Wizualne (Studio Filmowe i Graficzne)" color="purple">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon className="w-6 h-6 text-pink-600" />
                <h4 className="font-bold text-xl text-pink-700">🍌 NanoBanana</h4>
              </div>
              <p className="text-gray-700 mb-3 text-sm">Twój "Błyskawiczny Grafik". Służy do natychmiastowych zmian.</p>
              <ul className="space-y-2 text-sm">
                <li className="bg-white p-2 rounded border border-pink-100">
                  <strong>Inpainting:</strong> Zaznaczasz obszar (np. nudne niebo) i wpisujesz "fajerwerki".
                </li>
                <li className="bg-white p-2 rounded border border-pink-100">
                  <strong>Outpainting:</strong> Dorysowywanie brakującej reszty zdjęcia.
                </li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Video className="w-6 h-6 text-purple-600" />
                <h4 className="font-bold text-xl text-purple-700">🎥 Veo</h4>
              </div>
              <p className="text-gray-700 mb-3 text-sm">Reżyser filmowy w Twoim komputerze.</p>
              <ul className="space-y-2 text-sm">
                <li className="bg-white p-2 rounded border border-purple-100">
                  <strong>Fizyka świata:</strong> Rozumie, jak ciecz wylewa się ze szklanki.
                </li>
                <li className="bg-white p-2 rounded border border-purple-100">
                  <strong>Styl filmowy:</strong> Możesz wpisać "cinematic", "drone shot".
                </li>
              </ul>
            </div>
          </div>
        </SectionCard>
      </ModernContent>
    )
  },
  {
    id: 'akademia-poziom-3',
    title: 'Moduł 15: Akademia Przyszłości - Poziom 3 (Inżynieria Promptu)',
    duration: '25 min',
    video: null,
    content: (
      <ModernContent 
        title="Poziom 3: Inżynieria Promptu"
        icon={<Terminal />}
      >
        <h3 className="text-2xl font-bold mb-4 text-purple-600">Inżynieria Promptu: Poziom Ekspert 🧙‍♂️</h3>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Wcześniej poznałeś zasadę K-Z-F. Teraz wchodzimy na poziom mistrzowski. Poznaj zaklęcia, które sprawią, że AI zrobi dokładnie to, co chcesz!
        </p>

        <SectionCard title="3.1. Magiczne zaklęcie: Chain of Thought" color="purple">
          <div className="flex items-start gap-4">
            <TrendingUp className="w-8 h-8 text-purple-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg mb-2">Łańcuch Myśli</h4>
              <p className="text-gray-700 mb-3">
                AI czasem "strzela" odpowiedziami. Aby zmusić ją do myślenia, dodaj na końcu promptu zdanie:
              </p>
              <div className="bg-purple-900 text-white p-3 rounded-lg font-mono text-sm shadow-lg">
                "Pomyśl krok po kroku, zanim udzielisz odpowiedzi."
              </div>
              <p className="text-gray-600 text-sm mt-2">
                Dzięki temu AI najpierw przeanalizuje problem, a potem poda wynik. To drastycznie zmniejsza liczbę błędów w zadaniach logicznych!
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="3.2. Few-Shot Prompting" color="blue">
          <div className="flex items-start gap-4">
            <Layers className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg mb-2">Dawanie Przykładów</h4>
              <p className="text-gray-700 mb-3">
                Zamiast tylko prosić, pokaż AI, o co Ci chodzi. Zobacz różnicę:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-3 rounded border border-red-200">
                  <strong className="text-red-700">🚫 Zły prompt:</strong>
                  <p className="text-sm">"Wymyśl nazwy dla planet."</p>
                </div>
                <div className="bg-green-50 p-3 rounded border border-green-200">
                  <strong className="text-green-700">✅ Mistrzowski prompt:</strong>
                  <p className="text-sm font-mono mt-1">
                    "Wymyśl nazwy dla planet w stylu science-fiction.<br/>
                    Przykład 1: Czerwona planeta -&gt; Marsus Prime<br/>
                    Przykład 2: Lodowa planeta -&gt; Cryogenia X<br/>
                    Twój przykład: Gazowa planeta -&gt; ..."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="3.3. Mega-Prompt: Nauczyciel Sokratyczny" color="green">
          <div className="flex items-start gap-4">
            <GraduationCap className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-lg mb-2">Ucz się, nie ściągaj!</h4>
              <p className="text-gray-700 mb-3">
                Wklej to do ChatGPT, jeśli chcesz się czegoś nauczyć, a nie dostać gotowca:
              </p>
              <div className="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm shadow-inner">
                "Chcę, żebyś nauczył mnie o [temat, np. II wojnie światowej]. Nie dawaj mi gotowych odpowiedzi. Zadawaj mi pytania, które naprowadzą mnie na wiedzę. Jeśli odpowiem źle, daj mi podpowiedź, ale nie rozwiązanie. Bądź cierpliwy."
              </div>
            </div>
          </div>
        </SectionCard>
      </ModernContent>
    )
  },
  {
    id: 'akademia-poziom-4',
    title: 'Moduł 16: Akademia Przyszłości - Poziom 4 (Detektyw Prawda)',
    duration: '15 min',
    video: null,
    content: (
      <ModernContent 
        title="Poziom 4: Detektyw Prawda"
        icon={<Search />}
      >
        <h3 className="text-2xl font-bold mb-4 text-purple-600">Detektyw Prawda: Walka z halucynacjami 🕵️‍♂️</h3>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          AI potrafi być najbardziej przekonującym kłamcą na świecie. Musisz być czujny jak detektyw!
        </p>

        <SectionCard title="4.1. Dlaczego AI halucynuje?" color="orange">
          <div className="flex items-center gap-4">
            <HelpCircle className="w-10 h-10 text-orange-500" />
            <p className="text-gray-700">
              Model nie ma dostępu do "prawdy". Ma dostęp do "prawdopodobieństwa". Jeśli zapytasz o nieistniejącą książkę, AI może wymyślić jej fabułę, bo słowa "książka" i "fabuła" często występują razem.
            </p>
          </div>
        </SectionCard>

        <SectionCard title="4.2. Procedura Bezpieczeństwa: Zasada Trzech Źródeł" color="green">
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-100">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">1</div>
              <p><strong>Zapytaj:</strong> "Czy jesteś pewien na 100%? Podaj źródło."</p>
            </div>
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-100">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">2</div>
              <p><strong>Sprawdź:</strong> Skopiuj fakt do Google.</p>
            </div>
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-100">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">3</div>
              <p><strong>Potwierdź:</strong> Znajdź tę informację na innej stronie (Wikipedia, encyklopedia PWN, strona naukowa).</p>
            </div>
          </div>
        </SectionCard>

        <InfoBox icon={<AlertTriangle />}>
          <h4 className="font-bold text-red-600 mb-2">🚩 Lista Czerwonych Flag (Kiedy AI prawdopodobnie kłamie?)</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Kiedy podaje bardzo konkretne adresy stron WWW (często nie działają).</li>
            <li>Kiedy cytuje konkretne strony w książkach (np. "na stronie 45").</li>
            <li>Kiedy pytasz o wydarzenia bardzo lokalne (np. "kto wygrał konkurs recytatorski w szkole w Pcimiu").</li>
          </ul>
        </InfoBox>
      </ModernContent>
    )
  },
  {
    id: 'akademia-poziom-5',
    title: 'Moduł 17: Akademia Przyszłości - Poziom 5 (Etyka Cyfrowa)',
    duration: '20 min',
    video: null,
    content: (
      <ModernContent 
        title="Poziom 5: Etyka Cyfrowa i Prawo"
        icon={<Scale />}
      >
        <h3 className="text-2xl font-bold mb-4 text-purple-600">Etyka Cyfrowa: Zasady przetrwania 🛡️</h3>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          To nie jest nudny wykład, to zasady przetrwania w cyfrowej dżungli. Z wielką mocą wiąże się wielka odpowiedzialność!
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <SectionCard title="5.1. Prawo Autorskie" color="blue">
            <Scale className="w-8 h-8 text-blue-600 mb-3" />
            <p className="text-gray-700 text-sm mb-3">
              Czy obrazek z NanoBanana jest Twój?
            </p>
            <div className="bg-white p-3 rounded border border-blue-100 text-sm">
              <strong>Zasada:</strong> Prace stworzone w 100% przez AI zazwyczaj nie są chronione prawem autorskim.
              <br/><br/>
              <strong>Fair Play:</strong> Podpisuj: "Grafika wygenerowana przy użyciu AI". To oznaka profesjonalizmu.
            </div>
          </SectionCard>

          <SectionCard title="5.2. Deepfakes i Głos" color="red">
            <Fingerprint className="w-8 h-8 text-red-600 mb-3" />
            <p className="text-gray-700 text-sm mb-3">
              Klonowanie głosu kolegi dla żartu? <strong>STOP.</strong>
            </p>
            <div className="bg-white p-3 rounded border border-red-100 text-sm">
              To może być nielegalne. Wyobraź sobie, że ktoś dzwoni do Twojej babci Twoim głosem i prosi o pieniądze.
              <br/><br/>
              <strong>Rada:</strong> Ustal z rodziną "tajne hasło", którego AI nie będzie znało.
            </div>
          </SectionCard>
        </div>

        <div className="mt-6">
          <SectionCard title="5.3. Ślad Węglowy" color="green">
            <div className="flex items-center gap-4">
              <Leaf className="w-10 h-10 text-green-600" />
              <div>
                <p className="text-gray-700 mb-2">
                  Każde zapytanie do AI zużywa wodę (do chłodzenia serwerów) i prąd. Wygenerowanie jednego obrazka zużywa tyle energii, co naładowanie telefonu.
                </p>
                <p className="font-bold text-green-700">
                  Eko-Rada: Nie generuj 50 obrazków "dla zabawy". Myśl przed kliknięciem "Generuj". 🌍
                </p>
              </div>
            </div>
          </SectionCard>
        </div>
      </ModernContent>
    )
  },
  {
    id: 'akademia-projekt',
    title: 'Moduł 18: Akademia Przyszłości - Projekt Końcowy',
    duration: '30+ min',
    video: null,
    content: (
      <ModernContent 
        title="Projekt Końcowy"
        icon={<Award />}
      >
        <h3 className="text-2xl font-bold mb-4 text-purple-600">Projekt Końcowy: AI w Służbie Ludzkości 🚀</h3>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Aby ukończyć kurs i stać się certyfikowanym Pilotem AI, wykonaj jedno z poniższych zadań. Wybierz to, które najbardziej Cię kręci!
        </p>

        <div className="space-y-6">
          <SectionCard title="Opcja A: Historyczny Wywiad" color="orange">
            <p className="text-gray-700 mb-3">
              Użyj promptu, by "ożywić" postać historyczną (np. Mikołaja Kopernika). Przeprowadź z nim wywiad o tym, co myśli o dzisiejszych podróżach w kosmos.
            </p>
            <div className="bg-white p-3 rounded border border-orange-100 text-sm">
              <strong>Zadanie dodatkowe:</strong> Sprawdź w książkach, czy AI dobrze oddało jego poglądy!
            </div>
          </SectionCard>

          <SectionCard title="Opcja B: Twój Własny Asystent Nauki" color="blue">
            <p className="text-gray-700 mb-3">
              Stwórz w ChatGPT "Nauczyciela Języka Angielskiego", który poprawia Twoje błędy i tłumaczy dlaczego coś jest źle, ale tylko w temacie "Zwierzęta".
            </p>
          </SectionCard>

          <SectionCard title="Opcja C: Detektyw Fake Newsów" color="red">
            <p className="text-gray-700 mb-3">
              Poproś AI o napisanie 3 ciekawostek o delfinach, z czego jedna ma być zmyślona. Spróbuj zgadnąć która, a potem zweryfikuj to w Google.
            </p>
          </SectionCard>
        </div>

        <InfoBox icon={<Zap />}>
          <h4 className="font-bold text-lg mb-2 text-purple-700">Pamiętaj!</h4>
          <p className="text-lg">
            AI to rower dla umysłu. Pozwala Ci zajechać dalej i szybciej, ale to <strong>Ty</strong> musisz pedałować i kierować. 🚲💨
          </p>
          <p className="mt-2 font-bold">Powodzenia w świecie przyszłości!</p>
        </InfoBox>
      </ModernContent>
    )
  }
]

