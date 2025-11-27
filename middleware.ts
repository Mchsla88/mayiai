
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''

  // WWW Canonicalization: Przekieruj www na non-www (wszystkie domeny)
  if (hostname.startsWith('www.')) {
    const newHostname = hostname.substring(4) // Usuń 'www.'
    url.protocol = 'https'
    url.host = newHostname
    url.port = '' // Wyczyść port dla https
    return NextResponse.redirect(url, 301) // Permanent redirect
  }

  // Dodaj nagłówki wydajności i świeżości contentu
  const response = NextResponse.next()
  
  // Content freshness
  const lastModified = new Date().toUTCString()
  response.headers.set('Last-Modified', lastModified)
  response.headers.set('X-Content-Last-Modified', lastModified)
  
  // Performance optimizations
  response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Compression hint
  response.headers.set('Accept-Encoding', 'gzip, deflate, br')
  
  return response
}

// Konfiguracja: zastosuj middleware do WSZYSTKICH ścieżek
export const config = {
  matcher: [
    '/(.*)',
  ],
}
