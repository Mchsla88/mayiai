
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from '@/components/session-provider'
import { 
  OrganizationStructuredData, 
  EducationalOrganizationStructuredData, 
  WebsiteStructuredData,
  SoftwareApplicationStructuredData
} from '@/components/structured-data'
import { CartProvider } from '@/context/cart-context'

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  display: 'swap', // Prevents FOIT/FOUT and improves CLS
  variable: '--font-inter',
})

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
  applicationName: 'May I AI Platform',
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
    'og:updated_time': new Date().toISOString(),
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
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
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
    canonical: './',
    languages: {
      'pl-PL': 'https://mayiai.pl',
    },
  },
  verification: {
    google: 'google-site-verification-code',
    other: {
      'bing-site-verification': 'bing-verification-code',
    },
  },
}

import Script from 'next/script'

// ... existing imports

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-PW3756XX"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PW3756XX');
          `}
        </Script>
        {/* Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F0SQBY4B8X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-F0SQBY4B8X');
          `}
        </Script>
        <OrganizationStructuredData />
        <EducationalOrganizationStructuredData />
        <WebsiteStructuredData />
        <SoftwareApplicationStructuredData />
        <SessionProvider>
          <CartProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              {children}
              <Toaster position="top-center" />
            </ThemeProvider>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
