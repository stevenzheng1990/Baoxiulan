'use client'

import { useEffect, useRef } from 'react'

const CREDENTIALS = [
  {
    idx: '一',
    org: ['中国妇幼保健协会'],
    role: '主任委员单位',
  },
  {
    idx: '二',
    org: ['中国优生优育协会', '婴幼儿发育专委会'],
    role: '主任委员单位',
  },
  {
    idx: '三',
    org: ['中国优生优育协会', '婴幼儿发育专委会'],
    role: '培训基地',
  },
]

/**
 * 逐字 reveal：每个字符独立 transform + filter 动画
 * 用于角色/标题等关键字段
 */
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
          {ch === ' ' ? ' ' : ch}
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

        {/* Overlay — deeper, more dignified */}
        <div aria-hidden="true" className="hero-overlay" />

        <div className="hero-inner">
          {/* ─────────── Top crest ─────────── */}
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

          {/* ─────────── Section label ─────────── */}
          <div className="label">
            <StaggerChars text="学　会　任　职" baseDelay={0.55} step={0.07} />
          </div>

          {/* ─────────── Credentials (centerpiece) ─────────── */}
          <div className="creds" role="list">
            {CREDENTIALS.map((c, i) => (
              <article
                key={i}
                role="listitem"
                className="cred"
                style={{ ['--d' as string]: `${0.95 + i * 0.18}s` }}
              >
                {/* Animated border (4 segments draw in sequence) */}
                <span className="cred-border cred-border-t" aria-hidden="true" />
                <span className="cred-border cred-border-r" aria-hidden="true" />
                <span className="cred-border cred-border-b" aria-hidden="true" />
                <span className="cred-border cred-border-l" aria-hidden="true" />

                {/* Corner foils */}
                <span className="cred-corner cred-corner-tl" aria-hidden="true" />
                <span className="cred-corner cred-corner-br" aria-hidden="true" />

                <div className="cred-num">
                  <span className="cred-num-ch">{c.idx}</span>
                </div>

                <span className="cred-divider" aria-hidden="true" />

                <div className="cred-org">
                  {c.org.map((line, k) => (
                    <span key={k} className="cred-org-line">
                      <StaggerChars
                        text={line}
                        baseDelay={1.55 + i * 0.18 + k * 0.04}
                        step={0.025}
                      />
                    </span>
                  ))}
                </div>

                <div className="cred-role">
                  <StaggerChars text={c.role} baseDelay={1.95 + i * 0.18} step={0.07} />
                </div>
              </article>
            ))}
          </div>

          <div className="rule rule-bottom" aria-hidden="true">
            <span className="rule-line rule-line-l" />
            <span className="rule-line rule-line-r" />
          </div>

          {/* ─────────── Motto + seal ─────────── */}
          <div className="motto">
            <span className="motto-text">
              <StaggerChars text="守护生命最初一千天" baseDelay={2.65} step={0.055} />
            </span>
            <span className="seal" aria-hidden="true">
              <span className="seal-inner">宝</span>
            </span>
          </div>

          {/* ─────────── Meta footer ─────────── */}
          <footer className="meta">
            <div className="meta-row">
              <span className="meta-label">创始人</span>
              <span className="meta-rule" aria-hidden="true" />
              <span className="meta-value">鲍秀兰 教授</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">创立</span>
              <span className="meta-rule" aria-hidden="true" />
              <span className="meta-value">一九九一年</span>
            </div>
            <div className="meta-row">
              <span className="meta-label">积淀</span>
              <span className="meta-rule" aria-hidden="true" />
              <span className="meta-value">三十四载 · 五项国家科技进步奖</span>
            </div>
          </footer>
        </div>

        {/* Scroll cue */}
        <div aria-hidden="true" className="scroll-cue">
          <span>向 下</span>
          <span className="scroll-cue-line" />
        </div>
      </section>

      <style>{`
        /* ═════════════════════════════════════════════════════════
           HERO — institutional centerpiece, gilt accents, sealed
           ═════════════════════════════════════════════════════════ */
        .hero {
          --gold: #C9A86A;
          --gold-soft: rgba(201, 168, 106, 0.7);
          --gold-line: rgba(201, 168, 106, 0.55);
          --seal-red: #B23A2E;

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

        /* ── Video + overlay ── */
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

        /* ── Inner container — contained, NOT edge-to-edge ── */
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

        /* ── Horizontal rule with diamond ── */
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
        .rule-top .rule-line-l { animation-delay: 0.45s; }
        .rule-top .rule-line-r { animation-delay: 0.45s; }
        .rule-bottom .rule-line-l { animation-delay: 2.45s; }
        .rule-bottom .rule-line-r { animation-delay: 2.45s; }
        @keyframes ruleIn { to { transform: scaleX(1); } }
        .rule-diamond {
          width: 6px; height: 6px;
          background: var(--gold);
          transform: rotate(45deg);
          opacity: 0;
          animation: heroFade 0.9s cubic-bezier(0.16,1,0.3,1) 0.85s forwards;
        }

        /* ── Section label ── */
        .label {
          font-family: var(--serif-cn);
          font-weight: 400;
          font-size: clamp(0.82rem, 1.1vw, 1rem);
          letter-spacing: 0;
          color: var(--gold);
          padding-block: 0.2rem;
        }

        /* schar : per-character entrance (fade + slide + tiny blur) */
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

        /* ╔══════════ Credentials — centerpiece ══════════ */
        .creds {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(0.7rem, 1.5vw, 1.2rem);
          width: 100%;
          padding-block: clamp(0.5rem, 1.5vw, 1rem);
        }
        .cred {
          position: relative;
          padding: clamp(1.4rem, 2.6vw, 2.2rem) clamp(1rem, 2vw, 1.6rem) clamp(1.6rem, 2.8vw, 2.4rem);
          background: linear-gradient(180deg,
            rgba(255,255,255,0.03) 0%,
            rgba(255,255,255,0.06) 100%);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(0.7rem, 1.4vw, 1rem);
          transition: transform 0.65s cubic-bezier(0.22,1,0.36,1), background 0.5s ease;
        }
        .cred:hover {
          transform: translateY(-4px);
          background: linear-gradient(180deg,
            rgba(255,255,255,0.05) 0%,
            rgba(255,255,255,0.09) 100%);
        }

        /* Animated 1px border — 4 segments draw in sequence */
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

        /* Gold corner foils (decorative) */
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

        /* Number — gilt serif */
        .cred-num {
          width: clamp(56px, 6.5vw, 76px);
          height: clamp(56px, 6.5vw, 76px);
          border: 1px solid var(--gold-line);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: clamp(0.1rem, 0.5vw, 0.3rem);
          opacity: 0;
          transform: scale(0.6) rotate(-12deg);
          animation: numIn 1s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--d) + 0.6s) forwards;
          background: radial-gradient(circle at center,
            rgba(201,168,106,0.16) 0%,
            rgba(201,168,106,0) 70%);
        }
        @keyframes numIn {
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .cred-num-ch {
          font-family: var(--serif-cn);
          font-weight: 500;
          font-size: clamp(1.6rem, 2.4vw, 2.1rem);
          color: var(--gold);
          line-height: 1;
        }

        .cred-divider {
          width: 24px; height: 1px;
          background: var(--gold-line);
          transform: scaleX(0);
          animation: borderX 0.7s cubic-bezier(0.65,0,0.35,1) calc(var(--d) + 0.9s) forwards;
          transform-origin: center;
        }

        .cred-org {
          display: flex;
          flex-direction: column;
          gap: 0.18rem;
          min-height: 2.6em;
        }
        .cred-org-line {
          font-family: var(--serif-cn);
          font-weight: 400;
          font-size: clamp(0.78rem, 0.95vw, 0.92rem);
          letter-spacing: 0.18em;
          line-height: 1.55;
          color: rgba(255,255,255,0.62);
        }

        .cred-role {
          font-family: var(--serif-cn);
          font-weight: 500;
          font-size: clamp(1.1rem, 1.55vw, 1.4rem);
          letter-spacing: 0.32em;
          padding-left: 0.32em; /* compensate spacing */
          line-height: 1.4;
          color: #ffffff;
          margin-top: 0.3rem;
          background: linear-gradient(180deg, #fff 0%, #fff 55%, #E9DEC5 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }

        /* ╔══════════ Motto + seal ══════════ */
        .motto {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          margin-top: clamp(0.3rem, 1vw, 0.6rem);
        }
        .motto-text {
          font-family: var(--serif-cn);
          font-weight: 400;
          font-size: clamp(1.5rem, 2.6vw, 2.2rem);
          letter-spacing: 0.32em;
          padding-left: 0.32em;
          color: #ffffff;
          line-height: 1.2;
        }
        .seal {
          position: relative;
          width: clamp(34px, 3.6vw, 44px);
          height: clamp(34px, 3.6vw, 44px);
          background: var(--seal-red);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(1.4) rotate(-10deg);
          animation: sealStamp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 3.35s forwards;
          box-shadow:
            inset 0 0 0 1.5px rgba(255,255,255,0.85),
            0 4px 18px -8px rgba(178,58,46,0.55);
        }
        @keyframes sealStamp {
          0%   { opacity: 0; transform: scale(1.5) rotate(-10deg); }
          60%  { opacity: 1; transform: scale(0.92) rotate(2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .seal::after {
          /* tiny ink imperfection */
          content: '';
          position: absolute;
          inset: 1px;
          background: var(--seal-red);
          box-shadow: inset 0 0 6px rgba(0,0,0,0.18);
          opacity: 0.92;
        }
        .seal-inner {
          position: relative;
          z-index: 1;
          font-family: var(--serif-cn);
          font-weight: 600;
          font-size: clamp(1.1rem, 1.4vw, 1.4rem);
          color: #ffffff;
          letter-spacing: 0;
        }

        /* ╔══════════ Meta footer ══════════ */
        .meta {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.45rem;
          margin-top: clamp(0.8rem, 1.6vw, 1.2rem);
          opacity: 0;
          animation: heroFade 1.2s cubic-bezier(0.16,1,0.3,1) 3.5s forwards;
        }
        .meta-row {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          font-family: var(--serif-cn);
          font-size: clamp(0.78rem, 0.95vw, 0.9rem);
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.55);
        }
        .meta-label {
          font-size: 0.7rem;
          letter-spacing: 0.4em;
          padding-left: 0.4em;
          color: var(--gold-soft);
        }
        .meta-rule {
          display: inline-block;
          width: 22px; height: 1px;
          background: rgba(255,255,255,0.25);
        }
        .meta-value {
          color: rgba(255,255,255,0.78);
        }

        /* ╔══════════ Scroll cue ══════════ */
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
          animation: heroFade 1s cubic-bezier(0.16,1,0.3,1) 3.7s forwards;
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

        /* ╔══════════ Responsive ══════════ */
        @media (max-width: 860px) {
          .creds { grid-template-columns: 1fr; }
          .cred { padding-block: 1.3rem; }
          .cred-org { min-height: 0; }
          .scroll-cue { display: none; }
        }
        @media (max-width: 640px) {
          .motto-text { letter-spacing: 0.18em; padding-left: 0.18em; }
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
          .cred-border,
          .cred-corner,
          .cred-num,
          .cred-divider,
          .seal,
          .meta,
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
