import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
})

async function main() {
  console.log('=== SPRAWDZANIE PRZYZNANYCH SZKOLEŃ ===\n')

  // Get admin user (michal@mayiai.pl)
  const user = await prisma.user.findUnique({
    where: { email: 'michal@mayiai.pl' },
    include: {
      userTrainings: {
        include: {
          training: true
        }
      }
    }
  })

  if (!user) {
    console.log('❌ Nie znaleziono użytkownika michal@mayiai.pl')
    return
  }

  console.log(`👤 Użytkownik: ${user.email}`)
  console.log(`ID: ${user.id}\n`)

  console.log('=== PRZYZNANE SZKOLENIA: ===\n')
  
  if (user.userTrainings.length === 0) {
    console.log('⚠️  BRAK przyznanych szkoleń!')
  } else {
    user.userTrainings.forEach((ut, i) => {
      console.log(`${i + 1}. ${ut.training.title}`)
      console.log(`   Slug: ${ut.training.slug}`)
      console.log(`   Aktywne: ${ut.isActive}`)
      console.log(`   Wygasa: ${ut.expiresAt}`)
      console.log(`   Wygasłe?: ${new Date() > ut.expiresAt ? 'TAK ❌' : 'NIE ✅'}`)
      console.log('')
    })
  }

  // Check what available trainings exist
  console.log('\n=== WSZYSTKIE DOSTĘPNE SZKOLENIA: ===\n')
  const allTrainings = await prisma.training.findMany({
    where: { isActive: true }
  })
  
  allTrainings.forEach((t, i) => {
    console.log(`${i + 1}. ${t.title} (${t.slug})`)
  })
}

main()
  .catch((e) => {
    console.error('ERROR:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
