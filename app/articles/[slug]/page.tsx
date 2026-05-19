import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import { buildMetadata, articleJsonLd } from '@/lib/seo'
import JsonLd from '@/components/seo/JsonLd'
import '../articles.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface PageProps {
  params: Promise<{ slug: string }>
}

function formatDate(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y} 年 ${m} 月 ${day} 日`
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await prisma.article.findUnique({ where: { slug } })
  if (!article || !article.published) {
    return buildMetadata({ title: '文章未找到', noIndex: true })
  }
  return buildMetadata({
    title: article.metaTitle || article.title,
    description: article.metaDesc || article.excerpt,
    path: `/articles/${slug}`,
    openGraph: article.coverImage
      ? {
          images: [{ url: article.coverImage, width: 1200, height: 630, alt: article.title }],
        }
      : undefined,
  })
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params
  const article = await prisma.article.findUnique({ where: { slug } })

  if (!article || !article.published) notFound()

  // Related: same category, 3 most recent, excluding current
  const related = await prisma.article.findMany({
    where: {
      published: true,
      category: article.category,
      id: { not: article.id },
    },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  })

  return (
    <main className="art-page">
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          excerpt: article.excerpt,
          author: article.author,
          publishedAt: new Date(article.publishedAt),
          updatedAt: new Date(article.updatedAt),
          slug: article.slug,
        })}
      />

      <article className="art-detail">
        <div className="art-container">
          <header className="art-detail-head">
            <span className="art-detail-cat">{article.category}</span>
            <h1 className="art-detail-title">{article.title}</h1>
            <div className="art-detail-meta">
              <span>{article.author}</span>
              <span className="dot" aria-hidden />
              <span>{formatDate(new Date(article.publishedAt))}</span>
            </div>
          </header>

          {article.coverImage && (
            <div className="art-detail-cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.coverImage} alt={article.title} />
            </div>
          )}

          {/* HTML from TipTap editor — trusted admin source */}
          <div
            className="article-prose"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <footer className="art-detail-foot">
            <Link href={`/articles?category=${encodeURIComponent(article.category)}`}>
              ← 更多「{article.category}」文章
            </Link>
            <Link href="/articles">返回育儿课堂</Link>
          </footer>

          {related.length > 0 && (
            <section className="art-related">
              <h2>相 关 阅 读</h2>
              <ul className="art-related-grid">
                {related.map((r) => (
                  <li key={r.id} style={{ listStyle: 'none' }}>
                    <Link href={`/articles/${r.slug}`} className="art-card">
                      <div className="art-card-cover">
                        {r.coverImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={r.coverImage} alt={r.title} loading="lazy" />
                        ) : (
                          <div className="art-card-cover-fallback">宝</div>
                        )}
                      </div>
                      <div className="art-card-body">
                        <span className="art-card-cat">{r.category}</span>
                        <h3 className="art-card-title">{r.title}</h3>
                        <div className="art-card-foot">
                          <span>{r.author}</span>
                          <span>{formatDate(new Date(r.publishedAt))}</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
    </main>
  )
}
