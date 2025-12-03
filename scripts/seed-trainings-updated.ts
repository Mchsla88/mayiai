import { PrismaClient, TrainingLevel } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding trainings...')

  // 1. Młody Influencer - istniejący kurs
  const mlodyInfluencer = await prisma.training.upsert({
    where: { slug: 'mlody-influencer' },
    update: {},
    create: {
      title: 'Młody Influencer',
      slug: 'mlody-influencer',
      shortDescription: 'Tworzenie contentu i budowanie marki osobistej z AI',
      fullDescription: 'Kompleksowe szkolenie dla młodych twórców internetowych, którzy chcą nauczyć się tworzyć profesjonalny content z wykorzystaniem narzędzi AI.',
      price: 299.00,
      duration: '6 tygodni',
      level: TrainingLevel.INTERMEDIATE,
      imageUrl: null,
      isActive: true,
      orderIndex: 1
    }
  })

  console.log('✅ Szkolenie "Młody Influencer" dodane:', mlodyInfluencer.id)

  // 2. Bezpieczeństwo w sieci i AI - nowe szkolenie
  const bezpieczenstwoAI = await prisma.training.upsert({
    where: { slug: 'bezpieczenstwo-w-sieci-i-ai' },
    update: {},
    create: {
      title: 'Bezpieczeństwo w sieci i w świecie AI',
      slug: 'bezpieczenstwo-w-sieci-i-ai',
      shortDescription: 'Kompleksowy przewodnik po bezpieczeństwie online dla dzieci i rodziców',
      fullDescription: `Szkolenie online dla dzieci 9-16 lat i ich rodziców. Nauczysz się:
- Rozpoznawać zagrożenia w sieci (nieznajomi, oszustwa, cyberprzemoc)
- Bezpiecznie korzystać z internetu i AI
- Chronić swoje dane osobowe i prywatność
- Reagować na sytuacje kryzysowe
- Stworzyć rodzinną umowę cyfrową`,
      price: 199.00,
      duration: '90-120 minut',
      level: TrainingLevel.BEGINNER,
      imageUrl: null,
      isActive: true,
      orderIndex: 2
    }
  })

  console.log('✅ Szkolenie "Bezpieczeństwo w sieci i AI" dodane:', bezpieczenstwoAI.id)

  // 3. Nauczyciele (istniejący)
  const nauczyciele = await prisma.training.upsert({
    where: { slug: 'nauczyciele' },
    update: {},
    create: {
      title: 'Szkolenie dla Nauczycieli',
      slug: 'nauczyciele',
      shortDescription: 'Wykorzystanie AI w edukacji',
      fullDescription: 'Szkolenie dla nauczycieli na temat wykorzystania narzędzi AI w codziennej pracy edukacyjnej.',
      price: 249.00,
      duration: '4 tygodnie',
      level: TrainingLevel.INTERMEDIATE,
      imageUrl: null,
      isActive: true,
      orderIndex: 3
    }
  })

  console.log('✅ Szkolenie "Nauczyciele" dodane:', nauczyciele.id)

  console.log('\n🎉 Wszystkie szkolenia dodane pomyślnie!')
}

main()
  .catch((e) => {
    console.error('❌ Błąd podczas seedowania:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
