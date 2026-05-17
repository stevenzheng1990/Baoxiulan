import Link from 'next/link'
import type { Article } from '@/types'

interface ArticlesProps {
  articles?: Article[]
}

const PLACEHOLDER_ARTICLES: Omit<Article, 'id' | 'content' | 'updatedAt' | 'published'>[] = [
  {
    slug: 'early-intervention-golden-window',
    title: '把握脑发育黄金窗口：0–3岁早期干预为何如此关键',
    excerpt:
      '大脑在出生后的最初三年具有最强的可塑性。神经科学研究表明，早期感知觉刺激与运动训练可显著改善高危儿的神经发育预后，为后续学习与社交奠定基础。',
    category: '早期干预',
    author: '鲍秀兰教授',
    publishedAt: new Date('2025-03-15'),
    coverImage: null,
    metaTitle: null,
    metaDesc: null,
  },
  {
    slug: 'nbna-neonatal-assessment',
    title: 'NBNA 新生儿行为神经评估法：一次检查，预判一生',
    excerpt:
      'NBNA（新生儿 20 项行为神经测查）由鲍秀兰教授参照 Brazelton 方法本土化创立，是早期识别高危新生儿神经损伤的核心工具。',
    category: '临床研究',
    author: '鲍秀兰教授',
    publishedAt: new Date('2025-01-20'),
    coverImage: null,
    metaTitle: null,
    metaDesc: null,
  },
  {
    slug: 'cerebral-palsy-ultra-early-diagnosis',
    title: '脑瘫超早期诊断：91.4% 准确率背后的30年',
    excerpt:
      '通过联合全国21家医院协作研究，宝秀兰团队将脑瘫超早期诊断准确率提升至91.4%，让更多孩子在最关键的窗口期获得及时干预。',
    category: '科研进展',
    author: '专家团队',
    publishedAt: new Date('2024-11-08'),
    coverImage: null,
    metaTitle: null,
    metaDesc: null,
  },
]

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }).format(
    new Date(date)
  )
}

export default function Articles({ articles }: ArticlesProps) {
  const items = articles && articles.length > 0 ? articles.slice(0, 3) : PLACEHOLDER_ARTICLES

  const [featured, ...rest] = items

  return (
    <section
      style={{
        background: 'var(--white)',
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.25rem, 5vw, 4rem)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        {/* Header row */}
        <div
          className="r"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '2rem',
            flexWrap: 'wrap',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          <div>
            <div className="section-tag">专业文章 · Articles</div>
            <h2 className="section-heading">专业知识，触手可及</h2>
          </div>
          <Link
            href="/articles"
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.875rem',
              color: 'var(--blue)',
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              flexShrink: 0,
              paddingBottom: '0.25rem',
              borderBottom: '1px solid var(--blue)',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.7' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
          >
            全部文章 →
          </Link>
        </div>

        {/* 3-col grid */}
        <div
          className="rsg articles-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr 1fr',
            gap: '1.5rem',
            alignItems: 'stretch',
          }}
        >
          {/* Featured card */}
          <ArticleCard article={featured} featured />

          {/* Regular cards */}
          {rest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .articles-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .articles-grid > *:first-child {
            grid-column: span 2 !important;
          }
        }
        @media (max-width: 600px) {
          .articles-grid {
            grid-template-columns: 1fr !important;
          }
          .articles-grid > *:first-child {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  )
}

function ArticleCard({
  article,
  featured = false,
}: {
  article: (typeof PLACEHOLDER_ARTICLES)[number]
  featured?: boolean
}) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 'clamp(1.5rem, 3vw, 2rem)',
        border: '1px solid var(--border)',
        background: featured ? 'var(--blue)' : 'var(--white)',
        textDecoration: 'none',
        transition: 'border-color 0.25s, transform 0.25s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = featured ? 'var(--blue)' : 'var(--blue)'
        el.style.transform = 'translateY(-3px)'
        if (!featured) el.style.boxShadow = '0 8px 32px rgba(0,3,163,0.08)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--border)'
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = 'none'
      }}
    >
      {/* Category tag */}
      <div
        style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: featured ? 'rgba(255,255,255,0.5)' : 'var(--blue)',
          marginBottom: '0.9rem',
        }}
      >
        {article.category}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--serif-cn)',
          fontSize: featured ? 'clamp(1.2rem, 2vw, 1.6rem)' : 'clamp(1rem, 1.5vw, 1.2rem)',
          fontWeight: 400,
          lineHeight: 1.4,
          color: featured ? '#ffffff' : 'var(--ink)',
          marginBottom: '0.85rem',
          letterSpacing: '-0.01em',
          flexGrow: 0,
        }}
      >
        {article.title}
      </h3>

      {/* Excerpt */}
      <p
        style={{
          fontFamily: 'var(--sans)',
          fontSize: featured ? '0.9rem' : '0.82rem',
          lineHeight: 1.8,
          color: featured ? 'rgba(255,255,255,0.65)' : 'var(--muted)',
          flexGrow: 1,
          marginBottom: '1.5rem',
          display: '-webkit-box',
          WebkitLineClamp: featured ? 4 : 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {article.excerpt}
      </p>

      {/* Meta bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '1rem',
          borderTop: featured ? '1px solid rgba(255,255,255,0.12)' : '1px solid var(--border)',
          gap: '0.75rem',
          marginTop: 'auto',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
          <span
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.75rem',
              color: featured ? 'rgba(255,255,255,0.7)' : 'var(--ink)',
              fontWeight: 500,
            }}
          >
            {article.author}
          </span>
          <span
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.7rem',
              color: featured ? 'rgba(255,255,255,0.4)' : 'var(--muted)',
            }}
          >
            {formatDate(article.publishedAt)}
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '0.75rem',
            color: featured ? 'rgba(255,255,255,0.6)' : 'var(--blue)',
            letterSpacing: '0.04em',
            flexShrink: 0,
          }}
        >
          阅读 →
        </span>
      </div>
    </Link>
  )
}
