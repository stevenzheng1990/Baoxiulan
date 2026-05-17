'use client'

import { useRef } from 'react'

const SERVICES = [
  '高危儿早期干预',
  '脑瘫康复训练',
  '自闭症谱系障碍',
  '全面发育落后',
  '感觉统合障碍',
  '言语发音障碍',
  '注意力缺陷',
  '多动症 ADHD',
  '学习障碍',
  '喂养困难',
  '心理行为评估',
  '家庭育儿指导',
]

export default function MarqueeBar() {
  const trackRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = 'paused'
    }
  }

  const handleMouseLeave = () => {
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = 'running'
    }
  }

  // Duplicate items for seamless loop
  const items = [...SERVICES, ...SERVICES]

  return (
    <>
      <div
        style={{
          background: 'var(--off-white)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          overflow: 'hidden',
          height: 48,
          display: 'flex',
          alignItems: 'center',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-hidden="true"
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            whiteSpace: 'nowrap',
            animation: 'marqueeScroll 35s linear infinite',
            willChange: 'transform',
          }}
        >
          {items.map((name, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1.2rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--serif-cn)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.12em',
                  color: 'var(--ink)',
                  opacity: 0.7,
                  padding: '0 0.6rem',
                }}
              >
                {name}
              </span>
              <span
                style={{
                  display: 'inline-block',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: 'var(--blue)',
                  opacity: 0.4,
                  flexShrink: 0,
                }}
              />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </>
  )
}
