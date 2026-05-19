'use client'

import { useRef, useState, useCallback, DragEvent, ChangeEvent } from 'react'

interface ImageUploaderProps {
  /** Current image URL (e.g. /uploads/202605/abc.png) or empty */
  value: string
  /** Called with the new URL after successful upload, or '' on remove */
  onChange: (url: string) => void
  /** Visual hint, e.g. "建议 1200×630" */
  hint?: string
  /** Aspect ratio for the preview box, default 16:9 */
  aspect?: string
  /** Optional custom upload endpoint, default /api/admin/uploads */
  endpoint?: string
  /** Label shown above the dropzone */
  label?: string
}

/**
 * Drag / click image uploader. Stores image at /public/uploads/... and
 * returns the URL via onChange.
 */
export default function ImageUploader({
  value,
  onChange,
  hint,
  aspect = '16 / 9',
  endpoint = '/api/admin/uploads',
  label,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')

  const upload = useCallback(
    async (file: File) => {
      setError('')
      setUploading(true)
      try {
        const fd = new FormData()
        fd.append('file', file)
        const res = await fetch(endpoint, { method: 'POST', body: fd })
        const data = await res.json()
        if (!res.ok) {
          setError(data.error || '上传失败')
          return
        }
        onChange(data.url)
      } catch {
        setError('网络错误')
      } finally {
        setUploading(false)
      }
    },
    [endpoint, onChange]
  )

  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) upload(f)
    e.target.value = ''
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    const f = e.dataTransfer.files?.[0]
    if (f) upload(f)
  }

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(true)
  }
  const onDragLeave = () => setDragging(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#374151',
          }}
        >
          {label}
        </label>
      )}

      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        style={{
          position: 'relative',
          aspectRatio: aspect,
          width: '100%',
          background: value ? '#fff' : dragging ? 'rgba(0,3,163,0.04)' : '#FAFAFC',
          border: `1.5px ${dragging ? 'solid' : 'dashed'} ${dragging ? '#0003A3' : 'rgba(0,3,163,0.22)'}`,
          borderRadius: 10,
          cursor: uploading ? 'wait' : 'pointer',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.18s, border-color 0.18s',
        }}
      >
        {value ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)',
                opacity: 0,
                transition: 'opacity 0.2s',
                pointerEvents: 'none',
              }}
              className="iu-overlay"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onChange('')
              }}
              style={{
                position: 'absolute',
                top: 8,
                right: 8,
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.95)',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1F2937',
                fontSize: 14,
                lineHeight: 1,
                boxShadow: '0 2px 6px rgba(0,0,0,0.16)',
              }}
              aria-label="移除图片"
            >
              ×
            </button>
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                padding: '8px 12px',
                color: '#fff',
                fontSize: 12,
                background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)',
                pointerEvents: 'none',
              }}
            >
              点击或拖拽替换 · {hint || '建议 1200×630'}
            </div>
          </>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              color: '#676B88',
              fontSize: 13,
              userSelect: 'none',
              padding: 16,
              textAlign: 'center',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <div style={{ fontWeight: 500, color: '#374151' }}>
              {uploading ? '上传中…' : '点击或拖拽图片到此处'}
            </div>
            <div style={{ fontSize: 11, color: '#9CA0B5' }}>
              {hint || 'JPG / PNG / WebP / GIF · 最大 5MB'}
            </div>
          </div>
        )}

        {uploading && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(255,255,255,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              color: '#0003A3',
              fontWeight: 500,
              backdropFilter: 'blur(2px)',
            }}
          >
            上传中…
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          onChange={onPick}
          style={{ display: 'none' }}
        />
      </div>

      {error && (
        <div style={{ fontSize: 12, color: '#B91C1C' }}>{error}</div>
      )}
    </div>
  )
}
