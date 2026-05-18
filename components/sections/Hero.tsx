'use client'

import { useEffect, useRef } from 'react'

const CREDENTIALS = [
  { org: ['中国妇幼保健协会'], role: '主任委员单位' },
  { org: ['中国优生优育协会', '婴幼儿发育专委会'], role: '主任委员单位' },
  { org: ['中国优生优育协会', '婴幼儿发育专委会'], role: '培训基地' },
]

const META = [
  { label: '创始人', value: '鲍秀兰 教授' },
  { label: '创立', value: '一九九一年' },
  { label: '积淀', value: '三十四载 · 五项国家科技进步奖' },
]

function StaggerChars({
  text,
  baseDelay = 0,
  step = 0.05,
}: {
  text: string
  baseDelay?: number
  step?: number
}) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          className="schar"
          style={{ animationDelay: `${baseDelay + i * step}s` }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </>
  )
}

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

        <div aria-hidden="true" className="hero-overlay" />

        <div className="hero-inner">
          {/* ── Crest ── */}
          <header className="crest">
            <span className="crest-mark" aria-hidden="true" />
            <span className="crest-name">宝秀兰医疗</span>
            <span className="crest-dot" aria-hidden="true" />
            <span className="crest-loc">北京</span>
          </header>

          <div className="rule rule-top" aria-hidden="true">
            <span className="rule-line rule-line-l" />
            <span className="rule-diamond" />
            <span className="rule-line rule-line-r" />
          </div>

          {/* ── Main title block ── */}
          <h1 className="motto">
            <StaggerChars text="守护生命最初一千天" baseDelay={0.6} step={0.075} />
          </h1>

          <dl className="meta">
            {META.map((m, i) => (
              <div
                key={m.label}
                className="meta-row"
                style={{ ['--d' as string]: `${1.45 + i * 0.16}s` }}
              >
                <dt className="meta-label">{m.label}</dt>
                <span className="meta-rule" aria-hidden="true" />
                <dd className="meta-value">{m.value}</dd>
              </div>
            ))}
          </dl>

          <div className="rule rule-bottom" aria-hidden="true">
            <span className="rule-line rule-line-l" />
            <span className="rule-line rule-line-r" />
          </div>

          {/* ── Credentials ── */}
          <div className="creds" role="list">
            {CREDENTIALS.map((c, i) => (
              <article
                key={i}
                role="listitem"
                className="cred"
                style={{ ['--d' as string]: `${2.35 + i * 0.18}s` }}
              >
                <span className="cred-border cred-border-t" aria-hidden="true" />
                <span className="cred-border cred-border-r" aria-hidden="true" />
                <span className="cred-border cred-border-b" aria-hidden="true" />
                <span className="cred-border cred-border-l" aria-hidden="true" />

                <span className="cred-corner cred-corner-tl" aria-hidden="true" />
                <span className="cred-corner cred-corner-br" aria-hidden="true" />

                <span className="cred-pin" aria-hidden="true" />

                <div className="cred-org">
                  {c.org.map((line, k) => (
                    <span key={k} className="cred-org-line">
                      {line}
                    </span>
                  ))}
                </div>

                <span className="cred-divider" aria-hidden="true" />

                <div className="cred-role">{c.role}</div>
              </article>
            ))}
          </div>
        </div>

        <div aria-hidden="true" className="scroll-cue">
          <span>向 下</span>
          <span className="scroll-cue-line" />
        </div>
      </section>

      <style>{`
        /* ═════════════════════════════════════════════════════════
           HERO — institutional masthead, motto on top, creds below
           ═════════════════════════════════════════════════════════ */
        .hero {
          --gold: #C9A86A;
          --gold-soft: rgba(201, 168, 106, 0.7);
          --gold-line: rgba(201, 168, 106, 0.5);

          position: relative;
          min-height: 100svh;
          background: var(--blue);
          overflow: hidden;
          padding: 68px 1.5rem 2rem;
          isolation: isolate;
          color: #ffffff;
          font-family: var(--serif-cn);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          z-index: 0; pointer-events: none;
          opacity: 0;
          animation: heroVideoIn 2.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        }
        @keyframes heroVideoIn {
          from { opacity: 0; transform: scale(1.08); }
          to   { opacity: 1; transform: scale(1); }
        }
        .hero-overlay {
          position: absolute; inset: 0; z-index: 1;
          pointer-events: none;
          background:
            radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0,2,107,0.35) 0%, rgba(0,2,107,0) 70%),
            linear-gradient(180deg, rgba(0,2,107,0.78) 0%, rgba(0,3,163,0.7) 50%, rgba(0,2,107,0.86) 100%);
        }

        .hero-inner {
          position: relative;
          z-index: 3;
          width: min(1060px, 100%);
          padding: clamp(1rem, 3vw, 2.5rem) clamp(1rem, 3vw, 2rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: clamp(1.2rem, 2.5vw, 1.8rem);
        }

        /* ── Crest ── */
        .crest {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          font-family: var(--serif-cn);
          font-weight: 400;
          opacity: 0;
          animation: heroFade 1s cubic-bezier(0.16,1,0.3,1) 0.25s forwards;
        }
        .crest-mark {
          width: 9px; height: 9px;
          background: var(--gold);
          transform: rotate(45deg);
          box-shadow: 0 0 0 1px rgba(201,168,106,0.35);
        }
        .crest-name {
          font-size: clamp(0.92rem, 1.1vw, 1.05rem);
          letter-spacing: 0.5em;
          padding-left: 0.5em;
          color: #ffffff;
        }
        .crest-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
        }
        .crest-loc {
          font-size: clamp(0.82rem, 1vw, 0.92rem);
          letter-spacing: 0.45em;
          color: rgba(255,255,255,0.7);
        }

        /* ── Horizontal gold rule ── */
        .rule {
          width: min(640px, 90%);
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .rule-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg,
            rgba(201,168,106,0) 0%,
            var(--gold-line) 50%,
            rgba(201,168,106,0) 100%);
          transform-origin: center; transform: scaleX(0);
          animation: ruleIn 1.4s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .rule-top .rule-line-l,
        .rule-top .rule-line-r { animation-delay: 0.45s; }
        .rule-bottom .rule-line-l,
        .rule-bottom .rule-line-r { animation-delay: 2.15s; }
        @keyframes ruleIn { to { transform: scaleX(1); } }
        .rule-diamond {
          width: 6px; height: 6px;
          background: var(--gold);
          transform: rotate(45deg);
          opacity: 0;
          animation: heroFade 0.9s cubic-bezier(0.16,1,0.3,1) 0.85s forwards;
        }

        /* ── Motto title ── */
        .motto {
          font-family: var(--serif-cn);
          font-weight: 400;
          font-size: clamp(2rem, 4.4vw, 3.6rem);
          letter-spacing: 0.32em;
          padding-left: 0.32em;
          line-height: 1.2;
          color: #ffffff;
          margin: 0;
        }

        /* schar */
        .schar {
          display: inline-block;
          opacity: 0;
          transform: translateY(0.45em);
          filter: blur(4px);
          animation: scharIn 0.95s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: transform, opacity, filter;
        }
        @keyframes scharIn {
          0%   { opacity: 0; transform: translateY(0.45em); filter: blur(4px); }
          60%  { filter: blur(0); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        /* ── Meta block ── */
        .meta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.55rem;
          margin: 0;
          padding-block: 0.4rem 0.2rem;
        }
        .meta-row {
          display: inline-flex;
          align-items: center;
          gap: 0.95rem;
          font-family: var(--serif-cn);
          opacity: 0;
          transform: translateY(10px);
          animation: metaIn 1.1s cubic-bezier(0.16,1,0.3,1) var(--d) forwards;
        }
        @keyframes metaIn { to { opacity: 1; transform: translateY(0); } }
        .meta-label {
          font-size: clamp(0.7rem, 0.85vw, 0.78rem);
          letter-spacing: 0.5em;
          padding-left: 0.5em;
          color: var(--gold-soft);
          font-weight: 400;
          margin: 0;
        }
        .meta-rule {
          display: inline-block;
          width: 24px; height: 1px;
          background: rgba(255,255,255,0.28);
        }
        .meta-value {
          font-size: clamp(0.9rem, 1.1vw, 1.02rem);
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.85);
          font-weight: 400;
          margin: 0;
        }

        /* ╔══════════ Credentials ══════════ */
        .creds {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(0.7rem, 1.5vw, 1.2rem);
          width: 100%;
          padding-block: clamp(0.3rem, 1vw, 0.6rem);
        }
        .cred {
          position: relative;
          padding: clamp(1.8rem, 3vw, 2.5rem) clamp(1rem, 2vw, 1.6rem) clamp(1.8rem, 3vw, 2.5rem);
          background: linear-gradient(180deg,
            rgba(255,255,255,0.03) 0%,
            rgba(255,255,255,0.06) 100%);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(0.85rem, 1.6vw, 1.2rem);
          transition: transform 0.65s cubic-bezier(0.22,1,0.36,1), background 0.5s ease;
        }
        .cred:hover {
          transform: translateY(-4px);
          background: linear-gradient(180deg,
            rgba(255,255,255,0.05) 0%,
            rgba(255,255,255,0.09) 100%);
        }

        .cred-border {
          position: absolute;
          background: rgba(255,255,255,0.32);
          transform: scale(0);
        }
        .cred-border-t {
          top: 0; left: 0; height: 1px; width: 100%;
          transform-origin: left center;
          animation: borderX 0.6s cubic-bezier(0.65,0,0.35,1) var(--d) forwards;
        }
        .cred-border-r {
          top: 0; right: 0; width: 1px; height: 100%;
          transform-origin: top center;
          animation: borderY 0.6s cubic-bezier(0.65,0,0.35,1) calc(var(--d) + 0.32s) forwards;
        }
        .cred-border-b {
          bottom: 0; right: 0; height: 1px; width: 100%;
          transform-origin: right center;
          animation: borderX 0.6s cubic-bezier(0.65,0,0.35,1) calc(var(--d) + 0.64s) forwards;
        }
        .cred-border-l {
          bottom: 0; left: 0; width: 1px; height: 100%;
          transform-origin: bottom center;
          animation: borderY 0.6s cubic-bezier(0.65,0,0.35,1) calc(var(--d) + 0.96s) forwards;
        }
        @keyframes borderX { to { transform: scaleX(1); } }
        @keyframes borderY { to { transform: scaleY(1); } }

        .cred-corner {
          position: absolute;
          width: 14px; height: 14px;
          opacity: 0;
          animation: heroFade 0.7s cubic-bezier(0.16,1,0.3,1) calc(var(--d) + 1.4s) forwards;
        }
        .cred-corner-tl {
          top: 0; left: 0;
          border-top: 1px solid var(--gold);
          border-left: 1px solid var(--gold);
        }
        .cred-corner-br {
          bottom: 0; right: 0;
          border-bottom: 1px solid var(--gold);
          border-right: 1px solid var(--gold);
        }

        /* Top decorative pin — small gold diamond, no number */
        .cred-pin {
          width: 7px; height: 7px;
          background: var(--gold);
          transform: rotate(45deg) scale(0);
          margin-top: 0.1rem;
          box-shadow: 0 0 0 4px rgba(201,168,106,0.12);
          animation: pinIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--d) + 0.7s) forwards;
        }
        @keyframes pinIn {
          0%   { transform: rotate(45deg) scale(0); }
          60%  { transform: rotate(45deg) scale(1.25); }
          100% { transform: rotate(45deg) scale(1); }
        }

        .cred-org {
          display: flex;
          flex-direction: column;
          gap: 0.18rem;
          min-height: 2.6em;
          opacity: 0;
          transform: translateY(8px);
          animation: metaIn 1s cubic-bezier(0.16,1,0.3,1) calc(var(--d) + 1.05s) forwards;
        }
        .cred-org-line {
          font-family: var(--serif-cn);
          font-weight: 400;
          font-size: clamp(0.8rem, 0.96vw, 0.94rem);
          letter-spacing: 0.18em;
          line-height: 1.55;
          color: rgba(255,255,255,0.65);
        }

        .cred-divider {
          width: 24px; height: 1px;
          background: var(--gold-line);
          transform: scaleX(0);
          animation: borderX 0.7s cubic-bezier(0.65,0,0.35,1) calc(var(--d) + 1.2s) forwards;
          transform-origin: center;
        }

        .cred-role {
          font-family: var(--serif-cn);
          font-weight: 500;
          font-size: clamp(1.12rem, 1.6vw, 1.42rem);
          letter-spacing: 0.32em;
          padding-left: 0.32em;
          line-height: 1.4;
          background: linear-gradient(180deg, #fff 0%, #fff 55%, #E9DEC5 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          opacity: 0;
          transform: translateY(8px);
          animation: metaIn 1.1s cubic-bezier(0.16,1,0.3,1) calc(var(--d) + 1.3s) forwards;
        }

        /* ── Scroll cue ── */
        .scroll-cue {
          position: absolute;
          right: clamp(1.25rem, 2.5vw, 2rem);
          bottom: clamp(1.5rem, 3vw, 2rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.7rem;
          z-index: 4;
          opacity: 0;
          animation: heroFade 1s cubic-bezier(0.16,1,0.3,1) 3.6s forwards;
        }
        .scroll-cue > span:first-child {
          font-family: var(--serif-cn);
          font-size: 0.7rem;
          letter-spacing: 0.4em;
          color: rgba(255,255,255,0.5);
          writing-mode: vertical-rl;
        }
        .scroll-cue-line {
          width: 1px; height: 48px;
          background: rgba(255,255,255,0.2);
          position: relative; overflow: hidden;
        }
        .scroll-cue-line::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 40%;
          background: rgba(255,255,255,0.7);
          animation: scrollDrop 2.6s cubic-bezier(0.45,0,0.55,1) infinite;
        }
        @keyframes scrollDrop {
          0%   { transform: translateY(-100%); opacity: 1; }
          80%  { transform: translateY(260%); opacity: 0.3; }
          100% { transform: translateY(260%); opacity: 0; }
        }
        @keyframes heroFade { to { opacity: 1; } }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .creds { grid-template-columns: 1fr; }
          .cred { padding-block: 1.4rem; }
          .cred-org { min-height: 0; }
          .scroll-cue { display: none; }
        }
        @media (max-width: 640px) {
          .motto { letter-spacing: 0.18em; padding-left: 0.18em; }
          .cred-role { letter-spacing: 0.22em; padding-left: 0.22em; }
          .meta-row { flex-wrap: wrap; justify-content: center; gap: 0.5rem; }
          .meta-rule { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-video { animation: none; opacity: 1; transform: none; }
          .schar,
          .crest,
          .rule-line,
          .rule-diamond,
          .meta-row,
          .cred-border,
          .cred-corner,
          .cred-pin,
          .cred-org,
          .cred-divider,
          .cred-role,
          .scroll-cue {
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
