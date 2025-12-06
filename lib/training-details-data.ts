
export interface TrainingDetail {
  slug: string;
  modulesCount: number;
  learningOutcomes: string[];
  program: {
    title: string;
    description: string;
    duration?: string;
  }[];
}

export const trainingDetailsData: Record<string, TrainingDetail> = {
  'nauczyciele': {
    slug: 'nauczyciele',
    modulesCount: 6,
    learningOutcomes: [
      'Zrozumiesz, czym jest AI, GSI i LLM bez technicznego żargonu',
      'Nauczysz się tworzyć skuteczne prompty (polecenia) dla AI',
      'Poznasz 10 kluczowych narzędzi AI dla edukacji (ChatGPT, Gemini, Claude i inne)',
      'Dowiesz się, jak etycznie wykorzystywać AI w szkole (RODO, plagiaty)',
      'Otrzymasz gotowe scenariusze lekcji i pomysły na zajęcia',
      'Zwiększysz swoją efektywność i zaoszczędzisz czas na administracji'
    ],
    program: [
      {
        title: 'Wstęp: Kryzys Zaufania i Motywacja',
        description: 'Zrozumienie obaw nauczycieli, korzyści z AI i podstawy programowej 2026.',
        duration: '35 min'
      },
      {
        title: 'Rozdział 1: Fundamenty AI',
        description: 'Demistyfikacja AI, pierwsze bezpieczne ćwiczenia i przegląd narzędzi.',
        duration: '55 min'
      },
      {
        title: 'Rozdział 2: Etyka AI w Szkole',
        description: 'RODO, prywatność uczniów, plagiaty vs augmentacja, deepfake.',
        duration: '35 min'
      },
      {
        title: 'Rozdział 3: Sztuka Dialogu (Prompt Engineering)',
        description: 'Zasada GIGO, Framework 5S, warsztat transformacji promptów.',
        duration: '45 min'
      },
      {
        title: 'Rozdział 4: Krytyczna Ocena Treści',
        description: 'Problem halucynacji AI, checklista F.L.O.B., ćwiczenia praktyczne.',
        duration: '40 min'
      },
      {
        title: 'Rozdział 5: Kreatywny Bank Lekcji',
        description: 'Gotowe scenariusze zajęć z wykorzystaniem AI.',
        duration: '15 min'
      }
    ]
  },
  'dzieci': {
    slug: 'dzieci',
    modulesCount: 4,
    learningOutcomes: [
      'Stworzysz spersonalizowane materiały edukacyjne z pomocą Claude.ai',
      'Nauczysz się generować zagadnienia zgodne z podstawą programową',
      'Przeprowadzisz interaktywne testy wiedzy z Asystentem Gemini',
      'Poznasz bezpieczne sposoby korzystania z AI w nauce',
      'Zrozumiesz, jak AI może być prywatnym korepetytorem Twojego dziecka'
    ],
    program: [
      {
        title: 'Wstęp',
        description: 'Wprowadzenie do wykorzystania AI w efektywnej nauce.',
        duration: '5 min'
      },
      {
        title: 'Moduł 1: Tworzenie Materiałów',
        description: 'Rejestracja, generowanie zagadnień, tworzenie materiałów przyjaznych dziecku.',
        duration: '36 min'
      },
      {
        title: 'Moduł 2: Interaktywne Sprawdzanie Wiedzy',
        description: 'Przygotowanie narzędzi, upload materiałów, testy głosowe z Gemini.',
        duration: '29 min'
      },
      {
        title: 'Ważne Wskazówki i Dobre Praktyki',
        description: 'Halucynacje AI, nadzór rodzicielski, personalizacja nauki.',
        duration: '17 min'
      }
    ]
  },
  'mlody-influencer': {
    slug: 'mlody-influencer',
    modulesCount: 45,
    learningOutcomes: [
      'Zbudujesz bezpieczną i profesjonalną markę osobistą w sieci',
      'Opanujesz narzędzia AI do tworzenia grafik, tekstów i wideo',
      'Nauczysz się planować treści i zarządzać kalendarzem publikacji',
      'Poznasz zasady etyki, prawa autorskiego i radzenia sobie z hejtem',
      'Zrealizujesz 52 gotowe projekty kreatywne',
      'Zrozumiesz, jak działają algorytmy mediów społecznościowych'
    ],
    program: [
      {
        title: 'Część 1: Twoje Bezpieczne Cyfrowe Miejsce',
        description: 'Wybór platformy, bezpieczeństwo i ograniczenia wiekowe.',
        duration: '60 min'
      },
      {
        title: 'Część 2: Twój Arsenał - Narzędzia AI',
        description: 'Przegląd i nauka obsługi narzędzi: Canva, ChatGPT, Gemini, i inne.',
        duration: '220 min'
      },
      {
        title: 'Część 3: Maszyna do Pomysłów',
        description: 'Odkrywanie pasji, burze mózgów z AI, etyka twórcy.',
        duration: '150 min'
      },
      {
        title: 'Część 4: Twój Plan - Kalendarz Treści',
        description: 'Planowanie, tworzenie harmonogramów i analiza wyników.',
        duration: '80 min'
      },
      {
        title: 'Część 5: Sekcja dla Rodziców',
        description: 'Rola rodzica, RODO, wsparcie dziecka.',
        duration: '80 min'
      },
      {
        title: 'Część 6: Rozwijanie Umiejętności',
        description: 'Występowanie przed kamerą, montaż, współpraca.',
        duration: '120 min'
      },
      {
        title: 'Część 7: 52 Gotowe Projekty',
        description: 'Biblioteka pomysłów na cały rok.',
        duration: '60+ min'
      }
    ]
  },
  'bezpieczenstwo-w-sieci-i-ai': {
    slug: 'bezpieczenstwo-w-sieci-i-ai',
    modulesCount: 24,
    learningOutcomes: [
      'Nauczysz się rozpoznawać zagrożenia w sieci (phishing, cyberprzemoc)',
      'Dowiesz się, jak chronić swoje dane osobowe i prywatność',
      'Zrozumiesz działanie AI i zagrożenia typu deepfake',
      'Stworzysz rodzinne zasady bezpiecznego korzystania z internetu',
      'Poznasz procedury reagowania w sytuacjach kryzysowych',
      'Zbudujesz zaufanie i lepszą komunikację z dzieckiem na temat świata online'
    ],
    program: [
      {
        title: 'Część I: Wprowadzenie',
        description: 'Witamy w cyfrowym świecie! Podstawy bezpieczeństwa.',
        duration: '12 min'
      },
      {
        title: 'Część II: Zagrożenia w sieci',
        description: 'Nieznajomi, oszustwa, treści nieodpowiednie.',
        duration: '30 min'
      },
      {
        title: 'Część III: Bezpieczne korzystanie',
        description: 'Silne hasła, ochrona danych, higiena cyfrowa.',
        duration: '30 min'
      },
      {
        title: 'Część IV: Świat AI',
        description: 'Sztuczna inteligencja, deepfake, prywatność w erze AI.',
        duration: '30 min'
      },
      {
        title: 'Część V: Reagowanie kryzysowe',
        description: 'Co robić, gdy coś pójdzie nie tak? Gdzie szukać pomocy?',
        duration: '20 min'
      },
      {
        title: 'Część VI: Rodzinne zasady',
        description: 'Tworzenie domowego kodeksu cyfrowego.',
        duration: '20 min'
      },
      {
        title: 'Część VII: Podsumowanie',
        description: 'Najważniejsze wnioski i sesja Q&A.',
        duration: '15 min'
      }
    ]
  }
};
