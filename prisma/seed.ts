
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'michal@mayiai.pl'
  const password = await bcrypt.hash('admin123', 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password,
      isAdmin: true,
    },
    create: {
      email,
      password,
      isAdmin: true,
      role: 'ADMIN',
      firstName: 'Michał',
      lastName: 'Admin',
    },
  })

  console.log({ user })
    await prisma.training.upsert({
      where: { slug: 'nauczyciele' },
      update: {
        title: 'Poradnik AI dla Nauczycieli: Wykorzystanie AI w Edukacji',
        shortDescription: 'Opanuj narzędzia AI, zaoszczędź 5h tygodniowo i wprowadź nowoczesną edukację do swojej szkoły. Certyfikowany poradnik dla nauczycieli.',
        fullDescription: `Czy czujesz, że technologia zmienia się szybciej niż program nauczania?
Sztuczna inteligencja to nie kolejna "nowinka", która przeminie. To narzędzie, które już teraz redefiniuje edukację.

W tym szkoleniu nie będziemy zarzucać Cię technicznym żargonem. Skupimy się na praktyce. Pokażemy Ci, jak AI może stać się Twoim osobistym asystentem, który:
- Przygotuje za Ciebie scenariusze lekcji i sprawdziany
- Pomoże w ocenianiu prac i tworzeniu raportów
- Stworzy angażujące materiały wizualne i prezentacje
- Pozwoli Ci odzyskać czas dla siebie i dla uczniów

Dołącz do tysięcy nauczycieli, którzy już korzystają z AI i uczą (się) mądrzej, a nie ciężej.`,
        price: 100,
        level: 'BEGINNER',
        duration: '4h 30m',
        imageUrl: '/training-nauczyciele.jpg',
        isActive: true,
        orderIndex: 1
      },
      create: {
        slug: 'nauczyciele',
        title: 'Poradnik AI dla Nauczycieli: Wykorzystanie AI w Edukacji',
        shortDescription: 'Opanuj narzędzia AI, zaoszczędź 5h tygodniowo i wprowadź nowoczesną edukację do swojej szkoły.',
        fullDescription: 'Pełny opis szkolenia dla nauczycieli...',
        price: 100,
        level: 'BEGINNER',
        duration: '4h 30m',
        imageUrl: '/training-nauczyciele.jpg',
        isActive: true,
        orderIndex: 1
      }
    })

    // 2. Dzieci (Nauka z AI)
    await prisma.training.upsert({
      where: { slug: 'dzieci' },
      update: {
        title: 'Nauka z AI: Twój Osobisty Korepetytor',
        shortDescription: 'Naucz swoje dziecko, jak wykorzystać AI do efektywnej nauki, a nie do ściągania. Bezpieczne i kreatywne metody.',
        fullDescription: `Twoje dziecko i tak będzie korzystać z AI. Pytanie brzmi: czy będzie to robić mądrze?

To szkolenie to przewodnik dla rodziców i dzieci, który zmienia AI z "maszynki do odrabiania lekcji" w potężnego, prywatnego korepetytora.
Nauczymy Was:
- Jak generować quizy i fiszki z dowolnego tematu
- Jak prosić AI o wyjaśnienie trudnych zagadnień "na chłopski rozum"
- Jak tworzyć własne plany nauki
- Jak krytycznie oceniać odpowiedzi AI

Daj swojemu dziecku przewagę w szkole i w życiu, ucząc je kompetencji przyszłości.`,
        price: 100,
        level: 'BEGINNER',
        duration: '2h 15m',
        imageUrl: '/training-dzieci.jpg',
        isActive: true,
        orderIndex: 2
      },
      create: {
        slug: 'dzieci',
        title: 'Nauka z AI: Twój Osobisty Korepetytor',
        shortDescription: 'Naucz swoje dziecko, jak wykorzystać AI do efektywnej nauki.',
        fullDescription: 'Pełny opis szkolenia dla dzieci...',
        price: 100,
        level: 'BEGINNER',
        duration: '2h 15m',
        imageUrl: '/training-dzieci.jpg',
        isActive: true,
        orderIndex: 2
      }
    })

    // 3. Młody Influencer
    await prisma.training.upsert({
      where: { slug: 'mlody-influencer' },
      update: {
        title: 'Młody Influencer: Budowanie Marki Osobistej',
        shortDescription: 'Poradnik dla przyszłych twórców internetowych. Od pomysłu, przez montaż, aż po bezpieczne zarabianie i etykę w sieci.',
        fullDescription: `Bycie influencerem to dzisiaj wymarzony zawód wielu młodych ludzi. Ale to nie tylko wrzucanie zdjęć. To ciężka praca, strategia i odpowiedzialność.

Stworzyliśmy ten kurs, aby pomóc młodym twórcom wystartować mądrze.
W programie:
- Znajdowanie swojej niszy i pasji
- Techniki nagrywania i montażu wideo
- Storytelling i pisanie angażujących scenariuszy
- Radzenie sobie z hejtem i krytyką
- Bezpieczeństwo danych i prywatność
- Współpraca z markami i zarabianie

To nie jest kurs "jak szybko zdobyć lajki". To kurs "jak zbudować trwałą i wartościową markę osobistą".`,
        price: 100,
        level: 'INTERMEDIATE',
        duration: '6h 00m',
        imageUrl: '/training-influencer.jpg',
        isActive: true,
        orderIndex: 3
      },
      create: {
        slug: 'mlody-influencer',
        title: 'Młody Influencer: Budowanie Marki Osobistej',
        shortDescription: 'Poradnik dla przyszłych twórców internetowych.',
        fullDescription: 'Pełny opis szkolenia Młody Influencer...',
        price: 100,
        level: 'INTERMEDIATE',
        duration: '6h 00m',
        imageUrl: '/training-influencer.jpg',
        isActive: true,
        orderIndex: 3
      }
    })

    // 4. Bezpieczeństwo (NOWE)
    await prisma.training.upsert({
      where: { slug: 'bezpieczenstwo-w-sieci-i-ai' },
      update: {
        title: 'Bezpieczeństwo w Sieci i AI',
        shortDescription: 'Chroń swoją rodzinę w sieci. Poznaj zagrożenia (phishing, deepfake, cyberprzemoc) i naucz się im przeciwdziałać.',
        fullDescription: `Internet to wspaniałe miejsce, ale pełne pułapek. W dobie AI zagrożenia stały się jeszcze bardziej wyrafinowane.

To szkolenie to Twoja cyfrowa tarcza.
Dowiesz się:
- Jak rozpoznać fałszywe wiadomości i strony (phishing)
- Czym są deepfake'i i jak nie dać się nabrać
- Jak ustawić bezpieczne hasła i weryfikację dwuetapową
- Jak chronić wizerunek dziecka w sieci (sharenting)
- Co robić w przypadku cyberprzemocy

Zadbaj o cyfrowe bezpieczeństwo swoje i swoich bliskich.`,
        price: 50,
        level: 'BEGINNER',
        duration: '3h 30m',
        imageUrl: '/training-rodzice.jpg',
        isActive: true,
        orderIndex: 4
      },
      create: {
        slug: 'bezpieczenstwo-w-sieci-i-ai',
        title: 'Bezpieczeństwo w Sieci i AI',
        shortDescription: 'Chroń swoją rodzinę w sieci. Poznaj zagrożenia i naucz się im przeciwdziałać.',
        fullDescription: 'Pełny opis szkolenia z bezpieczeństwa...',
        price: 50,
        level: 'BEGINNER',
        duration: '3h 30m',
        imageUrl: '/training-rodzice.jpg',
        isActive: true,
        orderIndex: 4
      }
    })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
