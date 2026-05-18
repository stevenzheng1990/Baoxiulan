'use client'

import { useEffect, useRef } from 'react'
import { SITE_CONFIG } from '@/content/site'

const STATS = [
  { value: '34', sup: '+', label: '年临床积淀 / 创立于 1991' },
  { value: '12个', sup: '', label: '核心诊疗领域' },
  { value: '5', sup: '项', label: '国家级科技进步奖' },
]

const CREDENTIALS = [
  '中国妇幼保健协会 主任委员单位',
  '中国优生优育协会婴幼儿发育专委会 主任委员单位',
  '中国优生优育协会婴幼儿发育专委会 培训基地',
]

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

  // Cursor-following light aura (desktop only)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return
    const el = containerRef.current
    const aura = auraRef.current
    if (!el || !aura) return

    let raf = 0
    let targetX = 0
    let targetY = 0
    let currX = 0
    let currY = 0

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      targetX = e.clientX - rect.left
      targetY = e.clientY - rect.top
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const tick = () => {
      currX += (targetX - currX) * 0.08
      currY += (targetY - currY) * 0.08
      aura.style.transform = `translate(${currX}px, ${currY}px)`
      if (Math.abs(targetX - currX) > 0.4 || Math.abs(targetY - currY) > 0.4) {
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
              'linear-gradient(180deg, rgba(0,3,163,0.55) 0%, rgba(0,3,163,0.62) 60%, rgba(0,2,107,0.78) 100%)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Cursor aura — soft white glow that follows the mouse */}
        <div
          ref={auraRef}
          aria-hidden="true"
          className="hero-aura"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 520,
            height: 520,
            marginLeft: -260,
            marginTop: -260,
            background:
              'radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0) 65%)',
            mixBlendMode: 'screen',
            pointerEvents: 'none',
            zIndex: 2,
            opacity: 0,
            transition: 'opacity 1.2s ease',
            willChange: 'transform',
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
            opacity: 0.08,
            pointerEvents: 'none',
            zIndex: 2,
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
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth={0.6} />
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
            opacity: 0.18,
            pointerEvents: 'none',
            animation: 'heroRotate 50s linear infinite',
            zIndex: 2,
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

        {/* Counter-rotating inner dashed ring */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-8vw',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'min(420px, 36vw)',
            height: 'min(420px, 36vw)',
            opacity: 0.16,
            pointerEvents: 'none',
            animation: 'heroRotateRev 70s linear infinite',
            zIndex: 2,
          }}
        >
          <svg viewBox="0 0 420 420" fill="none" style={{ width: '100%', height: '100%' }}>
            <circle cx={210} cy={210} r={200} stroke="white" strokeWidth={0.8} strokeDasharray="4 14" />
          </svg>
        </div>

        {/* Main content */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            maxWidth: 1280,
            margin: '0 auto',
            padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 3vw, 2rem)',
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
              color: 'rgba(255,255,255,0.55)',
              marginBottom: 'clamp(1.6rem, 3vw, 2.5rem)',
              animationDelay: '0s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.7rem',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 22,
                height: 1,
                background: 'rgba(255,255,255,0.45)',
                display: 'inline-block',
              }}
            />
            {SITE_CONFIG.tagline} · 北京·中国
          </p>

          {/* H1 */}
          <h1
            style={{
              fontFamily: 'var(--serif-cn)',
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              fontSize: 'clamp(3.4rem, 9.5vw, 8.6rem)',
              color: '#ffffff',
              overflow: 'hidden',
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
            }}
          >
            <span className="hero-line" style={{ display: 'block', animationDelay: '0.12s' }}>
              守护成长
            </span>
            <span className="hero-line" style={{ display: 'block', animationDelay: '0.22s' }}>
              的每一个
            </span>
            <span className="hero-line" style={{ display: 'block', animationDelay: '0.32s' }}>
              <em
                style={{
                  fontFamily: 'var(--serif-en)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.58)',
                }}
              >
                关键时刻
              </em>
            </span>
          </h1>

          {/* Credentials strip */}
          <div
            className="hero-creds"
            aria-label="学会任职"
            style={{
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
              borderTop: '1px solid rgba(255,255,255,0.16)',
              borderBottom: '1px solid rgba(255,255,255,0.16)',
              paddingBlock: 'clamp(1rem, 2vw, 1.4rem)',
            }}
          >
            <ul
              style={{
                listStyle: 'none',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'clamp(1rem, 2.5vw, 2rem)',
                margin: 0,
                padding: 0,
              }}
              className="hero-creds-list"
            >
              {CREDENTIALS.map((c, i) => (
                <li
                  key={c}
                  className="hero-line hero-cred-item"
                  style={{
                    animationDelay: `${0.42 + i * 0.08}s`,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                    fontFamily: 'var(--sans)',
                    fontSize: 'clamp(0.74rem, 0.95vw, 0.84rem)',
                    lineHeight: 1.55,
                    color: 'rgba(255,255,255,0.78)',
                    letterSpacing: '0.02em',
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="hero-cred-mark"
                    style={{
                      fontFamily: 'var(--serif-en)',
                      fontStyle: 'italic',
                      fontWeight: 300,
                      fontSize: '0.82rem',
                      color: 'rgba(255,255,255,0.5)',
                      flexShrink: 0,
                      marginTop: '0.05em',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

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
            <p
              className="hero-line"
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
                lineHeight: 1.8,
                color: 'rgba(255,255,255,0.72)',
                maxWidth: 440,
                animationDelay: '0.7s',
              }}
            >
              {SITE_CONFIG.description}
            </p>

            <div
              className="hero-stats"
              style={{ display: 'flex', gap: '2.5rem', justifyContent: 'flex-end' }}
            >
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="hero-line"
                  style={{ animationDelay: `${0.78 + i * 0.08}s` }}
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
                      color: 'rgba(255,255,255,0.5)',
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

        {/* Scroll indicator */}
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
            gap: '0.6rem',
            zIndex: 3,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.45)',
              writingMode: 'vertical-rl',
            }}
          >
            向下滚动
          </span>
          <div
            style={{
              width: 1,
              height: 56,
              background: 'rgba(255,255,255,0.18)',
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
                background: 'rgba(255,255,255,0.7)',
                animation: 'scrollDrop 2.4s cubic-bezier(0.45,0,0.55,1) infinite',
              }}
            />
          </div>
        </div>
      </section>

      <style>{`
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
          animation: heroVideoIn 2.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
        }
        @keyframes heroVideoIn {
          from { opacity: 0; transform: scale(1.06); }
          to   { opacity: 1; transform: scale(1); }
        }

        #hero:hover .hero-aura { opacity: 1; }

        @keyframes heroRotate {
          from { transform: translateY(-50%) rotate(0deg); }
          to   { transform: translateY(-50%) rotate(360deg); }
        }
        @keyframes heroRotateRev {
          from { transform: translateY(-50%) rotate(0deg); }
          to   { transform: translateY(-50%) rotate(-360deg); }
        }

        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(28px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        @keyframes scrollDrop {
          0%   { transform: translateY(-100%); opacity: 1; }
          80%  { transform: translateY(280%);  opacity: 0.4; }
          100% { transform: translateY(280%);  opacity: 0; }
        }

        .hero-line {
          opacity: 0;
          transform: translateY(28px);
          filter: blur(6px);
        }
        .hero-revealed .hero-line {
          animation: heroSlideUp 1.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-cred-item { position: relative; transition: color 0.4s ease; }
        .hero-cred-item:hover { color: #ffffff !important; }
        .hero-cred-item:hover .hero-cred-mark { color: rgba(255,255,255,0.9) !important; }

        @media (max-width: 900px) {
          .hero-creds-list { grid-template-columns: 1fr !important; gap: 0.7rem !important; }
        }
        @media (max-width: 768px) {
          .hero-bottom { grid-template-columns: 1fr !important; }
          .hero-stats { justify-content: flex-start !important; flex-wrap: wrap !important; gap: 1.8rem !important; }
          .scroll-indicator { display: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-video { animation: none; opacity: 1; transform: none; }
          .hero-line { animation: none !important; opacity: 1; transform: none; filter: none; }
        }
      `}</style>
    </>
  )
}
