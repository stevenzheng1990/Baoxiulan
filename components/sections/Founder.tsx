'use client'

import Image from 'next/image'
import { EXPERTS_SEED } from '@/content/site'

type FounderData = (typeof EXPERTS_SEED)[number]

interface FounderProps {
  expert?: FounderData
}

const CREDENTIALS = [
  '国务院特殊津贴专家',
  '北京协和医院儿科教授',
  'NBNA 法创始人',
  '哈佛医学院 Brazelton 认证（全国唯一）',
  '国家科技进步奖 / 北京市科技进步奖',
  '《高危儿早期干预指南》首席专家',
]

const SPECIALTIES = [
  '0–3 岁早期教育',
  '早产儿 / 窒息儿干预',
  '脑瘫超早期诊断',
  '新生儿行为神经测查',
  '小儿生长发育',
  '矮小症 / 垂体侏儒',
]

const STATS = [
  { value: '40', sup: '年', label: '儿科临床经验' },
  { value: '91.4', sup: '%', label: '脑瘫超早期诊断准确率' },
  { value: '21', sup: '家', label: '全国协作医院' },
]

export default function Founder({ expert }: FounderProps) {
  const data = expert ?? EXPERTS_SEED[0]

  return (
    <section className="section" style={{ background: 'var(--white)' }}>
      <div className="container">
        <div className="founder-grid">
          {/* ── LEFT COL — Portrait + meta strip ── */}
          <aside className="founder-left">
            <figure className="founder-portrait r-img">
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '4 / 5',
                  overflow: 'hidden',
                  background: 'var(--off-white)',
                  border: '1px solid var(--border)',
                }}
              >
                <Image
                  src={data.photoPath ?? '/doctors/baoxiulan.png'}
                  alt={data.name}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 18%' }}
                  sizes="(max-width: 900px) 70vw, 300px"
                  priority
                />
              </div>
              <figcaption
                style={{
                  marginTop: '0.85rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  fontFamily: 'var(--sans)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}
              >
                <span style={{ color: 'var(--blue)' }}>创始人</span>
                <span>1983 年至今</span>
              </figcaption>
            </figure>
          </aside>

          {/* ── RIGHT COL ── */}
          <div className="founder-right">
            {/* Eyebrow */}
            <div className="r" style={{ marginBottom: '0.9rem' }}>
              <span className="eyebrow"><span className="eyebrow-mark" aria-hidden="true"/>创始人</span>
            </div>

            {/* Name */}
            <header className="r-blur" style={{ marginBottom: '1rem' }}>
              <h2
                style={{
                  fontFamily: 'var(--serif-cn)',
                  fontWeight: 400,
                  fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
                  lineHeight: 1.02,
                  letterSpacing: '-0.025em',
                  color: 'var(--ink)',
                }}
              >
                {data.name}
                <span
                  style={{
                    fontFamily: 'var(--serif-en)',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    fontSize: '0.45em',
                    color: 'var(--blue)',
                    marginLeft: '0.7rem',
                    letterSpacing: '0.02em',
                    verticalAlign: '0.45em',
                  }}
                >
                  {data.nameEn}
                </span>
              </h2>
              <p
                style={{
                  marginTop: '0.55rem',
                  fontSize: '0.78rem',
                  letterSpacing: '0.06em',
                  color: 'var(--muted)',
                }}
              >
                教授 · 主任医师 · 国务院特殊津贴专家
              </p>
            </header>

            <hr className="rule" style={{ margin: '1.5rem 0' }} />

            {/* Pull quote */}
            <blockquote
              className="r"
              style={{
                fontFamily: 'var(--serif-cn)',
                fontSize: 'clamp(1.05rem, 1.7vw, 1.3rem)',
                fontWeight: 400,
                lineHeight: 1.55,
                color: 'var(--ink)',
                marginBottom: '1.5rem',
                paddingLeft: '0.9rem',
                borderLeft: '2px solid var(--blue)',
              }}
            >
              出生后最初的一千天，决定一生的可能。
            </blockquote>

            {/* Bio */}
            <div
              className="r"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.9rem',
                fontSize: '0.875rem',
                lineHeight: 1.72,
                color: 'var(--ink-soft)',
                marginBottom: '2rem',
              }}
            >
              <p>
                1983 年赴美国哈佛医学院进修，是中国唯一获得 Brazelton 新生儿行为评估认证的医生。回国后创立 NBNA 新生儿20项神经行为评估法，沿用近 40 年，至今仍是全国妇幼系统的标准工具。
              </p>
              <p>
                主持国家"八五"攻关课题《0–3 岁早期教育和窒息儿、早产儿干预》，领衔全国 21 家医院协作研究，将脑瘫超早期诊断准确率提升至 91.4%，五度获颁国家科技进步奖。
              </p>
            </div>

            {/* Two-column meta: credentials + specialties */}
            <div className="founder-meta">
              <div>
                <div
                  className="eyebrow"
                  style={{ marginBottom: '0.85rem', color: 'var(--ink-soft)' }}
                >
                  主要资质
                </div>
                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.45rem',
                  }}
                >
                  {CREDENTIALS.map((c) => (
                    <li
                      key={c}
                      style={{
                        display: 'flex',
                        gap: '0.6rem',
                        fontSize: '0.82rem',
                        color: 'var(--ink)',
                        lineHeight: 1.45,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          inlineSize: 4,
                          blockSize: 4,
                          borderRadius: '50%',
                          background: 'var(--blue)',
                          flexShrink: 0,
                          marginTop: '0.55em',
                        }}
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div
                  className="eyebrow"
                  style={{ marginBottom: '0.85rem', color: 'var(--ink-soft)' }}
                >
                  擅长领域
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                  }}
                >
                  {SPECIALTIES.map((s) => (
                    <span
                      key={s}
                      style={{
                        padding: '0.32rem 0.75rem',
                        border: '1px solid var(--border)',
                        fontSize: '0.74rem',
                        color: 'var(--ink-soft)',
                        background: 'var(--paper)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats strip */}
            <div
              className="founder-stats r"
              style={{
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border)',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
              }}
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: 'var(--serif-en)',
                      fontWeight: 300,
                      fontStyle: 'italic',
                      fontSize: 'clamp(1.6rem, 2.6vw, 2.2rem)',
                      lineHeight: 1,
                      color: 'var(--blue)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {stat.value}
                    <sup
                      style={{
                        fontFamily: 'var(--serif-cn)',
                        fontStyle: 'normal',
                        fontSize: '0.4em',
                        color: 'var(--muted)',
                        marginLeft: '0.1em',
                        verticalAlign: 'super',
                      }}
                    >
                      {stat.sup}
                    </sup>
                  </div>
                  <div
                    style={{
                      marginTop: '0.45rem',
                      fontSize: '0.7rem',
                      color: 'var(--muted)',
                      letterSpacing: '0.04em',
                      lineHeight: 1.4,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .founder-grid {
          display: grid;
          grid-template-columns: minmax(220px, 300px) 1fr;
          gap: clamp(2rem, 4vw, 4rem);
          align-items: start;
        }
        .founder-portrait { width: 100%; max-width: 300px; }
        .founder-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        @media (max-width: 900px) {
          .founder-grid { grid-template-columns: 1fr; gap: 2rem; }
          .founder-portrait { max-width: 280px; }
        }
        @media (max-width: 640px) {
          .founder-meta { grid-template-columns: 1fr; gap: 1.5rem; }
          .founder-stats { gap: 1rem !important; }
          .founder-portrait { max-width: 240px; }
        }
      `}</style>
    </section>
  )
}
