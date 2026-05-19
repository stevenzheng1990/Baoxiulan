import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAdmin } from '@/lib/adminAuth'
import { SETTING_KEYS, type SettingKey } from '@/lib/siteSettings'

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const rows = await prisma.siteSetting.findMany({
    where: { key: { in: [...SETTING_KEYS] } },
  })

  const settings: Record<string, string> = {}
  for (const row of rows) settings[row.key] = row.value
  return NextResponse.json(settings)
}

export async function PUT(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const updates = SETTING_KEYS.filter((k) => k in body).map((key: SettingKey) =>
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
