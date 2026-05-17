import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/content/site'

// Base metadata factory — all pages extend this
export function buildMetadata(overrides: Partial<Metadata> & {
  title?: string
  description?: string
  path?: string
  noIndex?: boolean
}): Metadata {
  const title = overrides.title
    ? `${overrides.title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`
  const description = overrides.description ?? SITE_CONFIG.description
  const url = overrides.path ? `${SITE_CONFIG.url}${overrides.path}` : SITE_CONFIG.url

  return {
    title,
    description,
    keywords: overrides.keywords ?? [
      '宝秀兰医疗', '鲍秀兰', '儿童早期发展', '高危儿干预', '早产儿', '脑瘫康复',
      '自闭症干预', '发育迟缓', '感觉统合', '儿童发育评估', '北京儿科', '早期干预',
    ],
    authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
    creator: SITE_CONFIG.name,
    publisher: SITE_CONFIG.name,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: { canonical: url },
    robots: overrides.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: 'zh_CN',
      type: 'website',
      images: [{ url: SITE_CONFIG.ogImage, width: 1200, height: 630, alt: title }],
    },
    other: {
      // Baidu site verification (replace in production)
      'baidu-site-verification': SITE_CONFIG.baiduVerification,
    },
    ...overrides,
  }
}

// JSON-LD structured data builders
export function orgJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    name: SITE_CONFIG.name,
    alternateName: ['宝秀兰', 'Baoxiulan Medical', '儿童早期发展优化中心'],
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    foundingDate: SITE_CONFIG.established,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address,
      addressLocality: '北京市',
      addressCountry: 'CN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.coordinates.lat,
      longitude: SITE_CONFIG.coordinates.lng,
    },
    openingHours: 'Mo-Su 09:00-18:00',
    medicalSpecialty: [
      'Pediatrics', 'Neonatology', 'Neurology', 'PhysicalTherapy', 'SpeechTherapy',
    ],
    founder: {
      '@type': 'Physician',
      name: '鲍秀兰',
      honorificSuffix: '教授',
      affiliation: { '@type': 'Hospital', name: '北京协和医院' },
    },
    sameAs: [SITE_CONFIG.social.weibo],
  }
}

export function physicianJsonLd(expert: {
  name: string
  nameEn?: string | null
  title: string
  org?: string | null
  bio: string
  specialties: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: expert.name,
    alternateName: expert.nameEn,
    description: expert.bio,
    honorificSuffix: expert.title,
    affiliation: expert.org
      ? { '@type': 'Hospital', name: expert.org }
      : { '@type': 'MedicalOrganization', name: SITE_CONFIG.name },
    medicalSpecialty: expert.specialties,
    worksFor: { '@type': 'MedicalOrganization', name: SITE_CONFIG.name },
  }
}

export function articleJsonLd(article: {
  title: string
  excerpt: string
  author: string
  publishedAt: Date
  updatedAt: Date
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Organization',
      name: article.author,
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: { '@type': 'ImageObject', url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}` },
    },
    datePublished: article.publishedAt.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    mainEntityOfPage: `${SITE_CONFIG.url}/articles/${article.slug}`,
  }
}
