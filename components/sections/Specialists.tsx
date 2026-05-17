'use client'

import { useState } from 'react'
import Image from 'next/image'
import { EXPERTS_SEED } from '@/content/site'

// The 3 specialists are indices 1, 2, 3 (excluding founder at index 0)
const DOCTORS = EXPERTS_SEED.slice(1)

const SECTION_LABELS = ['介绍', '擅长领域', '主要任职'] as const

type SectionKey = (typeof SECTION_LABELS)[number]

function getDoctorSections(doc: (typeof DOCTORS)[number]): Record<SectionKey, string[]> {
  return {
    介绍: [doc.bio],
    擅长领域: doc.specialties,
    主要任职: doc.credentials,
  }
}

export default function Specialists() {
  const [activeTab, setActiveTab] = useState(0)
  const [openSection, setOpenSection] = useState<SectionKey | null>('介绍')

  const doctor = DOCTORS[activeTab]
  const sections = getDoctorSections(doctor)

  const tabNumbers = ['02', '03', '04']

  return (
    <section
      style={{
        background: 'var(--off-white)',
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.25rem, 5vw, 4rem)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        {/* Section header */}
        <div
          className="r r-blur"
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)', maxWidth: '640px' }}
        >
          <div className="section-tag">我们的专家 · Specialists</div>
          <h2
            className="section-heading"
            dangerouslySetInnerHTML={{
              __html: '三位首席专家，同一份<em>专注</em>',
            }}
          />
          <p
            style={{
              marginTop: '1rem',
              fontSize: '0.95rem',
              lineHeight: 1.75,
              color: 'var(--muted)',
              fontFamily: 'var(--sans)',
            }}
          >
            与鲍秀兰教授协作逾30年，深耕新生儿脑科学与高危儿早期干预的顶尖临床团队。
          </p>
        </div>

        {/* Tab row */}
        <div
          className="r"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0',
            marginBottom: '0',
            border: '1px solid var(--border)',
            borderBottom: 'none',
          }}
        >
          {DOCTORS.map((doc, i) => {
            const isActive = i === activeTab
            return (
              <button
                key={doc.slug}
                onClick={() => {
                  setActiveTab(i)
                  setOpenSection('介绍')
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.1rem 1.5rem',
                  background: isActive ? 'var(--blue)' : 'var(--white)',
                  color: isActive ? 'var(--white)' : 'var(--ink)',
                  border: 'none',
                  borderRight: i < DOCTORS.length - 1 ? '1px solid var(--border)' : 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.25s, color 0.25s',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--serif-en)',
                    fontStyle: 'italic',
                    fontSize: '1.4rem',
                    fontWeight: 300,
                    opacity: isActive ? 0.6 : 0.35,
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  {tabNumbers[i]}
                </span>
                <span>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'var(--serif-cn)',
                      fontSize: '1rem',
                      fontWeight: 400,
                      lineHeight: 1.2,
                    }}
                  >
                    {doc.name}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.7rem',
                      opacity: isActive ? 0.7 : 0.55,
                      marginTop: '0.15rem',
                      fontFamily: 'var(--sans)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {doc.role.replace('北京宝秀兰医疗', '')}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Panel */}
        <div
          key={activeTab}
          style={{
            background: 'var(--white)',
            border: '1px solid var(--border)',
            display: 'grid',
            gridTemplateColumns: 'clamp(220px, 0.65fr, 340px) 1.35fr',
            animation: 'specialistFade 0.4s cubic-bezier(0.22,1,0.36,1) both',
          }}
          className="specialist-panel"
        >
          {/* LEFT: Portrait */}
          <div style={{ position: 'relative' }}>
            <div
              className="sheen in"
              style={{
                position: 'relative',
                aspectRatio: '4/5',
                overflow: 'hidden',
                animation: 'portraitClip 1.1s cubic-bezier(0.77,0,0.18,1) both',
              }}
              key={`portrait-${activeTab}`}
            >
              <Image
                src={doctor.photoPath ?? '/doctors/zhoucongle.png'}
                alt={doctor.name}
                fill
                className="kenburns"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                sizes="(max-width: 768px) 90vw, 340px"
              />
              {/* Number badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'var(--blue)',
                  color: 'var(--white)',
                  fontFamily: 'var(--serif-en)',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  fontWeight: 300,
                  width: '2.2rem',
                  height: '2.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {tabNumbers[activeTab]}
              </div>
            </div>
          </div>

          {/* RIGHT: Info */}
          <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            {/* Name */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h3
                style={{
                  fontFamily: 'var(--serif-cn)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  fontWeight: 400,
                  color: 'var(--ink)',
                  lineHeight: 1,
                }}
              >
                {doctor.name}
              </h3>
              <span
                style={{
                  fontFamily: 'var(--serif-en)',
                  fontStyle: 'italic',
                  fontSize: '0.95rem',
                  color: 'var(--blue)',
                  fontWeight: 300,
                  display: 'block',
                  marginTop: '0.25rem',
                }}
              >
                {doctor.nameEn}
              </span>
            </div>

            {/* Title */}
            <p
              style={{
                fontSize: '0.82rem',
                color: 'var(--muted)',
                marginBottom: '1rem',
                fontFamily: 'var(--sans)',
                lineHeight: 1.5,
              }}
            >
              {doctor.title}
            </p>

            {/* Org — blue left border */}
            <div
              style={{
                borderLeft: '3px solid var(--blue)',
                paddingLeft: '0.85rem',
                fontSize: '0.82rem',
                color: 'var(--ink)',
                fontFamily: 'var(--sans)',
                marginBottom: '1.75rem',
                lineHeight: 1.5,
              }}
            >
              {doctor.org}
            </div>

            {/* Expandable sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {SECTION_LABELS.map((label) => {
                const isOpen = openSection === label
                const items = sections[label]
                return (
                  <div
                    key={label}
                    style={{
                      borderTop: '1px solid var(--border)',
                    }}
                  >
                    <button
                      onClick={() => setOpenSection(isOpen ? null : label)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '0.85rem 0',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.68rem',
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: isOpen ? 'var(--blue)' : 'var(--muted)',
                          fontFamily: 'var(--sans)',
                          fontWeight: 500,
                          transition: 'color 0.2s',
                        }}
                      >
                        {label}
                      </span>
                      <span
                        style={{
                          fontSize: '1rem',
                          color: 'var(--blue)',
                          lineHeight: 1,
                          transform: isOpen ? 'rotate(45deg)' : 'none',
                          transition: 'transform 0.2s',
                          display: 'inline-block',
                        }}
                      >
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <div
                        style={{
                          paddingBottom: '1rem',
                        }}
                      >
                        {items.map((item, j) => (
                          <div
                            key={j}
                            style={{
                              fontSize: '0.84rem',
                              color: 'var(--ink)',
                              lineHeight: 1.7,
                              fontFamily: 'var(--sans)',
                              paddingLeft: label !== '介绍' ? '1rem' : '0',
                              position: 'relative',
                            }}
                          >
                            {label !== '介绍' && (
                              <span
                                style={{
                                  position: 'absolute',
                                  left: 0,
                                  top: '0.55em',
                                  width: '4px',
                                  height: '4px',
                                  borderRadius: '50%',
                                  background: 'var(--blue)',
                                }}
                              />
                            )}
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes specialistFade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes portraitClip {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0 0 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="portraitClip"] { animation: none !important; }
        }
        @media (max-width: 900px) {
          .specialist-panel {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .specialist-panel div:first-child {
            aspect-ratio: 3/2 !important;
          }
        }
      `}</style>
    </section>
  )
}
