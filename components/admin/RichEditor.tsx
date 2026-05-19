'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ImageWithControls } from './tiptap/ImageWithControls'
import './RichEditor.css'

interface RichEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

/** Upload a file to /api/admin/uploads and return the public URL. */
async function uploadImage(file: File): Promise<string | null> {
  const fd = new FormData()
  fd.append('file', file)
  try {
    const res = await fetch('/api/admin/uploads', { method: 'POST', body: fd })
    if (!res.ok) return null
    const data = await res.json()
    return data.url || null
  } catch {
    return null
  }
}

// ────────────────────────────────────────────────────────
// Toolbar
// ────────────────────────────────────────────────────────

interface BtnProps {
  active?: boolean
  disabled?: boolean
  onClick: () => void
  title: string
  children: React.ReactNode
}

function Btn({ active, disabled, onClick, title, children }: BtnProps) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      className={`re-btn ${active ? 'is-active' : ''}`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <span className="re-divider" aria-hidden />
}

function Toolbar({
  editor,
  onPickImage,
  uploading,
}: {
  editor: Editor
  onPickImage: () => void
  uploading: boolean
}) {
  // Re-render when the editor state changes — selection, marks, nodes.
  const [, force] = useState(0)
  useEffect(() => {
    const update = () => force((x) => x + 1)
    editor.on('selectionUpdate', update)
    editor.on('transaction', update)
    return () => {
      editor.off('selectionUpdate', update)
      editor.off('transaction', update)
    }
  }, [editor])

  const imageSelected = editor.isActive('image')

  const setImageAttr = (attrs: { align?: string; size?: string }) => {
    const current = editor.getAttributes('image')
    editor.chain().focus().updateAttributes('image', { ...current, ...attrs }).run()
  }

  return (
    <div className="re-toolbar">
      <Btn title="撤销" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v6h6M3 13a9 9 0 1 0 3-7" /></svg>
      </Btn>
      <Btn title="重做" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 7v6h-6M21 13a9 9 0 1 1-3-7" /></svg>
      </Btn>

      <Divider />

      <select
        className="re-select"
        value={
          editor.isActive('heading', { level: 2 })
            ? 'h2'
            : editor.isActive('heading', { level: 3 })
              ? 'h3'
              : 'p'
        }
        onChange={(e) => {
          const v = e.target.value
          if (v === 'p') editor.chain().focus().setParagraph().run()
          else if (v === 'h2') editor.chain().focus().toggleHeading({ level: 2 }).run()
          else if (v === 'h3') editor.chain().focus().toggleHeading({ level: 3 }).run()
        }}
      >
        <option value="p">正文</option>
        <option value="h2">大标题</option>
        <option value="h3">小标题</option>
      </select>

      <Divider />

      <Btn title="加粗" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}>
        <b style={{ fontSize: 13 }}>B</b>
      </Btn>
      <Btn title="斜体" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <i style={{ fontSize: 13 }}>I</i>
      </Btn>
      <Btn title="下划线" active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <u style={{ fontSize: 13 }}>U</u>
      </Btn>
      <Btn title="删除线" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <s style={{ fontSize: 13 }}>S</s>
      </Btn>

      <Divider />

      <Btn title="无序列表" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="5" cy="6" r="1.2" fill="currentColor" /><circle cx="5" cy="12" r="1.2" fill="currentColor" /><circle cx="5" cy="18" r="1.2" fill="currentColor" /><path d="M10 6h11M10 12h11M10 18h11" /></svg>
      </Btn>
      <Btn title="有序列表" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><text x="2" y="9" fontSize="7" fill="currentColor" stroke="none">1.</text><text x="2" y="15" fontSize="7" fill="currentColor" stroke="none">2.</text><text x="2" y="21" fontSize="7" fill="currentColor" stroke="none">3.</text><path d="M10 6h11M10 12h11M10 18h11" /></svg>
      </Btn>
      <Btn title="引用" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 7v4a3 3 0 0 1-3 3M16 7v4a3 3 0 0 1-3 3" /></svg>
      </Btn>
      <Btn title="分割线" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="12" x2="20" y2="12" /><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" /></svg>
      </Btn>

      <Divider />

      <Btn title="左对齐" active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h10M4 18h14" /></svg>
      </Btn>
      <Btn title="居中" active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M7 12h10M5 18h14" /></svg>
      </Btn>
      <Btn title="右对齐" active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M10 12h10M6 18h14" /></svg>
      </Btn>

      <Divider />

      <Btn
        title="插入链接"
        active={editor.isActive('link')}
        onClick={() => {
          const prev = editor.getAttributes('link').href || ''
          const url = window.prompt('链接地址', prev)
          if (url === null) return
          if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
          } else {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url, target: '_blank' }).run()
          }
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 14a4 4 0 0 1 0-5.7l3-3a4 4 0 0 1 5.7 5.7l-1.5 1.5M14 10a4 4 0 0 1 0 5.7l-3 3a4 4 0 0 1-5.7-5.7l1.5-1.5" /></svg>
      </Btn>

      <Btn title="插入图片" onClick={onPickImage} disabled={uploading}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M21 16l-5-5L5 21" /></svg>
        <span style={{ marginLeft: 4, fontSize: 12 }}>{uploading ? '上传中…' : '图片'}</span>
      </Btn>

      {imageSelected && (
        <>
          <Divider />
          <div className="re-img-controls">
            <span className="re-img-label">图片：</span>
            <Btn title="靠左" active={editor.getAttributes('image').align === 'left'} onClick={() => setImageAttr({ align: 'left' })}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="5" width="10" height="14" /><path d="M16 9h4M16 13h4M16 17h4" /></svg>
            </Btn>
            <Btn title="居中" active={(editor.getAttributes('image').align || 'center') === 'center'} onClick={() => setImageAttr({ align: 'center' })}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="7" y="5" width="10" height="14" /><path d="M3 9h2M3 13h2M3 17h2M19 9h2M19 13h2M19 17h2" /></svg>
            </Btn>
            <Btn title="靠右" active={editor.getAttributes('image').align === 'right'} onClick={() => setImageAttr({ align: 'right' })}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="10" y="5" width="10" height="14" /><path d="M4 9h4M4 13h4M4 17h4" /></svg>
            </Btn>
            <span style={{ width: 8 }} />
            <Btn title="小图（40%）" active={editor.getAttributes('image').size === 'small'} onClick={() => setImageAttr({ size: 'small' })}>
              <span className="re-size-label">小</span>
            </Btn>
            <Btn title="中图（70%）" active={(editor.getAttributes('image').size || 'medium') === 'medium'} onClick={() => setImageAttr({ size: 'medium' })}>
              <span className="re-size-label">中</span>
            </Btn>
            <Btn title="全宽" active={editor.getAttributes('image').size === 'full'} onClick={() => setImageAttr({ size: 'full' })}>
              <span className="re-size-label">大</span>
            </Btn>
            <span style={{ width: 8 }} />
            <Btn
              title="删除图片"
              onClick={() => editor.chain().focus().deleteSelection().run()}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2"><path d="M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13" /></svg>
            </Btn>
          </div>
        </>
      )}
    </div>
  )
}

// ────────────────────────────────────────────────────────
// Editor
// ────────────────────────────────────────────────────────

export default function RichEditor({ value, onChange, placeholder }: RichEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: 'noopener noreferrer nofollow' },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      ImageWithControls.configure({
        inline: false,
        HTMLAttributes: { loading: 'lazy' },
      }),
      Placeholder.configure({
        placeholder: placeholder || '请输入文章正文…',
      }),
    ],
    content: value || '',
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'ProseMirror tiptap-content',
        spellcheck: 'false',
      },
      handlePaste(view, event) {
        const items = Array.from(event.clipboardData?.items || [])
        const image = items.find((it) => it.type.startsWith('image/'))
        if (image) {
          const file = image.getAsFile()
          if (file) {
            event.preventDefault()
            handleUploadAndInsert(file)
            return true
          }
        }
        return false
      },
      handleDrop(view, event, slice, moved) {
        if (moved) return false
        const file = event.dataTransfer?.files?.[0]
        if (file && file.type.startsWith('image/')) {
          event.preventDefault()
          handleUploadAndInsert(file)
          return true
        }
        return false
      },
    },
  })

  // Sync external value changes (e.g. fetched article)
  useEffect(() => {
    if (!editor) return
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || '', { emitUpdate: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor])

  const handleUploadAndInsert = useCallback(
    async (file: File) => {
      if (!editor) return
      setUploading(true)
      try {
        const url = await uploadImage(file)
        if (url) {
          editor.chain().focus().setImage({ src: url }).run()
        } else {
          alert('图片上传失败，请稍后再试')
        }
      } finally {
        setUploading(false)
      }
    },
    [editor]
  )

  const onPickImage = () => fileInputRef.current?.click()

  const onFilePicked = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) await handleUploadAndInsert(f)
    e.target.value = ''
  }

  if (!editor) {
    return <div className="re-loading">编辑器加载中…</div>
  }

  return (
    <div className="re-wrap">
      <Toolbar editor={editor} onPickImage={onPickImage} uploading={uploading} />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={onFilePicked}
        style={{ display: 'none' }}
      />
      <div className="re-canvas">
        <EditorContent editor={editor} />
      </div>
      <div className="re-statusbar">
        {uploading ? '正在上传图片…' : `共 ${editor.storage.characterCount?.characters?.() ?? editor.getText().length} 字`}
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#9CA0B5' }}>
          支持拖拽 / 粘贴图片
        </span>
      </div>
    </div>
  )
}
