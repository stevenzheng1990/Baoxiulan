import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/content/site'

export default function robots(): MetadataRoute.Robots {
  const base = SITE_CONFIG.url.replace(/\/$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
