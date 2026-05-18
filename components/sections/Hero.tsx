'use client'

import { useEffect, useRef } from 'react'

const CREDENTIALS = [
  { idx: 'I', org: '中国妇幼保健协会', role: '主任委员单位' },
  { idx: 'II', org: '中国优生优育协会·婴幼儿发育专委会', role: '主任委员单位' },
  { idx: 'III', org: '中国优生优育协会·婴幼儿发育专委会', role: '培训基地' },
]

/**
 * MaskChars
 * 每个字符放进 overflow:hidden 的容器，内部 span 从 translateY(110%) → 0
 * 这是 awwwards/editorial 网站最经典的入场效果——"幕布式"逐字揭幕
 */
function MaskChars({
  text,
  baseDelay = 0,
  step = 0.045,
  className,
}: {
  text: string
  baseDelay?: number
  step?: number
  className?: string
}) {
  const chars = Array.from(text)
  return (
    <span className={className} style={{ display: 'inline-block', verticalAlign: 'top' }}>
      {chars.map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="mask"
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}
        >
          <span
            className="mask-inner"
            style={{
              display: 'inline-block',
              transform: 'translateY(110%)',
              animationDelay: `${baseDelay + i * step}s`,
            }}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        </span>
      ))}
      <span style={{ position: 'absolute', left: -9999 }}>{text}</span>
    </span>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const auraRef = useRef<HTMLDivElement>(null)

  // Trigger reveal class shortly after mount
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const id = requestAnimationFrame(() => el.classList.add('is-ready'))
    return () => cancelAnimationFrame(id)
  }, [])

  // Mouse-driven parallax — gentle drift of title block & cursor aura
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    const section = sectionRef.current
    const title = titleRef.current
    const aura = auraRef.current
    if (!section || !title || !aura) return

    let raf = 0
    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0,
      ax = 0,
      ay = 0

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const cx = (e.clientX - rect.left) / rect.width - 0.5 // -0.5 ~ 0.5
      const cy = (e.clientY - rect.top) / rect.height - 0.5
      mx = cx
      my = cy
      ax = e.clientX - rect.left
      ay = e.clientY - rect.top
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const tick = () => {
      tx += (mx * 12 - tx) * 0.06
      ty += (my * 8 - ty) * 0.06
      title.style.transform = `translate3d(${tx}px, ${ty}px, 0)`

      const cur = aura.style.transform
      // smooth follow aura position
      const m = cur.match(/translate3d\(([-\d.]+)px, ?([-\d.]+)px/)
      const curX = m ? parseFloat(m[1]) : ax
      const curY = m ? parseFloat(m[2]) : ay
      const nx = curX + (ax - curX) * 0.1
      const ny = curY + (ay - curY) * 0.1
      aura.style.transform = `translate3d(${nx}px, ${ny}px, 0)`

      if (
        Math.abs(mx * 12 - tx) > 0.2 ||
        Math.abs(my * 8 - ty) > 0.2 ||
        Math.abs(ax - nx) > 0.5
      ) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
      }
    }
    section.addEventListener('mousemove', onMove)
    return () => {
      section.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <section ref={sectionRef} id="hero" className="hero">
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
        <div aria-hidden="true" className="hero-overlay" />

        {/* Cursor aura */}
        <div ref={auraRef} aria-hidden="true" className="hero-aura" />

        {/* ── Top frame markers ── */}
        <div className="hero-frame">
          {/* Top-left: clinical pioneer marker */}
          <div className="hero-marker hero-marker-tl">
            <span className="hero-marker-dot" aria-hidden="true" />
            <span className="hero-marker-text">
              临床先驱 &nbsp;·&nbsp; <i>Clinical Pioneer</i>
            </span>
          </div>

          {/* Top-right: brand mark */}
          <div className="hero-marker hero-marker-tr">
            <span className="hero-marker-text">
              <i>Est.</i> 1991
            </span>
            <span className="hero-marker-rule" aria-hidden="true" />
            <span className="hero-marker-text small">N°&nbsp;BAOXIULAN</span>
          </div>
        </div>

        {/* ── Main composition ── */}
        <div className="hero-stage">
          {/* Section No. — left vertical anchor */}
          <div className="hero-anchor" aria-hidden="true">
            <span className="hero-anchor-no">01</span>
            <span className="hero-anchor-rule" />
            <span className="hero-anchor-label">Manifesto</span>
          </div>

          <div className="hero-content">
            <h1 ref={titleRef} className="hero-h1">
              <span className="hero-h1-row">
                <MaskChars text="最初的一千天，" baseDelay={0.45} step={0.045} />
              </span>
              <span className="hero-h1-row">
                <MaskChars text="决定一生的可能。" baseDelay={0.78} step={0.045} />
              </span>
            </h1>

            <div className="hero-sub">
              <span className="hero-sub-en">
                <MaskChars
                  text="The first thousand days shape a lifetime."
                  baseDelay={1.25}
                  step={0.018}
                />
              </span>
              <span className="hero-sub-attr">
                <span className="hero-sub-attr-rule" aria-hidden="true" />
                <span>创始人 ·&nbsp;</span>
                <i>鲍秀兰&nbsp;教授</i>
              </span>
            </div>
          </div>
        </div>

        {/* ── Bottom credentials band ── */}
        <div className="hero-band">
          <div className="hero-band-rule" aria-hidden="true" />
          <ol className="hero-affs">
            {CREDENTIALS.map((c, i) => (
              <li
                key={i}
                className="hero-aff"
                style={{ ['--d' as string]: `${1.85 + i * 0.13}s` }}
              >
                <span className="hero-aff-idx">{c.idx}</span>
                <div className="hero-aff-body">
                  <div className="hero-aff-org">{c.org}</div>
                  <div className="hero-aff-role">
                    <span className="hero-aff-role-mark" aria-hidden="true" />
                    {c.role}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Scroll indicator */}
        <div aria-hidden="true" className="scroll-ind">
          <span className="scroll-ind-text">SCROLL · 向下滚动</span>
          <div className="scroll-ind-track">
            <div className="scroll-ind-thumb" />
          </div>
        </div>
      </section>

      <style>{`
        /* ╔════════════════════════════════════════════════════
           ║  HERO  —  editorial layout, mask-reveal typography
           ╚════════════════════════════════════════════════════ */
        .hero {
          position: relative;
          min-height: 100svh;
          background: var(--blue);
          overflow: hidden;
          padding-top: 68px;
          isolation: isolate;
          color: #ffffff;
          font-family: var(--sans);
          display: grid;
          grid-template-rows: auto 1fr auto;
        }

        /* ── Video + overlay ── */
        .hero-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          z-index: 0; pointer-events: none;
          opacity: 0;
          animation: heroVideoIn 2.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }
        @keyframes heroVideoIn {
          from { opacity: 0; transform: scale(1.08); }
          to   { opacity: 1; transform: scale(1); }
        }
        .hero-overlay {
          position: absolute; inset: 0; z-index: 1;
          pointer-events: none;
          background:
            radial-gradient(ellipse 80% 60% at 20% 70%, rgba(0,2,107,0.45) 0%, rgba(0,2,107,0) 60%),
            linear-gradient(180deg, rgba(0,3,163,0.55) 0%, rgba(0,3,163,0.62) 50%, rgba(0,2,107,0.82) 100%);
        }
        .hero-aura {
          position: absolute; top: 0; left: 0;
          width: 640px; height: 640px;
          margin: -320px 0 0 -320px;
          background: radial-gradient(circle,
            rgba(255,255,255,0.16) 0%,
            rgba(255,255,255,0.05) 38%,
            rgba(255,255,255,0) 65%);
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 2;
          opacity: 0;
          transition: opacity 1s ease;
          will-change: transform;
        }
        .hero:hover .hero-aura { opacity: 1; }

        /* ╔══════════ Top frame ══════════ */
        .hero-frame {
          position: relative;
          z-index: 3;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: clamp(1.4rem, 2.5vw, 2rem) clamp(1.5rem, 3.5vw, 2.5rem) 0;
        }
        .hero-marker {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 0.66rem;
          letter-spacing: 0.22em;
          color: rgba(255,255,255,0.65);
          text-transform: uppercase;
          opacity: 0;
          animation: heroFade 1s cubic-bezier(0.16,1,0.3,1) 0.25s forwards;
        }
        .hero-marker-text { font-feature-settings: 'ss01'; }
        .hero-marker-text i {
          font-family: var(--serif-en);
          font-style: italic;
          letter-spacing: 0.02em;
          font-size: 1.05em;
          color: rgba(255,255,255,0.85);
          text-transform: none;
        }
        .hero-marker-text.small { font-size: 0.6rem; opacity: 0.7; }
        .hero-marker-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          box-shadow: 0 0 0 0 rgba(255,255,255,0.5);
          animation: heroPulse 2.6s cubic-bezier(0.4,0,0.2,1) 2s infinite;
        }
        @keyframes heroPulse {
          0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0.45); }
          70%  { box-shadow: 0 0 0 9px rgba(255,255,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }
        .hero-marker-tr {
          flex-direction: row;
          gap: 0.85rem;
        }
        .hero-marker-rule {
          width: 36px; height: 1px;
          background: rgba(255,255,255,0.35);
          transform-origin: left center;
          transform: scaleX(0);
          animation: heroLineX 1s cubic-bezier(0.16,1,0.3,1) 0.55s forwards;
        }
        @keyframes heroLineX { to { transform: scaleX(1); } }

        /* ╔══════════ Stage ══════════ */
        .hero-stage {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: clamp(1.5rem, 4vw, 3.5rem);
          align-items: end;
          padding: clamp(2rem, 6vw, 5rem) clamp(1.5rem, 3.5vw, 2.5rem) 0;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }
        .hero-anchor {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.85rem;
          padding-bottom: 0.8rem;
          opacity: 0;
          animation: heroFade 1.1s cubic-bezier(0.16,1,0.3,1) 0.4s forwards;
        }
        .hero-anchor-no {
          font-family: var(--serif-en);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(1.2rem, 1.6vw, 1.6rem);
          color: rgba(255,255,255,0.85);
          letter-spacing: -0.02em;
        }
        .hero-anchor-rule {
          width: 1px; height: clamp(64px, 11vw, 110px);
          background: linear-gradient(180deg,
            rgba(255,255,255,0.5) 0%,
            rgba(255,255,255,0) 100%);
          transform-origin: top center; transform: scaleY(0);
          animation: heroLineY 1.4s cubic-bezier(0.16,1,0.3,1) 0.55s forwards;
        }
        @keyframes heroLineY { to { transform: scaleY(1); } }
        .hero-anchor-label {
          font-family: var(--serif-en);
          font-style: italic;
          font-weight: 300;
          font-size: 0.65rem;
          letter-spacing: 0.24em;
          color: rgba(255,255,255,0.55);
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }

        .hero-content { width: 100%; min-width: 0; }

        /* ── Title ── */
        .hero-h1 {
          font-family: var(--serif-cn);
          font-weight: 300;
          line-height: 1.0;
          letter-spacing: -0.015em;
          font-size: clamp(3.2rem, 11vw, 10.5rem);
          color: #ffffff;
          margin: 0 0 clamp(1.2rem, 2.8vw, 2rem) 0;
          transform: translate3d(0,0,0);
          will-change: transform;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hero-h1-row {
          display: block;
          overflow: visible; /* per-char mask handles clipping */
          line-height: 1.0;
          padding-bottom: 0.05em; /* room for descenders during transform */
        }
        .hero-h1-row + .hero-h1-row { margin-top: 0.04em; }

        /* Per-char mask reveal — the heart of the editorial feel */
        .mask {
          line-height: 1.05;
          padding-bottom: 0.06em;
        }
        .mask-inner {
          will-change: transform;
          animation: maskRise 1.4s cubic-bezier(0.85, 0, 0.15, 1) forwards;
        }
        @keyframes maskRise {
          from { transform: translateY(110%); }
          to   { transform: translateY(0); }
        }

        /* ── Sub ── */
        .hero-sub {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: clamp(1rem, 2.5vw, 2rem);
          max-width: 820px;
        }
        .hero-sub-en {
          font-family: var(--serif-en);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(1rem, 1.6vw, 1.4rem);
          line-height: 1.4;
          color: rgba(255,255,255,0.82);
          letter-spacing: 0.005em;
        }
        .hero-sub-attr {
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.55);
          opacity: 0;
          animation: heroFade 1.1s cubic-bezier(0.16,1,0.3,1) 1.65s forwards;
        }
        .hero-sub-attr i {
          font-family: var(--serif-cn);
          font-style: normal;
          color: rgba(255,255,255,0.85);
          font-size: 0.86rem;
          letter-spacing: 0.04em;
        }
        .hero-sub-attr-rule {
          display: inline-block;
          width: 28px; height: 1px;
          background: rgba(255,255,255,0.45);
        }

        /* ╔══════════ Bottom credentials band ══════════ */
        .hero-band {
          position: relative;
          z-index: 3;
          padding: clamp(1.4rem, 3vw, 2.4rem) clamp(1.5rem, 3.5vw, 2.5rem) clamp(2rem, 4vw, 3rem);
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }
        .hero-band-rule {
          height: 1px;
          background: rgba(255,255,255,0.16);
          transform-origin: left center;
          transform: scaleX(0);
          animation: heroLineX 1.4s cubic-bezier(0.16,1,0.3,1) 1.7s forwards;
          margin-bottom: clamp(1.2rem, 2.4vw, 1.8rem);
        }
        .hero-affs {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 2.5vw, 2.5rem);
          margin: 0; padding: 0;
        }
        .hero-aff {
          display: flex;
          gap: clamp(0.75rem, 1.4vw, 1.1rem);
          opacity: 0;
          transform: translateY(16px);
          animation: heroAffIn 1.1s cubic-bezier(0.16,1,0.3,1) var(--d) forwards;
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .hero-aff:hover { transform: translateY(-4px); }
        @keyframes heroAffIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-aff-idx {
          font-family: var(--serif-en);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(1.3rem, 1.8vw, 1.7rem);
          line-height: 1;
          color: rgba(255,255,255,0.55);
          letter-spacing: -0.02em;
          padding-top: 0.1em;
          min-width: 1.5em;
        }
        .hero-aff-body { display: flex; flex-direction: column; gap: 0.5rem; min-width: 0; }
        .hero-aff-org {
          font-family: var(--sans);
          font-size: clamp(0.7rem, 0.92vw, 0.78rem);
          letter-spacing: 0.12em;
          line-height: 1.5;
          color: rgba(255,255,255,0.62);
        }
        .hero-aff-role {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-family: var(--serif-cn);
          font-size: clamp(1rem, 1.35vw, 1.22rem);
          font-weight: 400;
          line-height: 1.25;
          color: #ffffff;
          letter-spacing: 0.02em;
        }
        .hero-aff-role-mark {
          width: 6px; height: 6px;
          background: #ffffff;
          flex-shrink: 0;
          transform: rotate(45deg);
          opacity: 0.85;
        }

        /* ╔══════════ Scroll indicator ══════════ */
        .scroll-ind {
          position: absolute;
          right: clamp(1.5rem, 3vw, 2.5rem);
          bottom: clamp(1.5rem, 3vw, 2.5rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.7rem;
          z-index: 4;
          opacity: 0;
          animation: heroFade 1s cubic-bezier(0.16,1,0.3,1) 2.5s forwards;
        }
        .scroll-ind-text {
          font-family: var(--sans);
          font-size: 0.58rem;
          letter-spacing: 0.28em;
          color: rgba(255,255,255,0.45);
          writing-mode: vertical-rl;
        }
        .scroll-ind-track {
          width: 1px; height: 64px;
          background: rgba(255,255,255,0.18);
          position: relative; overflow: hidden;
        }
        .scroll-ind-thumb {
          position: absolute; top: 0; left: 0; right: 0;
          height: 42%;
          background: rgba(255,255,255,0.8);
          animation: scrollDrop 2.4s cubic-bezier(0.45,0,0.55,1) infinite;
        }
        @keyframes scrollDrop {
          0%   { transform: translateY(-100%); opacity: 1; }
          80%  { transform: translateY(260%);  opacity: 0.3; }
          100% { transform: translateY(260%);  opacity: 0; }
        }
        @keyframes heroFade { to { opacity: 1; } }

        /* ╔══════════ Responsive ══════════ */
        @media (max-width: 980px) {
          .hero-affs { grid-template-columns: 1fr; gap: 0.9rem; }
          .hero-aff-body { gap: 0.3rem; }
          .hero-marker-tr .hero-marker-text.small { display: none; }
        }
        @media (max-width: 768px) {
          .hero-stage { grid-template-columns: 1fr; }
          .hero-anchor { display: none; }
          .scroll-ind { display: none; }
          .hero-h1 { font-size: clamp(2.9rem, 12vw, 5.5rem); }
          .hero-marker-text i { font-size: 1em; }
        }
        @media (max-width: 540px) {
          .hero-marker-tr .hero-marker-rule { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-video { animation: none; opacity: 1; transform: none; }
          .mask-inner,
          .hero-marker,
          .hero-anchor,
          .hero-anchor-rule,
          .hero-marker-rule,
          .hero-band-rule,
          .hero-aff,
          .hero-sub-attr,
          .scroll-ind {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </>
  )
}
