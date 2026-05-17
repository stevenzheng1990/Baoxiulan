'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: '机构介绍', href: '#about' },
  { label: '诊疗服务', href: '#services' },
  { label: '专家团队', href: '#experts' },
  { label: '育儿课堂', href: '#courses' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const heroThreshold = useRef<number>(0)

  useEffect(() => {
    heroThreshold.current = window.innerHeight * 0.8

    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > heroThreshold.current)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min((y / docHeight) * 100, 100) : 0)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const atTop = !scrolled

  const navStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    transition: 'background 0.4s ease, box-shadow 0.4s ease',
    background: atTop ? 'transparent' : 'rgba(255,255,255,0.88)',
    backdropFilter: atTop ? 'none' : 'blur(16px)',
    WebkitBackdropFilter: atTop ? 'none' : 'blur(16px)',
    boxShadow: atTop ? 'none' : '0 1px 0 rgba(0,3,163,0.08)',
  }

  const textColor = atTop ? 'rgba(255,255,255,0.85)' : 'var(--blue)'

  return (
    <>
      {/* Progress bar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 101,
          height: 2,
          width: `${progress}%`,
          background: 'var(--blue)',
          transition: 'width 0.1s linear',
          pointerEvents: 'none',
        }}
      />

      <nav style={navStyle} role="navigation" aria-label="主导航">
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 2rem',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: atTop ? 'rgba(255,255,255,0.9)' : 'var(--blue)',
                flexShrink: 0,
                transition: 'background 0.4s ease',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--serif-cn)',
                fontSize: '1.05rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                color: atTop ? '#ffffff' : 'var(--ink)',
                transition: 'color 0.4s ease',
              }}
            >
              宝秀兰医疗
            </span>
            <span
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: atTop ? 'rgba(255,255,255,0.5)' : 'var(--muted)',
                borderLeft: `1px solid ${atTop ? 'rgba(255,255,255,0.25)' : 'var(--border)'}`,
                paddingLeft: '0.6rem',
                marginLeft: '0.2rem',
                transition: 'color 0.4s ease, border-color 0.4s ease',
                whiteSpace: 'nowrap',
              }}
            >
              BAOXIULAN · est.&nbsp;1991
            </span>
          </Link>

          {/* Desktop nav links */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}
            className="nav-desktop"
          >
            {/* Inject hover styles via a <style> tag — avoids passing event handlers through RSC boundary */}
            <style>{`
              .nav-link { opacity: 0.85; transition: opacity 0.2s ease; }
              .nav-link:hover { opacity: 1; }
              .nav-cta-btn:hover { background: rgba(255,255,255,0.2) !important; color: #ffffff !important; }
              nav.scrolled .nav-cta-btn:hover { background: var(--blue) !important; color: #ffffff !important; }
            `}</style>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '0.875rem',
                  letterSpacing: '0.04em',
                  color: textColor,
                  transition: 'color 0.2s ease, opacity 0.2s ease',
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* CTA */}
            <Link
              href="#contact"
              className="nav-cta-btn"
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                padding: '0.55rem 1.3rem',
                borderRadius: 2,
                border: atTop ? '1px solid rgba(255,255,255,0.5)' : '1px solid var(--blue)',
                color: atTop ? '#ffffff' : 'var(--blue)',
                background: atTop ? 'rgba(255,255,255,0.08)' : 'transparent',
                transition: 'background 0.25s ease, color 0.25s ease, border-color 0.4s ease',
                whiteSpace: 'nowrap',
              }}
            >
              预约就诊
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            onClick={() => setMenuOpen((v) => !v)}
            className="nav-hamburger"
            style={{
              display: 'none',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 5,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.4rem',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 22,
                  height: 1.5,
                  borderRadius: 2,
                  background: atTop ? '#ffffff' : 'var(--blue)',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  transformOrigin: 'center',
                  transform: menuOpen
                    ? i === 0
                      ? 'translateY(6.5px) rotate(45deg)'
                      : i === 1
                        ? 'scaleX(0)'
                        : 'translateY(-6.5px) rotate(-45deg)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            style={{
              position: 'absolute',
              top: 64,
              left: 0,
              right: 0,
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderTop: '1px solid var(--border)',
              padding: '1rem 2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '1rem',
                  color: 'var(--ink)',
                  padding: '0.75rem 0',
                  borderBottom: '1px solid var(--border)',
                  letterSpacing: '0.03em',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#appointment"
              onClick={() => setMenuOpen(false)}
              style={{
                marginTop: '1rem',
                textAlign: 'center',
                padding: '0.75rem',
                background: 'var(--blue)',
                color: '#ffffff',
                fontFamily: 'var(--sans)',
                fontSize: '0.9rem',
                letterSpacing: '0.06em',
                borderRadius: 2,
              }}
            >
              预约就诊
            </Link>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </>
  )
}
