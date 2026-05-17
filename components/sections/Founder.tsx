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
  '国家卫健委《高危儿早期干预指南》首席专家',
  '中国优生优育协会婴幼儿发育专委会主任委员',
  '全国21家医院协作研究首席主持人',
]

const SPECIALTIES = [
  '0–3 岁早期教育',
  '早产儿 / 窒息儿干预',
  '脑瘫超早期诊断',
  '新生儿行为神经测查',
  '小儿生长发育',
  '矮小症 / 垂体侏儒',
  '小儿癫痫',
  '新生儿 NBNA 评估',
]

const STATS = [
  { value: '40年', label: '儿科临床经验' },
  { value: '91.4%', label: '脑瘫超早期诊断准确率' },
  { value: '21家', label: '全国协作医院' },
]

export default function Founder({ expert }: FounderProps) {
  const data = expert ?? EXPERTS_SEED[0]

  return (
    <section
      style={{
        background: 'var(--white)',
        padding: 'clamp(5rem, 10vw, 9rem) clamp(1.25rem, 5vw, 4rem)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Inner container */}
      <div
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
        }}
      >
        {/* Two-col grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'clamp(280px, 0.85fr, 420px) 1.15fr',
            gap: 'clamp(2.5rem, 5vw, 5rem)',
            alignItems: 'start',
          }}
          className="founder-grid"
        >
          {/* ── LEFT COL ── */}
          <div className="r-l">
            {/* Portrait */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '4/5',
                border: '1px solid var(--border)',
                overflow: 'hidden',
              }}
            >
              <Image
                src={data.photoPath ?? '/assets/doctors/01-baoxiulan.jpg'}
                alt={data.name}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                sizes="(max-width: 768px) 90vw, 420px"
                priority
              />
              {/* Blue badge overlay */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  left: '1.25rem',
                  background: 'var(--blue)',
                  color: 'var(--white)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  padding: '0.45rem 0.9rem',
                  fontFamily: 'var(--sans)',
                }}
              >
                FOUNDER · 创始人
              </div>
            </div>

            {/* Metadata table */}
            <div
              style={{
                marginTop: '1.5rem',
                borderTop: '1px solid var(--border)',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {[
                { label: '在职', value: 'Since 1983' },
                { label: '资历', value: '儿科临床 40+ 年' },
                { label: '所在', value: '北京 · 协和' },
              ].map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 0',
                    borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      fontFamily: 'var(--sans)',
                    }}
                  >
                    {row.label}
                  </span>
                  <span
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--ink)',
                      fontFamily: 'var(--sans)',
                      fontWeight: 500,
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COL ── */}
          <div className="r">
            {/* Name block */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h2
                style={{
                  fontFamily: 'var(--serif-cn)',
                  fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                  fontWeight: 400,
                  lineHeight: 1,
                  color: 'var(--ink)',
                  letterSpacing: '-0.02em',
                }}
              >
                {data.name}
              </h2>
              <span
                style={{
                  fontFamily: 'var(--serif-en)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                  color: 'var(--blue)',
                  fontWeight: 300,
                  display: 'block',
                  marginTop: '0.25rem',
                  letterSpacing: '0.02em',
                }}
              >
                {data.nameEn}
              </span>
            </div>

            {/* Title bar */}
            <div
              style={{
                paddingBottom: '1.25rem',
                borderBottom: '1px solid var(--border)',
                marginBottom: '2rem',
                fontSize: '0.875rem',
                color: 'var(--muted)',
                letterSpacing: '0.05em',
                fontFamily: 'var(--sans)',
              }}
            >
              教授 · 主任医师 · 国务院特殊津贴专家
            </div>

            {/* Pull quote */}
            <div
              style={{
                position: 'relative',
                marginBottom: '2.25rem',
                paddingLeft: '0.5rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--serif-en)',
                  fontSize: 'clamp(4rem, 8vw, 7rem)',
                  color: 'var(--blue-pale)',
                  lineHeight: 1,
                  position: 'absolute',
                  top: '-1.5rem',
                  left: '-0.5rem',
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
                aria-hidden="true"
              >
                &#8220;
              </span>
              <blockquote
                style={{
                  fontFamily: 'var(--serif-cn)',
                  fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)',
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: 'var(--blue)',
                  paddingTop: '1rem',
                  whiteSpace: 'pre-line',
                }}
              >
                {'出生后最初的一千天，\n决定一生的可能。'}
              </blockquote>
            </div>

            {/* Bio paragraphs */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                marginBottom: '2.5rem',
                fontSize: '0.9rem',
                lineHeight: 1.8,
                color: 'var(--muted)',
                fontFamily: 'var(--sans)',
              }}
            >
              <p>
                1983 年赴美国哈佛医学院进修，是中国唯一获得 Brazelton
                新生儿行为评估认证的医生。回国后创立新生儿20项神经行为评估法（NBNA），
                该方法已在国内临床应用近40年，成为全国妇幼系统的标准工具。
              </p>
              <p>
                主持国家"八五"攻关课题《0–3岁早期教育和窒息儿、早产儿干预》，
                参与制定国家《高危儿早期干预指南》，领衔全国21家医院协作研究，
                将脑瘫超早期诊断准确率提升至91.4%，获得国家科技进步奖及北京市科技进步奖。
              </p>
            </div>

            {/* Credentials */}
            <div style={{ marginBottom: '2rem' }}>
              <div
                className="section-tag"
                style={{ marginBottom: '1rem' }}
              >
                主要资质 · Credentials
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.6rem 1.5rem',
                }}
              >
                {CREDENTIALS.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.55rem',
                      fontSize: '0.82rem',
                      color: 'var(--ink)',
                      lineHeight: 1.5,
                      fontFamily: 'var(--sans)',
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--blue)',
                        flexShrink: 0,
                        marginTop: '0.45em',
                      }}
                    />
                    {c}
                  </div>
                ))}
              </div>
            </div>

            {/* Specialties */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div
                className="section-tag"
                style={{ marginBottom: '1rem' }}
              >
                擅长领域 · Specialties
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {SPECIALTIES.map((s, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '0.35rem 0.9rem',
                      border: '1px solid var(--border)',
                      borderRadius: '999px',
                      fontSize: '0.78rem',
                      color: 'var(--blue)',
                      background: 'var(--blue-pale)',
                      fontFamily: 'var(--sans)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0',
                borderTop: '1px solid var(--border)',
                paddingTop: '1.75rem',
              }}
            >
              {STATS.map((stat, i) => (
                <div
                  key={i}
                  style={{
                    padding: '0 1.5rem 0 0',
                    borderRight: i < STATS.length - 1 ? '1px solid var(--border)' : 'none',
                    marginRight: i < STATS.length - 1 ? '1.5rem' : 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--serif-en)',
                      fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                      fontWeight: 300,
                      color: 'var(--blue)',
                      lineHeight: 1,
                      marginBottom: '0.4rem',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--muted)',
                      fontFamily: 'var(--sans)',
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

        {/* Decorative full-width text */}
        <div
          aria-hidden="true"
          style={{
            marginTop: 'clamp(3rem, 6vw, 5rem)',
            overflow: 'hidden',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--serif-en)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              color: 'var(--blue-pale)',
              whiteSpace: 'nowrap',
              display: 'block',
              letterSpacing: '-0.02em',
            }}
          >
            BAO XIU LAN
          </span>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .founder-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
