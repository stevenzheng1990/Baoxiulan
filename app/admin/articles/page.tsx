import { requireAdmin } from '@/lib/adminAuth'
import { prisma } from '@/lib/db'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface ArticleRow {
  id: number
  title: string
  category: string
  published: boolean
  publishedAt: Date
  author: string
}

export default async function ArticlesPage() {
  await requireAdmin()

  const articles: ArticleRow[] = await prisma.article.findMany({
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      title: true,
      category: true,
      published: true,
      publishedAt: true,
      author: true,
    },
  })

  return (
    <div style={{ padding: '32px 36px', background: '#F7F8FC', minHeight: '100vh' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 32,
        }}
      >
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#08090F', marginBottom: 4 }}>
            文章管理
          </h1>
          <p style={{ color: '#676B88', fontSize: 14 }}>
            共 {articles.length} 篇文章
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            background: '#0003A3',
            color: '#fff',
            borderRadius: 8,
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          新建文章
        </Link>
      </div>

      {/* Table */}
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 1px 4px rgba(0,3,163,0.07)',
          overflow: 'hidden',
        }}
      >
        {articles.length === 0 ? (
          <div
            style={{
              padding: '64px 24px',
              textAlign: 'center',
              color: '#676B88',
              fontSize: 15,
            }}
          >
            暂无文章。
            <Link href="/admin/articles/new" style={{ color: '#0003A3', marginLeft: 6 }}>
              立即创建第一篇
            </Link>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F7F8FC', borderBottom: '1px solid rgba(0,3,163,0.08)' }}>
                {['标题', '分类', '作者', '状态', '发布日期', '操作'].map(h => (
                  <th
                    key={h}
                    style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#676B88',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {articles.map((article, i) => (
                <tr
                  key={article.id}
                  style={{
                    borderTop: i === 0 ? 'none' : '1px solid rgba(0,3,163,0.06)',
                    transition: 'background 0.1s',
                  }}
                >
                  <td style={{ padding: '14px 16px', maxWidth: 320 }}>
                    <Link
                      href={`/admin/articles/${article.id}`}
                      style={{
                        color: '#08090F',
                        fontWeight: 500,
                        fontSize: 14,
                        textDecoration: 'none',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {article.title}
                    </Link>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 10px',
                        borderRadius: 20,
                        fontSize: 12,
                        background: '#EEF0FF',
                        color: '#0003A3',
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {article.category}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#676B88', whiteSpace: 'nowrap' }}>
                    {article.author}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 10px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 500,
                        background: article.published ? '#D1FAE5' : '#F3F4F6',
                        color: article.published ? '#059669' : '#6B7280',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {article.published ? '已发布' : '草稿'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#676B88', whiteSpace: 'nowrap' }}>
                    {new Date(article.publishedAt).toLocaleDateString('zh-CN')}
                  </td>
                  <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                    <Link
                      href={`/admin/articles/${article.id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '5px 12px',
                        borderRadius: 6,
                        background: '#EEF0FF',
                        color: '#0003A3',
                        fontSize: 13,
                        fontWeight: 500,
                        textDecoration: 'none',
                        marginRight: 8,
                      }}
                    >
                      编辑
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
