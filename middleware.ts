
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''



  // Auth check for protected pages (training pages have their own local login)
  const protectedPaths = [
    '/dashboard',
    '/admin',
    '/szkolenia/mlody-influencer/dashboard',
    '/szkolenia/bezpieczenstwo-w-sieci-i-ai/dashboard'
  ]
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

  if (isProtectedPath) {
    const token = await getToken({ 
      req: request,
      secret: process.env.NEXTAUTH_SECRET 
    })

    if (!token) {
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Dodaj nagłówki wydajności i świeżości contentu
  const response = NextResponse.next()
  
  // Content freshness
  const lastModified = new Date().toUTCString()
  response.headers.set('Last-Modified', lastModified)
  response.headers.set('X-Content-Last-Modified', lastModified)
  
  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  return response
}

// Konfiguracja: zastosuj middleware do WSZYSTKICH ścieżek
export const config = {
  matcher: [
    '/(.*)',
  ],
}
