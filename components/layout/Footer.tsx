'use client'

import Link from 'next/link'
import { useSettings } from '@/components/SettingsProvider'

export default function Footer() {
  const year = new Date().getFullYear()
  const settings = useSettings()

  const FOOTER_LINKS = {
    institution: {
      label: '机构',
      links: [
        { label: '关于宝秀兰', href: '/#founder' },
        { label: '专家团队', href: '/#specialists' },
        { label: '学术荣誉', href: '/#awards' },
        { label: '机构设施', href: '/facilities' },
      ],
    },
    services: {
      label: '服务',
      links: [
        { label: '诊疗服务', href: '/#services' },
        { label: '康复团队', href: '/#therapists' },
        { label: '育儿课堂', href: '/articles' },
        { label: '在线预约', href: '/#contact' },
      ],
    },
    contact: {
      label: '联系',
      links: [
        { label: `电话：${settings.phone}`, href: `tel:${settings.phone}` },
        { label: `邮箱：${settings.email}`, href: `mailto:${settings.email}` },
        { label: settings.hours, href: '/#contact' },
        { label: '在线预约', href: '/#contact' },
      ],
    },
  }

  return (
    <footer
      style={{
        background:
          'linear-gradient(180deg, #0A0E2E 0%, #070A24 55%, #05071C 100%)',
        color: 'rgba(237,239,250,0.78)',
        fontFamily: 'var(--sans)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft brand-blue glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          height: '60%',
          background:
            'radial-gradient(ellipse at center, rgba(0,3,163,0.35) 0%, rgba(0,3,163,0) 65%)',
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }}
      />
      {/* Hairline top accent */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(120,140,220,0.35) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
      {/* Main grid */}
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '5rem 2rem 3.5rem',
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '3rem',
        }}
        className="footer-grid"
      >
        {/* Brand column */}
        <div style={{ gridColumn: 'span 1' }} className="footer-brand">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.6rem',
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.6)',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--serif-cn)',
                fontSize: '1.15rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
                color: '#ffffff',
              }}
            >
              {settings.name}
            </span>
          </div>

          <p
            style={{
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              marginBottom: '1.4rem',
            }}
          >
            {settings.name} · 创立于 {settings.established}
          </p>

          <p
            style={{
              fontSize: '0.82rem',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.55)',
              marginBottom: '1.6rem',
              maxWidth: 240,
            }}
          >
            {settings.description}
          </p>

          {/* "守护成长" badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              border: '1px solid rgba(170,190,255,0.18)',
              borderRadius: 2,
              padding: '0.45rem 0.9rem',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.4)',
                display: 'inline-block',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--serif-cn)',
                fontSize: '0.82rem',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              守护成长
            </span>
          </div>
        </div>

        {/* Link columns */}
        {Object.values(FOOTER_LINKS).map((col) => (
          <div key={col.label}>
            <h3
              style={{
                fontFamily: 'var(--sans)',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                marginBottom: '1.4rem',
              }}
            >
              {col.label}
            </h3>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
              }}
            >
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '0.875rem',
                      color: 'rgba(255,255,255,0.6)',
                      lineHeight: 1.4,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.color = '#ffffff'
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(170,190,255,0.08)', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '1.4rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
          className="footer-bottom"
        >
          <p
            style={{
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.03em',
            }}
          >
            © {year} 宝秀兰医疗 · 京ICP备XXXXXXXX号 · 京公网安备XXXXXXXXXXXXXXXX号
          </p>
          <p
            style={{
              fontSize: '0.75rem',
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.02em',
            }}
          >
            {settings.address}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .footer-brand {
            grid-column: span 2 !important;
          }
        }
        @media (max-width: 540px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .footer-brand {
            grid-column: span 1 !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  )
}
