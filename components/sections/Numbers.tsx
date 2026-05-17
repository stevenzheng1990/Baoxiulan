'use client'

import { useEffect, useRef, useState } from 'react'

interface StatCell {
  raw: number
  display: (n: number) => string
  sup?: string
  label: string
}

const CELLS: StatCell[] = [
  {
    raw: 34,
    display: (n) => String(Math.round(n)),
    sup: '+',
    label: '年临床积淀 / since 1991',
  },
  {
    raw: 12,
    display: (n) => String(Math.round(n)),
    label: '个核心诊疗领域',
  },
  {
    raw: 5,
    display: (n) => String(Math.round(n)),
    sup: '项',
    label: '国家级科技进步奖',
  },
  {
    raw: 50000,
    display: (n) => (n >= 1000 ? `${Math.round(n / 1000)}k` : String(Math.round(n))),
    sup: '+',
    label: '家庭信任之选',
  },
]

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!active) return
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(eased * target)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setValue(target)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, active])

  return value
}

function StatCell({ cell, index }: { cell: StatCell; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const count = useCountUp(cell.raw, 1800, active)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const isLast = index === CELLS.length - 1

  return (
    <div
      ref={ref}
      className="numbers-cell"
      style={{
        flex: 1,
        padding: '2.5rem 1.75rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRight: isLast ? 'none' : '1px solid rgba(255,255,255,0.10)',
        position: 'relative',
      }}
    >
      {/* Number */}
      <div
        style={{
          fontFamily: 'var(--serif-en)',
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: '#ffffff',
          lineHeight: 1,
          marginBottom: '0.6rem',
          letterSpacing: '-0.025em',
        }}
      >
        {cell.display(count)}
        {cell.sup && (
          <sup
            style={{
              fontFamily: 'var(--serif-cn)',
              fontSize: '0.3em',
              fontStyle: 'normal',
              verticalAlign: 'super',
              marginLeft: '0.12em',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            {cell.sup}
          </sup>
        )}
      </div>

      {/* Label */}
      <p
        style={{
          fontFamily: 'var(--sans)',
          fontSize: '0.72rem',
          letterSpacing: '0.1em',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.5,
        }}
      >
        {cell.label}
      </p>
    </div>
  )
}

export default function Numbers() {
  return (
    <>
      <section
        style={{
          background: 'var(--blue)',
          width: '100%',
        }}
        aria-label="机构数据"
      >
        <div
          className="numbers-grid"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'flex',
          }}
        >
          {CELLS.map((cell, i) => (
            <StatCell key={cell.label} cell={cell} index={i} />
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .numbers-grid {
            flex-wrap: wrap !important;
          }
          .numbers-cell {
            flex: 0 0 50% !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.12) !important;
          }
          .numbers-cell:nth-child(odd) {
            border-right: 1px solid rgba(255,255,255,0.12) !important;
          }
          .numbers-cell:nth-last-child(-n+2) {
            border-bottom: none !important;
          }
        }
        @media (max-width: 480px) {
          .numbers-cell {
            flex: 0 0 100% !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.12) !important;
          }
          .numbers-cell:nth-child(odd) {
            border-right: none !important;
          }
          .numbers-cell:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </>
  )
}
