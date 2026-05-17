'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setError('用户名或密码错误')
      }
    } catch {
      setError('网络错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F7F8FC',
        fontFamily: "'Noto Sans SC', 'Microsoft YaHei', sans-serif",
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 4px 32px rgba(0,3,163,0.10)',
          padding: '48px 40px',
          width: '100%',
          maxWidth: 400,
        }}
      >
        {/* Logo / Brand */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 12,
              background: '#0003A3',
              marginBottom: 16,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 4C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10S19.523 4 14 4zm1 14.5h-2v-6h2v6zm0-8h-2V8.5h2V10.5z" fill="#fff" />
            </svg>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#08090F', marginBottom: 4 }}>
            宝秀兰医疗
          </h1>
          <p style={{ fontSize: 14, color: '#676B88' }}>后台管理系统</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label
              htmlFor="username"
              style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#08090F', marginBottom: 8 }}
            >
              用户名
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoComplete="username"
              placeholder="请输入用户名"
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1.5px solid rgba(0,3,163,0.15)',
                borderRadius: 8,
                fontSize: 15,
                color: '#08090F',
                outline: 'none',
                transition: 'border-color 0.2s',
                background: '#fff',
                boxSizing: 'border-box',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#0003A3' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,3,163,0.15)' }}
            />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label
              htmlFor="password"
              style={{ display: 'block', fontSize: 14, fontWeight: 500, color: '#08090F', marginBottom: 8 }}
            >
              密码
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="请输入密码"
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1.5px solid rgba(0,3,163,0.15)',
                borderRadius: 8,
                fontSize: 15,
                color: '#08090F',
                outline: 'none',
                transition: 'border-color 0.2s',
                background: '#fff',
                boxSizing: 'border-box',
              }}
              onFocus={e => { e.currentTarget.style.borderColor = '#0003A3' }}
              onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,3,163,0.15)' }}
            />
          </div>

          {error && (
            <div
              style={{
                background: '#FEE2E2',
                color: '#B91C1C',
                borderRadius: 8,
                padding: '10px 14px',
                fontSize: 14,
                marginBottom: 20,
                textAlign: 'center',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: loading ? '#676B88' : '#0003A3',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              letterSpacing: '0.03em',
            }}
          >
            {loading ? '登录中...' : '登 录'}
          </button>
        </form>
      </div>
    </div>
  )
}
