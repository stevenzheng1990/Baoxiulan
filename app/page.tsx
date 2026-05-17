'use client'

import { useEffect } from 'react'
import Hero from '@/components/sections/Hero'
import MarqueeBar from '@/components/sections/MarqueeBar'
import Numbers from '@/components/sections/Numbers'
import Services from '@/components/sections/Services'
import Founder from '@/components/sections/Founder'
import Specialists from '@/components/sections/Specialists'
import Process from '@/components/sections/Process'
import Articles from '@/components/sections/Articles'
import Cta from '@/components/sections/Cta'
import { SERVICES_SEED } from '@/content/site'

// ── Inline About section ──────────────────────────────────────────────────────

function About() {
  return (
    <section
      id="about"
      style={{
        background: 'var(--white)',
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.25rem, 5vw, 4rem)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'center',
        }}
        className="about-grid"
      >
        {/* LEFT: text */}
        <div className="r-l">
          <div className="section-tag">关于我们 · About</div>
          <h2
            className="section-heading"
            style={{ marginBottom: '2rem' }}
            dangerouslySetInnerHTML={{ __html: '三十年，只做一件<em>对的事</em>' }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.1rem',
              fontSize: '0.925rem',
              lineHeight: 1.85,
              color: 'var(--muted)',
              fontFamily: 'var(--sans)',
              marginBottom: '2.5rem',
            }}
          >
            <p>
              1991 年，鲍秀兰教授在北京协和医院创立国内首个高危儿早期干预中心。彼时，大多数家庭对"早期干预"的概念还一无所知，她却已清楚地看见：脑发育最关键的时间窗口，往往只有最初的三年。
            </p>
            <p>
              三十余年来，宝秀兰医疗始终专注 0–6 岁高危儿的早期筛查、发育评估与系统干预。五项国家级科技进步奖、全国 21 家协作医院——这些数字背后，是一个个孩子重新迈步、开口说话的故事。
            </p>
            <p>
              我们相信：每一个高危儿都有追赶的可能，而医学的责任，是在最合适的时机给予最精准的托举。
            </p>
          </div>

          {/* Founder row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                background: 'var(--blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--serif-cn)',
                  fontSize: '1.2rem',
                  color: '#ffffff',
                  fontWeight: 400,
                }}
              >
                鲍
              </span>
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--serif-cn)',
                  fontSize: '1rem',
                  color: 'var(--ink)',
                  fontWeight: 400,
                  letterSpacing: '0.03em',
                }}
              >
                鲍秀兰
              </div>
              <div
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '0.75rem',
                  color: 'var(--muted)',
                  marginTop: '0.15rem',
                  letterSpacing: '0.04em',
                }}
              >
                教授 · 主任医师 · 创始人
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: visual placeholder */}
        <div className="r-r">
          <div
            style={{
              position: 'relative',
              aspectRatio: '4/5',
              border: '1px solid var(--border)',
              background: 'var(--off-white)',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Grid-line decoration */}
            <svg
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                opacity: 0.35,
              }}
              viewBox="0 0 400 500"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Horizontal lines */}
              {Array.from({ length: 16 }, (_, i) => (
                <line
                  key={`h${i}`}
                  x1={0}
                  y1={(i + 1) * 31}
                  x2={400}
                  y2={(i + 1) * 31}
                  stroke="var(--blue)"
                  strokeWidth={0.4}
                  opacity={0.3}
                />
              ))}
              {/* Vertical lines */}
              {Array.from({ length: 10 }, (_, i) => (
                <line
                  key={`v${i}`}
                  x1={(i + 1) * 36}
                  y1={0}
                  x2={(i + 1) * 36}
                  y2={500}
                  stroke="var(--blue)"
                  strokeWidth={0.4}
                  opacity={0.3}
                />
              ))}
            </svg>

            {/* Center content */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--serif-en)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: 'clamp(4rem, 10vw, 7rem)',
                  color: 'var(--blue)',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  opacity: 0.15,
                }}
              >
                1991
              </div>
            </div>

            {/* Blue badge bottom-right */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                right: '1.5rem',
                background: 'var(--blue)',
                color: '#ffffff',
                fontFamily: 'var(--sans)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '0.45rem 0.9rem',
              }}
            >
              北京 · Beijing
            </div>

            {/* Top-left year label */}
            <div
              style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                fontFamily: 'var(--sans)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              Est.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .about-grid > *:last-child {
            max-height: 380px;
          }
        }
      `}</style>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  // Scroll reveal: watch .r, .r-l, .r-r, .rsg — add .in when 15% visible
  useEffect(() => {
    const selectors = '.r, .r-l, .r-r, .rsg'
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selectors))

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Hero />
      <Founder />
      <Specialists />
      <MarqueeBar />
      <About />
      <Numbers />
      <Services services={SERVICES_SEED} />
      <Process />
      <Articles />
      <Cta />
    </>
  )
}
