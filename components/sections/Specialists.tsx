'use client'

import { useState } from 'react'
import Image from 'next/image'
import { EXPERTS_SEED } from '@/content/site'

const DOCTORS = EXPERTS_SEED.slice(1)

const SECTION_LABELS = ['介绍', '擅长领域', '主要任职'] as const
type SectionKey = (typeof SECTION_LABELS)[number]

function getDoctorSections(
  doc: (typeof DOCTORS)[number]
): Record<SectionKey, string[]> {
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
      className="section"
      style={{ background: 'var(--paper)', borderTop: '1px solid var(--border)' }}
    >
      <div className="container">
        {/* Header */}
        <header
          className="r-blur specialists-header"
          style={{ marginBottom: 'clamp(2rem, 4vw, 3rem)' }}
        >
          <span className="eyebrow">首席专家 · Specialists</span>
          <h2
            className="h-display"
            style={{ marginTop: '0.85rem', maxWidth: '20ch' }}
            dangerouslySetInnerHTML={{
              __html: '三位首席专家，同一份<em>专注</em>',
            }}
          />
          <p className="lede" style={{ marginTop: '1rem' }}>
            与鲍秀兰教授协作逾 30 年，深耕新生儿脑科学与高危儿早期干预的顶尖临床团队。
          </p>
        </header>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="首席专家"
          className="r specialists-tabs"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            background: 'var(--white)',
          }}
        >
          {DOCTORS.map((doc, i) => {
            const isActive = i === activeTab
            return (
              <button
                key={doc.slug}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveTab(i)
                  setOpenSection('介绍')
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '1rem 1.25rem',
                  background: 'transparent',
                  color: isActive ? 'var(--blue)' : 'var(--ink-soft)',
                  border: 'none',
                  borderRight:
                    i < DOCTORS.length - 1 ? '1px solid var(--border)' : 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  position: 'relative',
                  transition: 'color 0.25s ease',
                }}
              >
                {/* Active underline */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 'auto 0 -1px 0',
                    height: 2,
                    background: 'var(--blue)',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left center',
                    transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--serif-en)',
                    fontStyle: 'italic',
                    fontSize: '1.1rem',
                    fontWeight: 300,
                    opacity: isActive ? 0.7 : 0.4,
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
                      fontSize: '0.98rem',
                      fontWeight: 500,
                      lineHeight: 1.2,
                      color: isActive ? 'var(--ink)' : 'var(--ink-soft)',
                    }}
                  >
                    {doc.name}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.7rem',
                      color: 'var(--muted)',
                      marginTop: '0.2rem',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {doc.role.replace('北京宝秀兰医疗', '').trim()}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {/* Panel */}
        <div
          key={activeTab}
          className="specialists-panel"
          style={{
            background: 'var(--white)',
            borderBottom: '1px solid var(--border)',
            borderInline: '1px solid var(--border)',
            display: 'grid',
            gridTemplateColumns: 'minmax(180px, 240px) 1fr',
            gap: 'clamp(1.25rem, 2.5vw, 2rem)',
            padding: 'clamp(1.5rem, 2.5vw, 2.25rem)',
            animation: 'specialistFade 0.45s cubic-bezier(0.22,1,0.36,1) both',
          }}
        >
          {/* Portrait */}
          <figure style={{ margin: 0 }}>
            <div
              key={`portrait-${activeTab}`}
              style={{
                position: 'relative',
                aspectRatio: '4 / 5',
                overflow: 'hidden',
                background: 'var(--off-white)',
                border: '1px solid var(--border)',
                animation: 'portraitFade 0.6s cubic-bezier(0.22,1,0.36,1) both',
              }}
            >
              <Image
                src={doctor.photoPath ?? '/doctors/zhoucongle.png'}
                alt={doctor.name}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center 18%' }}
                sizes="(max-width: 900px) 70vw, 240px"
              />
              <span
                style={{
                  position: 'absolute',
                  top: '0.7rem',
                  left: '0.7rem',
                  background: 'var(--blue)',
                  color: 'var(--white)',
                  fontFamily: 'var(--serif-en)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: '0.78rem',
                  padding: '0.18rem 0.5rem',
                  letterSpacing: '0.02em',
                }}
              >
                {tabNumbers[activeTab]}
              </span>
            </div>
          </figure>

          {/* Info */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--serif-cn)',
                fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)',
                fontWeight: 400,
                color: 'var(--ink)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              {doctor.name}
              <span
                style={{
                  fontFamily: 'var(--serif-en)',
                  fontStyle: 'italic',
                  fontSize: '0.48em',
                  color: 'var(--blue)',
                  marginLeft: '0.6rem',
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                  verticalAlign: '0.55em',
                }}
              >
                {doctor.nameEn}
              </span>
            </h3>

            <p
              style={{
                marginTop: '0.6rem',
                fontSize: '0.78rem',
                color: 'var(--muted)',
                letterSpacing: '0.04em',
                lineHeight: 1.55,
              }}
            >
              {doctor.title}
            </p>

            <div
              style={{
                marginTop: '1rem',
                paddingLeft: '0.85rem',
                borderLeft: '2px solid var(--blue)',
                fontSize: '0.82rem',
                color: 'var(--ink-soft)',
                lineHeight: 1.55,
              }}
            >
              {doctor.org}
            </div>

            <div
              style={{
                marginTop: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {SECTION_LABELS.map((label) => {
                const isOpen = openSection === label
                const items = sections[label]
                return (
                  <div
                    key={label}
                    style={{ borderTop: '1px solid var(--border)' }}
                  >
                    <button
                      onClick={() =>
                        setOpenSection(isOpen ? null : label)
                      }
                      aria-expanded={isOpen}
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
                          letterSpacing: '0.22em',
                          textTransform: 'uppercase',
                          color: isOpen ? 'var(--blue)' : 'var(--muted)',
                          fontWeight: 600,
                          transition: 'color 0.2s ease',
                        }}
                      >
                        {label}
                      </span>
                      <span
                        aria-hidden="true"
                        style={{
                          width: 11,
                          height: 11,
                          position: 'relative',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            inset: '50% 0 auto 0',
                            height: 1,
                            background: 'var(--blue)',
                            transform: 'translateY(-50%)',
                          }}
                        />
                        <span
                          style={{
                            position: 'absolute',
                            inset: '0 50% auto auto',
                            width: 1,
                            height: '100%',
                            background: 'var(--blue)',
                            transform: isOpen
                              ? 'scaleY(0) translateX(50%)'
                              : 'scaleY(1) translateX(50%)',
                            transformOrigin: 'center',
                            transition: 'transform 0.3s ease',
                          }}
                        />
                      </span>
                    </button>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateRows: isOpen ? '1fr' : '0fr',
                        transition: 'grid-template-rows 0.35s ease',
                      }}
                    >
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ paddingBottom: '0.95rem' }}>
                          {items.map((item, j) => (
                            <div
                              key={j}
                              style={{
                                fontSize: '0.82rem',
                                color: 'var(--ink-soft)',
                                lineHeight: 1.65,
                                paddingLeft: label !== '介绍' ? '0.9rem' : 0,
                                position: 'relative',
                                marginTop: j === 0 ? 0 : '0.35rem',
                              }}
                            >
                              {label !== '介绍' && (
                                <span
                                  aria-hidden="true"
                                  style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: '0.6em',
                                    width: 4,
                                    height: 4,
                                    borderRadius: '50%',
                                    background: 'var(--blue)',
                                  }}
                                />
                              )}
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes specialistFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes portraitFade {
          from { opacity: 0; transform: scale(1.03); }
          to   { opacity: 1; transform: scale(1); }
        }
        @media (max-width: 720px) {
          .specialists-panel {
            grid-template-columns: 1fr !important;
          }
          .specialists-panel figure {
            max-width: 220px;
            justify-self: start;
          }
        }
        @media (max-width: 640px) {
          .specialists-tabs {
            grid-template-columns: 1fr !important;
          }
          .specialists-tabs > button {
            border-right: none !important;
            border-bottom: 1px solid var(--border);
          }
          .specialists-tabs > button:last-child { border-bottom: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .specialists-panel,
          .specialists-panel figure > div { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
