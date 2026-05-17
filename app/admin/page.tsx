import { requireAdmin } from '@/lib/adminAuth'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  await requireAdmin()

  const [totalArticles, publishedArticles, totalExperts, recentArticles] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { published: true } }),
    prisma.expert.count(),
    prisma.article.findMany({
      orderBy: { publishedAt: 'desc' },
      take: 5,
      select: { id: true, title: true, category: true, published: true, publishedAt: true },
    }),
  ])

  const lastUpdated = recentArticles[0]?.publishedAt
    ? new Date(recentArticles[0].publishedAt).toLocaleDateString('zh-CN')
    : '—'

  const statCards = [
    { label: '文章总数', value: totalArticles, color: '#0003A3', bg: '#EEF0FF' },
    { label: '已发布文章', value: publishedArticles, color: '#059669', bg: '#D1FAE5' },
    { label: '专家医生', value: totalExperts, color: '#7C3AED', bg: '#EDE9FE' },
    { label: '最近更新', value: lastUpdated, color: '#D97706', bg: '#FEF3C7' },
  ]

  return (
    <div style={{ padding: '32px 36px', background: '#F7F8FC', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#08090F', marginBottom: 4 }}>
          仪表盘
        </h1>
        <p style={{ color: '#676B88', fontSize: 14 }}>
          欢迎回来，管理员
        </p>
      </div>

      {/* Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
          marginBottom: 32,
        }}
      >
        {statCards.map(card => (
          <div
            key={card.label}
            style={{
              background: '#fff',
              borderRadius: 12,
              padding: '24px',
              boxShadow: '0 1px 4px rgba(0,3,163,0.07)',
              borderTop: `3px solid ${card.color}`,
            }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '6px 12px',
                borderRadius: 6,
                background: card.bg,
                color: card.color,
                fontSize: 12,
                fontWeight: 500,
                marginBottom: 12,
              }}
            >
              {card.label}
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#08090F' }}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
        {/* Recent Articles */}
        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 1px 4px rgba(0,3,163,0.07)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '20px 24px',
              borderBottom: '1px solid rgba(0,3,163,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h2 style={{ fontSize: 16, fontWeight: 600, color: '#08090F' }}>最近文章</h2>
            <Link
              href="/admin/articles"
              style={{ fontSize: 13, color: '#0003A3', textDecoration: 'none' }}
            >
              查看全部
            </Link>
          </div>

          {recentArticles.length === 0 ? (
            <div style={{ padding: '32px 24px', color: '#676B88', fontSize: 14, textAlign: 'center' }}>
              暂无文章，立即创建第一篇
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F7F8FC' }}>
                  {['标题', '分类', '状态', '日期'].map(h => (
                    <th
                      key={h}
                      style={{
                        padding: '10px 16px',
                        textAlign: 'left',
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#676B88',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentArticles.map((article, i) => (
                  <tr
                    key={article.id}
                    style={{
                      borderTop: i === 0 ? 'none' : '1px solid rgba(0,3,163,0.06)',
                    }}
                  >
                    <td style={{ padding: '12px 16px' }}>
                      <Link
                        href={`/admin/articles/${article.id}`}
                        style={{ color: '#0003A3', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}
                      >
                        {article.title}
                      </Link>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: '#676B88' }}>
                      {article.category}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 10px',
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 500,
                          background: article.published ? '#D1FAE5' : '#F3F4F6',
                          color: article.published ? '#059669' : '#6B7280',
                        }}
                      >
                        {article.published ? '已发布' : '草稿'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: '#676B88' }}>
                      {new Date(article.publishedAt).toLocaleDateString('zh-CN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Quick Actions */}
        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 1px 4px rgba(0,3,163,0.07)',
            padding: '24px',
          }}
        >
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#08090F', marginBottom: 20 }}>
            快捷操作
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link
              href="/admin/articles/new"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 16px',
                background: '#0003A3',
                color: '#fff',
                borderRadius: 10,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600,
                transition: 'background 0.15s',
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              写新文章
            </Link>
            <Link
              href="/admin/settings"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 16px',
                background: '#EEF0FF',
                color: '#0003A3',
                borderRadius: 10,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              网站设置
            </Link>
            <Link
              href="/"
              target="_blank"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 16px',
                background: '#F3F4F6',
                color: '#374151',
                borderRadius: 10,
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              查看前台网站
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
