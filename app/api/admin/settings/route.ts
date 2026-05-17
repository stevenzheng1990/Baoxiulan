import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  return session?.value === 'authenticated'
}

const SETTING_KEYS = [
  'phone',
  'address',
  'email',
  'hours',
  'baiduAnalyticsId',
  'baiduVerification',
] as const

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const rows = await prisma.siteSetting.findMany({
    where: { key: { in: [...SETTING_KEYS] } },
  })

  const settings: Record<string, string> = {}
  for (const row of rows) {
    settings[row.key] = row.value
  }

  return NextResponse.json(settings)
}

export async function PUT(req: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()

    const updates = SETTING_KEYS.filter(k => k in body).map(key =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(body[key] ?? '') },
        create: { key, value: String(body[key] ?? '') },
      })
    )

    await Promise.all(updates)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('PUT /api/admin/settings error:', err)
    return NextResponse.json({ error: '保存设置失败' }, { status: 500 })
  }
}
