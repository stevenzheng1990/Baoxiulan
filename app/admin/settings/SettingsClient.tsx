'use client'

import { useEffect, useState, FormEvent } from 'react'
import Link from 'next/link'
import ImageUploader from '@/components/admin/ImageUploader'
import {
  SETTING_LABELS,
  DEFAULT_SETTINGS,
  IMAGE_KEYS,
  TEXTAREA_KEYS,
  type SettingKey,
  type SiteSettings,
} from '@/lib/siteSettings'

type TabKey = 'basic' | 'contact' | 'social' | 'brand' | 'seo'

const TABS: { key: TabKey; label: string; keys: SettingKey[] }[] = [
  { key: 'basic',   label: '基础信息', keys: ['name', 'tagline', 'description', 'established'] },
  { key: 'contact', label: '联系方式', keys: ['phone', 'email', 'address', 'hours'] },
  { key: 'social',  label: '社交 / 二维码', keys: ['wechatId', 'wechatQr', 'weiboUrl', 'weiboQr'] },
  { key: 'brand',   label: '品牌资源', keys: ['logo', 'ogImage'] },
  { key: 'seo',     label: 'SEO', keys: ['baiduAnalyticsId', 'baiduVerification'] },
]

const HINTS: Partial<Record<SettingKey, string>> = {
  description: '出现在首页 footer、Hero 简介、SEO 描述等位置。建议 80–120 字。',
  tagline: '副标题，例如「儿童早期发展优化中心」。',
  established: '创立年份，例如「1991」。',
  hours: '例如「周一至周日 09:00–18:00」。',
  wechatId: '微信公众号原始 ID 或微信号。',
  weiboUrl: '官方微博主页完整 URL。',
  wechatQr: '微信公众号二维码图片（建议正方形）。',
  weiboQr: '官方微博二维码图片（建议正方形）。',
  logo: '导航栏和分享卡片的站点 Logo。',
  ogImage: '社交平台分享卡片图。建议 1200×630。',
  baiduAnalyticsId: '百度统计 ID（hm.js 后面那串）。留空则不加载统计。',
  baiduVerification: '百度站长平台的 site-verification 值。',
}

const PLACEHOLDERS: Partial<Record<SettingKey, string>> = {
  baiduAnalyticsId: '例如：abc123def456...（留空则不启用）',
  baiduVerification: '例如：codeva-xxxxxx（留空则不输出 meta）',
}

export default function SettingsClient() {
  const [active, setActive] = useState<TabKey>('basic')
  const [form, setForm] = useState<SiteSettings>({ ...DEFAULT_SETTINGS })
  const [loaded, setLoaded] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Partial<SiteSettings>) => {
        setForm({ ...DEFAULT_SETTINGS, ...data })
      })
      .catch(() => {
        /* keep defaults */
      })
      .finally(() => setLoaded(true))
  }, [])

  function setField(key: SettingKey, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setMsg(null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMsg(null)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setMsg({ kind: 'ok', text: '保存成功' })
      } else {
        const data = await res.json().catch(() => ({}))
        setMsg({ kind: 'err', text: data.error || '保存失败' })
      }
    } catch {
      setMsg({ kind: 'err', text: '网络错误' })
    } finally {
      setSaving(false)
    }
  }

  const activeKeys = TABS.find((t) => t.key === active)!.keys

  // ── Styles ───────────────────────────────────────────
  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: '#374151',
    marginBottom: 6,
  }
  const hintStyle: React.CSSProperties = {
    fontSize: 12,
    color: '#9CA0B5',
    marginTop: 6,
    lineHeight: 1.55,
  }
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    border: '1.5px solid rgba(0,3,163,0.15)',
    borderRadius: 8,
    fontSize: 14,
    color: '#08090F',
    outline: 'none',
    background: '#fff',
    boxSizing: 'border-box',
    fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif",
  }
  const cardStyle: React.CSSProperties = {
    background: '#fff',
    borderRadius: 12,
    padding: 24,
    boxShadow: '0 1px 4px rgba(0,3,163,0.07)',
  }

  return (
    <div
      style={{
        padding: '32px 36px',
        background: '#F7F8FC',
        minHeight: '100vh',
        fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif",
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
        <Link
          href="/admin"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#676B88', fontSize: 14, textDecoration: 'none' }}
        >
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回
        </Link>
        <span style={{ color: '#CBD5E0' }}>/</span>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#08090F' }}>站点设置</h1>
      </div>

      {!loaded ? (
        <div style={{ ...cardStyle, textAlign: 'center', color: '#676B88' }}>读取设置中…</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 24, alignItems: 'start' }}>
            {/* ── Tab list ── */}
            <nav
              style={{
                ...cardStyle,
                padding: 8,
                position: 'sticky',
                top: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
              aria-label="设置分类"
            >
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActive(t.key)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 14px',
                    background: active === t.key ? 'rgba(0,3,163,0.08)' : 'transparent',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    fontFamily: 'inherit',
                    color: active === t.key ? '#0003A3' : '#374151',
                    fontWeight: active === t.key ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </nav>

            {/* ── Tab panel ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={cardStyle}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: '#08090F', marginBottom: 4 }}>
                  {TABS.find((t) => t.key === active)!.label}
                </h2>
                <p style={{ fontSize: 13, color: '#676B88', marginBottom: 24 }}>
                  保存后立刻生效，前端页面下一次访问即可看到。
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {activeKeys.map((key) => {
                    const isImage = (IMAGE_KEYS as SettingKey[]).includes(key)
                    const isText = (TEXTAREA_KEYS as SettingKey[]).includes(key)
                    const label = SETTING_LABELS[key]
                    const hint = HINTS[key]
                    const placeholder = PLACEHOLDERS[key] || ''
                    const value = form[key] ?? ''

                    if (isImage) {
                      return (
                        <div key={key}>
                          <label style={labelStyle}>{label}</label>
                          <ImageUploader
                            value={value}
                            onChange={(url) => setField(key, url)}
                            aspect={key === 'ogImage' ? '1200 / 630' : '1 / 1'}
                            hint={hint}
                          />
                          {hint && <div style={hintStyle}>{hint}</div>}
                        </div>
                      )
                    }
                    if (isText) {
                      return (
                        <div key={key}>
                          <label style={labelStyle}>{label}</label>
                          <textarea
                            rows={key === 'description' ? 4 : 2}
                            value={value}
                            onChange={(e) => setField(key, e.target.value)}
                            placeholder={placeholder}
                            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.7 }}
                          />
                          {hint && <div style={hintStyle}>{hint}</div>}
                        </div>
                      )
                    }
                    return (
                      <div key={key}>
                        <label style={labelStyle}>{label}</label>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => setField(key, e.target.value)}
                          placeholder={placeholder}
                          style={inputStyle}
                        />
                        {hint && <div style={hintStyle}>{hint}</div>}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* ── Action bar (sticky-feel) ── */}
              <div
                style={{
                  ...cardStyle,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                }}
              >
                <div style={{ fontSize: 13, color: msg?.kind === 'err' ? '#B91C1C' : '#10B981', minHeight: 18 }}>
                  {msg?.text}
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    padding: '10px 22px',
                    background: saving ? '#676B88' : '#0003A3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: saving ? 'not-allowed' : 'pointer',
                    letterSpacing: '0.04em',
                  }}
                >
                  {saving ? '保存中…' : '保存全部'}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
