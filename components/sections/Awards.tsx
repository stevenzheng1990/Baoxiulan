'use client'

import { useEffect, useRef } from 'react'

interface Award {
  year: string
  award: string
  project: string
  scope: string
}

const AWARDS: Award[] = [
  {
    year: '1991',
    award: '国家科学技术进步奖',
    project: '特发性生长激素的临床研究',
    scope: '国家',
  },
  {
    year: '1999',
    award: '世界华人重大科学技术成果',
    project: '新生儿行为测定及其在我国的应用',
    scope: '国际',
  },
  {
    year: '2000',
    award: '北京市科学技术进步奖',
    project: '婴幼儿早期干预与智力开发的研究',
    scope: '省市',
  },
  {
    year: '2017',
    award: '残疾预防及康复科学技术奖',
    project: '新生儿行为测定及在我国的应用',
    scope: '行业',
  },
]

export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Trigger the in-view animation once when the timeline enters viewport
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('aw-in')
          observer.disconnect()
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // Pointer-following highlight along the rail (desktop)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const track = trackRef.current
    if (!track) return

    const handleMove = (e: PointerEvent) => {
      const rect = track.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      track.style.setProperty('--ptr', `${Math.max(0, Math.min(100, x))}%`)
    }
    const handleLeave = () => {
      track.style.setProperty('--ptr', `-10%`)
    }
    track.addEventListener('pointermove', handleMove)
    track.addEventListener('pointerleave', handleLeave)
    return () => {
      track.removeEventListener('pointermove', handleMove)
      track.removeEventListener('pointerleave', handleLeave)
    }
  }, [])

  return (
    <section ref={sectionRef} id="awards" className="aw-section">
      {/* Soft brand glow */}
      <div aria-hidden="true" className="aw-bg" />

      <div className="container">
        {/* Section header */}
        <div className="rsg aw-header">
          <p className="eyebrow">
            <span className="eyebrow-mark" aria-hidden="true" />
            学术荣誉 · Awards
          </p>
          <h2
            className="h-display"
            style={{ marginTop: '0.85rem' }}
            dangerouslySetInnerHTML={{
              __html: '三十余年深耕，<em>四项重大科学技术奖</em>',
            }}
          />
          <p className="lede" style={{ marginTop: '1rem' }}>
            从国家科技进步奖到世界华人重大科学技术成果，宝秀兰团队的研究持续填补国内空白，引领新生儿评估与早期干预的临床实践。
          </p>
        </div>

        {/* ── Horizontal timeline ── */}
        <div ref={trackRef} className="aw-track" style={{ ['--ptr' as string]: '-10%' }}>
          {/* Base rail (subtle) */}
          <span className="aw-rail" aria-hidden="true" />
          {/* Animated rail (draws across) */}
          <span className="aw-rail-fill" aria-hidden="true" />
          {/* Pointer-following glow */}
          <span className="aw-rail-ptr" aria-hidden="true" />

          {/* Items */}
          <ol className="aw-items">
            {AWARDS.map((item, i) => {
              const delay = 0.55 + i * 0.34
              return (
                <li
                  key={item.year}
                  className="aw-item"
                  style={{
                    ['--d' as string]: `${delay}s`,
                    ['--i' as string]: `${i}`,
                  }}
                >
                  {/* Year (per-digit reveal) */}
                  <div className="aw-year">
                    {Array.from(item.year).map((d, di) => (
                      <span
                        key={di}
                        className="aw-digit"
                        style={{ ['--dd' as string]: `${di * 0.07}s` }}
                      >
                        <span>{d}</span>
                      </span>
                    ))}
                  </div>

                  {/* Vertical connector from year to dot */}
                  <span className="aw-conn" aria-hidden="true" />

                  {/* Dot on rail */}
                  <span className="aw-dot" aria-hidden="true">
                    <span className="aw-dot-core" />
                    <span className="aw-dot-pulse" />
                  </span>

                  {/* Card */}
                  <article className="aw-card">
                    <header className="aw-card-head">
                      <span className="aw-card-scope">{item.scope}</span>
                      <span className="aw-card-rule" aria-hidden="true" />
                    </header>
                    <h3 className="aw-card-title">{item.award}</h3>
                    <div className="aw-card-foot">
                      <span className="aw-card-label">获奖项目</span>
                      <p className="aw-card-project">{item.project}</p>
                    </div>

                    {/* Card corner foils */}
                    <span className="aw-card-corner aw-c-tl" aria-hidden="true" />
                    <span className="aw-card-corner aw-c-br" aria-hidden="true" />
                  </article>
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      <style>{`
        /* ═══════════════════════════════════════════════════════════
           AWARDS · horizontal editorial timeline
           ═══════════════════════════════════════════════════════════ */
        .aw-section {
          position: relative;
          background: var(--paper);
          padding-block: var(--section-y);
          overflow: hidden;
          isolation: isolate;
        }
        .aw-bg {
          position: absolute; inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 55% 38% at 15% 25%, rgba(0,3,163,0.05) 0%, rgba(0,3,163,0) 60%),
            radial-gradient(ellipse 45% 30% at 85% 80%, rgba(0,3,163,0.04) 0%, rgba(0,3,163,0) 60%);
        }
        .aw-section .container { position: relative; z-index: 1; }
        .aw-header { max-width: 680px; margin-bottom: clamp(3rem, 6vw, 4.5rem); }

        /* ── Track ── */
        .aw-track {
          --rail-y: clamp(76px, 9vw, 110px);
          position: relative;
          padding-top: 0;
          padding-bottom: 0;
        }

        /* base rail (always visible, very faint) */
        .aw-rail {
          position: absolute;
          left: 0; right: 0;
          top: var(--rail-y);
          height: 1px;
          background: var(--border);
          z-index: 1;
        }
        /* animated rail fill (brand blue) */
        .aw-rail-fill {
          position: absolute;
          left: 0; right: 0;
          top: var(--rail-y);
          height: 1px;
          background: linear-gradient(90deg,
            rgba(0,3,163,0) 0%,
            rgba(0,3,163,0.65) 8%,
            rgba(0,3,163,0.65) 92%,
            rgba(0,3,163,0) 100%);
          transform-origin: left center;
          transform: scaleX(0);
          z-index: 2;
        }
        .aw-in .aw-rail-fill {
          animation: aw-rail-draw 1.9s cubic-bezier(0.83, 0, 0.17, 1) 0.25s forwards;
        }
        @keyframes aw-rail-draw { to { transform: scaleX(1); } }

        /* Pointer-following glow on the rail */
        .aw-rail-ptr {
          position: absolute;
          top: calc(var(--rail-y) - 7px);
          left: 0;
          width: 160px;
          height: 14px;
          pointer-events: none;
          z-index: 3;
          transform: translateX(calc(var(--ptr) - 80px));
          background: radial-gradient(ellipse at center,
            rgba(0,3,163,0.32) 0%,
            rgba(0,3,163,0) 65%);
          opacity: 0;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease;
        }
        .aw-in .aw-rail-ptr { opacity: 1; transition-delay: 2.1s; }

        /* ── Items grid ── */
        .aw-items {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(1rem, 2vw, 1.75rem);
          padding: 0;
          margin: 0;
          position: relative;
          z-index: 2;
        }

        .aw-item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        /* Year — per-digit roll-up */
        .aw-year {
          font-family: var(--serif-en);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(2.2rem, 3.8vw, 3.2rem);
          line-height: 1;
          color: var(--blue);
          letter-spacing: -0.02em;
          display: inline-flex;
          gap: 0.02em;
          height: 1em;
          align-items: flex-end;
        }
        .aw-digit {
          display: inline-block;
          overflow: hidden;
          line-height: 1;
          height: 1em;
        }
        .aw-digit > span {
          display: block;
          transform: translateY(110%);
          will-change: transform;
        }
        .aw-in .aw-digit > span {
          animation: aw-digit-roll 1.1s cubic-bezier(0.83, 0, 0.17, 1) calc(var(--d) + var(--dd)) forwards;
        }
        @keyframes aw-digit-roll { to { transform: translateY(0); } }

        /* Vertical connector — draws from year down to dot */
        .aw-conn {
          width: 1px;
          height: clamp(22px, 3.2vw, 38px);
          background: linear-gradient(180deg,
            rgba(0,3,163,0.45) 0%,
            rgba(0,3,163,0.15) 100%);
          margin-top: clamp(0.55rem, 1vw, 0.8rem);
          transform-origin: top center;
          transform: scaleY(0);
        }
        .aw-in .aw-conn {
          animation: aw-conn-draw 0.7s cubic-bezier(0.22, 1, 0.36, 1) calc(var(--d) + 0.25s) forwards;
        }
        @keyframes aw-conn-draw { to { transform: scaleY(1); } }

        /* Dot — sits exactly on the rail */
        .aw-dot {
          position: relative;
          width: 16px;
          height: 16px;
          margin-top: -8px;
          margin-bottom: clamp(1.2rem, 2.4vw, 1.8rem);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .aw-dot-core {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--blue);
          box-shadow:
            0 0 0 4px var(--paper),
            0 0 0 5px rgba(0,3,163,0.18);
          transform: scale(0);
          will-change: transform;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
        }
        .aw-in .aw-dot-core {
          animation: aw-dot-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--d) + 0.55s) forwards;
        }
        @keyframes aw-dot-in {
          0%   { transform: scale(0); }
          60%  { transform: scale(1.25); }
          100% { transform: scale(1); }
        }
        .aw-dot-pulse {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: rgba(0,3,163,0.22);
          opacity: 0;
          pointer-events: none;
        }
        .aw-in .aw-dot-pulse {
          animation: aw-pulse 2.6s cubic-bezier(0.4, 0, 0.2, 1) calc(var(--d) + 1.2s) infinite;
        }
        @keyframes aw-pulse {
          0%   { transform: scale(0.6); opacity: 0.55; }
          70%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        /* ── Card ── */
        .aw-card {
          position: relative;
          background: var(--white);
          border: 1px solid var(--border);
          padding: clamp(1.1rem, 2vw, 1.6rem);
          width: 100%;
          opacity: 0;
          clip-path: inset(0 0 100% 0);
          will-change: clip-path, opacity, transform;
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.55s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.45s ease;
          text-align: left;
        }
        .aw-in .aw-card {
          animation: aw-card-reveal 1.15s cubic-bezier(0.16, 1, 0.3, 1) calc(var(--d) + 0.72s) forwards;
        }
        @keyframes aw-card-reveal {
          from { opacity: 0; clip-path: inset(0 0 100% 0); }
          to   { opacity: 1; clip-path: inset(0 0 0 0); }
        }
        .aw-card:hover {
          transform: translateY(-4px);
          border-color: rgba(0,3,163,0.22);
          box-shadow: 0 26px 60px -32px rgba(0,3,163,0.32);
        }
        .aw-item:hover .aw-dot-core {
          transform: scale(1.4);
          box-shadow:
            0 0 0 4px var(--paper),
            0 0 0 6px rgba(0,3,163,0.4);
        }
        /* Dim siblings when one item is hovered */
        .aw-items:hover .aw-item:not(:hover) .aw-card {
          opacity: 0.45;
        }
        .aw-items:hover .aw-item:not(:hover) .aw-year {
          opacity: 0.45;
        }

        .aw-card-head {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.85rem;
        }
        .aw-card-scope {
          font-family: var(--sans);
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          padding: 0.26rem 0.55rem;
          border: 1px solid var(--border);
          color: var(--muted);
          white-space: nowrap;
        }
        .aw-card-rule {
          flex: 1;
          height: 1px;
          background: var(--border);
        }
        .aw-card-title {
          font-family: var(--serif-cn);
          font-weight: 400;
          font-size: clamp(1rem, 1.45vw, 1.18rem);
          line-height: 1.4;
          letter-spacing: 0.02em;
          color: var(--ink);
          margin-bottom: 0.9rem;
        }
        .aw-card-foot {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border);
        }
        .aw-card-label {
          font-family: var(--sans);
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .aw-card-project {
          font-family: var(--sans);
          font-size: 0.86rem;
          line-height: 1.7;
          color: var(--ink-soft);
          margin: 0;
        }

        /* Card foils */
        .aw-card-corner {
          position: absolute;
          width: 12px;
          height: 12px;
          opacity: 0;
          transition: opacity 0.45s ease;
        }
        .aw-c-tl {
          top: -1px; left: -1px;
          border-top: 1px solid var(--blue);
          border-left: 1px solid var(--blue);
        }
        .aw-c-br {
          bottom: -1px; right: -1px;
          border-bottom: 1px solid var(--blue);
          border-right: 1px solid var(--blue);
        }
        .aw-card:hover .aw-card-corner { opacity: 0.8; }

        /* ═════════════════════════════════════════════════
           Tablet / Mobile — convert to vertical timeline
           ═════════════════════════════════════════════════ */
        @media (max-width: 860px) {
          .aw-track {
            --rail-x: clamp(16px, 4vw, 22px);
          }
          .aw-rail,
          .aw-rail-fill {
            top: 0; bottom: 0;
            left: var(--rail-x);
            right: auto;
            width: 1px;
            height: auto;
          }
          .aw-rail-fill {
            background: linear-gradient(180deg,
              rgba(0,3,163,0) 0%,
              rgba(0,3,163,0.65) 8%,
              rgba(0,3,163,0.65) 92%,
              rgba(0,3,163,0) 100%);
            transform-origin: top center;
            transform: scaleY(0);
          }
          .aw-in .aw-rail-fill {
            animation: aw-rail-draw-v 2s cubic-bezier(0.83, 0, 0.17, 1) 0.25s forwards;
          }
          @keyframes aw-rail-draw-v { to { transform: scaleY(1); } }
          .aw-rail-ptr { display: none; }

          .aw-items {
            grid-template-columns: 1fr;
            gap: clamp(1.6rem, 4vw, 2.2rem);
          }
          .aw-item {
            display: grid;
            grid-template-columns: auto auto 1fr;
            grid-template-rows: auto auto;
            align-items: start;
            text-align: left;
            column-gap: clamp(0.8rem, 2vw, 1.2rem);
            padding-left: 0;
          }
          .aw-year {
            grid-column: 3 / 4;
            grid-row: 1 / 2;
            font-size: clamp(1.6rem, 6vw, 2.2rem);
            margin-bottom: 0.6rem;
            justify-self: start;
          }
          .aw-conn {
            display: none;
          }
          .aw-dot {
            grid-column: 1 / 2;
            grid-row: 1 / 3;
            margin-top: 0.25em;
            margin-bottom: 0;
            margin-left: calc(var(--rail-x) - 8px);
          }
          .aw-card {
            grid-column: 3 / 4;
            grid-row: 2 / 3;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .aw-rail-fill,
          .aw-rail-ptr,
          .aw-digit > span,
          .aw-conn,
          .aw-dot-core,
          .aw-dot-pulse,
          .aw-card {
            animation: none !important;
            transform: none !important;
            opacity: 1 !important;
            clip-path: none !important;
          }
        }
      `}</style>
    </section>
  )
}
