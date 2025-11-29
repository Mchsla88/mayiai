import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://mayiai.pl';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/konto/', '/polityka-prywatnosci'],
      },
      {
        userAgent: 'GPTBot', // Explicitly allow ChatGPT
        allow: '/',
      },
      {
        userAgent: 'Google-Extended', // Explicitly allow Google Gemini
        allow: '/',
      },
      {
        userAgent: 'CCBot', // Common Crawl
        allow: '/',
      },
      {
        userAgent: 'Bytespider', // Block aggressive bots if needed
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
