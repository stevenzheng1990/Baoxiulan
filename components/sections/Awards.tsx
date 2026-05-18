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
    year: '一九九一年',
    award: '国家科学技术进步奖',
    project: '特发性生长激素的临床研究',
    scope: '国家',
  },
  {
    year: '一九九九年',
    award: '世界华人重大科学技术成果',
    project: '新生儿行为测定及其在我国的应用',
    scope: '国际',
  },
  {
    year: '二〇〇〇年',
    award: '北京市科学技术进步奖',
    project: '婴幼儿早期干预与智力开发的研究',
    scope: '省市',
  },
  {
    year: '二〇一七年',
    award: '残疾预防及康复科学技术奖',
    project: '新生儿行为测定及在我国的应用',
    scope: '行业',
  },
]

export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

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
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

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
    const handleLeave = () => track.style.setProperty('--ptr', `-10%`)
    track.addEventListener('pointermove', handleMove)
    track.addEventListener('pointerleave', handleLeave)
    return () => {
      track.removeEventListener('pointermove', handleMove)
      track.removeEventListener('pointerleave', handleLeave)
    }
  }, [])

  return (
    <section ref={sectionRef} id="awards" className="aw-section">
      <div aria-hidden="true" className="aw-bg" />

      <div className="aw-container">
        {/* ── Header — matches Hero's crest+rule rhythm ── */}
        <header className="aw-head">
          <div className="aw-crest">
            <span className="aw-crest-mark" aria-hidden="true" />
            <span className="aw-crest-text">学　术　荣　誉</span>
          </div>

          <div className="aw-head-rule" aria-hidden="true">
            <span className="aw-head-rule-line aw-head-rule-l" />
            <span className="aw-head-rule-diamond" />
            <span className="aw-head-rule-line aw-head-rule-r" />
          </div>

          <h2 className="aw-title">三十余年深耕，四项重大科学技术奖</h2>
          <p className="aw-lede">
            从国家科技进步奖到世界华人重大科学技术成果，宝秀兰团队的研究持续填补国内空白，引领新生儿评估与早期干预的临床实践。
          </p>
        </header>

        {/* ── Horizontal timeline ── */}
        <div
          ref={trackRef}
          className="aw-track"
          style={{ ['--ptr' as string]: '-10%' }}
        >
          <span className="aw-rail" aria-hidden="true" />
          <span className="aw-rail-fill" aria-hidden="true" />
          <span className="aw-rail-ptr" aria-hidden="true" />

          <ol className="aw-items">
            {AWARDS.map((item, i) => {
              const delay = 0.55 + i * 0.32
              return (
                <li
                  key={i}
                  className="aw-item"
                  style={{ ['--d' as string]: `${delay}s` }}
                >
                  {/* Year — per-character rise */}
                  <div className="aw-year">
                    {Array.from(item.year).map((ch, ci) => (
                      <span
                        key={ci}
                        className="aw-year-ch"
                        style={{ ['--cd' as string]: `${ci * 0.05}s` }}
                      >
                        <span>{ch}</span>
                      </span>
                    ))}
                  </div>

                  <span className="aw-conn" aria-hidden="true" />

                  <span className="aw-dot" aria-hidden="true">
                    <span className="aw-dot-core" />
                    <span className="aw-dot-pulse" />
                  </span>

                  <article className="aw-card">
                    {/* Animated 4-segment border */}
                    <span className="aw-card-bd aw-bd-t" aria-hidden="true" />
                    <span className="aw-card-bd aw-bd-r" aria-hidden="true" />
                    <span className="aw-card-bd aw-bd-b" aria-hidden="true" />
                    <span className="aw-card-bd aw-bd-l" aria-hidden="true" />

                    {/* Gold corner foils */}
                    <span className="aw-card-corner aw-c-tl" aria-hidden="true" />
                    <span className="aw-card-corner aw-c-br" aria-hidden="true" />

                    <span className="aw-card-pin" aria-hidden="true" />

                    <div className="aw-card-scope">{item.scope}</div>
                    <h3 className="aw-card-title">{item.award}</h3>

                    <span className="aw-card-divider" aria-hidden="true" />

                    <div className="aw-card-foot">
                      <span className="aw-card-label">获奖项目</span>
                      <p className="aw-card-project">{item.project}</p>
                    </div>
                  </article>
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      <style>{`
        /* ════════════════════════════════════════════════════════════
           AWARDS — institutional timeline matching Hero's palette
           Deep blue ground · Gold accents · serif-cn typography
           ════════════════════════════════════════════════════════════ */
        .aw-section {
          --gold: #C9A86A;
          --gold-soft: rgba(201, 168, 106, 0.7);
          --gold-line: rgba(201, 168, 106, 0.45);

          position: relative;
          background: var(--blue-deep);
          padding-block: clamp(4.5rem, 8vw, 7rem);
          overflow: hidden;
          isolation: isolate;
          color: #ffffff;
          font-family: var(--serif-cn);
        }
        .aw-bg {
          position: absolute; inset: 0; z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 60% 50% at 20% 18%, rgba(201,168,106,0.10) 0%, rgba(201,168,106,0) 60%),
            radial-gradient(ellipse 55% 45% at 85% 78%, rgba(0,3,163,0.4) 0%, rgba(0,3,163,0) 60%);
        }

        .aw-container {
          position: relative;
          z-index: 1;
          width: min(1180px, 100%);
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 4vw, 2.5rem);
        }

        /* ── Header ── */
        .aw-head {
          text-align: center;
          margin-bottom: clamp(3.5rem, 7vw, 5.5rem);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .aw-crest {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          opacity: 0;
          animation: aw-fade 1s cubic-bezier(0.16,1,0.3,1) 0.15s forwards;
        }
        .aw-crest-mark {
          width: 8px; height: 8px;
          background: var(--gold);
          transform: rotate(45deg);
        }
        .aw-crest-text {
          font-family: var(--serif-cn);
          font-size: clamp(0.85rem, 1vw, 0.96rem);
          letter-spacing: 0.05em;
          color: var(--gold);
          font-weight: 400;
        }
        .aw-head-rule {
          width: min(540px, 90%);
          display: flex; align-items: center; gap: 0.85rem;
          margin: clamp(1rem, 1.8vw, 1.4rem) 0 clamp(1.4rem, 2.4vw, 1.8rem);
        }
        .aw-head-rule-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg,
            rgba(201,168,106,0) 0%,
            var(--gold-line) 50%,
            rgba(201,168,106,0) 100%);
          transform-origin: center; transform: scaleX(0);
        }
        .aw-in .aw-head-rule-line {
          animation: aw-line-x 1.4s cubic-bezier(0.16,1,0.3,1) 0.4s forwards;
        }
        @keyframes aw-line-x { to { transform: scaleX(1); } }
        .aw-head-rule-diamond {
          width: 5px; height: 5px;
          background: var(--gold);
          transform: rotate(45deg);
          opacity: 0;
        }
        .aw-in .aw-head-rule-diamond {
          animation: aw-fade 0.8s cubic-bezier(0.16,1,0.3,1) 0.8s forwards;
        }
        .aw-title {
          font-family: var(--serif-cn);
          font-weight: 400;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          letter-spacing: 0.08em;
          line-height: 1.35;
          color: #ffffff;
          margin: 0 0 clamp(0.85rem, 1.6vw, 1.2rem);
          padding-left: 0.08em;
          opacity: 0;
          transform: translateY(12px);
        }
        .aw-in .aw-title {
          animation: aw-fade-up 1.1s cubic-bezier(0.16,1,0.3,1) 0.55s forwards;
        }
        .aw-lede {
          max-width: 580px;
          font-family: var(--serif-cn);
          font-size: clamp(0.86rem, 1vw, 0.96rem);
          line-height: 1.85;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.65);
          margin: 0;
          opacity: 0;
          transform: translateY(10px);
        }
        .aw-in .aw-lede {
          animation: aw-fade-up 1.2s cubic-bezier(0.16,1,0.3,1) 0.75s forwards;
        }
        @keyframes aw-fade-up { to { opacity: 1; transform: translateY(0); } }
        @keyframes aw-fade { to { opacity: 1; } }

        /* ── Track ── */
        .aw-track {
          --rail-y: clamp(70px, 8vw, 100px);
          position: relative;
        }

        .aw-rail {
          position: absolute;
          left: 0; right: 0;
          top: var(--rail-y);
          height: 1px;
          background: rgba(255,255,255,0.12);
          z-index: 1;
        }
        .aw-rail-fill {
          position: absolute;
          left: 0; right: 0;
          top: var(--rail-y);
          height: 1px;
          background: linear-gradient(90deg,
            rgba(201,168,106,0) 0%,
            var(--gold-line) 8%,
            var(--gold) 50%,
            var(--gold-line) 92%,
            rgba(201,168,106,0) 100%);
          transform-origin: left center; transform: scaleX(0);
          z-index: 2;
        }
        .aw-in .aw-rail-fill {
          animation: aw-rail-draw 2.1s cubic-bezier(0.83, 0, 0.17, 1) 0.35s forwards;
        }
        @keyframes aw-rail-draw { to { transform: scaleX(1); } }

        .aw-rail-ptr {
          position: absolute;
          top: calc(var(--rail-y) - 8px);
          left: 0;
          width: 180px; height: 16px;
          pointer-events: none;
          z-index: 3;
          transform: translateX(calc(var(--ptr) - 90px));
          background: radial-gradient(ellipse at center,
            rgba(201,168,106,0.45) 0%,
            rgba(201,168,106,0) 65%);
          opacity: 0;
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease;
        }
        .aw-in .aw-rail-ptr { opacity: 1; transition-delay: 2.4s; }

        /* ── Items ── */
        .aw-items {
          list-style: none;
          margin: 0; padding: 0;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(1rem, 2vw, 1.6rem);
          position: relative;
          z-index: 2;
        }
        .aw-item {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-width: 0;
        }

        /* Year (Chinese numerals, char-by-char rise) */
        .aw-year {
          font-family: var(--serif-cn);
          font-weight: 400;
          font-size: clamp(0.9rem, 1.15vw, 1.08rem);
          letter-spacing: 0.16em;
          padding-left: 0.16em;
          line-height: 1;
          color: var(--gold);
          display: inline-flex;
          gap: 0;
          height: 1em;
          align-items: flex-end;
        }
        .aw-year-ch {
          display: inline-block;
          overflow: hidden;
          line-height: 1;
          height: 1em;
        }
        .aw-year-ch > span {
          display: block;
          transform: translateY(110%);
          will-change: transform;
        }
        .aw-in .aw-year-ch > span {
          animation: aw-ch-rise 1.05s cubic-bezier(0.83,0,0.17,1) calc(var(--d) + var(--cd)) forwards;
        }
        @keyframes aw-ch-rise { to { transform: translateY(0); } }

        /* Vertical connector */
        .aw-conn {
          width: 1px;
          height: clamp(20px, 3vw, 34px);
          background: linear-gradient(180deg,
            var(--gold-line) 0%,
            rgba(201,168,106,0.12) 100%);
          margin-top: clamp(0.6rem, 1vw, 0.85rem);
          transform-origin: top center;
          transform: scaleY(0);
        }
        .aw-in .aw-conn {
          animation: aw-conn-y 0.7s cubic-bezier(0.22,1,0.36,1) calc(var(--d) + 0.3s) forwards;
        }
        @keyframes aw-conn-y { to { transform: scaleY(1); } }

        /* Dot on rail */
        .aw-dot {
          position: relative;
          width: 14px; height: 14px;
          margin-top: -7px;
          margin-bottom: clamp(1.4rem, 2.6vw, 1.9rem);
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .aw-dot-core {
          width: 9px; height: 9px;
          border-radius: 50%;
          background: var(--gold);
          box-shadow:
            0 0 0 3px var(--blue-deep),
            0 0 0 4px rgba(201,168,106,0.35);
          transform: scale(0);
          will-change: transform;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
        }
        .aw-in .aw-dot-core {
          animation: aw-dot-in 0.7s cubic-bezier(0.34,1.56,0.64,1) calc(var(--d) + 0.55s) forwards;
        }
        @keyframes aw-dot-in {
          0%   { transform: scale(0); }
          60%  { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        .aw-dot-pulse {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: rgba(201,168,106,0.35);
          opacity: 0;
          pointer-events: none;
        }
        .aw-in .aw-dot-pulse {
          animation: aw-pulse 2.8s cubic-bezier(0.4,0,0.2,1) calc(var(--d) + 1.2s) infinite;
        }
        @keyframes aw-pulse {
          0%   { transform: scale(0.6); opacity: 0.55; }
          70%  { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }

        /* ── Card ── */
        .aw-card {
          position: relative;
          width: 100%;
          padding: clamp(1.4rem, 2.4vw, 1.9rem) clamp(1rem, 1.8vw, 1.4rem) clamp(1.4rem, 2.4vw, 1.8rem);
          background: linear-gradient(180deg,
            rgba(255,255,255,0.03) 0%,
            rgba(255,255,255,0.06) 100%);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(0.55rem, 1.1vw, 0.85rem);
          opacity: 0;
          clip-path: inset(0 0 100% 0);
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1),
                      background 0.5s ease;
          min-width: 0;
        }
        .aw-in .aw-card {
          animation: aw-card-rev 1.15s cubic-bezier(0.16,1,0.3,1) calc(var(--d) + 0.72s) forwards;
        }
        @keyframes aw-card-rev {
          from { opacity: 0; clip-path: inset(0 0 100% 0); }
          to   { opacity: 1; clip-path: inset(0 0 0 0); }
        }
        .aw-card:hover {
          transform: translateY(-4px);
          background: linear-gradient(180deg,
            rgba(255,255,255,0.05) 0%,
            rgba(255,255,255,0.09) 100%);
        }
        .aw-item:hover .aw-dot-core {
          transform: scale(1.4);
          box-shadow:
            0 0 0 3px var(--blue-deep),
            0 0 0 6px rgba(201,168,106,0.55);
        }
        .aw-items:hover .aw-item:not(:hover) .aw-card,
        .aw-items:hover .aw-item:not(:hover) .aw-year {
          opacity: 0.4;
        }

        /* Animated 4-segment border (white) */
        .aw-card-bd {
          position: absolute;
          background: rgba(255,255,255,0.22);
          transform: scale(0);
        }
        .aw-bd-t { top: 0; left: 0; height: 1px; width: 100%; transform-origin: left center; }
        .aw-bd-r { top: 0; right: 0; width: 1px; height: 100%; transform-origin: top center; }
        .aw-bd-b { bottom: 0; right: 0; height: 1px; width: 100%; transform-origin: right center; }
        .aw-bd-l { bottom: 0; left: 0; width: 1px; height: 100%; transform-origin: bottom center; }
        .aw-in .aw-bd-t { animation: aw-bd-x 0.55s cubic-bezier(0.65,0,0.35,1) calc(var(--d) + 0.72s) forwards; }
        .aw-in .aw-bd-r { animation: aw-bd-y 0.55s cubic-bezier(0.65,0,0.35,1) calc(var(--d) + 1.0s) forwards; }
        .aw-in .aw-bd-b { animation: aw-bd-x 0.55s cubic-bezier(0.65,0,0.35,1) calc(var(--d) + 1.28s) forwards; }
        .aw-in .aw-bd-l { animation: aw-bd-y 0.55s cubic-bezier(0.65,0,0.35,1) calc(var(--d) + 1.56s) forwards; }
        @keyframes aw-bd-x { to { transform: scaleX(1); } }
        @keyframes aw-bd-y { to { transform: scaleY(1); } }

        /* Gold corner foils */
        .aw-card-corner {
          position: absolute;
          width: 12px; height: 12px;
          opacity: 0;
        }
        .aw-c-tl { top: 0; left: 0; border-top: 1px solid var(--gold); border-left: 1px solid var(--gold); }
        .aw-c-br { bottom: 0; right: 0; border-bottom: 1px solid var(--gold); border-right: 1px solid var(--gold); }
        .aw-in .aw-card-corner {
          animation: aw-fade 0.7s cubic-bezier(0.16,1,0.3,1) calc(var(--d) + 1.95s) forwards;
        }

        /* Gold pin marker (top center) */
        .aw-card-pin {
          width: 6px; height: 6px;
          background: var(--gold);
          transform: rotate(45deg) scale(0);
          box-shadow: 0 0 0 3px rgba(201,168,106,0.12);
        }
        .aw-in .aw-card-pin {
          animation: aw-pin-in 0.75s cubic-bezier(0.34,1.56,0.64,1) calc(var(--d) + 0.95s) forwards;
        }
        @keyframes aw-pin-in {
          0%   { transform: rotate(45deg) scale(0); }
          60%  { transform: rotate(45deg) scale(1.25); }
          100% { transform: rotate(45deg) scale(1); }
        }

        .aw-card-scope {
          font-family: var(--serif-cn);
          font-size: 0.66rem;
          letter-spacing: 0.32em;
          padding: 0.28rem 0.7rem;
          padding-left: 0.6rem; /* compensate trailing letter-spacing */
          border: 1px solid var(--gold-line);
          color: var(--gold);
          white-space: nowrap;
        }

        .aw-card-title {
          font-family: var(--serif-cn);
          font-weight: 400;
          font-size: clamp(1.02rem, 1.4vw, 1.22rem);
          letter-spacing: 0.04em;
          line-height: 1.5;
          color: #ffffff;
          margin: 0;
          /* allow proper Chinese wrap */
          word-break: break-word;
          overflow-wrap: anywhere;
          hyphens: auto;
          padding-inline: 0.2rem;
          max-width: 100%;
        }

        .aw-card-divider {
          width: 22px; height: 1px;
          background: var(--gold-line);
          transform: scaleX(0);
        }
        .aw-in .aw-card-divider {
          animation: aw-bd-x 0.6s cubic-bezier(0.65,0,0.35,1) calc(var(--d) + 1.45s) forwards;
          transform-origin: center;
        }

        .aw-card-foot {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          margin-top: 0.1rem;
        }
        .aw-card-label {
          font-family: var(--serif-cn);
          font-size: 0.66rem;
          letter-spacing: 0.4em;
          padding-left: 0.4em;
          color: var(--gold-soft);
        }
        .aw-card-project {
          font-family: var(--serif-cn);
          font-size: clamp(0.82rem, 1vw, 0.92rem);
          line-height: 1.7;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.78);
          margin: 0;
          word-break: break-word;
          overflow-wrap: anywhere;
          max-width: 100%;
          padding-inline: 0.2rem;
        }

        /* ═════════ Mobile / Tablet — vertical timeline ═════════ */
        @media (max-width: 860px) {
          .aw-track {
            --rail-x: clamp(14px, 4vw, 22px);
          }
          .aw-rail,
          .aw-rail-fill {
            top: 0; bottom: 0;
            left: var(--rail-x); right: auto;
            width: 1px; height: auto;
          }
          .aw-rail-fill {
            background: linear-gradient(180deg,
              rgba(201,168,106,0) 0%,
              var(--gold-line) 8%,
              var(--gold) 50%,
              var(--gold-line) 92%,
              rgba(201,168,106,0) 100%);
            transform-origin: top center; transform: scaleY(0);
          }
          .aw-in .aw-rail-fill {
            animation: aw-rail-y 2.2s cubic-bezier(0.83,0,0.17,1) 0.35s forwards;
          }
          @keyframes aw-rail-y { to { transform: scaleY(1); } }
          .aw-rail-ptr { display: none; }

          .aw-items {
            grid-template-columns: 1fr;
            gap: clamp(1.8rem, 4vw, 2.4rem);
          }
          .aw-item {
            display: grid;
            grid-template-columns: auto 1fr;
            grid-template-rows: auto auto;
            align-items: start;
            column-gap: clamp(0.8rem, 2vw, 1.2rem);
            row-gap: 0.85rem;
            text-align: left;
          }
          .aw-year {
            grid-column: 2 / 3;
            grid-row: 1 / 2;
            font-size: clamp(0.95rem, 4vw, 1.15rem);
            justify-self: start;
            margin-bottom: 0.1rem;
            align-self: center;
          }
          .aw-conn { display: none; }
          .aw-dot {
            grid-column: 1 / 2;
            grid-row: 1 / 3;
            margin: 0.1em 0 0 calc(var(--rail-x) - 7px);
            align-self: start;
            justify-self: start;
          }
          .aw-card {
            grid-column: 2 / 3;
            grid-row: 2 / 3;
            align-items: flex-start;
            text-align: left;
            padding: clamp(1.2rem, 4vw, 1.6rem);
          }
          .aw-card-pin { display: none; }
          .aw-card-foot { align-items: flex-start; }
          .aw-card-divider { align-self: flex-start; }
        }

        @media (max-width: 480px) {
          .aw-title { font-size: clamp(1.35rem, 6vw, 1.7rem); letter-spacing: 0.04em; }
          .aw-card-title { letter-spacing: 0.02em; }
        }

        @media (prefers-reduced-motion: reduce) {
          .aw-crest, .aw-head-rule-line, .aw-head-rule-diamond,
          .aw-title, .aw-lede, .aw-rail-fill, .aw-rail-ptr,
          .aw-year-ch > span, .aw-conn, .aw-dot-core, .aw-dot-pulse,
          .aw-card, .aw-card-bd, .aw-card-corner, .aw-card-pin,
          .aw-card-divider {
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
