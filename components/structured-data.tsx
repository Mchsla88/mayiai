export function OrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'May I AI Family Expert',
    alternateName: 'May I AI',
    url: 'https://mayiai.pl',
    logo: {
      '@type': 'ImageObject',
      url: 'https://mayiai.pl/logo1.png',
      width: 600,
      height: 600,
    },
    image: 'https://mayiai.pl/logo1.png',
    description: 'Pierwsza polska marka edukacyjna skupiona na sztucznej inteligencji dla rodzin. Bezpieczna nauka AI dla dzieci, ebooki, szkolenia i materiały edukacyjne.',
    foundingDate: '2024',
    slogan: 'Pierwsza marka edukacyjna AI dla dzieci w Polsce',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PL',
      addressLocality: 'Polska',
    },
    sameAs: [
      'https://www.facebook.com/mayiai',
      'https://www.linkedin.com/company/mayiai',
      'https://twitter.com/mayiai',
      'https://www.youtube.com/@mayiai',
      'https://www.instagram.com/mayiai',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Polish', 'English'],
      areaServed: 'PL',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Poland',
    },
    brand: {
      '@type': 'Brand',
      name: 'May I AI Family Expert',
    },
  }

  return (
    <script
      id="organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function EducationalOrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'May I AI Family Expert',
    url: 'https://mayiai.pl',
    logo: 'https://mayiai.pl/logo1.png',
    description: 'Kompleksowa edukacja o sztucznej inteligencji dla dzieci, rodziców i nauczycieli.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PL',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Kursy i Szkolenia AI',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Ebooki o AI dla Dzieci',
            description: 'Kompleksowe przewodniki napisane prostym językiem',
            provider: {
              '@type': 'Organization',
              name: 'May I AI Family Expert',
            },
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Szkolenia z AI',
            description: 'Interaktywne szkolenia dla rodziców, nauczycieli i dzieci',
            provider: {
              '@type': 'Organization',
              name: 'May I AI Family Expert',
            },
          },
        },
      ],
    },
  }

  return (
    <script
      id="educational-organization-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function WebsiteStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'May I AI Family Expert',
    url: 'https://mayiai.pl',
    description: 'Pierwsza polska marka edukacyjna skupiona na sztucznej inteligencji dla rodzin',
    inLanguage: 'pl-PL',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://mayiai.pl/blog?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
