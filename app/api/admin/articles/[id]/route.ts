import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  return session?.value === 'authenticated'
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const articleId = parseInt(id, 10)

  if (isNaN(articleId)) {
    return NextResponse.json({ error: '无效的文章 ID' }, { status: 400 })
  }

  const article = await prisma.article.findUnique({ where: { id: articleId } })

  if (!article) {
    return NextResponse.json({ error: '文章不存在' }, { status: 404 })
  }

  return NextResponse.json(article)
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const articleId = parseInt(id, 10)

  if (isNaN(articleId)) {
    return NextResponse.json({ error: '无效的文章 ID' }, { status: 400 })
  }

  try {
    const body = await req.json()
    const { title, excerpt, content, category, author, published, metaTitle, metaDesc } = body

    if (!title || !excerpt || !content) {
      return NextResponse.json({ error: '标题、摘要和正文为必填项' }, { status: 400 })
    }

    const article = await prisma.article.update({
      where: { id: articleId },
      data: {
        title: title.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        category: category?.trim() || '育儿课堂',
        author: author?.trim() || '宝秀兰医疗团队',
        published: published === true,
        metaTitle: metaTitle?.trim() || null,
        metaDesc: metaDesc?.trim() || null,
      },
    })

    return NextResponse.json(article)
  } catch (err) {
    console.error('PUT /api/admin/articles/[id] error:', err)
    return NextResponse.json({ error: '更新文章失败' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const articleId = parseInt(id, 10)

  if (isNaN(articleId)) {
    return NextResponse.json({ error: '无效的文章 ID' }, { status: 400 })
  }

  try {
    await prisma.article.delete({ where: { id: articleId } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('DELETE /api/admin/articles/[id] error:', err)
    return NextResponse.json({ error: '删除文章失败' }, { status: 500 })
  }
}
