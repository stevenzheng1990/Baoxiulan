'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import ContactModal from './ContactModal'

const NAV_LINKS = [
  { label: '机构创始人', href: '/#founder' },
  { label: '专家团队', href: '/#specialists' },
  { label: '机构设施', href: '/facilities' },
  { label: '学术荣誉', href: '/#awards' },
  { label: '育儿课堂', href: '/articles' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
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
    height: 68,
    display: 'flex',
    alignItems: 'center',
    transition: 'background 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease, height 0.4s ease',
    background: atTop ? 'transparent' : 'rgba(255,255,255,0.82)',
    backdropFilter: atTop ? 'none' : 'saturate(180%) blur(22px)',
    WebkitBackdropFilter: atTop ? 'none' : 'saturate(180%) blur(22px)',
    boxShadow: atTop ? 'none' : '0 1px 0 rgba(0,3,163,0.06), 0 12px 40px -28px rgba(0,3,163,0.18)',
  }

  const textColor = atTop ? 'rgba(255,255,255,0.88)' : 'var(--ink)'

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
          background: 'linear-gradient(90deg, var(--blue) 0%, rgba(0,3,163,0.55) 100%)',
          transition: 'width 0.15s linear',
          pointerEvents: 'none',
        }}
      />

      <nav style={navStyle} role="navigation" aria-label="主导航" className={atTop ? '' : 'scrolled'}>
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 clamp(1.25rem, 3vw, 2rem)',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="nav-brand"
            style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', textDecoration: 'none' }}
          >
            <span
              aria-hidden="true"
              className="nav-brand-mark"
              style={{
                position: 'relative',
                width: 22,
                height: 22,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  border: `1px solid ${atTop ? 'rgba(255,255,255,0.55)' : 'var(--blue)'}`,
                  borderRadius: '50%',
                  transition: 'border-color 0.5s ease',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  inset: 5,
                  borderRadius: '50%',
                  background: atTop ? 'rgba(255,255,255,0.92)' : 'var(--blue)',
                  transition: 'background 0.5s ease',
                }}
              />
            </span>
            <span
              style={{
                fontFamily: 'var(--serif-cn)',
                fontSize: '1.08rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
                color: atTop ? '#ffffff' : 'var(--ink)',
                transition: 'color 0.5s ease',
              }}
            >
              宝秀兰医疗
            </span>
            <span
              className="nav-brand-tag"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                color: atTop ? 'rgba(255,255,255,0.55)' : 'var(--muted)',
                borderLeft: `1px solid ${atTop ? 'rgba(255,255,255,0.25)' : 'var(--border)'}`,
                paddingLeft: '0.7rem',
                marginLeft: '0.1rem',
                transition: 'color 0.5s ease, border-color 0.5s ease',
                whiteSpace: 'nowrap',
              }}
            >
              创立于 1991
            </span>
          </Link>

          {/* Desktop nav links */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1.4rem, 2.4vw, 2.4rem)' }}
            className="nav-desktop"
          >
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
                  position: 'relative',
                  paddingBlock: '0.4rem',
                  whiteSpace: 'nowrap',
                }}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className="nav-link-underline"
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 1,
                    background: atTop ? 'rgba(255,255,255,0.9)' : 'var(--blue)',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left center',
                    transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1), background 0.5s ease',
                  }}
                />
              </Link>
            ))}

            {/* Primary CTA — single button opens contact modal */}
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="nav-cta-solid"
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                padding: '0.6rem 1.4rem',
                borderRadius: 2,
                color: '#ffffff',
                background: atTop ? 'rgba(255,255,255,0.16)' : 'var(--blue)',
                border: `1px solid ${atTop ? 'rgba(255,255,255,0.45)' : 'var(--blue)'}`,
                transition:
                  'background 0.35s ease, color 0.35s ease, border-color 0.5s ease, transform 0.3s ease',
                whiteSpace: 'nowrap',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              联系我们
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M2 6h7m0 0L6 3m3 3L6 9"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
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
                  transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease',
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
            className="nav-mobile-panel"
            style={{
              position: 'absolute',
              top: 68,
              left: 0,
              right: 0,
              background: 'rgba(255,255,255,0.96)',
              backdropFilter: 'blur(22px)',
              WebkitBackdropFilter: 'blur(22px)',
              borderTop: '1px solid var(--border)',
              padding: '1rem 1.5rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="nav-mobile-item"
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '1rem',
                  color: 'var(--ink)',
                  padding: '0.85rem 0',
                  borderBottom: '1px solid var(--border)',
                  letterSpacing: '0.03em',
                  animation: `mobileItemIn 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s both`,
                }}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                setContactOpen(true)
              }}
              style={{
                marginTop: '1rem',
                textAlign: 'center',
                padding: '0.85rem',
                background: 'var(--blue)',
                color: '#ffffff',
                fontFamily: 'var(--sans)',
                fontSize: '0.9rem',
                letterSpacing: '0.06em',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              联系我们
            </button>
          </div>
        )}
      </nav>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />

      <style>{`
        .nav-link .nav-link-underline { transform: scaleX(0); }
        .nav-link:hover .nav-link-underline { transform: scaleX(1); }

        .nav-cta-ghost:hover {
          background: rgba(255,255,255,0.16);
          color: #ffffff;
        }
        nav.scrolled .nav-cta-ghost:hover {
          background: var(--blue);
          color: #ffffff;
          border-color: var(--blue);
        }
        .nav-cta-solid {
          position: relative;
        }
        .nav-cta-solid:hover {
          transform: translateY(-1px);
          background: rgba(255,255,255,0.26);
        }
        nav.scrolled .nav-cta-solid:hover {
          background: #00027A;
          border-color: #00027A;
        }

        .nav-brand-mark {
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .nav-brand:hover .nav-brand-mark {
          transform: rotate(180deg);
        }

        @keyframes mobileItemIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 980px) {
          .nav-brand-tag { display: none !important; }
        }
        @media (max-width: 860px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (min-width: 861px) {
          .nav-hamburger { display: none !important; }
        }
      `}</style>
    </>
  )
}
