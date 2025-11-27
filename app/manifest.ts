
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'May I AI Family Expert - Edukacja AI dla Dzieci',
    short_name: 'May I AI',
    description: 'Pierwsza polska marka edukacyjna skupiona na sztucznej inteligencji dla rodzin. Bezpieczna nauka AI dla dzieci, ebooki, szkolenia i materiały edukacyjne.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
