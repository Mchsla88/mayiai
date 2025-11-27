'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import {
  BookOpen,
  CheckCircle,
  Sparkles,
  LogOut,
  GraduationCap,
  Brain,
  Shield,
  MessageSquare,
  Search,
  Palette,
  Users,
  Target
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { SimpleLoginForm } from '@/components/simple-login-form'

const trainingModules = [
  {
    id: 'wstep',
    title: 'Wstęp: Kryzys Zaufania i Motywacja',
    icon: <Target className="w-5 h-5" />,
    duration: '15 min',
    content: `
      <div class="space-y-8">
        <section>
          <h3 class="text-3xl font-bold mb-6 text-purple-700">Sztuczna Inteligencja w Edukacji: Kompleksowy Przewodnik 2024-2026</h3>
          
          <div class="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 mb-8">
            <h4 class="text-xl font-bold text-red-800 mb-2">Sekcja 1: Kryzys Zaufania – Zrozumieć Obawy Nauczycieli</h4>
            <p class="text-lg font-medium text-red-900 mb-4">
              75% polskich nauczycieli nie korzysta aktywnie z narzędzi Generatywnej Sztucznej Inteligencji (GSI).
            </p>
            <p class="text-sm text-red-700 italic">Źródło: Badanie NASK 2024.</p>
          </div>

          <h5 class="text-lg font-bold text-gray-800 mb-3">Główne Obawy Nauczycieli:</h5>
          <p class="mb-4 text-gray-700">Nauczyciele nie boją się samej technologii, ale jej skutków pedagogicznych:</p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
            <li>Uzależnienie uczniów od technologii (81%)</li>
            <li>Oszustwa i plagiaty (76%)</li>
            <li>Zanik samodzielnego myślenia (75%)</li>
            <li>Potencjalna manipulacja (76%)</li>
            <li>Spłycenie wiedzy (68%)</li>
          </ul>

          <div class="bg-yellow-50 p-6 rounded-xl mb-8">
            <h5 class="font-bold text-yellow-800 mb-2">Diagnoza: Nieskuteczne Szkolenia</h5>
            <p class="text-gray-700">41% nauczycieli ocenia dotychczasowe szkolenia z AI jako "słabe" lub "przeciętne" (Badanie RAND 2024). Fundamentalny błąd: Szkolenia pomijają obawy i przechodzą od razu do nauki obsługi narzędzi, zamiast adresować lęki.</p>
          </div>
        </section>

        <section>
          <h4 class="text-2xl font-bold text-purple-700 mb-4">Sekcja 2: Kluczowa Motywacja – Odzyskiwanie Czasu</h4>
          
          <div class="grid md:grid-cols-2 gap-6 mb-6">
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h5 class="font-bold text-green-600 mb-2">1. Motywator: Natychmiastowa Korzyść</h5>
              <p class="text-gray-600">Skuteczne wdrożenie AI musi opierać się na jasnej i natychmiastowej korzyści. W kontekście chronicznego przeciążenia zadaniami, najpotężniejszym motywatorem jest oszczędność czasu.</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h5 class="font-bold text-blue-600 mb-2">2. Konkretne Dane: Ile Czasu?</h5>
              <p class="text-gray-600">Nauczyciele, którzy sprawnie wykorzystują AI, oszczędzają średnio <strong>5,9 godziny tygodniowo</strong>. W skali roku szkolnego to równowartość sześciu tygodni pracy.</p>
            </div>
          </div>

          <h5 class="text-lg font-bold text-gray-800 mb-3">3. Strategiczna Zmiana: "Mniej Administracji, Więcej Pedagogiki"</h5>
          <p class="mb-4 text-gray-700">Ta oszczędność pozwala na przesunięcie czasu z zadań powtarzalnych i administracji na rzecz działań o najwyższej wartości:</p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
            <li>Budowania relacji z uczniami.</li>
            <li>Kreatywnego planowania angażujących lekcji.</li>
            <li>Indywidualnego wsparcia.</li>
          </ul>

          <div class="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
            <h5 class="font-bold text-purple-800 mb-2">4. Paradoks AI: Odzyskanie "Ludzkiego" Wymiaru</h5>
            <p class="text-gray-700">AI staje się narzędziem do odzyskiwania "ludzkiego" wymiaru nauczania. Redukuje ryzyko wypalenia zawodowego i pozwala skupić się na tym, co najważniejsze.</p>
          </div>
        </section>

        <section>
          <h4 class="text-2xl font-bold text-purple-700 mb-4">Sekcja 3: Konieczność Strategiczna – Podstawa Programowa 2026</h4>
          <p class="mb-4 text-gray-700"><strong>AI: To już nie opcja, to wymóg.</strong> Oszczędność czasu to motywacja, ale zmiany w prawie to konieczność. Od 2026 roku AI wchodzi do podstawy programowej dla klas IV-VIII.</p>

          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="bg-white p-6 rounded-xl border border-gray-200">
              <h5 class="font-bold text-gray-800 mb-3">Klasy IV-VI</h5>
              <ul class="list-disc list-inside space-y-2 text-gray-600 text-sm">
                <li>Tworzenie treści (obrazów, tekstów) prostymi narzędziami AI.</li>
                <li>Eksperyment: Trenowanie prostego modelu AI.</li>
                <li>Dyskusja: Omawianie wpływu technologii na środowisko.</li>
              </ul>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-200">
              <h5 class="font-bold text-gray-800 mb-3">Klasy VII-VIII (Wymagania rosną)</h5>
              <ul class="list-disc list-inside space-y-2 text-gray-600 text-sm">
                <li>Krytyczna edycja: Wykorzystanie AI do tworzenia, a następnie ocena treści.</li>
                <li>Ulepszanie modelu: Trenowanie modelu AI i poprawianie jego precyzji.</li>
                <li>Odróżnianie: Próby odróżnienia treści AI od ludzkich.</li>
              </ul>
            </div>
          </div>

          <div class="bg-gray-50 p-6 rounded-xl">
            <h5 class="font-bold text-gray-800 mb-4">Jak ten przewodnik pomaga?</h5>
            <p class="text-gray-700 mb-4">To bezpośrednia odpowiedź na nowe wyzwania. Dostarcza gotowych scenariuszy lekcyjnych i warsztatów. Łączy typowe obawy z konkretnymi rozwiązaniami:</p>
            
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-left text-gray-600">
                <thead class="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th class="px-4 py-2">Obawa (NASK 2024)</th>
                    <th class="px-4 py-2">Rozwiązanie w Przewodniku</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-white border-b">
                    <td class="px-4 py-2 font-medium text-gray-900">Uzależnienie od technologii</td>
                    <td class="px-4 py-2">Rozdział 2 (Etyczny Kompas) & Rozdział 7 (Współpraca z rodzicami)</td>
                  </tr>
                  <tr class="bg-white border-b">
                    <td class="px-4 py-2 font-medium text-gray-900">Oszustwa i plagiaty</td>
                    <td class="px-4 py-2">Rozdział 2 (Filozofia 80/20) & Rozdział 3 (Zmiana zadań)</td>
                  </tr>
                  <tr class="bg-white border-b">
                    <td class="px-4 py-2 font-medium text-gray-900">Manipulacja i dezinformacja</td>
                    <td class="px-4 py-2">Rozdział 4 (Checklista F.L.O.B.) & Rozdział 6 (Gra "Prawda czy AI?")</td>
                  </tr>
                  <tr class="bg-white">
                    <td class="px-4 py-2 font-medium text-gray-900">Zanik samodzielnego myślenia</td>
                    <td class="px-4 py-2">Rozdział 3 (Prompt engineering) & Rozdział 5 (Kreatywny Bank Lekcji)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    `
  },
  {
    id: 'rozdzial-1',
    title: 'Rozdział 1: Fundamenty AI i Narzędzia',
    icon: <Brain className="w-5 h-5" />,
    duration: '30 min',
    content: `
      <div class="space-y-8">
        <section>
          <h3 class="text-3xl font-bold mb-6 text-purple-700">Rozdział 1. Fundamenty: Czym Jest AI i Jak Działa (Bez Żargonu)</h3>
          
          <h4 class="text-2xl font-bold text-gray-800 mb-4">Sekcja 1.1: Demistyfikacja (Czym jest AI, GSI, LLM?)</h4>
          <p class="mb-4 text-gray-700">Krok 1: Zrozumieć podstawy (bez żargonu). Aby zaufać AI, musimy przestać traktować ją jak "magię". To po prostu technologia. Najważniejsze to odróżnić kilka pojęć:</p>

          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="bg-white p-6 rounded-xl border-l-4 border-blue-500 shadow-sm">
              <h5 class="font-bold text-lg mb-2 text-blue-700">1. Sztuczna Inteligencja (AI)</h5>
              <p class="text-gray-600 text-sm mb-2"><strong>Co to jest?</strong> Ogólna nazwa na programy komputerowe, które wykonują zadania wymagające "inteligentnego" działania.</p>
              <p class="text-gray-600 text-sm"><strong>Gdzie ją spotykasz?</strong> Nawigacja GPS, filtry spamu, rekomendacje Netflix.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border-l-4 border-green-500 shadow-sm">
              <h5 class="font-bold text-lg mb-2 text-green-700">2. Uczenie Maszynowe (ML)</h5>
              <p class="text-gray-600 text-sm mb-2"><strong>Co to jest?</strong> Sposób, w jaki AI się uczy. Zamiast programować reguły, "trenujemy" program na danych.</p>
              <p class="text-gray-600 text-sm"><strong>Przykład:</strong> Pokazujesz komputerowi tysiące zdjęć psów i kotów, aż sam nauczy się je odróżniać.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border-l-4 border-purple-500 shadow-sm">
              <h5 class="font-bold text-lg mb-2 text-purple-700">3. Generatywna AI (GSI)</h5>
              <p class="text-gray-600 text-sm mb-2"><strong>Co to jest?</strong> Rewolucja. Ta AI nie tylko analizuje, ale <strong>tworzy</strong> nowe rzeczy – teksty, obrazy, muzykę.</p>
              <p class="text-gray-600 text-sm"><strong>Przykład:</strong> ChatGPT, Midjourney.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border-l-4 border-orange-500 shadow-sm">
              <h5 class="font-bold text-lg mb-2 text-orange-700">4. Duży Model Językowy (LLM)</h5>
              <p class="text-gray-600 text-sm mb-2"><strong>Co to jest?</strong> "Mózg" napędzający czaty. Działa jak "autouzupełnianie na sterydach".</p>
              <p class="text-gray-600 text-sm"><strong>Jak działa?</strong> Przewiduje najbardziej prawdopodobne następne słowo.</p>
            </div>
          </div>

          <div class="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 mb-8">
            <h5 class="font-bold text-red-800 mb-2">Kluczowa Rzecz (Ważne!)</h5>
            <p class="text-red-900">AI nie "rozumie" świata i nie "myśli" jak człowiek. To genialny system zgadywania. Dlatego czasem wymyśla fakty lub popełnia błędy (nazywamy to "halucynacjami").</p>
          </div>
        </section>

        <section>
          <h4 class="text-2xl font-bold text-purple-700 mb-4">Sekcja 1.2: Pierwszy Kontakt – Bezpieczne "Celowe Granie"</h4>
          <p class="mb-4 text-gray-700">Najgorszym podejściem jest przytłoczenie technicznymi detalami. Skuteczne wdrożenie zaczyna się od "celowego grania" (purposeful play) w środowisku o niskiej stawce.</p>
          
          <div class="bg-blue-50 p-6 rounded-xl mb-6">
            <h5 class="font-bold text-blue-800 mb-3">Interaktywny Przykład: Twoje Pierwsze Doświadczenie</h5>
            <p class="text-gray-700 mb-4">Otwórz darmowe narzędzie (ChatGPT, Gemini, Copilot) i zamiast pytać o pracę, napisz prompt związany z Twoim hobby:</p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>"Zaplanuj dla mnie idealny weekend w Krakowie. Interesuję się historią średniowiecza i lubię włoską kuchnię."</li>
              <li>"Jestem początkującym ogrodnikiem. Mój balkon ma wystawę południową. Jakie 5 roślin będzie najłatwiejszych?"</li>
              <li>"Stwórz 7-dniowy plan treningowy dla osoby, która chce zacząć biegać."</li>
            </ul>
            <p class="mt-4 text-sm text-blue-900 italic">Ten pierwszy krok jest kluczowy psychologicznie. Jest bezpieczny, osobisty i buduje pozytywne pierwsze wrażenie.</p>
          </div>
        </section>

        <section>
          <h4 class="text-2xl font-bold text-purple-700 mb-6">Sekcja 1.3: Wielki Przegląd Narzędzi (Lista Top 10)</h4>
          <p class="mb-6 text-gray-700">Oto kompletna, zaktualizowana lista narzędzi niezbędnych dla nowoczesnego nauczyciela:</p>

          <div class="space-y-8">
            <div>
              <h5 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2">1. Podstawowe Modele AI (Wielka Czwórka)</h5>
              <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-2xl">🧠</span>
                    <strong class="text-lg text-purple-700">ChatGPT (OpenAI)</strong>
                  </div>
                  <p class="text-sm text-gray-600 mb-2"><strong>Specjalizacja:</strong> "Złoty standard". Niezrównana jakość tekstów, kreatywność, adaptacja do ról.</p>
                  <p class="text-sm text-gray-500"><strong>W szkole:</strong> Scenariusze lekcji, testy, symulacje dialogów.</p>
                </div>
                <div class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-2xl">🎬</span>
                    <strong class="text-lg text-purple-700">Gemini (Google)</strong>
                  </div>
                  <p class="text-sm text-gray-600 mb-2"><strong>Specjalizacja:</strong> Lider multimediów. Generuje wideo (Veo) i obrazy z tekstem (Imagen 3). Zintegrowany z Google Workspace.</p>
                  <p class="text-sm text-gray-500"><strong>W szkole:</strong> Filmy instruktażowe, mapy myśli, wizualizacje procesów.</p>
                </div>
                <div class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-2xl">📄</span>
                    <strong class="text-lg text-purple-700">Claude (Anthropic)</strong>
                  </div>
                  <p class="text-sm text-gray-600 mb-2"><strong>Specjalizacja:</strong> "Ludzki" styl pisania i analiza długich dokumentów (PDF).</p>
                  <p class="text-sm text-gray-500"><strong>W szkole:</strong> Analiza podstawy programowej, streszczanie lektur, tworzenie pytań do tekstu.</p>
                </div>
                <div class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-2xl">💻</span>
                    <strong class="text-lg text-purple-700">Microsoft Copilot</strong>
                  </div>
                  <p class="text-sm text-gray-600 mb-2"><strong>Specjalizacja:</strong> Darmowy dostęp do GPT-4 i DALL-E. Integracja z Office (Word, PowerPoint).</p>
                  <p class="text-sm text-gray-500"><strong>W szkole:</strong> Szkice prezentacji, oficjalne maile, grafiki.</p>
                </div>
              </div>
            </div>

            <div>
              <h5 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2">2. Narzędzia Specjalistyczne i Kreatywne</h5>
              <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-2xl">⚠️</span>
                    <strong class="text-lg text-purple-700">Grok (xAI)</strong>
                  </div>
                  <p class="text-sm text-gray-600 mb-2"><strong>Specjalizacja:</strong> Brak cenzury, dostęp do newsów z X. Bywa sarkastyczny.</p>
                  <p class="text-sm text-gray-500"><strong>W szkole:</strong> Tylko dla nauczyciela (WOS/Etyka) do pokazywania różnych punktów widzenia i nauki o stronniczości.</p>
                </div>
                <div class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-2xl">🎨</span>
                    <strong class="text-lg text-purple-700">Canva (Magic Studio)</strong>
                  </div>
                  <p class="text-sm text-gray-600 mb-2"><strong>Specjalizacja:</strong> Kombajn kreatywny. Grafika, wideo, prezentacje w jednym.</p>
                  <p class="text-sm text-gray-500"><strong>W szkole:</strong> Karty pracy, dyplomy, plakaty, projekty grupowe uczniów.</p>
                </div>
                <div class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-2xl">🔎</span>
                    <strong class="text-lg text-purple-700">Perplexity AI</strong>
                  </div>
                  <p class="text-sm text-gray-600 mb-2"><strong>Specjalizacja:</strong> Silnik odpowiedzi. ZAWSZE podaje źródła (cytaty).</p>
                  <p class="text-sm text-gray-500"><strong>W szkole:</strong> Rzetelny research, weryfikacja faktów, nauka higieny cyfrowej.</p>
                </div>
                <div class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-2xl">🎥</span>
                    <strong class="text-lg text-purple-700">Kling AI</strong>
                  </div>
                  <p class="text-sm text-gray-600 mb-2"><strong>Specjalizacja:</strong> Fotorealistyczne wideo o wysokiej jakości.</p>
                  <p class="text-sm text-gray-500"><strong>W szkole:</strong> Generowanie unikalnych klipów historycznych/przyrodniczych.</p>
                </div>
              </div>
            </div>

            <div>
              <h5 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2">3. Szybkie Alternatywy</h5>
              <div class="grid md:grid-cols-2 gap-6">
                <div class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-2xl">🚀</span>
                    <strong class="text-lg text-purple-700">DeepSeek</strong>
                  </div>
                  <p class="text-sm text-gray-600">Błyskawiczna, darmowa alternatywa dla ChatGPT. Świetna w logice i kodowaniu.</p>
                </div>
                <div class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-2xl">🐉</span>
                    <strong class="text-lg text-purple-700">Qwen</strong>
                  </div>
                  <p class="text-sm text-gray-600">Potężna alternatywa do analizy dokumentów (konkurent Claude).</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    `
  },
  {
    id: 'rozdzial-2',
    title: 'Rozdział 2: Etyczny Kompas Nauczyciela',
    icon: <Shield className="w-5 h-5" />,
    duration: '45 min',
    content: `
      <div class="space-y-8">
        <section>
          <h3 class="text-3xl font-bold mb-6 text-purple-700">Rozdział 2. Etyczny Kompas Nauczyciela w Erze AI</h3>
          
          <h4 class="text-2xl font-bold text-gray-800 mb-4">Sekcja 2.1: Wprowadzenie do Etyki AI w Szkole</h4>
          <div class="bg-red-50 p-6 rounded-xl border-l-4 border-red-500 mb-6">
            <p class="text-lg font-medium text-red-900">
              Technologia jest jedynie narzędziem. To nauczyciel pozostaje strażnikiem etyki, pedagogiki i bezpieczeństwa uczniów.
            </p>
          </div>
          <p class="text-gray-700 mb-6">Zrozumienie zagrożeń nie ma na celu odstraszenia od technologii, ale uzbrojenie nauczyciela w wiedzę, która pozwoli mu korzystać z AI w sposób świadomy i bezpieczny.</p>
        </section>

        <section>
          <h4 class="text-2xl font-bold text-purple-700 mb-6">Sekcja 2.2: Warsztat Etyczny (Praktyczne Scenariusze)</h4>
          
          <div class="space-y-8">
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h5 class="text-xl font-bold text-purple-800 mb-3">Zagadnienie 1: RODO i Prywatność Uczniów</h5>
              <p class="text-gray-700 mb-2"><strong>Problem:</strong> Nauczyciel wkleja wypracowanie ucznia (z danymi osobowymi) do publicznego ChatGPT.</p>
              <p class="text-red-600 font-bold mb-4">⚠️ Zagrożenie: Dane ucznia opuszczają szkołę i mogą być użyte do trenowania AI.</p>
              <div class="bg-green-50 p-4 rounded-lg">
                <strong class="text-green-800 block mb-2">Rozwiązanie (Praktyka):</strong>
                <ul class="list-disc list-inside text-gray-700 space-y-1">
                  <li><strong>Zasada Anonimizacji:</strong> Nigdy nie wprowadzaj imion, nazwisk ani nazw szkoły.</li>
                  <li><strong>Konta Instytucjonalne:</strong> Korzystaj z bezpiecznych wersji (Microsoft Copilot dla Edukacji, Google Workspace), gdzie dane są chronione.</li>
                </ul>
              </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h5 class="text-xl font-bold text-purple-800 mb-3">Zagadnienie 2: Plagiat vs. Augmentacja (Filozofia 80/20)</h5>
              <p class="text-gray-700 mb-2"><strong>Problem:</strong> Uczeń oddaje pracę w całości wygenerowaną przez AI.</p>
              <div class="bg-blue-50 p-4 rounded-lg mb-4">
                <strong class="text-blue-800 block mb-2">Filozofia 80/20:</strong>
                <p class="text-gray-700">AI robi 80% "surowej" pracy (szkic, fakty), a człowiek dodaje 20% (krytyczna analiza, weryfikacja, własny styl).</p>
              </div>
              <div class="bg-green-50 p-4 rounded-lg">
                <strong class="text-green-800 block mb-2">Rozwiązanie (Zmiana Zadania):</strong>
                <p class="text-gray-700 mb-2">Zamiast "Napisz esej", zadaj:</p>
                <ol class="list-decimal list-inside text-gray-700 space-y-1 ml-2">
                  <li>"Użyj AI, aby wygenerować listę przyczyn..." (80%)</li>
                  <li>"Wybierz dwie najważniejsze i zweryfikuj je w podręczniku." (Weryfikacja)</li>
                  <li>"Napisz własną opinię, dlaczego te przyczyny są kluczowe." (20%)</li>
                </ol>
              </div>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h5 class="text-xl font-bold text-purple-800 mb-3">Zagadnienie 3: Deepfake i Dezinformacja</h5>
              <p class="text-gray-700 mb-2"><strong>Problem:</strong> Uczniowie nie odróżniają prawdy od fałszu (wideo, obrazy AI).</p>
              <div class="bg-green-50 p-4 rounded-lg">
                <strong class="text-green-800 block mb-2">Rozwiązanie (Kompetencja Medialna):</strong>
                <ul class="list-disc list-inside text-gray-700 space-y-1">
                  <li><strong>Nauka "Cyfrowej Intuicji":</strong> Szukanie błędów (dziwne dłonie, brak mrugania).</li>
                  <li><strong>Gra "Prawda czy AI?":</strong> Głosowanie i uzasadnianie, czy obraz jest prawdziwy.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    `
  },
  {
    id: 'rozdzial-3',
    title: 'Rozdział 3: Sztuka Dialogu (Prompt Engineering)',
    icon: <MessageSquare className="w-5 h-5" />,
    duration: '60 min',
    content: `
      <div class="space-y-8">
        <section>
          <h3 class="text-3xl font-bold mb-6 text-purple-700">Rozdział 3. Sztuka Dialogu z AI: Mistrzostwo w Prompt Engineeringu</h3>
          
          <h4 class="text-2xl font-bold text-gray-800 mb-4">Sekcja 3.1: Wprowadzenie – "Garbage In, Garbage Out"</h4>
          <p class="mb-4 text-gray-700">Jakość odpowiedzi zależy w 90% od jakości polecenia (promptu). Jeśli zadasz ogólne pytanie, dostaniesz ogólną odpowiedź. Opanowanie promptingu to nauka precyzyjnego myślenia.</p>
        </section>

        <section>
          <h4 class="text-2xl font-bold text-purple-700 mb-6">Sekcja 3.2: Framework 5S (Przepis na Idealny Prompt)</h4>
          <div class="grid gap-4 mb-8">
            <div class="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div class="bg-purple-100 text-purple-700 font-bold w-10 h-10 flex items-center justify-center rounded-full shrink-0 text-xl">1</div>
              <div>
                <strong class="block text-gray-800 text-lg">Set Scene (Ustal Rolę)</strong>
                <span class="text-gray-600">Powiedz AI, kim ma być. Np. "Jesteś doświadczonym nauczycielem biologii..."</span>
              </div>
            </div>
            <div class="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div class="bg-purple-100 text-purple-700 font-bold w-10 h-10 flex items-center justify-center rounded-full shrink-0 text-xl">2</div>
              <div>
                <strong class="block text-gray-800 text-lg">Specify (Sprecyzuj)</strong>
                <span class="text-gray-600">Co dokładnie ma zrobić? Dla kogo? Np. "Stwórz plan lekcji dla 7. klasy..."</span>
              </div>
            </div>
            <div class="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div class="bg-purple-100 text-purple-700 font-bold w-10 h-10 flex items-center justify-center rounded-full shrink-0 text-xl">3</div>
              <div>
                <strong class="block text-gray-800 text-lg">Structure (Ustrukturyzuj)</strong>
                <span class="text-gray-600">Jaki format? Np. "W formie tabeli z 3 kolumnami..."</span>
              </div>
            </div>
            <div class="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div class="bg-purple-100 text-purple-700 font-bold w-10 h-10 flex items-center justify-center rounded-full shrink-0 text-xl">4</div>
              <div>
                <strong class="block text-gray-800 text-lg">Supply Examples (Daj Przykłady)</strong>
                <span class="text-gray-600">Pokaż, o co Ci chodzi. Np. "Oto przykład pytania, jakie lubię..."</span>
              </div>
            </div>
            <div class="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div class="bg-purple-100 text-purple-700 font-bold w-10 h-10 flex items-center justify-center rounded-full shrink-0 text-xl">5</div>
              <div>
                <strong class="block text-gray-800 text-lg">Assess (Oceń)</strong>
                <span class="text-gray-600">Wymuś myślenie. Np. "Wyjaśnij swoje rozumowanie krok po kroku."</span>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h4 class="text-2xl font-bold text-purple-700 mb-6">Sekcja 3.3: Warsztat Transformacji Promptów</h4>
          <p class="mb-4 text-gray-700">Zobacz, jak zmienić słabe polecenie w prompt ekspercki:</p>
          
          <div class="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table class="w-full text-left text-sm text-gray-600">
              <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th class="px-6 py-3 w-1/3">Słaby Prompt (Przed)</th>
                  <th class="px-6 py-3">Prompt Ekspercki (Po) – Zastosowanie 5S</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr>
                  <td class="px-6 py-4 font-medium text-red-600">"Napisz plan lekcji o fotosyntezie."</td>
                  <td class="px-6 py-4">
                    <span class="text-purple-700 font-bold">(S)et:</span> Jesteś nauczycielem biologii.<br/>
                    <span class="text-purple-700 font-bold">(S)pecify:</span> Stwórz 45-minutowy, angażujący scenariusz dla 13-latków.<br/>
                    <span class="text-purple-700 font-bold">(S)tructure:</span> Tabela z 3 kolumnami (Czas, Nauczyciel, Uczeń).<br/>
                    <span class="text-purple-700 font-bold">(S)upply:</span> Uwzględnij wideo z YouTube.<br/>
                    <span class="text-purple-700 font-bold">(A)ssess:</span> Dodaj 3 pytania sprawdzające.
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 font-medium text-red-600">"Zrób quiz o II Wojnie Światowej."</td>
                  <td class="px-6 py-4">
                    <span class="text-purple-700 font-bold">(S)et:</span> Jesteś ekspertem od egzaminów.<br/>
                    <span class="text-purple-700 font-bold">(S)pecify:</span> 10 pytań A/B/C/D o froncie europejskim. Poziom średni.<br/>
                    <span class="text-purple-700 font-bold">(S)tructure:</span> Najpierw pytania, na końcu klucz odpowiedzi z wyjaśnieniem.<br/>
                    <span class="text-purple-700 font-bold">(A)ssess:</span> Błędne odpowiedzi muszą być prawdopodobne.
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 font-medium text-red-600">"Uprość ten tekst."</td>
                  <td class="px-6 py-4">
                    <span class="text-purple-700 font-bold">(S)et:</span> Jesteś specjalistą od prostego języka.<br/>
                    <span class="text-purple-700 font-bold">(S)pecify:</span> Przepisz tekst dla ucznia z dysleksją.<br/>
                    <span class="text-purple-700 font-bold">(S)tructure:</span> Krótkie zdania, wypunktowania. Trudne słowa wyjaśnij analogią.
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 font-medium text-red-600">"Napisz e-mail do rodzica."</td>
                  <td class="px-6 py-4">
                    <span class="text-purple-700 font-bold">(S)et:</span> Jesteś empatycznym wychowawcą.<br/>
                    <span class="text-purple-700 font-bold">(S)pecify:</span> E-mail o braku prac domowych. Cel: spotkanie, nie konflikt.<br/>
                    <span class="text-purple-700 font-bold">(S)tructure:</span> 1. Pozytyw, 2. Problem, 3. Propozycja, 4. Pozytywne zakończenie.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `
  },
  {
    id: 'rozdzial-4',
    title: 'Rozdział 4: Krytyczna Ocena Treści (F.L.O.B.)',
    icon: <Search className="w-5 h-5" />,
    duration: '30 min',
    content: `
      <div class="space-y-8">
        <section>
          <h3 class="text-3xl font-bold mb-6 text-purple-700">Rozdział 4. Krytyczna Ocena Treści: Jak Ufać, Ale Sprawdzać</h3>
          
          <h4 class="text-2xl font-bold text-gray-800 mb-4">Sekcja 4.1: Problem "Halucynacji" AI</h4>
          <p class="mb-4 text-gray-700">Opanowanie promptingu to połowa sukcesu. Druga połowa to świadomość, że AI może się mylić. W żargonie AI błędy te nazywamy <strong>"halucynacjami"</strong>.</p>
          <div class="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500 mb-6">
            <p class="text-gray-800">
              <strong>Co to jest?</strong> Model generuje tekst, który brzmi logicznie i przekonująco, ale jest całkowicie fałszywy. Może zmyślić fakty, postacie historyczne, a nawet źródła bibliograficzne.
            </p>
          </div>
          <p class="text-gray-700">To kluczowy moment dla nauczyciela. AI nie jest wyrocznią, jest asystentem – szybkim, ale czasem "zmyślającym" stażystą. Twoją rolą jest weryfikacja.</p>
        </section>

        <section>
          <h4 class="text-2xl font-bold text-purple-700 mb-6">Sekcja 4.2: Checklista Weryfikacji Treści (F.L.O.B.)</h4>
          <p class="mb-6 text-gray-700">Przed użyciem jakiejkolwiek treści z AI, zastosuj szybką weryfikację F.L.O.B.:</p>

          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500">
              <div class="flex items-center gap-3 mb-3">
                <span class="text-4xl font-bold text-blue-200">F</span>
                <h5 class="text-xl font-bold text-gray-800">Fakty</h5>
              </div>
              <p class="text-gray-600 text-sm mb-2"><strong>Czy podane informacje są prawdziwe?</strong></p>
              <ul class="list-disc list-inside text-gray-500 text-sm">
                <li>Czy źródła istnieją? (Sprawdź w Google)</li>
                <li>Czy daty i nazwiska są poprawne?</li>
              </ul>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-green-500">
              <div class="flex items-center gap-3 mb-3">
                <span class="text-4xl font-bold text-green-200">L</span>
                <h5 class="text-xl font-bold text-gray-800">Logika</h5>
              </div>
              <p class="text-gray-600 text-sm mb-2"><strong>Czy argumentacja jest spójna?</strong></p>
              <ul class="list-disc list-inside text-gray-500 text-sm">
                <li>Czy tekst nie zawiera sprzeczności?</li>
                <li>Czy wnioski wynikają z przesłanek?</li>
              </ul>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-purple-500">
              <div class="flex items-center gap-3 mb-3">
                <span class="text-4xl font-bold text-purple-200">O</span>
                <h5 class="text-xl font-bold text-gray-800">Obiektywizm</h5>
              </div>
              <p class="text-gray-600 text-sm mb-2"><strong>Czy treść jest wolna od uprzedzeń (bias)?</strong></p>
              <ul class="list-disc list-inside text-gray-500 text-sm">
                <li>Czy nie promuje stereotypów?</li>
                <li>Czy przedstawia różne punkty widzenia?</li>
              </ul>
            </div>

            <div class="bg-white p-6 rounded-xl shadow-md border-t-4 border-orange-500">
              <div class="flex items-center gap-3 mb-3">
                <span class="text-4xl font-bold text-orange-200">B</span>
                <h5 class="text-xl font-bold text-gray-800">Branża/Poziom</h5>
              </div>
              <p class="text-gray-600 text-sm mb-2"><strong>Czy treść jest odpowiednia dla ucznia?</strong></p>
              <ul class="list-disc list-inside text-gray-500 text-sm">
                <li>Czy język jest dostosowany do wieku?</li>
                <li>Czy jest zgodna z podstawą programową?</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h4 class="text-2xl font-bold text-purple-700 mb-4">Sekcja 4.3: Interaktywne Ćwiczenie (Ocena 3 Tekstów)</h4>
          <p class="mb-4 text-gray-700">Wygeneruj 3 teksty i sprawdź je checklistą F.L.O.B.:</p>
          <ol class="list-decimal list-inside space-y-3 text-gray-700 ml-4">
            <li><strong>Tekst Historyczny:</strong> "Napisz notatkę o Marii Skłodowskiej-Curie z 2 źródłami." (Sprawdź: Czy źródła istnieją?)</li>
            <li><strong>Tekst Naukowy:</strong> "Wyjaśnij globalne ocieplenie." (Sprawdź: Czy nie ma błędnych uproszczeń?)</li>
            <li><strong>Tekst Humanistyczny:</strong> "Zinterpretuj wiersz." (Sprawdź: Czy interpretacja jest logiczna?)</li>
          </ol>
        </section>
      </div>
    `
  },
  {
    id: 'rozdzial-5',
    title: 'Rozdział 5: Kreatywny Bank Lekcji',
    icon: <Palette className="w-5 h-5" />,
    duration: '90 min',
    content: `
      <div class="space-y-8">
        <section>
          <h3 class="text-3xl font-bold mb-6 text-purple-700">Rozdział 5. Kreatywny Bank Lekcji: 5 Gotowych Scenariuszy</h3>
          <p class="mb-6 text-gray-700">Zastosuj zasadę 80/20 w praktyce. AI robi "brudną robotę" (80%), uczniowie myślą kreatywnie (20%).</p>

          <div class="space-y-8">
            
            <!-- Scenariusz 1 -->
            <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div class="bg-purple-50 p-4 border-b border-purple-100 flex justify-between items-center">
                <h4 class="text-lg font-bold text-purple-800">Scenariusz 1: Opowiadania i Komiksy</h4>
                <span class="text-xs font-bold bg-white px-2 py-1 rounded text-purple-600 border border-purple-200">J. Polski / Plastyka</span>
              </div>
              <div class="p-6">
                <p class="text-gray-700 mb-4"><strong>Cel:</strong> Rozwijanie kreatywności, narracji i współpracy.</p>
                <div class="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <strong class="block text-gray-800 text-sm mb-1">Narzędzia:</strong>
                    <p class="text-sm text-gray-600">ChatGPT (tekst), Canva AI (obrazy).</p>
                  </div>
                  <div>
                    <strong class="block text-gray-800 text-sm mb-1">Przebieg:</strong>
                    <ul class="list-disc list-inside text-sm text-gray-600">
                      <li>AI pomaga wymyślić fabułę (burza mózgów).</li>
                      <li>AI generuje ilustracje do komiksu.</li>
                      <li>Uczniowie składają całość i redagują tekst.</li>
                    </ul>
                  </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <strong class="text-purple-700 text-sm block mb-1">Prompt Ucznia:</strong>
                  <p class="text-gray-600 italic text-sm">"Pomóż nam wymyślić fabułę do komiksu o psie z przyszłości. Jaki ma problem? Jak go rozwiąże?"</p>
                </div>
              </div>
            </div>

            <!-- Scenariusz 2 -->
            <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div class="bg-blue-50 p-4 border-b border-blue-100 flex justify-between items-center">
                <h4 class="text-lg font-bold text-blue-800">Scenariusz 2: Analiza Danych i Eksperymenty</h4>
                <span class="text-xs font-bold bg-white px-2 py-1 rounded text-blue-600 border border-blue-200">Matematyka / Geografia</span>
              </div>
              <div class="p-6">
                <p class="text-gray-700 mb-4"><strong>Cel:</strong> Nauka pracy z danymi i prognozowania.</p>
                <div class="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <strong class="block text-gray-800 text-sm mb-1">Narzędzia:</strong>
                    <p class="text-sm text-gray-600">ChatGPT (analiza danych), Gemini.</p>
                  </div>
                  <div>
                    <strong class="block text-gray-800 text-sm mb-1">Przebieg:</strong>
                    <ul class="list-disc list-inside text-sm text-gray-600">
                      <li>Uczniowie zbierają dane pogodowe przez tydzień.</li>
                      <li>AI analizuje dane i robi prognozę na 3 dni.</li>
                      <li>Uczniowie porównują prognozę AI z profesjonalną.</li>
                    </ul>
                  </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <strong class="text-blue-700 text-sm block mb-1">Prompt Ucznia:</strong>
                  <p class="text-gray-600 italic text-sm">"Oto dane pogodowe... Przeanalizuj je. Jaka była średnia? Wygeneruj prognozę na kolejne 3 dni."</p>
                </div>
              </div>
            </div>

            <!-- Scenariusz 3 -->
            <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div class="bg-green-50 p-4 border-b border-green-100 flex justify-between items-center">
                <h4 class="text-lg font-bold text-green-800">Scenariusz 3: Projektowanie Gier Edukacyjnych</h4>
                <span class="text-xs font-bold bg-white px-2 py-1 rounded text-green-600 border border-green-200">Informatyka</span>
              </div>
              <div class="p-6">
                <p class="text-gray-700 mb-4"><strong>Cel:</strong> Myślenie projektowe i weryfikacja informacji.</p>
                <div class="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <strong class="block text-gray-800 text-sm mb-1">Narzędzia:</strong>
                    <p class="text-sm text-gray-600">Gemini, pdfquiz.com.</p>
                  </div>
                  <div>
                    <strong class="block text-gray-800 text-sm mb-1">Przebieg:</strong>
                    <ul class="list-disc list-inside text-sm text-gray-600">
                      <li>Uczniowie tworzą quiz dla młodszych klas.</li>
                      <li>AI generuje pytania i odpowiedzi.</li>
                      <li><strong>Kluczowe:</strong> Uczniowie muszą zweryfikować każde pytanie (czy jest poprawne?).</li>
                    </ul>
                  </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <strong class="text-green-700 text-sm block mb-1">Prompt Ucznia:</strong>
                  <p class="text-gray-600 italic text-sm">"Stwórz 15 pytań quizowych o segregacji śmieci w Polsce."</p>
                </div>
              </div>
            </div>

            <!-- Scenariusz 4 -->
            <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div class="bg-orange-50 p-4 border-b border-orange-100 flex justify-between items-center">
                <h4 class="text-lg font-bold text-orange-800">Scenariusz 4: Technika SCAMPER</h4>
                <span class="text-xs font-bold bg-white px-2 py-1 rounded text-orange-600 border border-orange-200">Przedsiębiorczość</span>
              </div>
              <div class="p-6">
                <p class="text-gray-700 mb-4"><strong>Cel:</strong> Kreatywne myślenie poza schematami.</p>
                <div class="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <strong class="block text-gray-800 text-sm mb-1">Narzędzia:</strong>
                    <p class="text-sm text-gray-600">ChatGPT, Copilot.</p>
                  </div>
                  <div>
                    <strong class="block text-gray-800 text-sm mb-1">Przebieg:</strong>
                    <ul class="list-disc list-inside text-sm text-gray-600">
                      <li>AI wyjaśnia technikę SCAMPER.</li>
                      <li>Uczniowie "przeprojektowują" przedmiot (np. plecak).</li>
                      <li>AI działa jako partner do burzy mózgów (podrzuca pomysły).</li>
                    </ul>
                  </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <strong class="text-orange-700 text-sm block mb-1">Prompt Ucznia:</strong>
                  <p class="text-gray-600 italic text-sm">"Używamy techniki SCAMPER, aby ulepszyć szkolną ławkę. Podaj 3 pomysły na 'Combine' i 3 na 'Modify'."</p>
                </div>
              </div>
            </div>

            <!-- Scenariusz 5 -->
            <div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div class="bg-pink-50 p-4 border-b border-pink-100 flex justify-between items-center">
                <h4 class="text-lg font-bold text-pink-800">Scenariusz 5: Projekt STEAM "Wymarzony Wynalazek"</h4>
                <span class="text-xs font-bold bg-white px-2 py-1 rounded text-pink-600 border border-pink-200">Interdyscyplinarny</span>
              </div>
              <div class="p-6">
                <p class="text-gray-700 mb-4"><strong>Cel:</strong> Łączenie wiedzy (Science, Tech, Arts) i nauka przez projekt.</p>
                <div class="grid md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <strong class="block text-gray-800 text-sm mb-1">Narzędzia:</strong>
                    <p class="text-sm text-gray-600">ChatGPT (opis), Canva AI (wizualizacja).</p>
                  </div>
                  <div>
                    <strong class="block text-gray-800 text-sm mb-1">Przebieg:</strong>
                    <ul class="list-disc list-inside text-sm text-gray-600">
                      <li>Uczeń wymyśla wynalazek (np. "samo-pakujący się plecak").</li>
                      <li>AI pomaga napisać opis techniczny.</li>
                      <li>AI generuje wizualizację marketingową.</li>
                    </ul>
                  </div>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <strong class="text-pink-700 text-sm block mb-1">Prompt Ucznia:</strong>
                  <p class="text-gray-600 italic text-sm">"Stwórz ilustrację nowoczesnej doniczki na zioła z wyświetlaczem. Napisz 30-sekundowy skrypt reklamy."</p>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    `
  },
  {
    id: 'rozdzial-6',
    title: 'Rozdział 6: Podstawa Programowa 2026 (Warsztaty)',
    icon: <GraduationCap className="w-5 h-5" />,
    duration: '120 min',
    content: `
      <div class="space-y-8">
        <section>
          <h3 class="text-3xl font-bold mb-6 text-purple-700">Rozdział 6. Podstawa Programowa 2026: Gotowe Warsztaty</h3>
          <p class="mb-6 text-gray-700">Oto gotowe scenariusze realizacji nowej podstawy programowej, podzielone na etapy edukacyjne.</p>

          <div class="space-y-8">
            
            <!-- Klasa IV -->
            <div class="bg-green-50 p-6 rounded-xl border-l-4 border-green-500 shadow-sm">
              <h4 class="text-xl font-bold text-green-800 mb-3">Klasa IV: "Głuchy Telefon z AI" (Wstęp do Promptingu)</h4>
              <p class="text-gray-700 mb-2"><strong>Cel:</strong> Zrozumienie, że precyzja polecenia ma znaczenie.</p>
              <div class="bg-white p-4 rounded-lg border border-green-100">
                <strong class="block text-green-700 mb-2">Przebieg:</strong>
                <ul class="list-decimal list-inside text-gray-600 space-y-2">
                  <li><strong>Runda 1 (Niejasna):</strong> Nauczyciel prosi uczniów o wpisanie do generatora obrazów (np. Canva/Bing) słowa "Zamek".
                    <br/><span class="text-sm italic text-gray-500">Wynik: Każdy ma inny zamek (błyskawiczny, z piasku, królewski).</span>
                  </li>
                  <li><strong>Runda 2 (Precyzyjna):</strong> Nauczyciel podaje precyzyjny opis: "Średniowieczny zamek z kamienia, na wysokiej górze, o zachodzie słońca, styl realistyczny".
                    <br/><span class="text-sm italic text-gray-500">Wynik: Obrazy są spójne.</span>
                  </li>
                </ul>
              </div>
              <p class="mt-4 text-green-900 font-medium">Wniosek dla ucznia: AI jest jak dżin z lampy – spełnia życzenia dosłownie, nie domyśla się.</p>
            </div>

            <!-- Klasa V -->
            <div class="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 shadow-sm">
              <h4 class="text-xl font-bold text-blue-800 mb-3">Klasa V: "Sorter 1.0 - Jak Uczy się Maszyna" (Machine Learning)</h4>
              <p class="text-gray-700 mb-2"><strong>Cel:</strong> Zrozumienie, że AI uczy się z danych (nie jest magią).</p>
              <div class="bg-white p-4 rounded-lg border border-blue-100">
                <strong class="block text-blue-700 mb-2">Przebieg (Narzędzie: Teachable Machine by Google):</strong>
                <ul class="list-decimal list-inside text-gray-600 space-y-2">
                  <li>Nauczyciel pokazuje narzędzie Teachable Machine (wymaga kamerki).</li>
                  <li><strong>Trening:</strong> Uczniowie trenują model na 2 gesty: "Otwarta dłoń" (Klasa 1) i "Zamknięta pięść" (Klasa 2).</li>
                  <li><strong>Test:</strong> Model działa! Rozpoznaje dłoń i pięść.</li>
                  <li><strong>Zmyłka (Kluczowy moment):</strong> Nauczyciel pokazuje "Kciuk w górę". Model "głupieje" (pokazuje losowy wynik).</li>
                </ul>
              </div>
              <p class="mt-4 text-blue-900 font-medium">Wniosek dla ucznia: AI wie tylko to, co jej pokażemy. Jeśli dane są niepełne, AI się myli.</p>
            </div>

            <!-- Klasa VI -->
            <div class="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500 shadow-sm">
              <h4 class="text-xl font-bold text-yellow-800 mb-3">Klasa VI: "Detektywi AI" (Rozpoznawanie i Ekologia)</h4>
              <p class="text-gray-700 mb-2"><strong>Cel:</strong> Rozpoznawanie artefaktów AI i świadomość kosztów.</p>
              <div class="bg-white p-4 rounded-lg border border-yellow-100">
                <strong class="block text-yellow-700 mb-2">Przebieg:</strong>
                <ul class="list-decimal list-inside text-gray-600 space-y-2">
                  <li><strong>Gra "Real or Fake":</strong> Nauczyciel wyświetla zdjęcia twarzy (strona "This Person Does Not Exist"). Uczniowie szukają błędów (dziwne tło, niesymetryczne kolczyki).</li>
                  <li><strong>Dyskusja o koszcie:</strong> "Czy wiecie, że wygenerowanie jednego obrazka zużywa tyle prądu, co naładowanie telefonu?".</li>
                </ul>
              </div>
              <p class="mt-4 text-yellow-900 font-medium">Wniosek dla ucznia: Używaj AI z głową, bo to kosztuje planetę.</p>
            </div>

            <!-- Klasy VII-VIII -->
            <div class="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500 shadow-sm">
              <h4 class="text-xl font-bold text-purple-800 mb-3">Klasy VII-VIII: "Świadomy Obywatel" (Bias i Etyka)</h4>
              <p class="text-gray-700 mb-2"><strong>Cel:</strong> Zrozumienie stronniczości (bias) i rola redaktora.</p>
              <div class="bg-white p-4 rounded-lg border border-purple-100">
                <strong class="block text-purple-700 mb-2">Przebieg:</strong>
                <ul class="list-decimal list-inside text-gray-600 space-y-2">
                  <li><strong>Eksperyment myślowy:</strong> "Wyobraźcie sobie, że AI uczyła się, jak wygląda lekarz, tylko na zdjęciach mężczyzn. Co narysuje, gdy poprosimy o lekarza?". (Dyskusja o stereotypach).</li>
                  <li><strong>Warsztat Redaktorski:</strong> Uczniowie generują tekst o "Historii Polski" i muszą znaleźć 3 błędy lub uproszczenia, używając podręcznika.</li>
                </ul>
              </div>
              <p class="mt-4 text-purple-900 font-medium">Wniosek dla ucznia: Nie ufaj bezgranicznie. Bądź redaktorem, nie tylko konsumentem.</p>
            </div>

          </div>
        </section>
      </div>
    `
  },
  {
    id: 'rozdzial-7',
    title: 'Rozdział 7: Współpraca z Rodzicami',
    icon: <Users className="w-5 h-5" />,
    duration: '30 min',
    content: `
      <div class="space-y-8">
        <section>
          <h3 class="text-3xl font-bold mb-6 text-purple-700">Rozdział 7. Współpraca z Rodzicami</h3>
          <p class="mb-6 text-gray-700">Rodzice też się boją. Twoją rolą jest ich uspokoić i edukować. Oto gotowy plan wystąpienia na zebranie (5 slajdów).</p>

          <div class="bg-white border border-gray-200 p-8 rounded-xl shadow-lg">
            <h4 class="text-xl font-bold mb-6 text-center border-b pb-4">Plan Zebrania: "AI w Naszej Klasie"</h4>
            
            <div class="space-y-6">
              
              <div class="flex gap-4 items-start">
                <div class="bg-purple-100 text-purple-700 px-3 py-1 rounded font-bold whitespace-nowrap">Slajd 1</div>
                <div>
                  <strong class="block text-gray-800 text-lg mb-1">Dlaczego teraz? (Kontekst)</strong>
                  <p class="text-gray-600">"Szanowni Państwo, świat się zmienił. Od 2026 roku AI jest wymogiem podstawy programowej. Nie możemy udawać, że tego nie ma. Chcemy przygotować Wasze dzieci do przyszłości, a nie przeszłości."</p>
                </div>
              </div>

              <div class="flex gap-4 items-start">
                <div class="bg-purple-100 text-purple-700 px-3 py-1 rounded font-bold whitespace-nowrap">Slajd 2</div>
                <div>
                  <strong class="block text-gray-800 text-lg mb-1">Szanse (Korzyść dla dziecka)</strong>
                  <p class="text-gray-600">"Dzięki AI mogę szybciej przygotowywać materiały, co oznacza, że mam więcej czasu na indywidualną pracę z Waszym dzieckiem. To narzędzie do personalizacji nauki."</p>
                </div>
              </div>

              <div class="flex gap-4 items-start">
                <div class="bg-purple-100 text-purple-700 px-3 py-1 rounded font-bold whitespace-nowrap">Slajd 3</div>
                <div>
                  <strong class="block text-gray-800 text-lg mb-1">Bezpieczeństwo (Uspokojenie)</strong>
                  <p class="text-gray-600">"Bezpieczeństwo jest priorytetem. Stosujemy zasadę: Żadnych danych osobowych w AI. Uczymy dzieci krytycznego myślenia, a nie bezmyślnego klikania."</p>
                </div>
              </div>

              <div class="flex gap-4 items-start">
                <div class="bg-purple-100 text-purple-700 px-3 py-1 rounded font-bold whitespace-nowrap">Slajd 4</div>
                <div>
                  <strong class="block text-gray-800 text-lg mb-1">Plagiaty (Nowe zasady)</strong>
                  <p class="text-gray-600">"Zmieniamy formę prac domowych. Nie będziemy oceniać tego, co AI może napisać za ucznia. Będziemy oceniać proces, obronę pracy i krytyczną analizę."</p>
                </div>
              </div>

              <div class="flex gap-4 items-start">
                <div class="bg-purple-100 text-purple-700 px-3 py-1 rounded font-bold whitespace-nowrap">Slajd 5</div>
                <div>
                  <strong class="block text-gray-800 text-lg mb-1">Rola Rodzica (Prośba)</strong>
                  <p class="text-gray-600">"Rozmawiajcie z dziećmi. Pytajcie: 'Czy to zdjęcie w internecie jest prawdziwe?'. Bądźcie ciekawi, testujcie te narzędzia razem z nimi."</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    `
  },
  {
    id: 'podsumowanie',
    title: 'Podsumowanie i Plan Rozwoju',
    icon: <CheckCircle className="w-5 h-5" />,
    duration: '15 min',
    content: `
      <div class="space-y-8">
        <section>
          <h3 class="text-3xl font-bold mb-6 text-purple-700">Podsumowanie: Nauczyciel 2.0</h3>
          <p class="text-lg text-gray-700 mb-8 leading-relaxed">
            "Obietnica AI w edukacji nie polega na zastąpieniu nauczycieli, ale na ich uwolnieniu od biurokracji, by mogli wrócić do tego, co kochają – nauczania i relacji z uczniem."
          </p>

          <div class="bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-2xl mb-8 border border-purple-200">
            <h4 class="text-xl font-bold mb-6 text-purple-900">Twój Plan Wdrożeniowy na 3 Miesiące</h4>
            
            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="bg-white w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm shrink-0">1</div>
                <div>
                  <strong class="block text-purple-800 text-lg mb-1">Miesiąc 1: Eksploracja (Bezpieczna Przystań)</strong>
                  <ul class="list-disc list-inside text-gray-700 space-y-1">
                    <li>Załóż konto na ChatGPT lub Gemini.</li>
                    <li>Wykonaj zadanie "Pierwszy Kontakt" (hobby).</li>
                    <li>Zacznij używać AI do 1 zadania administracyjnego (np. napisanie maila, planu wycieczki).</li>
                  </ul>
                </div>
              </div>

              <div class="flex gap-4">
                <div class="bg-white w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm shrink-0">2</div>
                <div>
                  <strong class="block text-purple-800 text-lg mb-1">Miesiąc 2: Pierwsze Kroki w Klasie</strong>
                  <ul class="list-disc list-inside text-gray-700 space-y-1">
                    <li>Stwórz 3 własne "Prompty Eksperckie" metodą 5S.</li>
                    <li>Przeprowadź jedną prostą lekcję z wykorzystaniem AI (np. generowanie obrazów do opowiadania).</li>
                  </ul>
                </div>
              </div>

              <div class="flex gap-4">
                <div class="bg-white w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm shrink-0">3</div>
                <div>
                  <strong class="block text-purple-800 text-lg mb-1">Miesiąc 3: Edukator i Lider</strong>
                  <ul class="list-disc list-inside text-gray-700 space-y-1">
                    <li>Przeprowadź warsztat z uczniami o weryfikacji treści (F.L.O.B.).</li>
                    <li>Omów temat AI na zebraniu z rodzicami (wykorzystaj gotowy plan).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center p-8 bg-gray-50 rounded-xl">
            <h4 class="text-2xl font-bold text-gray-800 mb-2">Gratulacje!</h4>
            <p class="text-gray-600 mb-4">Ukończyłeś szkolenie "Sztuczna Inteligencja w Edukacji".</p>
            <p class="text-gray-500 italic">Pamiętaj: Najlepszym sposobem na przewidzenie przyszłości jest jej stworzenie.</p>
          </div>
        </section>
      </div>
    `
  }
]

function TrainingContent() {
  const [activeModule, setActiveModule] = useState(trainingModules[0].id)
  const [completedModules, setCompletedModules] = useState<string[]>([])

  const handleLogout = () => {
    localStorage.removeItem('training_auth_teachers')
    window.location.reload()
  }

  const markAsCompleted = (moduleId: string) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId])
      toast({
        title: "Moduł ukończony! 🎓",
        description: "Świetna robota! Przejdź do kolejnej sekcji.",
      })
    }
  }

  const progress = (completedModules.length / trainingModules.length) * 100

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 py-16 text-white">
          <div className="container mx-auto px-4 relative z-10">
            <div className="absolute top-0 right-0">
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Wyloguj
              </Button>
            </div>

            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <GraduationCap className="w-4 h-4" />
                Szkolenie Certyfikowane
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                AI w Edukacji: Przewodnik Nauczyciela
              </h1>
              
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Od "Kryzysu Zaufania" do "Nauczyciela 2.0". Kompleksowy kurs przygotowujący do wyzwań nowej podstawy programowej 2026.
              </p>

              {/* Progress Bar */}
              <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="flex justify-between text-sm mb-2 font-medium">
                  <span>Twój Postęp</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-3 bg-black/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-400"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl" />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Sidebar Navigation */}
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-4 xl:col-span-3"
              >
                <div className="sticky top-24">
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-6 px-2">
                        <BookOpen className="w-5 h-5 text-purple-600" />
                        <h3 className="font-bold text-gray-800">Spis Treści</h3>
                      </div>
                      <div className="space-y-1">
                        {trainingModules.map((module, index) => (
                          <button
                            key={module.id}
                            onClick={() => setActiveModule(module.id)}
                            className={`w-full text-left p-3 rounded-lg transition-all text-sm flex items-center gap-3 group ${
                              activeModule === module.id
                                ? 'bg-purple-100 text-purple-700 font-bold shadow-sm'
                                : 'hover:bg-gray-50 text-gray-600'
                            }`}
                          >
                            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                              completedModules.includes(module.id)
                                ? 'bg-green-100 text-green-600'
                                : activeModule === module.id
                                ? 'bg-purple-200 text-purple-700'
                                : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                            }`}>
                              {completedModules.includes(module.id) ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                module.icon
                              )}
                            </div>
                            <div className="flex-1">
                              <span className="line-clamp-1">{module.title}</span>
                              <span className="text-xs opacity-70 font-normal block mt-0.5">{module.duration}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.aside>

              {/* Content Area */}
              <div className="lg:col-span-8 xl:col-span-9">
                {trainingModules.map((module) => (
                  activeModule === module.id && (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Card className="border-0 shadow-xl overflow-hidden bg-white">
                        <CardContent className="p-8 md:p-12">
                          <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
                            <div className="flex items-center gap-3 text-purple-600">
                              {module.icon}
                              <span className="font-medium uppercase tracking-wide text-sm">Moduł Szkoleniowy</span>
                            </div>
                            <span className="text-gray-400 text-sm flex items-center gap-1">
                              <Sparkles className="w-4 h-4" />
                              {module.duration}
                            </span>
                          </div>

                          <div 
                            className="prose prose-lg max-w-none prose-headings:font-bold prose-p:text-gray-600 prose-a:text-purple-600 hover:prose-a:text-purple-700 prose-strong:text-gray-900 prose-ul:list-disc prose-ul:pl-6 prose-li:marker:text-purple-400"
                            dangerouslySetInnerHTML={{ __html: module.content }}
                          />

                          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end">
                            <Button
                              onClick={() => markAsCompleted(module.id)}
                              size="lg"
                              className={`
                                transition-all duration-300 transform hover:scale-105
                                ${completedModules.includes(module.id)
                                  ? 'bg-green-500 hover:bg-green-600 text-white'
                                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25'
                                }
                              `}
                            >
                              {completedModules.includes(module.id) ? (
                                <>
                                  <CheckCircle className="w-5 h-5 mr-2" />
                                  Ukończono
                                </>
                              ) : (
                                <>
                                  Oznacz jako ukończone
                                  <CheckCircle className="w-5 h-5 ml-2" />
                                </>
                              )}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default function TeacherTrainingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication on mount
  useState(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('training_auth_teachers')
      if (auth === 'true') {
        setIsAuthenticated(true)
      }
    }
  })

  const handleLogin = () => {
    localStorage.setItem('training_auth_teachers', 'true')
    setIsAuthenticated(true)
  }

  if (!isAuthenticated) {
    return <SimpleLoginForm onLogin={handleLogin} title="Szkolenie dla Nauczycieli" />
  }

  return <TrainingContent />
}
