'use client'

import { useState, useEffect, FormEvent } from 'react'

interface SettingsForm {
  phone: string
  address: string
  email: string
  hours: string
  baiduAnalyticsId: string
  baiduVerification: string
}

export default function SettingsClient() {
  const [form, setForm] = useState<SettingsForm>({
    phone: '',
    address: '',
    email: '',
    hours: '',
    baiduAnalyticsId: '',
    baiduVerification: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        setForm(prev => ({ ...prev, ...data }))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setSuccess(false)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setSuccess(true)
      } else {
        const data = await res.json()
        setError(data.error || '保存失败')
      }
    } catch {
      setError('网络错误，请重试')
    } finally {
      setSaving(false)
    }
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

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: '#374151',
    marginBottom: 6,
  }

  if (loading) {
    return (
      <div style={{ padding: '80px 36px', textAlign: 'center', color: '#676B88', fontFamily: "'Noto Sans SC', sans-serif" }}>
        加载中...
      </div>
    )
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
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#08090F', marginBottom: 4 }}>
          网站设置
        </h1>
        <p style={{ color: '#676B88', fontSize: 14 }}>
          管理网站联系方式与统计代码
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
          {/* Main settings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Contact info */}
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '24px',
                boxShadow: '0 1px 4px rgba(0,3,163,0.07)',
              }}
            >
              <h2
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#08090F',
                  marginBottom: 20,
                  paddingBottom: 12,
                  borderBottom: '1px solid rgba(0,3,163,0.08)',
                }}
              >
                联系方式
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={labelStyle} htmlFor="phone">
                    客服电话
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="400-0066-650"
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = '#0003A3' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,3,163,0.15)' }}
                  />
                </div>
                <div>
                  <label style={labelStyle} htmlFor="email">
                    邮箱地址
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="marketing@baoxiulan.com"
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = '#0003A3' }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,3,163,0.15)' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle} htmlFor="address">
                  机构地址
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="北京市大兴区景明路 16 号院"
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = '#0003A3' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,3,163,0.15)' }}
                />
              </div>

              <div>
                <label style={labelStyle} htmlFor="hours">
                  营业时间
                </label>
                <input
                  id="hours"
                  name="hours"
                  type="text"
                  value={form.hours}
                  onChange={handleChange}
                  placeholder="周一至周日 09:00–18:00"
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = '#0003A3' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,3,163,0.15)' }}
                />
              </div>
            </div>

            {/* Baidu / Analytics */}
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '24px',
                boxShadow: '0 1px 4px rgba(0,3,163,0.07)',
              }}
            >
              <h2
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#08090F',
                  marginBottom: 20,
                  paddingBottom: 12,
                  borderBottom: '1px solid rgba(0,3,163,0.08)',
                }}
              >
                百度统计 &amp; 站长验证
              </h2>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle} htmlFor="baiduAnalyticsId">
                  百度统计 Analytics ID
                </label>
                <input
                  id="baiduAnalyticsId"
                  name="baiduAnalyticsId"
                  type="text"
                  value={form.baiduAnalyticsId}
                  onChange={handleChange}
                  placeholder="32位十六进制字符串"
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = '#0003A3' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,3,163,0.15)' }}
                />
                <p style={{ marginTop: 5, fontSize: 12, color: '#9CA3AF' }}>
                  在百度统计后台 → 代码获取 中找到该 ID
                </p>
              </div>

              <div>
                <label style={labelStyle} htmlFor="baiduVerification">
                  百度站长验证码
                </label>
                <input
                  id="baiduVerification"
                  name="baiduVerification"
                  type="text"
                  value={form.baiduVerification}
                  onChange={handleChange}
                  placeholder="百度搜索资源平台验证 content 值"
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = '#0003A3' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,3,163,0.15)' }}
                />
                <p style={{ marginTop: 5, fontSize: 12, color: '#9CA3AF' }}>
                  百度搜索资源平台 → 用户中心 → 站点管理 → 验证网站
                </p>
              </div>
            </div>
          </div>

          {/* Save card */}
          <div>
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '20px',
                boxShadow: '0 1px 4px rgba(0,3,163,0.07)',
              }}
            >
              <h2 style={{ fontSize: 15, fontWeight: 600, color: '#08090F', marginBottom: 16 }}>
                保存更改
              </h2>

              {success && (
                <div
                  style={{
                    background: '#D1FAE5',
                    color: '#059669',
                    borderRadius: 8,
                    padding: '10px 14px',
                    fontSize: 13,
                    marginBottom: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  设置已保存
                </div>
              )}

              {error && (
                <div
                  style={{
                    background: '#FEE2E2',
                    color: '#B91C1C',
                    borderRadius: 8,
                    padding: '10px 14px',
                    fontSize: 13,
                    marginBottom: 16,
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                style={{
                  width: '100%',
                  padding: '11px',
                  background: saving ? '#676B88' : '#0003A3',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: saving ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.02em',
                }}
              >
                {saving ? '保存中...' : '保存设置'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
