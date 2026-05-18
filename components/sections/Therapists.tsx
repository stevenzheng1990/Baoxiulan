'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { THERAPISTS, THERAPIST_CATEGORIES, type Therapist } from '@/content/therapists'

type CatCode = (typeof THERAPIST_CATEGORIES)[number]['code']

// Refined line icons for each rehab category — drawn with stroke only,
// animate stroke-dashoffset on enter / active state.
function CatIcon({ code, className }: { code: CatCode; className?: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  }
  switch (code) {
    case 'OT':
      // Hand — fine motor / occupational
      return (
        <svg {...common}>
          <path d="M8 12V6.5a1.5 1.5 0 0 1 3 0V12" />
          <path d="M11 12V5a1.5 1.5 0 0 1 3 0v7" />
          <path d="M14 12V6.5a1.5 1.5 0 0 1 3 0V14" />
          <path d="M5 12.5a1.5 1.5 0 0 1 3 0V17a4 4 0 0 0 4 4h1a5 5 0 0 0 5-5v-2" />
        </svg>
      )
    case 'ST':
      // Speech — sound waves from mouth
      return (
        <svg {...common}>
          <path d="M4 12c2 0 2-3 4-3s2 6 4 6 2-6 4-6 2 3 4 3" />
        </svg>
      )
    case 'PT':
      // Movement — figure running
      return (
        <svg {...common}>
          <circle cx="13.5" cy="5" r="1.6" />
          <path d="M8 21l3-6 3 2 1 4" />
          <path d="M5 13l4-3 3 1 3-3 3 4" />
        </svg>
      )
    case '推拿':
      // Touch — fingertip with dot
      return (
        <svg {...common}>
          <path d="M9 14V7a1.5 1.5 0 0 1 3 0v6" />
          <path d="M12 13V5.5a1.5 1.5 0 0 1 3 0V13" />
          <path d="M15 13V8a1.5 1.5 0 0 1 3 0v6a5 5 0 0 1-5 5h-2a4 4 0 0 1-4-4v-1l-2-2" />
          <circle cx="6" cy="6" r="1.2" />
        </svg>
      )
    case '社交融合':
      // Two figures
      return (
        <svg {...common}>
          <circle cx="8" cy="7" r="2" />
          <circle cx="16" cy="7" r="2" />
          <path d="M4 19v-1a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1" />
          <path d="M12 19v-1a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1" />
        </svg>
      )
  }
}

export default function Therapists() {
  const [cat, setCat] = useState<CatCode>('OT')
  const [openId, setOpenId] = useState<string | null>(null)

  const items = useMemo(() => THERAPISTS.filter((t) => t.category === cat), [cat])

  return (
    <section
      id="therapists"
      className="section"
      style={{
        background: 'var(--white)',
        borderTop: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative corner pattern */}
      <DotPattern />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <header className="r-blur" style={{ marginBottom: 'clamp(2.5rem, 4.5vw, 3.5rem)', maxWidth: '40rem' }}>
          <span className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            康复团队 · Therapists
          </span>
          <h2
            className="h-display"
            style={{ marginTop: '0.95rem' }}
            dangerouslySetInnerHTML={{
              __html: '一支<em>专业而温柔</em>的康复师团队',
            }}
          />
          <p className="lede" style={{ marginTop: '1rem' }}>
            涵盖 OT 作业治疗、ST 言语认知、PT 运动训练、儿童推拿、社交融合五大方向；持证、深耕、长期协作。
          </p>
        </header>

        {/* Category switcher */}
        <div className="r therapist-cats" role="tablist" aria-label="康复师分类">
          {THERAPIST_CATEGORIES.map((c) => {
            const active = cat === c.code
            const count = THERAPISTS.filter((t) => t.category === c.code).length
            return (
              <button
                key={c.code}
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setCat(c.code)
                  setOpenId(null)
                }}
                className={active ? 'cat is-active' : 'cat'}
              >
                <CatIcon code={c.code as CatCode} className="cat-icon" />
                <span className="cat-text">
                  <span className="cat-label">{c.name}</span>
                  <span className="cat-count">{String(count).padStart(2, '0')}</span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <div key={cat} className="therapist-grid" aria-live="polite">
          {items.map((t, i) => (
            <TherapistCard
              key={t.slug}
              t={t}
              index={i}
              onOpen={() => setOpenId(t.slug)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {openId && (
        <TherapistModal
          t={THERAPISTS.find((x) => x.slug === openId)!}
          onClose={() => setOpenId(null)}
        />
      )}

      <style>{`
        .therapist-cats {
          display: flex;
          flex-wrap: wrap;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          margin-bottom: clamp(2rem, 3vw, 2.5rem);
          overflow-x: auto;
          scrollbar-width: none;
          background: var(--paper);
        }
        .therapist-cats::-webkit-scrollbar { display: none; }
        .cat {
          flex: 1 1 auto;
          min-width: 9.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.95rem 1.15rem;
          background: transparent;
          color: var(--muted);
          border: none;
          border-right: 1px solid var(--border);
          cursor: pointer;
          position: relative;
          transition: color 0.4s ease, background 0.4s ease;
          white-space: nowrap;
        }
        .cat:hover { color: var(--ink-soft); background: var(--white); }
        .cat:last-child { border-right: none; }
        .cat::after {
          content: '';
          position: absolute;
          inset: auto 0 -1px 0;
          height: 2px;
          background: var(--blue);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .cat.is-active {
          color: var(--blue);
          background: var(--white);
        }
        .cat.is-active::after { transform: scaleX(1); }
        .cat-icon {
          opacity: 0.55;
          transition: opacity 0.3s ease, transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .cat.is-active .cat-icon { opacity: 1; transform: translateY(-1px); }
        .cat-text {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }
        .cat-label {
          font-family: var(--serif-cn);
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.01em;
        }
        .cat-count {
          font-family: var(--serif-en);
          font-style: italic;
          font-size: 0.72rem;
          color: var(--muted);
        }
        .cat.is-active .cat-count { color: var(--blue); opacity: 0.75; }

        .therapist-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(0.85rem, 1.4vw, 1.25rem);
        }
        @media (max-width: 900px) { .therapist-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px) { .therapist-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}

/* ──────────────────────────────────────────────────────────────────────
   CARD — compact horizontal layout: small circular photo + meta
   ────────────────────────────────────────────────────────────────────── */
function TherapistCard({
  t,
  index,
  onOpen,
}: {
  t: Therapist
  index: number
  onOpen: () => void
}) {
  const isSupervisor = t.title.includes('督导')
  const shortTitle = t.title
    .replace('北京宝秀兰医疗', '')
    .replace(/^\s*[ ·]+/, '')
    .trim()
  const specialtyShort = (t.specialty || t.expertise).slice(0, 60).replace(/[，。、,.]\s*$/, '')

  return (
    <>
      <article
        className="t-card"
        onClick={onOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onOpen()
          }
        }}
        style={{ animationDelay: `${Math.min(index * 0.06, 0.4)}s` }}
      >
        <div className="t-photo">
          <Image
            src={t.photoPath}
            alt={t.name}
            fill
            sizes="92px"
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          />
        </div>
        <div className="t-info">
          <div className="t-name-row">
            <h3 className="t-name">{t.name}</h3>
            {isSupervisor && <span className="t-badge">督导</span>}
          </div>
          <p className="t-title">{shortTitle}</p>
          {specialtyShort && <p className="t-snippet">{specialtyShort}…</p>}
        </div>
        <span className="t-arrow" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </article>

      <style jsx>{`
        .t-card {
          display: grid;
          grid-template-columns: 92px 1fr auto;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 1rem 0.85rem 0.85rem;
          background: var(--white);
          border: 1px solid var(--border);
          cursor: pointer;
          position: relative;
          transition: border-color 0.45s cubic-bezier(0.16,1,0.3,1),
                      transform 0.55s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.55s cubic-bezier(0.16,1,0.3,1);
          opacity: 0;
          transform: translateY(10px);
          animation: cardIn 1s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes cardIn {
          to { opacity: 1; transform: none; }
        }
        .t-card:hover {
          border-color: var(--blue);
          transform: translateY(-2px);
          box-shadow: 0 16px 36px -22px rgba(0,3,163,0.22);
        }
        .t-card:focus-visible {
          outline: 2px solid var(--blue);
          outline-offset: 2px;
        }
        .t-photo {
          position: relative;
          width: 92px;
          height: 92px;
          overflow: hidden;
          border-radius: 50%;
          background: var(--off-white);
          flex-shrink: 0;
          border: 1px solid var(--border);
        }
        .t-photo :global(img) {
          transition: transform 1.2s cubic-bezier(0.16,1,0.3,1);
        }
        .t-card:hover .t-photo :global(img) { transform: scale(1.08); }
        .t-info { min-width: 0; }
        .t-name-row {
          display: flex;
          align-items: center;
          gap: 0.55rem;
        }
        .t-name {
          font-family: var(--serif-cn);
          font-size: 1.08rem;
          font-weight: 500;
          color: var(--ink);
          line-height: 1.15;
          letter-spacing: 0.01em;
        }
        .t-badge {
          font-family: var(--sans);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          color: var(--blue);
          background: var(--blue-pale);
          padding: 0.12rem 0.4rem;
          line-height: 1.4;
          letter-spacing: 0.12em;
        }
        .t-title {
          margin-top: 0.25rem;
          font-size: 0.72rem;
          color: var(--muted);
          letter-spacing: 0.02em;
          line-height: 1.5;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .t-snippet {
          margin-top: 0.35rem;
          font-size: 0.72rem;
          line-height: 1.55;
          color: var(--ink-soft);
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .t-arrow {
          color: var(--muted);
          transition: color 0.3s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .t-card:hover .t-arrow {
          color: var(--blue);
          transform: translateX(3px);
        }
        @media (prefers-reduced-motion: reduce) {
          .t-card { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </>
  )
}

/* ──────────────────────────────────────────────────────────────────────
   MODAL
   ────────────────────────────────────────────────────────────────────── */
function TherapistModal({ t, onClose }: { t: Therapist; onClose: () => void }) {
  return (
    <div
      className="t-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${t.name} 详细资料`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="t-modal">
        <button className="t-close" onClick={onClose} aria-label="关闭">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </button>
        <div className="t-modal-grid">
          <div className="t-modal-photo">
            <Image
              src={t.photoPath}
              alt={t.name}
              fill
              sizes="(max-width: 720px) 60vw, 280px"
              style={{ objectFit: 'cover', objectPosition: 'center 18%' }}
            />
          </div>
          <div className="t-modal-body">
            <h3 className="t-modal-name">
              {t.name}
              <span className="t-modal-cat">{t.categoryName}</span>
            </h3>
            <p className="t-modal-title">{t.title}</p>

            {t.specialty && <Block label="擅长">{t.specialty}</Block>}
            {t.resume && <Block label="履历">{t.resume}</Block>}
            {t.expertise && <Block label="专业能力">{t.expertise}</Block>}
          </div>
        </div>
      </div>

      <style jsx>{`
        .t-overlay {
          position: fixed;
          inset: 0;
          background: rgba(8, 9, 15, 0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1rem, 3vw, 2rem);
          animation: overlayIn 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes overlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .t-modal {
          background: var(--white);
          max-width: 880px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: modalIn 0.55s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(14px) scale(0.985); }
          to { opacity: 1; transform: none; }
        }
        .t-close {
          position: absolute;
          top: 0.8rem;
          right: 0.8rem;
          width: 2.1rem;
          height: 2.1rem;
          background: var(--white);
          border: 1px solid var(--border);
          color: var(--ink-soft);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          transition: color 0.25s ease, border-color 0.25s ease;
        }
        .t-close:hover { color: var(--blue); border-color: var(--blue); }

        .t-modal-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: clamp(1.25rem, 2.5vw, 2rem);
          padding: clamp(1.5rem, 3vw, 2.25rem);
        }
        .t-modal-photo {
          position: relative;
          aspect-ratio: 4 / 5;
          background: var(--off-white);
          border: 1px solid var(--border);
        }
        .t-modal-body { min-width: 0; }
        .t-modal-name {
          font-family: var(--serif-cn);
          font-size: clamp(1.5rem, 2.2vw, 1.9rem);
          font-weight: 400;
          color: var(--ink);
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .t-modal-cat {
          margin-left: 0.55rem;
          font-family: var(--serif-en);
          font-style: italic;
          font-size: 0.4em;
          color: var(--blue);
          font-weight: 300;
          letter-spacing: 0.04em;
          vertical-align: 0.55em;
        }
        .t-modal-title {
          margin-top: 0.55rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
          font-size: 0.82rem;
          color: var(--muted);
          letter-spacing: 0.03em;
        }
        @media (max-width: 720px) {
          .t-modal-grid { grid-template-columns: 1fr; }
          .t-modal-photo { max-width: 200px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .t-overlay, .t-modal { animation: none; opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  )
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <>
      <div className="b-label">{label}</div>
      <p className="b-body">{children}</p>
      <style jsx>{`
        .b-label {
          margin-top: 1.25rem;
          font-size: 0.66rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--blue);
          font-weight: 600;
          margin-bottom: 0.55rem;
        }
        .b-body {
          font-size: 0.85rem;
          line-height: 1.78;
          color: var(--ink-soft);
        }
      `}</style>
    </>
  )
}

/* Subtle dotted ornament in the section corner — animates in once visible */
function DotPattern() {
  return (
    <svg
      aria-hidden="true"
      width="220"
      height="220"
      viewBox="0 0 220 220"
      style={{
        position: 'absolute',
        right: '-40px',
        top: '-40px',
        opacity: 0.5,
        pointerEvents: 'none',
      }}
    >
      <defs>
        <pattern id="dot-pat" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="var(--blue)" opacity="0.25" />
        </pattern>
      </defs>
      <rect width="220" height="220" fill="url(#dot-pat)" />
    </svg>
  )
}
