'use client'

import { useEffect, useRef } from 'react'

const CREDENTIALS = [
  { idx: '一', org: '中国妇幼保健协会', role: '主任委员单位' },
  { idx: '二', org: '中国优生优育协会 婴幼儿发育专委会', role: '主任委员单位' },
  { idx: '三', org: '中国优生优育协会 婴幼儿发育专委会', role: '培训基地' },
]

const POSITIONING = [
  '中国新生儿行为评估与早期干预的临床先驱',
  '三十四载循证积淀，五项国家科技进步奖',
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const id = requestAnimationFrame(() => el.classList.add('is-ready'))
    return () => cancelAnimationFrame(id)
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

        {/* ── Top bar ── */}
        <div className="hero-topbar">
          <span className="hero-topbar-mark" aria-hidden="true" />
          <span className="hero-topbar-text">宝秀兰医疗 &nbsp;·&nbsp; 北京</span>
        </div>

        {/* ── Right vertical year ── */}
        <div className="hero-vertical" aria-hidden="true">
          <span className="hero-vertical-rule" />
          <span className="hero-vertical-text">
            <span>一</span>
            <span>九</span>
            <span>九</span>
            <span>一</span>
            <span>年</span>
            <span>创</span>
            <span>立</span>
          </span>
        </div>

        {/* ── Stage ── */}
        <div className="hero-stage">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-rule" aria-hidden="true" />
            <span>宗旨</span>
          </div>

          <h1 className="hero-h1">
            <span className="hero-h1-line"><span>守护生命</span></span>
            <span className="hero-h1-line"><span>最初一千天</span></span>
          </h1>

          <div className="hero-position">
            {POSITIONING.map((line, i) => (
              <p key={i} className="hero-position-line" style={{ ['--d' as string]: `${1.1 + i * 0.16}s` }}>
                <span className="hero-position-mark" aria-hidden="true" />
                {line}
              </p>
            ))}
          </div>

          {/* Founder attribution — classical, restrained */}
          <div className="hero-attr">
            <span className="hero-attr-rule" aria-hidden="true" />
            <span className="hero-attr-label">创始人</span>
            <span className="hero-attr-name">鲍秀兰&nbsp;教授</span>
          </div>
        </div>

        {/* ── Bottom credentials ── */}
        <div className="hero-band">
          <div className="hero-band-rule" aria-hidden="true" />
          <ol className="hero-affs">
            {CREDENTIALS.map((c, i) => (
              <li
                key={i}
                className="hero-aff"
                style={{ ['--d' as string]: `${2.0 + i * 0.14}s` }}
              >
                <span className="hero-aff-idx">{c.idx}</span>
                <div className="hero-aff-body">
                  <div className="hero-aff-org">{c.org}</div>
                  <div className="hero-aff-role">{c.role}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Bottom-right discreet scroll cue */}
        <div aria-hidden="true" className="hero-scroll">
          <span className="hero-scroll-text">向 下</span>
          <span className="hero-scroll-line" />
        </div>
      </section>

      <style>{`
        /* ═════════════════════════════════════════════════════════
           HERO  —  classical Chinese institutional composition
           ═════════════════════════════════════════════════════════ */
        .hero {
          position: relative;
          min-height: 100svh;
          background: var(--blue);
          overflow: hidden;
          padding-top: 68px;
          isolation: isolate;
          color: #ffffff;
          font-family: var(--serif-cn);
          display: grid;
          grid-template-rows: auto 1fr auto;
        }

        /* Video */
        .hero-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          z-index: 0; pointer-events: none;
          opacity: 0;
          animation: heroVideoIn 2.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        }
        @keyframes heroVideoIn {
          from { opacity: 0; transform: scale(1.06); }
          to   { opacity: 1; transform: scale(1); }
        }
        .hero-overlay {
          position: absolute; inset: 0; z-index: 1;
          pointer-events: none;
          background:
            radial-gradient(ellipse 70% 55% at 25% 65%, rgba(0,2,107,0.4) 0%, rgba(0,2,107,0) 60%),
            linear-gradient(180deg, rgba(0,3,163,0.58) 0%, rgba(0,3,163,0.66) 50%, rgba(0,2,107,0.84) 100%);
        }

        /* ── Top bar ── */
        .hero-topbar {
          position: relative; z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
          padding: clamp(1.4rem, 2.5vw, 2rem) clamp(1.5rem, 4vw, 3rem);
          opacity: 0;
          animation: heroFade 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s forwards;
        }
        .hero-topbar-mark {
          width: 8px; height: 8px;
          background: #ffffff;
          flex-shrink: 0;
          opacity: 0.9;
          transform: rotate(45deg);
        }
        .hero-topbar-text {
          font-family: var(--serif-cn);
          font-size: 0.82rem;
          letter-spacing: 0.4em;
          color: rgba(255,255,255,0.75);
          font-weight: 400;
        }

        /* ── Right vertical year ── */
        .hero-vertical {
          position: absolute;
          top: clamp(7rem, 12vw, 10rem);
          right: clamp(1.5rem, 3.5vw, 3rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(0.8rem, 1.6vw, 1.2rem);
          z-index: 3;
        }
        .hero-vertical-rule {
          width: 1px;
          height: clamp(70px, 11vw, 110px);
          background: linear-gradient(180deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.55) 30%,
            rgba(255,255,255,0.55) 70%,
            rgba(255,255,255,0) 100%);
          transform-origin: top center;
          transform: scaleY(0);
          animation: heroLineY 1.5s cubic-bezier(0.16,1,0.3,1) 0.6s forwards;
        }
        @keyframes heroLineY { to { transform: scaleY(1); } }
        .hero-vertical-text {
          font-family: var(--serif-cn);
          font-size: clamp(0.78rem, 1vw, 0.92rem);
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.7);
          line-height: 2;
          font-weight: 400;
          writing-mode: vertical-rl;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .hero-vertical-text > span {
          display: inline-block;
          opacity: 0;
          transform: translateY(-6px);
          animation: heroFadeDown 0.85s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .hero-vertical-text > span:nth-child(1) { animation-delay: 0.85s; }
        .hero-vertical-text > span:nth-child(2) { animation-delay: 0.93s; }
        .hero-vertical-text > span:nth-child(3) { animation-delay: 1.01s; }
        .hero-vertical-text > span:nth-child(4) { animation-delay: 1.09s; }
        .hero-vertical-text > span:nth-child(5) { animation-delay: 1.17s; }
        .hero-vertical-text > span:nth-child(6) { animation-delay: 1.25s; }
        .hero-vertical-text > span:nth-child(7) { animation-delay: 1.33s; }
        @keyframes heroFadeDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ╔══════════ Stage ══════════ */
        .hero-stage {
          position: relative;
          z-index: 3;
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
          padding: clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 4vw, 3rem);
          display: flex;
          flex-direction: column;
          gap: clamp(1.2rem, 2.5vw, 1.8rem);
          align-self: center;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          font-family: var(--serif-cn);
          font-size: 0.78rem;
          letter-spacing: 0.5em;
          color: rgba(255,255,255,0.65);
          padding-left: 0.3em;
          opacity: 0;
          animation: heroFade 1.1s cubic-bezier(0.16,1,0.3,1) 0.55s forwards;
        }
        .hero-eyebrow-rule {
          width: 28px; height: 1px;
          background: rgba(255,255,255,0.55);
          transform-origin: left center; transform: scaleX(0);
          animation: heroLineX 1s cubic-bezier(0.16,1,0.3,1) 0.7s forwards;
        }
        @keyframes heroLineX { to { transform: scaleX(1); } }

        /* ── Title ── */
        .hero-h1 {
          font-family: var(--serif-cn);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: 0.12em;
          font-size: clamp(3.2rem, 9.5vw, 8.8rem);
          color: #ffffff;
          margin: 0;
          padding-left: 0.05em;
        }
        .hero-h1-line {
          display: block;
          overflow: hidden;
        }
        .hero-h1-line > span {
          display: inline-block;
          transform: translateY(105%);
          filter: blur(8px);
          animation: heroLineRise 1.5s cubic-bezier(0.83, 0, 0.17, 1) forwards;
        }
        .hero-h1-line:nth-child(1) > span { animation-delay: 0.55s; }
        .hero-h1-line:nth-child(2) > span { animation-delay: 0.78s; }
        @keyframes heroLineRise {
          0%   { transform: translateY(105%); filter: blur(8px); }
          60%  { filter: blur(0); }
          100% { transform: translateY(0); filter: blur(0); }
        }

        /* ── Positioning lines ── */
        .hero-position {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          margin-top: clamp(0.3rem, 1vw, 0.6rem);
        }
        .hero-position-line {
          font-family: var(--serif-cn);
          font-weight: 400;
          font-size: clamp(1.02rem, 1.5vw, 1.32rem);
          line-height: 1.7;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.85);
          display: flex;
          align-items: baseline;
          gap: 0.9rem;
          opacity: 0;
          transform: translateY(14px);
          animation: heroFadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) var(--d) forwards;
        }
        .hero-position-mark {
          display: inline-block;
          width: 22px; height: 1px;
          background: rgba(255,255,255,0.55);
          flex-shrink: 0;
          transform: translateY(-0.4em);
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Founder attribution ── */
        .hero-attr {
          margin-top: clamp(0.5rem, 1.2vw, 0.9rem);
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--serif-cn);
          font-size: 0.86rem;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.62);
          opacity: 0;
          animation: heroFade 1.1s cubic-bezier(0.16,1,0.3,1) 1.5s forwards;
        }
        .hero-attr-rule {
          width: 28px; height: 1px;
          background: rgba(255,255,255,0.45);
        }
        .hero-attr-label { font-size: 0.74rem; }
        .hero-attr-name {
          font-size: 1rem;
          color: #ffffff;
          letter-spacing: 0.12em;
        }

        /* ╔══════════ Bottom credentials ══════════ */
        .hero-band {
          position: relative;
          z-index: 3;
          padding: clamp(1.2rem, 2.4vw, 1.8rem) clamp(1.5rem, 4vw, 3rem) clamp(2rem, 4vw, 3rem);
          max-width: 1400px;
          margin: 0 auto;
          width: 100%;
        }
        .hero-band-rule {
          height: 1px;
          background: rgba(255,255,255,0.18);
          transform-origin: left center;
          transform: scaleX(0);
          animation: heroLineX 1.6s cubic-bezier(0.16,1,0.3,1) 1.75s forwards;
          margin-bottom: clamp(1.4rem, 2.6vw, 2rem);
        }
        .hero-affs {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.2rem, 3vw, 3rem);
          margin: 0; padding: 0;
        }
        .hero-aff {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: clamp(0.85rem, 1.4vw, 1.2rem);
          opacity: 0;
          transform: translateY(14px);
          animation: heroFadeUp 1.1s cubic-bezier(0.16,1,0.3,1) var(--d) forwards;
        }
        .hero-aff-idx {
          font-family: var(--serif-cn);
          font-weight: 400;
          font-size: clamp(1.6rem, 2.2vw, 2.1rem);
          line-height: 1;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.05em;
          padding-top: 0.05em;
          min-width: 1.4em;
        }
        .hero-aff-body { display: flex; flex-direction: column; gap: 0.55rem; min-width: 0; }
        .hero-aff-org {
          font-family: var(--serif-cn);
          font-size: clamp(0.78rem, 1vw, 0.9rem);
          letter-spacing: 0.1em;
          line-height: 1.55;
          color: rgba(255,255,255,0.62);
          font-weight: 400;
        }
        .hero-aff-role {
          font-family: var(--serif-cn);
          font-weight: 400;
          font-size: clamp(1.08rem, 1.45vw, 1.32rem);
          line-height: 1.3;
          color: #ffffff;
          letter-spacing: 0.18em;
          padding-top: 0.2rem;
          border-top: 1px solid rgba(255,255,255,0.15);
        }

        /* ╔══════════ Scroll cue ══════════ */
        .hero-scroll {
          position: absolute;
          right: clamp(1.5rem, 3vw, 2.5rem);
          bottom: clamp(1.5rem, 3vw, 2.5rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          z-index: 4;
          opacity: 0;
          animation: heroFade 1s cubic-bezier(0.16,1,0.3,1) 2.6s forwards;
        }
        .hero-scroll-text {
          font-family: var(--serif-cn);
          font-size: 0.74rem;
          letter-spacing: 0.4em;
          color: rgba(255,255,255,0.5);
          writing-mode: vertical-rl;
        }
        .hero-scroll-line {
          width: 1px; height: 56px;
          background: rgba(255,255,255,0.22);
          position: relative; overflow: hidden;
        }
        .hero-scroll-line::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 40%;
          background: rgba(255,255,255,0.75);
          animation: scrollDrop 2.6s cubic-bezier(0.45,0,0.55,1) infinite;
        }
        @keyframes scrollDrop {
          0%   { transform: translateY(-100%); opacity: 1; }
          80%  { transform: translateY(260%);  opacity: 0.3; }
          100% { transform: translateY(260%);  opacity: 0; }
        }

        @keyframes heroFade { to { opacity: 1; } }

        /* ╔══════════ Responsive ══════════ */
        @media (max-width: 980px) {
          .hero-affs { grid-template-columns: 1fr; gap: 1.1rem; }
          .hero-vertical { display: none; }
        }
        @media (max-width: 768px) {
          .hero-scroll { display: none; }
          .hero-h1 { letter-spacing: 0.06em; font-size: clamp(2.7rem, 12vw, 5rem); }
          .hero-topbar-text { letter-spacing: 0.3em; font-size: 0.74rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-video { animation: none; opacity: 1; transform: none; }
          .hero-topbar,
          .hero-eyebrow,
          .hero-eyebrow-rule,
          .hero-vertical-rule,
          .hero-vertical-text > span,
          .hero-h1-line > span,
          .hero-position-line,
          .hero-attr,
          .hero-band-rule,
          .hero-aff,
          .hero-scroll {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
          }
        }
      `}</style>
    </>
  )
}
