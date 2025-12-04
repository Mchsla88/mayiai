
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

  const trainings = [
    {
      slug: 'nauczyciele',
      title: 'Szkolenie dla Nauczycieli',
      shortDescription: 'Kompleksowe szkolenie dla nauczycieli, wprowadzające w świat AI w edukacji. Dowiedz się, jak wykorzystać narzędzia AI do tworzenia lekcji, oceniania i personalizacji nauczania.',
      fullDescription: 'Poznaj praktyczne zastosowania sztucznej inteligencji w szkole. Nauczysz się korzystać z ChatGPT, generować materiały dydaktyczne i automatyzować pracę administracyjną.',
      price: 199,
      level: 'BEGINNER'
    },
    {
      slug: 'dzieci',
      title: 'Nauka z AI',
      shortDescription: 'Interaktywny kurs dla dzieci, który poprzez zabawę uczy podstaw sztucznej inteligencji. Bezpieczne i kreatywne wprowadzenie w świat technologii przyszłości.',
      fullDescription: 'Zabawa i nauka w jednym! Twoje dziecko dowie się, czym jest AI, jak działają roboty i jak bezpiecznie korzystać z nowych technologii. Mnóstwo gier i zagadek.',
      price: 99,
      level: 'BEGINNER'
    },
    {
      slug: 'mlody-influencer',
      title: 'Młody Influencer',
      shortDescription: 'Kurs dla nastolatków chcących tworzyć treści w internecie. Naucz się budować markę osobistą, tworzyć angażujące wideo i grafiki z pomocą AI, dbając o bezpieczeństwo.',
      fullDescription: 'Chcesz zostać YouTuberem lub TikTokerem? Ten kurs pokaże Ci, jak tworzyć profesjonalne treści, zdobywać zasięgi i zarabiać na swojej pasji, wykorzystując potęgę AI.',
      price: 149,
      level: 'INTERMEDIATE'
    },
    {
      slug: 'bezpieczenstwo-w-sieci-i-ai',
      title: 'Bezpieczeństwo w Sieci i AI',
      shortDescription: 'Niezbędnik dla każdego rodzica i dziecka. Poznaj zagrożenia w sieci i naucz się chronić swoją prywatność oraz rozpoznawać fake newsy i manipulacje AI.',
      fullDescription: 'Cyberbezpieczeństwo to podstawa. Dowiedz się, jak chronić swoje dane, unikać oszustw i bezpiecznie poruszać się w cyfrowym świecie pełnym sztucznej inteligencji.',
      price: 79,
      level: 'BEGINNER'
    }
  ]

  for (const t of trainings) {
    const training = await prisma.training.upsert({
      where: { slug: t.slug },
      update: {
        shortDescription: t.shortDescription,
        fullDescription: t.fullDescription,
        title: t.title,
        price: t.price,
      },
      create: {
        slug: t.slug,
        title: t.title,
        shortDescription: t.shortDescription,
        fullDescription: t.fullDescription,
        price: t.price,
        duration: '4h',
        level: t.level as any,
      }
    })
    console.log(`Upserted training: ${training.slug}`)
  }
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
