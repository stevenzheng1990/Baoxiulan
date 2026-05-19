'use client'

import { useSettings } from '@/components/SettingsProvider'

export default function Cta() {
  const SITE_CONFIG = useSettings()
  return (
    <section
      id="contact"
      className="section"
      style={{
        background: 'var(--blue)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background decoration */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'min(520px, 45vw)',
          height: 'min(520px, 45vw)',
          opacity: 0.04,
          pointerEvents: 'none',
        }}
        viewBox="0 0 520 520"
        fill="none"
      >
        {[60, 120, 180, 240, 260].map((r) => (
          <circle key={r} cx={260} cy={260} r={r} stroke="white" strokeWidth={1} />
        ))}
      </svg>

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(2.25rem, 4.5vw, 4.5rem)',
            alignItems: 'center',
          }}
          className="cta-grid"
        >
          {/* ── LEFT ── */}
          <div className="r-l">
            {/* Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.8rem',
                fontSize: '0.72rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 1,
                  background: 'rgba(255,255,255,0.35)',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              预约咨询 · Appointment
            </div>

            {/* Headline */}
            <h2
              style={{
                fontFamily: 'var(--serif-cn)',
                fontWeight: 400,
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                lineHeight: 1.15,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                marginBottom: '2.5rem',
              }}
            >
              愿意陪你，
              <br />
              走过每个{' '}
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
            </h2>

            {/* Buttons */}
            <div
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 2rem',
                  background: '#ffffff',
                  color: 'var(--blue)',
                  fontFamily: 'var(--sans)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.88' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
              >
                立即拨打预约
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 2rem',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.85)',
                  fontFamily: 'var(--sans)',
                  fontSize: '0.9rem',
                  fontWeight: 400,
                  letterSpacing: '0.04em',
                  border: '1px solid rgba(255,255,255,0.35)',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.7)'
                  el.style.color = '#ffffff'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.35)'
                  el.style.color = 'rgba(255,255,255,0.85)'
                }}
              >
                发送邮件咨询
              </a>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div
            className="r-r"
            style={{
              paddingLeft: 'clamp(0rem, 3vw, 3rem)',
              borderLeft: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            {/* Phone */}
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              style={{
                display: 'block',
                fontFamily: 'var(--serif-en)',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                color: '#ffffff',
                letterSpacing: '0.02em',
                textDecoration: 'none',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid rgba(255,255,255,0.15)',
                marginBottom: '1.75rem',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.75' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
            >
              {SITE_CONFIG.phone}
            </a>

            {/* Contact info list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '📍', label: '地址', value: SITE_CONFIG.address },
                { icon: '✉', label: '邮箱', value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
                { icon: '🕐', label: '开诊', value: SITE_CONFIG.hours },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
                >
                  <div
                    style={{
                      width: '1.75rem',
                      height: '1.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(255,255,255,0.08)',
                      flexShrink: 0,
                      borderRadius: 2,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.75rem',
                        filter: 'grayscale(1) brightness(2)',
                        opacity: 0.6,
                      }}
                    >
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--sans)',
                        fontSize: '0.65rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.35)',
                        marginBottom: '0.2rem',
                      }}
                    >
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{
                          fontFamily: 'var(--sans)',
                          fontSize: '0.875rem',
                          color: 'rgba(255,255,255,0.75)',
                          textDecoration: 'none',
                          transition: 'color 0.2s',
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#ffffff' }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)' }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span
                        style={{
                          fontFamily: 'var(--sans)',
                          fontSize: '0.875rem',
                          color: 'rgba(255,255,255,0.75)',
                        }}
                      >
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
          }
          .cta-grid > *:last-child {
            padding-left: 0 !important;
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.12) !important;
            padding-top: 2rem !important;
          }
        }
      `}</style>
    </section>
  )
}
