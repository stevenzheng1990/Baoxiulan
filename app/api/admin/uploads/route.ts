import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { isAdmin } from '@/lib/adminAuth'

/**
 * Image upload endpoint.
 *
 * - Auth via admin_session cookie
 * - Accepts a single `file` field via multipart/form-data
 * - Allowed types: JPEG / PNG / WebP / GIF  (SVG rejected for XSS safety)
 * - Max size: 5 MB
 * - Stored at /public/uploads/YYYYMM/{uuid}.{ext}
 * - Returns { url, name, size, type }
 *
 * NOTE: local disk storage works for development and self-hosted Node runtime.
 * Vercel's read-only filesystem will lose these files between deploys —
 * swap to Vercel Blob / object storage before production deploy.
 */

const MAX_SIZE = 5 * 1024 * 1024 // 5 MB
const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: '未登录' }, { status: 401 })
  }

  let form: FormData
  try {
    form = await req.formData()
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }

  const file = form.get('file')
  if (!(file instanceof File)) {
    return NextResponse.json({ error: '缺少文件' }, { status: 400 })
  }

  if (file.size === 0) {
    return NextResponse.json({ error: '文件为空' }, { status: 400 })
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: `文件过大（${(file.size / 1024 / 1024).toFixed(1)} MB），最大 5 MB` },
      { status: 413 }
    )
  }

  const ext = MIME_TO_EXT[file.type.toLowerCase()]
  if (!ext) {
    return NextResponse.json(
      { error: `不支持的图片格式：${file.type || '未知'}（仅允许 JPG / PNG / WebP / GIF）` },
      { status: 415 }
    )
  }

  // YYYYMM partitioning to avoid too many files in one dir
  const now = new Date()
  const yyyymm = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`
  const id = randomUUID().replace(/-/g, '').slice(0, 16)
  const filename = `${id}.${ext}`

  const dir = path.join(process.cwd(), 'public', 'uploads', yyyymm)
  await mkdir(dir, { recursive: true })

  const buf = Buffer.from(await file.arrayBuffer())
  await writeFile(path.join(dir, filename), buf)

  const url = `/uploads/${yyyymm}/${filename}`
  return NextResponse.json({
    url,
    name: file.name,
    size: file.size,
    type: file.type,
  })
}
