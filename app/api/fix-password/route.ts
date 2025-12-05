import { NextResponse } from 'next/server';
import { Client } from 'pg';
import bcrypt from 'bcryptjs';

// EMERGENCY FIX - Uses direct PG connection to bypass Prisma
export async function GET() {
  console.log('Fix password endpoint called');
  let client;
  try {
    const connectionString = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_PRISMA_URL;
    
    if (!connectionString) {
      throw new Error('No database connection string found');
    }

    client = new Client({
      connectionString: connectionString,
      ssl: { rejectUnauthorized: false } // Required for Neon/AWS
    });

    await client.connect();

    const email = 'michal@mayiai.pl';
    const newPassword = 'Takiehaslo123!';
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // 1. Fix the schema issue (add column if missing) to unblock old code
    try {
      await client.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS "activeSessionId" TEXT;`);
    } catch (e) {
      console.log('Column add failed (might exist):', e);
    }

    // 2. Reset password
    await client.query(
      `UPDATE users SET password = $1, "isAdmin" = true, role = 'ADMIN' WHERE email = $2`,
      [hashedPassword, email]
    );
    
    await client.end();
    
    return NextResponse.json({ 
      success: true, 
      email: email,
      password: 'Takiehaslo123!',
      message: 'Hasło ustawione i baza naprawiona! Teraz zaloguj się na /auth/login'
    });
  } catch (error: any) {
    if (client) await client.end();
    return NextResponse.json({ 
      error: 'Błąd', 
      details: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
