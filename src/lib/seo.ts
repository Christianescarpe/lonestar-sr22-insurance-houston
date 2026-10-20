export const SITE_URL = 'https://www.sr22insurancehoustontx.site';

export function getCanonicalUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath === '/' || cleanPath === '') {
    return SITE_URL;
  }
  return `${SITE_URL}${cleanPath.replace(/\/+$/, '')}`;
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    '@id': `${SITE_URL}/#organization`,
    name: 'LoneStar SR22 Insurance Houston',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/logo.png`,
    description: 'Fast, cheap SR22 insurance and electronic certificate filing to PennDOT. Instant telephone quotes and driver license reinstatement.',
    telephone: '+1-267-310-0435',
    priceRange: '$$',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Pennsylvania'
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Philadelphia',
      addressRegion: 'PA',
      addressCountry: 'US'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-267-310-0435',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: ['English']
    }
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : getCanonicalUrl(item.url)
    }))
  };
}

export function getArticleSchema({
  title,
  description,
  url,
  image,
  datePublished = '2026-01-15T08:00:00+00:00'
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
}) {
  const imageUrl = image
    ? image.startsWith('http')
      ? image
      : `${SITE_URL}${image}`
    : `${SITE_URL}/images/insurance-agent-reviewing-car-coverage-with-custom-2026-01-08-07-32-47-utc.webp`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.startsWith('http') ? url : getCanonicalUrl(url)
    },
    headline: title,
    description,
    image: [imageUrl],
    datePublished,
    dateModified: datePublished,
    author: {
      '@type': 'Organization',
      name: 'LoneStar SR22 Insurance Houston',
      url: SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: 'LoneStar SR22 Insurance Houston',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`
      }
    }
  };
}

export function getFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}
