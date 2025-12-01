import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('=== Czyszczenie niepotrzebnych szkoleń ===\n')

  // 1. Usunięcie "Szkolenie AI dla Rodziców"
  console.log('Usuwam: Szkolenie AI dla Rodziców...')
  const deleted1 = await prisma.training.deleteMany({
    where: { slug: 'szkolenie-ai-dla-rodzicow' }
  })
  console.log(`✓ Usunięto: ${deleted1.count}`)

  // 2. Usunięcie duplikatu "Szkolenie AI dla Nauczycieli" (starszy, z długim slug)
  console.log('\nUsuwam: duplikat Szkolenie AI dla Nauczycieli...')
  const deleted2 = await prisma.training.deleteMany({
    where: { slug: 'szkolenie-ai-dla-nauczycieli' }
  })
  console.log(`✓ Usunięto: ${deleted2.count}`)

  // 3. Sprawdzenie co zostało
  console.log('\n=== Pozostałe szkolenia: ===\n')
  const remaining = await prisma.training.findMany({
    orderBy: { title: 'asc' }
  })

  remaining.forEach((t, i) => {
    console.log(`${i + 1}. ${t.title}`)
    console.log(`   Slug: ${t.slug}`)
    console.log('')
  })

  console.log(`Łącznie pozostało: ${remaining.length} szkoleń`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
