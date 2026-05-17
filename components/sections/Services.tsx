'use client'

import { useEffect, useRef } from 'react'
import { SERVICES_SEED } from '@/content/site'

// Local seed type — matches SERVICES_SEED shape (no DB fields required)
interface ServiceItem {
  slug: string
  name: string
  shortDesc?: string
  sortOrder: number
}

interface Props {
  services?: ServiceItem[]
}

// Grid layout map: index → column span (12-col grid)
const SPAN_MAP: Record<number, number> = {
  0: 5, // featured blue card
  1: 4,
  2: 3,
  3: 4,
  4: 4,
  5: 4,
  6: 3,
  7: 3,
  8: 3,
  9: 3,
  10: 4,
  11: 5,
}

function ServiceCard({
  service,
  index,
}: {
  service: ServiceItem
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isFeatured = index === 0
  const span = SPAN_MAP[index] ?? 4

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const cardStyle: React.CSSProperties = {
    gridColumn: `span ${span}`,
    background: isFeatured ? 'var(--blue)' : 'var(--white)',
    border: isFeatured ? 'none' : '1px solid var(--border)',
    borderRadius: 2,
    padding: isFeatured ? '2.25rem' : '1.5rem 1.5rem 1.35rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: isFeatured ? 240 : 156,
    position: 'relative',
    overflow: 'hidden',
    cursor: 'default',
    transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
  }

  return (
    <div
      ref={ref}
      className="r services-card"
      style={cardStyle}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        if (!isFeatured) {
          el.style.boxShadow = '0 1px 0 var(--blue), 0 12px 28px -16px rgba(0,3,163,0.18)'
          el.style.borderColor = 'transparent'
          el.style.transform = 'translateY(-2px)'
        }
        const line = el.querySelector('.card-line') as HTMLElement | null
        const more = el.querySelector('.card-more') as HTMLElement | null
        if (line) line.style.transform = 'scaleX(1)'
        if (more) {
          more.style.opacity = '1'
          more.style.transform = 'translateY(0)'
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        if (!isFeatured) {
          el.style.boxShadow = 'none'
          el.style.borderColor = 'var(--border)'
          el.style.transform = 'translateY(0)'
        }
        const line = el.querySelector('.card-line') as HTMLElement | null
        const more = el.querySelector('.card-more') as HTMLElement | null
        if (line) line.style.transform = 'scaleX(0)'
        if (more) {
          more.style.opacity = '0'
          more.style.transform = 'translateY(4px)'
        }
      }}
    >
      {/* Index number */}
      <span
        style={{
          fontFamily: 'var(--serif-en)',
          fontStyle: 'italic',
          fontSize: '0.72rem',
          color: isFeatured ? 'rgba(255,255,255,0.35)' : 'var(--muted)',
          marginBottom: '1.2rem',
          display: 'block',
        }}
      >
        {String(service.sortOrder).padStart(2, '0')}
      </span>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <h3
          style={{
            fontFamily: 'var(--serif-cn)',
            fontSize: isFeatured ? 'clamp(1.2rem, 2.2vw, 1.7rem)' : 'clamp(0.95rem, 1.4vw, 1.1rem)',
            fontWeight: 400,
            lineHeight: 1.25,
            letterSpacing: '0.02em',
            color: isFeatured ? '#ffffff' : 'var(--ink)',
            marginBottom: service.shortDesc && (isFeatured || index <= 2) ? '0.9rem' : 0,
          }}
        >
          {service.name}
        </h3>

        {service.shortDesc && (isFeatured || index <= 2) && (
          <p
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '0.8rem',
              lineHeight: 1.7,
              color: isFeatured ? 'rgba(255,255,255,0.65)' : 'var(--muted)',
              maxWidth: isFeatured ? 320 : undefined,
            }}
          >
            {service.shortDesc}
          </p>
        )}
      </div>

      {/* Bottom: hover line + "了解更多" */}
      <div style={{ position: 'relative', marginTop: '1.5rem', height: 20 }}>
        {/* Slide-in bottom line */}
        <span
          className="card-line"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 1,
            background: isFeatured ? 'rgba(255,255,255,0.3)' : 'var(--blue)',
            transform: 'scaleX(0)',
            transformOrigin: 'left center',
            transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        {/* "了解更多 →" */}
        <span
          className="card-more"
          style={{
            position: 'absolute',
            bottom: 4,
            left: 0,
            fontFamily: 'var(--sans)',
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            color: isFeatured ? 'rgba(255,255,255,0.7)' : 'var(--blue)',
            opacity: 0,
            transform: 'translateY(4px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            pointerEvents: 'none',
          }}
        >
          了解更多 →
        </span>
      </div>
    </div>
  )
}

export default function Services({ services }: Props) {
  const headingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = headingRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const items: ServiceItem[] = services ?? SERVICES_SEED

  return (
    <>
      <section
        id="services"
        className="section"
        style={{
          background: 'var(--off-white)',
        }}
      >
        <div className="container">
          {/* Section header */}
          <div
            ref={headingRef}
            className="rsg"
            style={{
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
              maxWidth: 640,
            }}
          >
            <p className="eyebrow">诊疗领域 · Services</p>
            <h2
              className="h-display"
              style={{ marginTop: '0.85rem' }}
              dangerouslySetInnerHTML={{
                __html: '12 个核心领域，覆盖<em>关键发展期</em>',
              }}
            />
            <p className="lede" style={{ marginTop: '1rem' }}>
              从出生到学龄前，宝秀兰以循证医学为基础，提供全周期、多维度的儿童早期发展干预服务。
            </p>
          </div>

          {/* Bento grid */}
          <div
            className="services-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '0.65rem',
            }}
          >
            {items.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(6, 1fr) !important;
          }
          .services-card {
            grid-column: span 3 !important;
          }
          .services-card:first-child {
            grid-column: span 6 !important;
          }
          .services-card:nth-child(2) {
            grid-column: span 3 !important;
          }
          .services-card:nth-child(3) {
            grid-column: span 3 !important;
          }
        }
        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .services-card {
            grid-column: span 1 !important;
          }
          .services-card:first-child {
            grid-column: span 2 !important;
          }
        }
        @media (max-width: 420px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          .services-card {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </>
  )
}
