'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { THERAPISTS, THERAPIST_CATEGORIES, type Therapist } from '@/content/therapists'

type CatCode = (typeof THERAPIST_CATEGORIES)[number]['code']

export default function Therapists() {
  const [cat, setCat] = useState<CatCode>('OT')
  const [openId, setOpenId] = useState<string | null>(null)

  const items = useMemo(() => THERAPISTS.filter((t) => t.category === cat), [cat])

  return (
    <section
      id="therapists"
      className="section"
      style={{ background: 'var(--white)', borderTop: '1px solid var(--border)' }}
    >
      <div className="container">
        {/* Header */}
        <header className="r-blur" style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)', maxWidth: '38rem' }}>
          <span className="eyebrow">康复团队 · Therapists</span>
          <h2
            className="h-display"
            style={{ marginTop: '0.85rem' }}
            dangerouslySetInnerHTML={{
              __html: '一支<em>专业且温柔</em>的康复师团队',
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
                <span className="cat-label">{c.name}</span>
                <span className="cat-count">{String(count).padStart(2, '0')}</span>
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <div key={cat} className="therapist-grid rsg in" aria-live="polite">
          {items.map((t) => (
            <TherapistCard
              key={t.slug}
              t={t}
              open={openId === t.slug}
              onToggle={() => setOpenId((cur) => (cur === t.slug ? null : t.slug))}
            />
          ))}
        </div>
      </div>

      <style>{`
        .therapist-cats {
          display: flex;
          flex-wrap: wrap;
          gap: 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          margin-bottom: clamp(1.75rem, 3vw, 2.25rem);
          overflow-x: auto;
          scrollbar-width: none;
        }
        .therapist-cats::-webkit-scrollbar { display: none; }
        .cat {
          flex: 1 1 auto;
          min-width: 8rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.6rem;
          padding: 0.85rem 1.1rem;
          background: transparent;
          color: var(--ink-soft);
          border: none;
          border-right: 1px solid var(--border);
          cursor: pointer;
          position: relative;
          transition: color 0.25s ease, background 0.25s ease;
          white-space: nowrap;
        }
        .cat:last-child { border-right: none; }
        .cat::after {
          content: '';
          position: absolute;
          inset: auto 0 -1px 0;
          height: 2px;
          background: var(--blue);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .cat.is-active { color: var(--blue); }
        .cat.is-active::after { transform: scaleX(1); }
        .cat-label {
          font-family: var(--serif-cn);
          font-size: 0.92rem;
          font-weight: 500;
          letter-spacing: 0.01em;
        }
        .cat-count {
          font-family: var(--serif-en);
          font-style: italic;
          font-size: 0.78rem;
          color: var(--muted);
          opacity: 0.85;
        }

        .therapist-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(0.85rem, 1.5vw, 1.25rem);
          animation: catFade 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes catFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: none; }
        }
        @media (max-width: 1024px) { .therapist-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 720px)  { .therapist-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 420px)  { .therapist-grid { grid-template-columns: 1fr; gap: 0.75rem; } }

        @media (prefers-reduced-motion: reduce) {
          .therapist-grid, .cat::after { animation: none !important; transition: none !important; }
        }
      `}</style>
    </section>
  )
}

function TherapistCard({
  t,
  open,
  onToggle,
}: {
  t: Therapist
  open: boolean
  onToggle: () => void
}) {
  const isSupervisor = t.title.includes('督导')

  return (
    <>
      <article
        className="t-card"
        onClick={onToggle}
        aria-expanded={open}
      >
        <div className="t-photo">
          <Image
            src={t.photoPath}
            alt={t.name}
            fill
            sizes="(max-width: 420px) 90vw, (max-width: 720px) 45vw, (max-width: 1024px) 30vw, 22vw"
            style={{ objectFit: 'cover', objectPosition: 'center 22%' }}
          />
          {isSupervisor && <span className="t-badge">督导</span>}
        </div>
        <div className="t-meta">
          <h3 className="t-name">{t.name}</h3>
          <p className="t-title">{t.title.replace('北京宝秀兰医疗', '').trim()}</p>
        </div>
        <span className="t-more" aria-hidden="true">{open ? '收起 −' : '查看履历 +'}</span>
      </article>

      {open && (
        <div
          className="t-detail"
          role="region"
          aria-label={`${t.name} 详细资料`}
          onClick={(e) => {
            if (e.target === e.currentTarget) onToggle()
          }}
        >
          <div className="t-detail-inner">
            <button className="t-close" onClick={onToggle} aria-label="关闭">
              ×
            </button>
            <div className="t-detail-grid">
              <div className="t-detail-photo">
                <Image
                  src={t.photoPath}
                  alt={t.name}
                  fill
                  sizes="(max-width: 720px) 80vw, 320px"
                  style={{ objectFit: 'cover', objectPosition: 'center 18%' }}
                />
              </div>
              <div className="t-detail-body">
                <h3 className="t-detail-name">
                  {t.name}
                  <span className="t-detail-cat">{t.categoryName}</span>
                </h3>
                <p className="t-detail-title">{t.title}</p>

                {t.specialty && (
                  <Block label="擅长">{t.specialty}</Block>
                )}
                {t.resume && (
                  <Block label="履历">{t.resume}</Block>
                )}
                {t.expertise && (
                  <Block label="专业能力">{t.expertise}</Block>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .t-card {
          display: flex;
          flex-direction: column;
          background: var(--white);
          border: 1px solid var(--border);
          cursor: pointer;
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .t-card:hover {
          border-color: var(--blue);
          transform: translateY(-2px);
          box-shadow: 0 14px 32px -20px rgba(0,3,163,0.22);
        }
        .t-photo {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          background: var(--off-white);
        }
        .t-card:hover .t-photo :global(img) { transform: scale(1.03); }
        .t-photo :global(img) { transition: transform 0.8s cubic-bezier(0.22,1,0.36,1); }
        .t-badge {
          position: absolute;
          top: 0.55rem;
          left: 0.55rem;
          background: var(--blue);
          color: var(--white);
          font-size: 0.62rem;
          letter-spacing: 0.18em;
          padding: 0.18rem 0.5rem;
          font-family: var(--sans);
          font-weight: 500;
        }
        .t-meta {
          padding: 0.85rem 0.95rem 0.4rem;
          flex: 1;
        }
        .t-name {
          font-family: var(--serif-cn);
          font-size: 1.02rem;
          font-weight: 500;
          color: var(--ink);
          line-height: 1.2;
          letter-spacing: 0.01em;
        }
        .t-title {
          margin-top: 0.3rem;
          font-size: 0.72rem;
          line-height: 1.5;
          color: var(--muted);
          letter-spacing: 0.02em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .t-more {
          display: block;
          padding: 0.55rem 0.95rem 0.85rem;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--blue);
          font-weight: 500;
        }

        .t-detail {
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
          animation: overlay-in 0.25s ease both;
        }
        @keyframes overlay-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .t-detail-inner {
          background: var(--white);
          max-width: 880px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: card-in 0.4s cubic-bezier(0.22,1,0.36,1) both;
        }
        @keyframes card-in {
          from { opacity: 0; transform: translateY(12px) scale(0.99); }
          to { opacity: 1; transform: none; }
        }
        .t-close {
          position: absolute;
          top: 0.6rem;
          right: 0.6rem;
          width: 2rem;
          height: 2rem;
          background: var(--white);
          border: 1px solid var(--border);
          color: var(--ink-soft);
          cursor: pointer;
          font-size: 1.2rem;
          line-height: 1;
          z-index: 2;
          transition: color 0.2s ease, border-color 0.2s ease;
        }
        .t-close:hover { color: var(--blue); border-color: var(--blue); }

        .t-detail-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: clamp(1.25rem, 2.5vw, 2rem);
          padding: clamp(1.5rem, 3vw, 2.25rem);
        }
        .t-detail-photo {
          position: relative;
          aspect-ratio: 4 / 5;
          background: var(--off-white);
          border: 1px solid var(--border);
        }
        .t-detail-body { min-width: 0; }
        .t-detail-name {
          font-family: var(--serif-cn);
          font-size: clamp(1.6rem, 2.4vw, 2rem);
          font-weight: 400;
          color: var(--ink);
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .t-detail-cat {
          margin-left: 0.6rem;
          font-family: var(--serif-en);
          font-style: italic;
          font-size: 0.42em;
          color: var(--blue);
          font-weight: 300;
          letter-spacing: 0.04em;
          vertical-align: 0.55em;
        }
        .t-detail-title {
          margin-top: 0.55rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
          font-size: 0.85rem;
          color: var(--muted);
          letter-spacing: 0.03em;
        }

        @media (max-width: 720px) {
          .t-detail-grid {
            grid-template-columns: 1fr;
          }
          .t-detail-photo {
            max-width: 220px;
          }
        }
      `}</style>
    </>
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
          font-size: 0.86rem;
          line-height: 1.78;
          color: var(--ink-soft);
        }
      `}</style>
    </>
  )
}
