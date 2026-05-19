import Link from 'next/link'
import { prisma } from '@/lib/db'
import { buildMetadata } from '@/lib/seo'
import './articles.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = buildMetadata({
  title: '育儿课堂',
  description:
    '宝秀兰医疗团队的育儿科普、早期干预指南与专家视点，三十余年临床经验沉淀。',
  path: '/articles',
})

const PAGE_SIZE = 12

function formatDate(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

interface PageProps {
  searchParams: Promise<{ category?: string; page?: string }>
}

export default async function ArticlesListPage({ searchParams }: PageProps) {
  const params = await searchParams
  const activeCat = params.category?.trim() || ''
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1)

  // Collect all categories of published articles (for the filter bar)
  const allRows = await prisma.article.findMany({
    where: { published: true },
    select: { category: true },
    distinct: ['category'],
    orderBy: { category: 'asc' },
  })
  const categories = Array.from(new Set(allRows.map((r) => r.category).filter(Boolean)))

  const where = {
    published: true,
    ...(activeCat ? { category: activeCat } : {}),
  }

  const [total, articles] = await Promise.all([
    prisma.article.count({ where }),
    prisma.article.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
  ])

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const qsBase = (p: number) => {
    const sp = new URLSearchParams()
    if (activeCat) sp.set('category', activeCat)
    if (p > 1) sp.set('page', String(p))
    const qs = sp.toString()
    return qs ? `/articles?${qs}` : '/articles'
  }

  return (
    <main className="art-page">
      <section className="art-hero">
        <div aria-hidden className="art-hero-bg" />
        <div className="art-container">
          <div className="art-hero-inner">
            <div className="art-crest">
              <span className="art-crest-mark" aria-hidden />
              <span>育　儿　课　堂</span>
            </div>
            <div className="art-rule" aria-hidden>
              <span className="art-rule-line" />
              <span className="art-rule-diamond" />
              <span className="art-rule-line" />
            </div>
            <h1 className="art-hero-title">来自临床一线的育儿科普与专家视点</h1>
            <p className="art-hero-lede">
              鲍秀兰医疗团队定期分享高危儿早期干预、儿童发育评估、家庭育儿等专业内容，由临床医师、康复治疗师与教育专家共同撰写。
            </p>
          </div>
        </div>
      </section>

      <section className="art-list-section">
        <div className="art-container">
          {/* Category filter */}
          {categories.length > 0 && (
            <nav className="art-cat-bar" aria-label="分类筛选">
              <Link
                href="/articles"
                className={`art-cat-chip ${!activeCat ? 'is-active' : ''}`}
              >
                全部
              </Link>
              {categories.map((c) => (
                <Link
                  key={c}
                  href={`/articles?category=${encodeURIComponent(c)}`}
                  className={`art-cat-chip ${activeCat === c ? 'is-active' : ''}`}
                >
                  {c}
                </Link>
              ))}
            </nav>
          )}

          {articles.length === 0 ? (
            <div className="art-empty">
              {activeCat ? `「${activeCat}」分类下暂无文章` : '暂无已发布的文章'}
            </div>
          ) : (
            <>
              <ul className="art-grid">
                {articles.map((a) => (
                  <li key={a.id} style={{ listStyle: 'none' }}>
                    <Link href={`/articles/${a.slug}`} className="art-card">
                      <div className="art-card-cover">
                        {a.coverImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={a.coverImage} alt={a.title} loading="lazy" />
                        ) : (
                          <div className="art-card-cover-fallback">宝</div>
                        )}
                      </div>
                      <div className="art-card-body">
                        <span className="art-card-cat">{a.category}</span>
                        <h3 className="art-card-title">{a.title}</h3>
                        <p className="art-card-excerpt">{a.excerpt}</p>
                        <div className="art-card-foot">
                          <span>{a.author}</span>
                          <span>{formatDate(new Date(a.publishedAt))}</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              {totalPages > 1 && (
                <nav className="art-pager" aria-label="分页">
                  {page > 1 ? (
                    <Link href={qsBase(page - 1)}>上一页</Link>
                  ) : (
                    <span className="is-disabled">上一页</span>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) =>
                    p === page ? (
                      <span key={p} className="is-current">{p}</span>
                    ) : (
                      <Link key={p} href={qsBase(p)}>{p}</Link>
                    )
                  )}
                  {page < totalPages ? (
                    <Link href={qsBase(page + 1)}>下一页</Link>
                  ) : (
                    <span className="is-disabled">下一页</span>
                  )}
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}
