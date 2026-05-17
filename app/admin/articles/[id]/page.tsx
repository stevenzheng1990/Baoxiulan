'use client'

import { useState, useEffect, FormEvent } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

const CATEGORIES = [
  '育儿课堂',
  '早期干预',
  '高危儿管理',
  '专家视点',
  '脑瘫康复',
  '言语发育',
  '感统训练',
  '营养喂养',
  '行为发育',
  '新闻动态',
]

interface ArticleForm {
  title: string
  excerpt: string
  category: string
  author: string
  content: string
  published: boolean
  metaTitle: string
  metaDesc: string
}

export default function EditArticlePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [form, setForm] = useState<ArticleForm>({
    title: '',
    excerpt: '',
    category: '育儿课堂',
    author: '宝秀兰医疗团队',
    content: '',
    published: false,
    metaTitle: '',
    metaDesc: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    fetch(`/api/admin/articles/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('文章不存在')
        return res.json()
      })
      .then(data => {
        setForm({
          title: data.title ?? '',
          excerpt: data.excerpt ?? '',
          category: data.category ?? '育儿课堂',
          author: data.author ?? '宝秀兰医疗团队',
          content: data.content ?? '',
          published: data.published ?? false,
          metaTitle: data.metaTitle ?? '',
          metaDesc: data.metaDesc ?? '',
        })
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [id])

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      const res = await fetch(`/api/admin/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        router.push('/admin/articles')
        router.refresh()
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

  async function handleDelete() {
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' })
      if (res.ok) {
        router.push('/admin/articles')
        router.refresh()
      } else {
        setError('删除失败')
        setShowDeleteConfirm(false)
      }
    } catch {
      setError('网络错误，请重试')
      setShowDeleteConfirm(false)
    } finally {
      setDeleting(false)
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link
            href="/admin/articles"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: '#676B88',
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回
          </Link>
          <span style={{ color: '#CBD5E0' }}>/</span>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#08090F' }}>编辑文章</h1>
        </div>

        {/* Delete button */}
        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              background: '#FEE2E2',
              color: '#B91C1C',
              border: 'none',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            删除文章
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#B91C1C', fontWeight: 500 }}>确认删除？</span>
            <button
              onClick={handleDelete}
              disabled={deleting}
              style={{
                padding: '7px 14px',
                background: '#B91C1C',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
                cursor: deleting ? 'not-allowed' : 'pointer',
              }}
            >
              {deleting ? '删除中...' : '确认删除'}
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              style={{
                padding: '7px 14px',
                background: '#F3F4F6',
                color: '#374151',
                border: 'none',
                borderRadius: 6,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              取消
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '24px',
                boxShadow: '0 1px 4px rgba(0,3,163,0.07)',
              }}
            >
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle} htmlFor="title">
                  文章标题 <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={form.title}
                  onChange={handleChange}
                  placeholder="请输入文章标题"
                  style={{ ...inputStyle, fontSize: 16, fontWeight: 500 }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#0003A3' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,3,163,0.15)' }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle} htmlFor="excerpt">
                  文章摘要 <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  required
                  value={form.excerpt}
                  onChange={handleChange}
                  placeholder="请输入文章摘要（100–200字）"
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#0003A3' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,3,163,0.15)' }}
                />
              </div>

              <div>
                <label style={labelStyle} htmlFor="content">
                  文章正文 <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  required
                  value={form.content}
                  onChange={handleChange}
                  placeholder="请输入文章正文内容..."
                  rows={20}
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.8 }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#0003A3' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,3,163,0.15)' }}
                />
              </div>
            </div>

            {/* SEO */}
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '24px',
                boxShadow: '0 1px 4px rgba(0,3,163,0.07)',
              }}
            >
              <h2 style={{ fontSize: 15, fontWeight: 600, color: '#08090F', marginBottom: 16 }}>
                SEO 设置（可选）
              </h2>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle} htmlFor="metaTitle">
                  Meta 标题
                </label>
                <input
                  id="metaTitle"
                  name="metaTitle"
                  type="text"
                  value={form.metaTitle}
                  onChange={handleChange}
                  placeholder="默认使用文章标题"
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = '#0003A3' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,3,163,0.15)' }}
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="metaDesc">
                  Meta 描述
                </label>
                <textarea
                  id="metaDesc"
                  name="metaDesc"
                  value={form.metaDesc}
                  onChange={handleChange}
                  placeholder="默认使用文章摘要"
                  rows={2}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#0003A3' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,3,163,0.15)' }}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Publish card */}
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '20px',
                boxShadow: '0 1px 4px rgba(0,3,163,0.07)',
              }}
            >
              <h2 style={{ fontSize: 15, fontWeight: 600, color: '#08090F', marginBottom: 16 }}>
                发布设置
              </h2>

              {/* Published toggle */}
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  marginBottom: 20,
                }}
              >
                <div style={{ position: 'relative', width: 44, height: 24, flexShrink: 0 }}>
                  <input
                    type="checkbox"
                    name="published"
                    checked={form.published}
                    onChange={handleChange}
                    style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 12,
                      background: form.published ? '#0003A3' : '#D1D5DB',
                      transition: 'background 0.2s',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: 3,
                      left: form.published ? 23 : 3,
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: '#fff',
                      transition: 'left 0.2s',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    }}
                  />
                </div>
                <span style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>
                  {form.published ? '已发布' : '草稿'}
                </span>
              </label>

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
                {saving ? '保存中...' : '保存更改'}
              </button>
            </div>

            {/* Meta card */}
            <div
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '20px',
                boxShadow: '0 1px 4px rgba(0,3,163,0.07)',
              }}
            >
              <h2 style={{ fontSize: 15, fontWeight: 600, color: '#08090F', marginBottom: 16 }}>
                文章属性
              </h2>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle} htmlFor="category">
                  分类
                </label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#0003A3' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,3,163,0.15)' }}
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle} htmlFor="author">
                  作者
                </label>
                <input
                  id="author"
                  name="author"
                  type="text"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="作者名称"
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = '#0003A3' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(0,3,163,0.15)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
