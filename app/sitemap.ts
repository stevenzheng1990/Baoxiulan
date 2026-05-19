import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/content/site'
import { prisma } from '@/lib/db'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_CONFIG.url.replace(/\/$/, '')

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`,           lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/facilities`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/articles`,   lastModified: new Date(), changeFrequency: 'daily',   priority: 0.8 },
  ]

  let articleRoutes: MetadataRoute.Sitemap = []
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { publishedAt: 'desc' },
    })
    articleRoutes = articles.map((a) => ({
      url: `${base}/articles/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    /* DB unreachable at build time — keep static routes */
  }

  return [...staticRoutes, ...articleRoutes]
}
