import Link from 'next/link'
import { SITE_CONFIG } from '@/content/site'

const FOOTER_LINKS = {
  institution: {
    label: '机构',
    links: [
      { label: '关于宝秀兰', href: '#about' },
      { label: '专家团队', href: '#experts' },
      { label: '荣誉资质', href: '#honors' },
      { label: '媒体报道', href: '#media' },
    ],
  },
  services: {
    label: '服务',
    links: [
      { label: '高危儿干预', href: '#services' },
      { label: '脑瘫康复', href: '#services' },
      { label: 'ASD 评估', href: '#services' },
      { label: '育儿课堂', href: '#courses' },
    ],
  },
  contact: {
    label: '联系',
    links: [
      { label: `电话：${SITE_CONFIG.phone}`, href: `tel:${SITE_CONFIG.phone}` },
      { label: `邮箱：${SITE_CONFIG.email}`, href: `mailto:${SITE_CONFIG.email}` },
      { label: SITE_CONFIG.hours, href: '#contact' },
      { label: '在线预约', href: '#appointment' },
    ],
  },
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: 'var(--ink)',
        color: 'rgba(255,255,255,0.75)',
        fontFamily: 'var(--sans)',
      }}
    >
      {/* Main grid */}
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '5rem 2rem 3.5rem',
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
              宝秀兰医疗
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
            Baoxiulan Medical · est. 1991
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
            {SITE_CONFIG.description}
          </p>

          {/* "守护成长" badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              border: '1px solid rgba(255,255,255,0.12)',
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
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
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
            {SITE_CONFIG.address}
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
