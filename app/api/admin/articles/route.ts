import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  return session?.value === 'authenticated'
}

function generateSlug(title: string): string {
  // Convert Chinese + English title to a URL-friendly slug
  const timestamp = Date.now()
  const ascii = title
    .toLowerCase()
    .replace(/[\s一-鿿㐀-䶿]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return ascii ? `${ascii}-${timestamp}` : `article-${timestamp}`
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: 'desc' },
  })

  return NextResponse.json(articles)
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { title, excerpt, content, category, author, published, metaTitle, metaDesc, coverImage } = body

    if (!title || !excerpt || !content) {
      return NextResponse.json({ error: '标题、摘要和正文为必填项' }, { status: 400 })
    }

    const slug = generateSlug(title)

    const article = await prisma.article.create({
      data: {
        slug,
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        category: category?.trim() || '育儿课堂',
        author: author?.trim() || '宝秀兰医疗团队',
        published: published === true,
        coverImage: coverImage?.trim() || null,
        metaTitle: metaTitle?.trim() || null,
        metaDesc: metaDesc?.trim() || null,
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (err) {
    console.error('POST /api/admin/articles error:', err)
    return NextResponse.json({ error: '创建文章失败' }, { status: 500 })
  }
}
