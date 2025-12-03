export interface Chapter {
  id: string;
  part: number;
  title: string;
  description: string;
  icon: string;
  estimatedTime: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'quiz' | 'project';
}

export interface Project {
  id: string;
  title: string;
  category: string;
  difficulty: number;
  description: string;
  icon: string;
}

export const courseParts = [
  { id: 1, title: 'Twoje Bezpieczne Cyfrowe Miejsce', icon: '🏰', chapters: [1, 2, 3] },
  { id: 2, title: 'Twój Arsenał - Narzędzia AI', icon: '🛠️', chapters: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] },
  { id: 3, title: 'Maszyna do Pomysłów', icon: '💡', chapters: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28] },
  { id: 4, title: 'Twój Plan - Kalendarz Treści', icon: '📅', chapters: [29, 30, 31, 32, 33] },
  { id: 5, title: 'Sekcja dla Rodziców', icon: '👪', chapters: [34, 35, 36, 37, 38] },
  { id: 6, title: 'Rozwijanie Umiejętności', icon: '🌱', chapters: [39, 40, 41, 42, 43, 44] },
  { id: 7, title: '52 Gotowe Projekty', icon: '🎨', chapters: [45] },
];

export const chapters: Chapter[] = [
  // PART I: PLATFORMY (1-3)
  {
    id: 'chapter-1',
    part: 1,
    title: 'Dlaczego "Zwykłe" Media Społecznościowe Nie Są Dla Ciebie (Jeszcze)?',
    description: 'Poznaj prawne i psychologiczne powody ograniczeń wiekowych',
    icon: '⚖️',
    estimatedTime: '15 min',
    sections: [],
  },
  {
    id: 'chapter-2',
    part: 1,
    title: 'Twoje Bezpieczne Playgroundy',
    description: 'Platformy stworzone specjalnie dla młodszych twórców',
    icon: '🎠',
    estimatedTime: '20 min',
    sections: [],
  },
  {
    id: 'chapter-3',
    part: 1,
    title: 'Główne Platformy pod Okiem Rodzica',
    description: 'YouTube, Instagram i TikTok - bezpieczne korzystanie',
    icon: '📱',
    estimatedTime: '25 min',
    sections: [],
  },

  // PART II: NARZĘDZIA AI (4-18) - 15 CHAPTERS
  {
    id: 'chapter-4',
    part: 2,
    title: 'AI dla Małych Kreatywnych Umysłów',
    description: 'Czym jest sztuczna inteligencja i jak jej używać',
    icon: '🧠',
    estimatedTime: '15 min',
    sections: [],
  },
  {
    id: 'chapter-5',
    part: 2,
    title: 'Kreebo - Twój Własny Ilustrowany Bajkopis',
    description: 'Tworzenie ilustrowanych historii z pomocą AI',
    icon: '📖',
    estimatedTime: '10 min',
    sections: [],
  },
  {
    id: 'chapter-6',
    part: 2,
    title: 'Scratch + AI - Programowanie z Inteligencją',
    description: 'Tworzenie gier i animacji z AI',
    icon: '🎨',
    estimatedTime: '15 min',
    sections: [],
  },
  {
    id: 'chapter-7',
    part: 2,
    title: 'Teachable Machine - Naucz Komputer!',
    description: 'Ucz sztuczną inteligencję rozpoznawać obrazy',
    icon: '🧩',
    estimatedTime: '12 min',
    sections: [],
  },
  {
    id: 'chapter-8',
    part: 2,
    title: 'Bing Image Creator - Magiczne Rysowanie Słowami',
    description: 'Generowanie grafik z opisów tekstowych',
    icon: '🖼️',
    estimatedTime: '10 min',
    sections: [],
  },
  {
    id: 'chapter-9',
    part: 2,
    title: 'Canva - Graficzny Kombajn z AI',
    description: 'Profesjonalne projekty graficzne dla dzieci',
    icon: '✨',
    estimatedTime: '20 min',
    sections: [],
  },
  {
    id: 'chapter-10',
    part: 2,
    title: 'Roblox Studio - Tworzenie Gier 3D',
    description: 'Budowanie własnych światów i gier',
    icon: '🎮',
    estimatedTime: '25 min',
    sections: [],
  },
  {
    id: 'chapter-11',
    part: 2,
    title: 'AI Dungeon - Interaktywne Przygody Tekstowe',
    description: 'Przygody RPG generowane przez AI',
    icon: '🏰',
    estimatedTime: '12 min',
    sections: [],
  },
  {
    id: 'chapter-12',
    part: 2,
    title: 'Pixton - Tworzenie Komiksów z AI',
    description: 'Rysuj komiksy bez umiejętności rysowania',
    icon: '📰',
    estimatedTime: '15 min',
    sections: [],
  },
  {
    id: 'chapter-13',
    part: 2,
    title: 'Storybird - Ilustrowane Historie',
    description: 'Piękne ilustracje do Twoich opowiadań',
    icon: '📚',
    estimatedTime: '12 min',
    sections: [],
  },
  {
    id: 'chapter-14',
    part: 2,
    title: 'TinkerCAD - Projektowanie 3D',
    description: 'Tworzenie modeli 3D do druku',
    icon: '🏗️',
    estimatedTime: '18 min',
    sections: [],
  },
  {
    id: 'chapter-15',
    part: 2,
    title: 'ChatGPT - Twój AI Asystent',
    description: 'Rozmowy z AI: pomoc w nauce i kreatywności',
    icon: '🤖',
    estimatedTime: '15 min',
    sections: [],
  },
  {
    id: 'chapter-16',
    part: 2,
    title: 'Gemini - AI od Google',
    description: 'Google AI do tekstow, obrazow i wiecej',
    icon: '🌟',
    estimatedTime: '15 min',
    sections: [],
  },
  {
    id: 'chapter-17',
    part: 2,
    title: 'Notion AI - Organizacja i Notatki',
    description: 'Inteligentny notes i planer projektów',
    icon: '📝',
    estimatedTime: '12 min',
    sections: [],
  },
  {
    id: 'chapter-18',
    part: 2,
    title: 'Grammarly - Twój Korektor Tekstów',
    description: 'Poprawa pisowni i stylu z AI',
    icon: '✍️',
    estimatedTime: '10 min',
    sections: [],
  },

  // PART III: POMYSŁY I ETYKA (19-28) - 10 CHAPTERS
  {
    id: 'chapter-19',
    part: 3,
    title: 'Gdzie Chować Świetne Pomysły?',
    description: 'Organizacja i archiwizowanie pomysłów',
    icon: '📝',
    estimatedTime: '15 min',
    sections: [],
  },
  {
    id: 'chapter-20',
    part: 3,
    title: 'Odkryj Swoją Supermoc – Ćwiczenia z Odkrywaniem Pasji',
    description: 'Interaktywne ćwiczenia pomagające znaleźć temat kanału',
    icon: '🌟',
    estimatedTime: '25 min',
    sections: [],
  },
  {
    id: 'chapter-21',
    part: 3,
    title: 'AI jako Twój Generator Pomysłów',
    description: 'Wykorzystanie AI do burzy mózgów',
    icon: '💭',
    estimatedTime: '20 min',
    sections: [],
  },
  {
    id: 'chapter-22',
    part: 3,
    title: 'Etyka 1: Prywatność i Bezpieczeństwo',
    description: 'Chroń swoje dane i tożsamość online',
    icon: '🔒',
    estimatedTime: '15 min',
    sections: [],
  },
  {
    id: 'chapter-23',
    part: 3,
    title: 'Etyka 2: Bycie Miłym Online',
    description: 'Kultura i szacunek w internecie',
    icon: '😊',
    estimatedTime: '12 min',
    sections: [],
  },
  {
    id: 'chapter-24',
    part: 3,
    title: 'Etyka 3: Szanuj Prywatność Innych',
    description: 'Zgody i ochrona wizerunku innych',
    icon: '👥',
    estimatedTime: '12 min',
    sections: [],
  },
  {
    id: 'chapter-25',
    part: 3,
    title: 'Etyka 4: Uczciwość i Przejrzystość',
    description: 'Oznaczanie treści i uczciwe relacje',
    icon: '🔍',
    estimatedTime: '12 min',
    sections: [],
  },
  {
    id: 'chapter-26',
    part: 3,
    title: 'Etyka 5: Tworzenie Wartościowych Treści',
    description: 'Jakość ponad ilość w tworzeniu',
    icon: '💎',
    estimatedTime: '15 min',
    sections: [],
  },
  {
    id: 'chapter-27',
    part: 3,
    title: 'Etyka 6: Prawa Autorskie i Cytowanie',
    description: 'Szanowanie cudzej twórczości',
    icon: '📜',
    estimatedTime: '15 min',
    sections: [],
  },
  {
    id: 'chapter-28',
    part: 3,
    title: 'Etyka 7: Radzenie Sobie z Hejtem',
    description: 'Jak reagować na negatywne komentarze',
    icon: '🛡️',
    estimatedTime: '18 min',
    sections: [],
  },

  // PART IV: KALENDARZ TREŚCI (29-33) - 5 CHAPTERS
  {
    id: 'chapter-29',
    part: 4,
    title: 'Wprowadzenie do Kalendarza Treści',
    description: 'Dlaczego planowanie jest ważne',
    icon: '🗓️',
    estimatedTime: '10 min',
    sections: [],
  },
  {
    id: 'chapter-30',
    part: 4,
    title: 'Krok 1: Tworzenie Arkusza Google Sheets',
    description: 'Przygotowanie szablonu kalendarza',
    icon: '📊',
    estimatedTime: '15 min',
    sections: [],
  },
  {
    id: 'chapter-31',
    part: 4,
    title: 'Krok 2: Wypełnianie Kalendarza z AI',
    description: 'Generowanie pomysłów na treści z AI',
    icon: '🤖',
    estimatedTime: '20 min',
    sections: [],
  },
  {
    id: 'chapter-32',
    part: 4,
    title: 'Krok 3: Planowanie Szczegółów',
    description: 'Scenariusze i przygotowanie materiałów',
    icon: '📝',
    estimatedTime: '18 min',
    sections: [],
  },
  {
    id: 'chapter-33',
    part: 4,
    title: 'Krok 4: Tracking i Analiza',
    description: 'Śledzenie postępów i wyników',
    icon: '📈',
    estimatedTime: '15 min',
    sections: [],
  },

  // PART V: DLA RODZICÓW (34-38) - 5 CHAPTERS
  {
    id: 'chapter-34',
    part: 5,
    title: 'Dlaczego Twoje Dziecko Chce Być Influencerem?',
    description: 'Zrozumienie motywacji dziecka',
    icon: '🤔',
    estimatedTime: '12 min',
    sections: [],
  },
  {
    id: 'chapter-35',
    part: 5,
    title: 'Twoja Rola: Przewodnik i Strażnik',
    description: 'Jak wspierać dziecko bezpiecznie',
    icon: '🛡️',
    estimatedTime: '15 min',
    sections: [],
  },
  {
    id: 'chapter-36',
    part: 5,
    title: 'Codzienny Checklist dla Rodzica',
    description: 'Codzienne zasady bezpiecznej kreacji',
    icon: '✅',
    estimatedTime: '12 min',
    sections: [],
  },
  {
    id: 'chapter-37',
    part: 5,
    title: 'RODO i GDPR-K: Przewodnik Prawny',
    description: 'Wszystko o ochronie danych dziecka',
    icon: '⚖️',
    estimatedTime: '25 min',
    sections: [],
  },
  {
    id: 'chapter-38',
    part: 5,
    title: 'FAQ dla Rodziców',
    description: '20 najważniejszych pytań i odpowiedzi',
    icon: '❓',
    estimatedTime: '20 min',
    sections: [],
  },

  // PART VI: ROZWIJANIE UMIEJĘTNOŚCI (39-44) - 6 CHAPTERS
  {
    id: 'chapter-39',
    part: 6,
    title: 'Jak Radzić Sobie z Krytyką Online',
    description: 'Budowanie odporności psychicznej',
    icon: '🛡️',
    estimatedTime: '15 min',
    sections: [],
  },
  {
    id: 'chapter-40',
    part: 6,
    title: 'Budowanie Pewności Siebie przed Kamerą',
    description: 'Przełamywanie stresu i nieśmiałości',
    icon: '🎥',
    estimatedTime: '18 min',
    sections: [],
  },
  {
    id: 'chapter-41',
    part: 6,
    title: 'Współpraca z Innymi Młodymi Twórcami',
    description: 'Kooperacja i budowanie społeczności',
    icon: '🤝',
    estimatedTime: '15 min',
    sections: [],
  },
  {
    id: 'chapter-42',
    part: 6,
    title: 'Wszystko o Montażu dla Początkujących',
    description: 'Podstawy edycji wideo krok po kroku',
    icon: '🎬',
    estimatedTime: '30 min',
    sections: [],
  },
  {
    id: 'chapter-43',
    part: 6,
    title: 'Studia Przypadków: Młodzi Polscy Twórcy',
    description: 'Inspirujące historie sukcesu',
    icon: '🌟',
    estimatedTime: '20 min',
    sections: [],
  },
  {
    id: 'chapter-44',
    part: 6,
    title: 'Twój Pierwszy Miesiąc: Dziennik',
    description: 'Plan działania dzień po dniu',
    icon: '📖',
    estimatedTime: '25 min',
    sections: [],
  },

  // PART VII: 52 PROJEKTY (45) - 1 CHAPTER
  {
    id: 'chapter-45',
    part: 7,
    title: '52 Gotowe Projekty dla Młodych Twórców',
    description: 'Kompletna biblioteka pomysłów projektowych',
    icon: '🎨',
    estimatedTime: '60+ min',
    sections: [],
  },
];

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Projekt 1: Pierwsze wideo - przedstawienie',
    category: 'Dla początkujących',
    difficulty: 1,
    description: 'Twoje pierwsze krótkie wideo przedstawienie',
    icon: '👋',
  },
  {
    id: 'project-2',
    title: 'Projekt 2: Dzień z mojego życia - timelapse',
    category: 'Dla początkujących',
    difficulty: 1,
    description: 'Przyspieszone wideo pokazujące Twój dzień',
    icon: '⏰',
  },
  // ... więcej projektów
];
