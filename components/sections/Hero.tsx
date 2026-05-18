'use client'

import { useEffect, useRef } from 'react'

const STATS = [
  { value: '34', sup: '+', label: '年临床积淀' },
  { value: '5', sup: '项', label: '国家级科技进步奖' },
  { value: '91.4', sup: '%', label: '脑瘫超早期诊断准确率' },
]

const CREDENTIALS = [
  { org: '中国妇幼保健协会', role: '主任委员单位' },
  { org: '中国优生优育协会 婴幼儿发育专委会', role: '主任委员单位' },
  { org: '中国优生优育协会 婴幼儿发育专委会', role: '培训基地' },
]

// Split a string into per-character spans for staggered reveal
function SplitChars({
  text,
  baseDelay = 0,
  step = 0.04,
  className,
  italic = false,
}: {
  text: string
  baseDelay?: number
  step?: number
  className?: string
  italic?: boolean
}) {
  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          className="hero-char"
          style={{
            display: 'inline-block',
            animationDelay: `${baseDelay + i * step}s`,
            fontStyle: italic ? 'italic' : undefined,
          }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const auraRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const id = requestAnimationFrame(() => {
      el.classList.add('hero-revealed')
    })
    return () => cancelAnimationFrame(id)
  }, [])

  // Cursor-following soft glow (desktop only)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return
    const el = containerRef.current
    const aura = auraRef.current
    if (!el || !aura) return

    let raf = 0
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      tx = e.clientX - rect.left
      ty = e.clientY - rect.top
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const tick = () => {
      cx += (tx - cx) * 0.09
      cy += (ty - cy) * 0.09
      aura.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      if (Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
      }
    }
    el.addEventListener('mousemove', onMove)
    return () => {
      el.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <section
        ref={containerRef}
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100svh',
          background: 'var(--blue)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 68,
          isolation: 'isolate',
        }}
      >
        {/* Background video */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/video/company.mp4" type="video/mp4" />
        </video>

        {/* Color overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,3,163,0.58) 0%, rgba(0,3,163,0.66) 55%, rgba(0,2,107,0.82) 100%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Subtle vertical hairlines — pure typographic structure, no spinning */}
        <div className="hero-rails" aria-hidden="true">
          {[0.2, 0.4, 0.6, 0.8].map((pct) => (
            <span key={pct} style={{ left: `${pct * 100}%` }} />
          ))}
        </div>

        {/* Cursor aura */}
        <div
          ref={auraRef}
          aria-hidden="true"
          className="hero-aura"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 560,
            height: 560,
            marginLeft: -280,
            marginTop: -280,
            background:
              'radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 38%, rgba(255,255,255,0) 65%)',
            mixBlendMode: 'screen',
            pointerEvents: 'none',
            zIndex: 2,
            opacity: 0,
            transition: 'opacity 1.2s ease',
            willChange: 'transform',
          }}
        />

        {/* Main content */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            maxWidth: 1280,
            margin: '0 auto',
            padding: 'clamp(2.5rem, 6vw, 5rem) clamp(1.25rem, 3vw, 2rem)',
            width: '100%',
          }}
        >
          {/* Top eyebrow */}
          <div className="hero-eyebrow">
            <span aria-hidden="true" className="hero-eyebrow-rule" />
            <span className="hero-eyebrow-text">
              <SplitChars text="国家级临床机构 · 北京" step={0.025} />
            </span>
          </div>

          {/* H1 */}
          <h1 className="hero-h1">
            <span className="hero-h1-row">
              <SplitChars text="守护生命" baseDelay={0.15} step={0.05} />
            </span>
            <span className="hero-h1-row">
              <SplitChars text="最初一千天" baseDelay={0.35} step={0.05} />
            </span>
          </h1>

          {/* Lede — professional positioning */}
          <p className="hero-lede">
            <span className="hero-line" style={{ animationDelay: '0.85s' }}>
              中国新生儿行为评估与高危儿早期干预的临床先驱
            </span>
            <span className="hero-line hero-lede-sub" style={{ animationDelay: '0.98s' }}>
              以三十余年循证研究与五项国家级科技奖为基石，护航儿童早期发展。
            </span>
          </p>

          {/* Credentials — 三家学会任职，更精致的卡片式排版 */}
          <div className="hero-creds" aria-label="学会任职">
            {CREDENTIALS.map((c, i) => (
              <article
                key={i}
                className="hero-cred"
                style={{ animationDelay: `${1.18 + i * 0.11}s` }}
              >
                <span className="hero-cred-num">0{i + 1}</span>
                <div className="hero-cred-body">
                  <div className="hero-cred-org">{c.org}</div>
                  <div className="hero-cred-role">{c.role}</div>
                </div>
              </article>
            ))}
          </div>

          {/* Stats strip */}
          <div className="hero-stats">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="hero-line hero-stat"
                style={{ animationDelay: `${1.55 + i * 0.09}s` }}
              >
                <div className="hero-stat-value">
                  {s.value}
                  {s.sup && <sup>{s.sup}</sup>}
                </div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div aria-hidden="true" className="scroll-indicator">
          <span className="scroll-indicator-text">向下滚动</span>
          <div className="scroll-indicator-track">
            <div className="scroll-indicator-thumb" />
          </div>
        </div>
      </section>

      <style>{`
        /* ── Background video ── */
        .hero-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          z-index: 0; pointer-events: none;
          opacity: 0;
          animation: heroVideoIn 2.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        }
        @keyframes heroVideoIn {
          from { opacity: 0; transform: scale(1.06); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* ── Vertical hairlines (draw-down) ── */
        .hero-rails { position: absolute; inset: 0; z-index: 2; pointer-events: none; }
        .hero-rails span {
          position: absolute; top: 0; bottom: 0;
          width: 1px;
          background: linear-gradient(180deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.16) 15%,
            rgba(255,255,255,0.16) 85%,
            rgba(255,255,255,0) 100%);
          transform-origin: top center;
          transform: scaleY(0);
          animation: heroRail 2.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-rails span:nth-child(1) { animation-delay: 0.3s; }
        .hero-rails span:nth-child(2) { animation-delay: 0.42s; }
        .hero-rails span:nth-child(3) { animation-delay: 0.54s; }
        .hero-rails span:nth-child(4) { animation-delay: 0.66s; }
        @keyframes heroRail {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }

        #hero:hover .hero-aura { opacity: 1; }

        /* ── Top eyebrow ── */
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 0.85rem;
          margin-bottom: clamp(1.4rem, 3vw, 2.2rem);
          opacity: 0;
          animation: heroFadeIn 1.1s cubic-bezier(0.16,1,0.3,1) 0.15s forwards;
        }
        .hero-eyebrow-rule {
          display: inline-block; width: 32px; height: 1px;
          background: rgba(255,255,255,0.55);
          transform-origin: left center; transform: scaleX(0);
          animation: heroLine 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s forwards;
        }
        @keyframes heroLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .hero-eyebrow-text {
          font-family: var(--sans);
          font-size: 0.7rem;
          letter-spacing: 0.24em;
          color: rgba(255,255,255,0.7);
        }

        /* ── Per-character reveal ── */
        .hero-char {
          opacity: 0;
          transform: translateY(0.6em);
          animation: heroCharIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes heroCharIn {
          from { opacity: 0; transform: translateY(0.6em); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── H1 ── */
        .hero-h1 {
          font-family: var(--serif-cn);
          font-weight: 300;
          line-height: 1.02;
          letter-spacing: -0.02em;
          font-size: clamp(3.6rem, 10vw, 9rem);
          color: #ffffff;
          margin-bottom: clamp(1.6rem, 3vw, 2.4rem);
        }
        .hero-h1-row { display: block; overflow: hidden; }

        /* ── Lede ── */
        .hero-lede {
          max-width: 720px;
          margin-bottom: clamp(2.4rem, 4.5vw, 3.5rem);
        }
        .hero-lede .hero-line { display: block; }
        .hero-lede > span:first-child {
          font-family: var(--serif-cn);
          font-size: clamp(1.05rem, 1.55vw, 1.4rem);
          line-height: 1.45;
          color: #ffffff;
          letter-spacing: 0.01em;
        }
        .hero-lede-sub {
          margin-top: 0.7rem !important;
          font-family: var(--sans) !important;
          font-size: clamp(0.86rem, 1.05vw, 0.98rem) !important;
          line-height: 1.7 !important;
          color: rgba(255,255,255,0.7) !important;
          letter-spacing: 0.02em !important;
        }

        /* ── Credentials ── */
        .hero-creds {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(0.6rem, 1.5vw, 1.5rem);
          margin-bottom: clamp(2.4rem, 4.5vw, 3.5rem);
        }
        .hero-cred {
          position: relative;
          padding: clamp(1.1rem, 2vw, 1.5rem) clamp(1rem, 1.8vw, 1.4rem);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.14);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          gap: 0.9rem;
          align-items: flex-start;
          opacity: 0;
          transform: translateY(20px);
          animation: heroFadeUp 1.1s cubic-bezier(0.16,1,0.3,1) forwards;
          transition: background 0.4s ease, border-color 0.4s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .hero-cred::after {
          content: '';
          position: absolute;
          left: 0; bottom: 0;
          height: 1px; width: 0;
          background: rgba(255,255,255,0.55);
          transition: width 0.55s cubic-bezier(0.22,1,0.36,1);
        }
        .hero-cred:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.28);
          transform: translateY(-3px);
        }
        .hero-cred:hover::after { width: 100%; }

        .hero-cred-num {
          font-family: var(--serif-en);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(1rem, 1.4vw, 1.2rem);
          color: rgba(255,255,255,0.55);
          line-height: 1;
          flex-shrink: 0;
          padding-top: 0.15em;
          letter-spacing: -0.02em;
        }
        .hero-cred-body { display: flex; flex-direction: column; gap: 0.45rem; }
        .hero-cred-org {
          font-family: var(--sans);
          font-size: clamp(0.66rem, 0.85vw, 0.74rem);
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.6);
          line-height: 1.4;
        }
        .hero-cred-role {
          font-family: var(--serif-cn);
          font-size: clamp(1rem, 1.3vw, 1.18rem);
          font-weight: 400;
          color: #ffffff;
          line-height: 1.3;
          letter-spacing: 0.02em;
        }

        /* ── Stats ── */
        .hero-stats {
          display: flex;
          gap: clamp(1.5rem, 4vw, 3.5rem);
          padding-top: clamp(1.4rem, 2.5vw, 1.9rem);
          border-top: 1px solid rgba(255,255,255,0.18);
        }
        .hero-stat-value {
          font-family: var(--serif-en);
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          font-weight: 300;
          font-style: italic;
          color: #ffffff;
          line-height: 1;
          margin-bottom: 0.4rem;
          letter-spacing: -0.02em;
        }
        .hero-stat-value sup {
          font-family: var(--serif-cn);
          font-size: 0.35em;
          font-style: normal;
          vertical-align: super;
          margin-left: 0.1em;
          color: rgba(255,255,255,0.65);
        }
        .hero-stat-label {
          font-family: var(--sans);
          font-size: 0.74rem;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.55);
          line-height: 1.4;
        }

        /* ── Generic hero-line ── */
        .hero-line {
          opacity: 0;
          transform: translateY(22px);
          animation: heroFadeUp 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* ── Scroll indicator ── */
        .scroll-indicator {
          position: absolute;
          right: 2.5rem; bottom: 2.5rem;
          display: flex; flex-direction: column; align-items: center; gap: 0.7rem;
          z-index: 3;
          opacity: 0;
          animation: heroFadeIn 1s cubic-bezier(0.16,1,0.3,1) 2s forwards;
        }
        .scroll-indicator-text {
          font-family: var(--sans);
          font-size: 0.6rem;
          letter-spacing: 0.24em;
          color: rgba(255,255,255,0.5);
          writing-mode: vertical-rl;
        }
        .scroll-indicator-track {
          width: 1px; height: 60px;
          background: rgba(255,255,255,0.18);
          position: relative; overflow: hidden;
        }
        .scroll-indicator-thumb {
          position: absolute; top: 0; left: 0; right: 0;
          height: 40%;
          background: rgba(255,255,255,0.75);
          animation: scrollDrop 2.4s cubic-bezier(0.45,0,0.55,1) infinite;
        }
        @keyframes scrollDrop {
          0%   { transform: translateY(-100%); opacity: 1; }
          80%  { transform: translateY(280%);  opacity: 0.4; }
          100% { transform: translateY(280%);  opacity: 0; }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero-creds { grid-template-columns: 1fr !important; gap: 0.6rem !important; }
        }
        @media (max-width: 768px) {
          .hero-stats { flex-wrap: wrap; gap: 1.6rem !important; }
          .scroll-indicator { display: none !important; }
          .hero-rails span:nth-child(1),
          .hero-rails span:nth-child(4) { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-video { animation: none; opacity: 1; transform: none; }
          .hero-char,
          .hero-line,
          .hero-cred,
          .hero-eyebrow,
          .hero-eyebrow-rule,
          .hero-rails span,
          .scroll-indicator {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  )
}
