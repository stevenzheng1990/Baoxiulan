'use client'

import { useEffect, useRef } from 'react'
import { SITE_CONFIG } from '@/content/site'

const STATS = [
  { value: '34', sup: '+', label: '年临床积淀 / 创立于 1991' },
  { value: '12个', sup: '', label: '核心诊疗领域' },
  { value: '5', sup: '项', label: '国家级科技进步奖' },
]

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const id = requestAnimationFrame(() => {
      el.classList.add('hero-revealed')
    })
    return () => cancelAnimationFrame(id)
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
          paddingTop: 64,
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

        {/* Color overlay — keeps brand blue dominant, lets video breathe */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,3,163,0.55) 0%, rgba(0,3,163,0.62) 60%, rgba(0,2,107,0.78) 100%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        {/* Geometric SVG grid / concentric circles */}
        <svg
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-8vw',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'min(680px, 58vw)',
            height: 'min(680px, 58vw)',
            opacity: 0.07,
            pointerEvents: 'none',
          }}
          viewBox="0 0 680 680"
          fill="none"
        >
          {[60, 120, 180, 240, 300, 340].map((r) => (
            <circle key={r} cx={340} cy={340} r={r} stroke="white" strokeWidth={0.8} />
          ))}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 180) / 12
            const rad = (angle * Math.PI) / 180
            const x1 = 340 + 340 * Math.cos(rad)
            const y1 = 340 + 340 * Math.sin(rad)
            const x2 = 340 - 340 * Math.cos(rad)
            const y2 = 340 - 340 * Math.sin(rad)
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="white"
                strokeWidth={0.6}
              />
            )
          })}
        </svg>

        {/* Animated rotating dashed circle */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-8vw',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'min(680px, 58vw)',
            height: 'min(680px, 58vw)',
            opacity: 0.15,
            pointerEvents: 'none',
            animation: 'heroRotate 40s linear infinite',
          }}
        >
          <svg viewBox="0 0 680 680" fill="none" style={{ width: '100%', height: '100%' }}>
            <circle
              cx={340}
              cy={340}
              r={320}
              stroke="white"
              strokeWidth={1}
              strokeDasharray="12 24"
            />
          </svg>
        </div>

        {/* Main content */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 1280,
            margin: '0 auto',
            padding: '5rem 2rem',
            width: '100%',
          }}
        >
          {/* Top label */}
          <p
            className="hero-line"
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.7rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '2.5rem',
              animationDelay: '0s',
            }}
          >
            {SITE_CONFIG.tagline} · 北京·中国
          </p>

          {/* H1 — three stagger-reveal lines */}
          <h1
            style={{
              fontFamily: 'var(--serif-cn)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              color: '#ffffff',
              overflow: 'hidden',
              marginBottom: '3.5rem',
            }}
          >
            <span className="hero-line" style={{ display: 'block', animationDelay: '0.1s' }}>
              守护成长
            </span>
            <span className="hero-line" style={{ display: 'block', animationDelay: '0.2s' }}>
              的每一个
            </span>
            <span className="hero-line" style={{ display: 'block', animationDelay: '0.3s' }}>
              <em
                style={{
                  fontFamily: 'var(--serif-en)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                关键时刻
              </em>
            </span>
          </h1>

          {/* Bottom 2-column grid */}
          <div
            className="hero-bottom"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              alignItems: 'end',
            }}
          >
            {/* Description */}
            <p
              className="hero-line"
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.65)',
                maxWidth: 420,
                animationDelay: '0.5s',
              }}
            >
              {SITE_CONFIG.description}
            </p>

            {/* Stats */}
            <div
              className="hero-stats"
              style={{ display: 'flex', gap: '2.5rem', justifyContent: 'flex-end' }}
            >
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="hero-line"
                  style={{ animationDelay: `${0.55 + i * 0.08}s` }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--serif-en)',
                      fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                      fontWeight: 300,
                      fontStyle: 'italic',
                      color: '#ffffff',
                      lineHeight: 1,
                      marginBottom: '0.4rem',
                    }}
                  >
                    {stat.value}
                    {stat.sup && (
                      <sup
                        style={{
                          fontFamily: 'var(--serif-cn)',
                          fontSize: '0.35em',
                          fontStyle: 'normal',
                          verticalAlign: 'super',
                          marginLeft: '0.1em',
                          color: 'rgba(255,255,255,0.65)',
                        }}
                      >
                        {stat.sup}
                      </sup>
                    )}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.05em',
                      color: 'rgba(255,255,255,0.45)',
                      lineHeight: 1.4,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator — desktop only */}
        <div
          aria-hidden="true"
          className="scroll-indicator"
          style={{
            position: 'absolute',
            right: '2.5rem',
            bottom: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            向下滚动
          </span>
          <div
            style={{
              width: 1,
              height: 56,
              background: 'rgba(255,255,255,0.15)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '40%',
                background: 'rgba(255,255,255,0.6)',
                animation: 'scrollDrop 2s cubic-bezier(0.45,0,0.55,1) infinite',
              }}
            />
          </div>
        </div>
      </section>

      <style>{`
        /* Background video — covers section, fades in elegantly */
        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          animation: heroVideoIn 2.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
        }
        @keyframes heroVideoIn {
          from { opacity: 0; transform: scale(1.04); }
          to   { opacity: 1; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-video { animation: none; opacity: 1; transform: none; }
        }

        @keyframes heroRotate {
          from { transform: translateY(-50%) rotate(0deg); }
          to   { transform: translateY(-50%) rotate(360deg); }
        }

        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes scrollDrop {
          0%   { transform: translateY(-100%); opacity: 1; }
          80%  { transform: translateY(280%);  opacity: 0.4; }
          100% { transform: translateY(280%);  opacity: 0; }
        }

        .hero-line {
          opacity: 0;
          transform: translateY(28px);
        }

        .hero-revealed .hero-line {
          animation: heroSlideUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @media (max-width: 768px) {
          .hero-bottom {
            grid-template-columns: 1fr !important;
          }
          .hero-stats {
            justify-content: flex-start !important;
            flex-wrap: wrap !important;
            gap: 1.8rem !important;
          }
          .scroll-indicator {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}
