
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from '@/components/session-provider'
import { 
  OrganizationStructuredData, 
  EducationalOrganizationStructuredData, 
  WebsiteStructuredData 
} from '@/components/structured-data'

const inter = Inter({ subsets: ['latin'] })

const siteName = 'May I AI Family Expert'
const siteUrl = 'https://mayiai.pl'
const siteDescription = 'Pierwsza polska marka edukacyjna skupiona na sztucznej inteligencji dla rodzin. Bezpieczna nauka AI dla dzieci, ebooki, szkolenia i materiały edukacyjne.'
const siteKeywords = 'AI dla dzieci, sztuczna inteligencja dla rodzin, edukacja AI, ebooki AI, szkolenia AI, bezpieczna nauka AI, kursy AI dla dzieci, nauka AI online, programowanie AI dla dzieci, warsztaty AI, chatbot dla dzieci, bezpieczeństwo AI'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'May I AI Family Expert | Edukacja AI dla Dzieci i Rodziców w Polsce',
    template: '%s | May I AI Family Expert'
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: 'May I AI Family Expert', url: siteUrl }],
  creator: 'May I AI Family Expert',
  publisher: 'May I AI Family Expert',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: siteUrl,
    siteName: siteName,
    title: 'May I AI Family Expert | Edukacja AI dla Dzieci i Rodziców',
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/logo1.png`,
        width: 1200,
        height: 630,
        alt: 'May I AI Family Expert - Logo',
      },
    ],
  },
  other: {
    'og:updated_time': new Date().toISOString(), // Dodane dla świeżości contentu
  },
  twitter: {
    card: 'summary_large_image',
    title: 'May I AI Family Expert | Edukacja AI dla Dzieci',
    description: siteDescription,
    images: [`${siteUrl}/logo1.png`],
    creator: '@mayiai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
      },
    ],
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: 'verification_token', // Użytkownik powinien dodać swój token
    // yandex: 'verification_token',
    // other: { me: ['email', 'link'] },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className={inter.className}>
        <OrganizationStructuredData />
        <EducationalOrganizationStructuredData />
        <WebsiteStructuredData />
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-center" />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
