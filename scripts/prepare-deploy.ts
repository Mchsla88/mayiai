
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma')

function main() {
  console.log('🔄 Switching Prisma provider to PostgreSQL...')
  
  let schema = fs.readFileSync(schemaPath, 'utf-8')
  schema = schema.replace('provider = "sqlite"', 'provider = "postgresql"')
  
  // Restore @db.Text for production if needed, or rely on implicit mapping.
  // For safety and compatibility with the data we might have, we'll keep it simple first.
  // Postgres handles String as text usually.

  fs.writeFileSync(schemaPath, schema)
  console.log('✅ Schema updated.')

  console.log('🔄 Generating Prisma Client...')
  try {
    execSync('npx prisma generate', { stdio: 'inherit' })
    console.log('✅ Prisma Client generated.')
  } catch (e) {
    console.error('❌ Failed to generate client:', e)
    process.exit(1)
  }

  console.log('🚀 Ready for deployment!')
}

main()
