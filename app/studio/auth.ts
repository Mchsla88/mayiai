
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const STUDIO_PASSWORD = process.env.STUDIO_PASSWORD || 'Takiehaslo123!'

export async function checkStudioAccess() {
  const cookieStore = cookies()
  const token = cookieStore.get('studio_token')

  if (token?.value === STUDIO_PASSWORD) {
    return true
  }
  return false
}

export async function loginToStudio(formData: FormData) {
  const password = (formData.get('password') as string || '').trim()
  
  // HARDCODED for certainty during debug
  const EXPECTED = 'Takiehaslo123!'

  console.log(`[Login] Attempt with: ${password.substring(0, 2)}...`)

  if (password === EXPECTED) {
    const cookieStore = cookies()
    cookieStore.set('studio_token', password, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    })
    redirect('/studio')
  }
  return { error: 'Nieprawidłowe hasło' }
}
