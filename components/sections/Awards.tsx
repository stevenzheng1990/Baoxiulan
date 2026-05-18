'use client'

import { useEffect, useRef } from 'react'

interface Award {
  year: string
  award: string
  project: string
  scope: '国家' | '国际' | '省市' | '行业'
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

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const items = Array.from(el.querySelectorAll<HTMLElement>('.award-item'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="awards"
      className="section"
      style={{
        background: 'var(--paper)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft brand-blue background ornament */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          right: '-8%',
          width: '38vw',
          maxWidth: 520,
          aspectRatio: '1 / 1',
          background:
            'radial-gradient(circle at center, rgba(0,3,163,0.06) 0%, rgba(0,3,163,0) 65%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <div className="rsg" style={{ maxWidth: 680, marginBottom: 'clamp(3rem, 6vw, 4.5rem)' }}>
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
            从国家科技进步奖到世界华人科学技术成果，宝秀兰团队的研究持续填补国内空白，引领新生儿评估与早期干预的临床实践。
          </p>
        </div>

        {/* Timeline */}
        <div className="awards-timeline" role="list">
          {/* Central vertical rail */}
          <span aria-hidden="true" className="awards-rail" />

          {AWARDS.map((item, i) => {
            const side = i % 2 === 0 ? 'left' : 'right'
            return (
              <div
                key={item.year}
                role="listitem"
                className={`award-item award-${side}`}
                style={{ ['--delay' as string]: `${i * 0.12}s` }}
              >
                {/* Marker dot */}
                <span aria-hidden="true" className="award-dot">
                  <span className="award-dot-pulse" />
                </span>

                {/* Card */}
                <article className="award-card">
                  <header className="award-card-head">
                    <span className="award-year">{item.year}</span>
                    <span className="award-scope">{item.scope}</span>
                  </header>
                  <h3 className="award-title">{item.award}</h3>
                  <p className="award-project">
                    <span className="award-project-label">获奖项目</span>
                    {item.project}
                  </p>
                </article>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .awards-timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: clamp(2rem, 4vw, 3.5rem);
          padding-block: 1rem;
        }
        .awards-rail {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          background: linear-gradient(
            180deg,
            rgba(0,3,163,0) 0%,
            rgba(0,3,163,0.18) 12%,
            rgba(0,3,163,0.18) 88%,
            rgba(0,3,163,0) 100%
          );
          transform: translateX(-50%);
          pointer-events: none;
        }

        .award-item {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          opacity: 0;
          transform: translateY(28px);
          transition:
            opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) var(--delay),
            transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) var(--delay);
        }
        .award-item.in {
          opacity: 1;
          transform: translateY(0);
        }

        .award-dot {
          position: absolute;
          left: 50%;
          top: 1.6rem;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--blue);
          transform: translateX(-50%);
          box-shadow:
            0 0 0 4px var(--paper),
            0 0 0 5px rgba(0,3,163,0.18);
          z-index: 2;
        }
        .award-dot-pulse {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          background: rgba(0,3,163,0.22);
          opacity: 0;
          animation: awardPulse 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          pointer-events: none;
        }
        .award-item.in .award-dot-pulse {
          opacity: 1;
        }
        @keyframes awardPulse {
          0%   { transform: scale(0.6); opacity: 0.6; }
          70%  { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        .award-card {
          background: var(--white);
          border: 1px solid var(--border);
          padding: clamp(1.4rem, 2.4vw, 2rem) clamp(1.4rem, 2.4vw, 2rem);
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.5s ease;
          position: relative;
        }
        .award-card::before {
          content: '';
          position: absolute;
          top: 1.7rem;
          width: 28px;
          height: 1px;
          background: var(--blue);
          opacity: 0.35;
          transition: width 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease;
        }
        .award-left .award-card {
          margin-right: calc(50% + 2.5rem);
        }
        .award-left .award-card::before {
          right: -28px;
        }
        .award-right .award-card {
          margin-left: calc(50% + 2.5rem);
        }
        .award-right .award-card::before {
          left: -28px;
        }
        .award-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 22px 50px -28px rgba(0,3,163,0.28);
          border-color: rgba(0,3,163,0.18);
        }
        .award-card:hover::before {
          width: 44px;
          opacity: 0.7;
        }

        .award-card-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 0.9rem;
        }
        .award-year {
          font-family: var(--serif-en);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(2rem, 3.6vw, 2.8rem);
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--blue);
        }
        .award-scope {
          font-family: var(--sans);
          font-size: 0.66rem;
          letter-spacing: 0.18em;
          padding: 0.28rem 0.6rem;
          border: 1px solid var(--border);
          color: var(--muted);
          white-space: nowrap;
        }
        .award-title {
          font-family: var(--serif-cn);
          font-weight: 400;
          font-size: clamp(1.05rem, 1.6vw, 1.25rem);
          line-height: 1.4;
          color: var(--ink);
          margin-bottom: 0.8rem;
          letter-spacing: 0.01em;
        }
        .award-project {
          font-family: var(--sans);
          font-size: 0.86rem;
          line-height: 1.7;
          color: var(--ink-soft);
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .award-project-label {
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
        }

        /* ── Mobile / tablet — single column timeline ── */
        @media (max-width: 768px) {
          .awards-rail {
            left: 14px;
            transform: none;
          }
          .award-item {
            grid-template-columns: 1fr;
          }
          .award-dot {
            left: 14px;
            top: 1.5rem;
            transform: translateX(-50%);
          }
          .award-left .award-card,
          .award-right .award-card {
            margin-left: 38px;
            margin-right: 0;
          }
          .award-left .award-card::before,
          .award-right .award-card::before {
            left: -24px;
            right: auto;
            width: 22px;
          }
          .award-left .award-card:hover::before,
          .award-right .award-card:hover::before {
            width: 36px;
          }
        }
      `}</style>
    </section>
  )
}
