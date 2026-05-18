'use client'

import { useState } from 'react'

const STEPS = [
  {
    number: '一',
    title: '初诊评估',
    desc:
      '采用 NBNA、Gesell、Bayley 等国际标准量表，全面评估儿童神经行为发育水平，识别高危因素，形成基线档案。',
  },
  {
    number: '二',
    title: '方案制定',
    desc:
      '由首席专家主导，结合影像、脑电及行为评估结果，为每位儿童量身制定个性化干预路径与阶段目标。',
  },
  {
    number: '三',
    title: '系统干预',
    desc:
      '运动、认知、语言、感统多维同步训练，医教结合；同步开展家庭指导，将干预延伸至日常生活场景。',
  },
  {
    number: '四',
    title: '动态随访',
    desc:
      '每阶段结束后系统复评，依据发育进展动态调整方案；建立长期健康档案，守护儿童全程成长轨迹。',
  },
]

const HONORS = [
  '国家科技进步奖（两次获颁）',
  '北京市科技进步奖',
  '国家卫健委《高危儿早期干预指南》首席专家',
  '全国21家医院协作研究核心主持',
  '脑瘫超早期诊断准确率 91.4%',
]

export default function Process() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <section
      className="section"
      style={{
        background: 'var(--white)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.85fr 1.15fr',
            gap: 'clamp(2.25rem, 4.5vw, 4.5rem)',
            alignItems: 'start',
          }}
          className="process-grid"
        >
          {/* ── LEFT: Steps ── */}
          <div>
            <div className="r-blur" style={{ marginBottom: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}>
              <span className="eyebrow"><span className="eyebrow-mark" aria-hidden="true"/>我们的方法 · Approach</span>
              <h2
                className="h-display"
                style={{ marginTop: '0.85rem' }}
                dangerouslySetInnerHTML={{ __html: '循证评估，<em>个性化</em>方案' }}
              />
            </div>

            <div
              className="r"
              style={{ display: 'flex', flexDirection: 'column', gap: '0' }}
            >
              {STEPS.map((step, i) => {
                const isHovered = hoveredStep === i
                return (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredStep(i)}
                    onMouseLeave={() => setHoveredStep(null)}
                    style={{
                      position: 'relative',
                      padding: 'clamp(1.25rem, 2.5vw, 1.75rem) clamp(1rem, 2vw, 1.5rem)',
                      borderBottom: '1px solid var(--border)',
                      borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                      cursor: 'default',
                      overflow: 'hidden',
                      transition: 'background 0.3s ease',
                      background: isHovered ? 'rgba(0,3,163,0.03)' : 'transparent',
                    }}
                  >
                    {/* Hover fill pseudo-element via inline animated div */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'var(--blue-pale)',
                        transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left center',
                        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                        zIndex: 0,
                        pointerEvents: 'none',
                      }}
                    />
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                      <span
                        style={{
                          fontFamily: 'var(--serif-en)',
                          fontStyle: 'italic',
                          fontWeight: 300,
                          fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                          color: 'var(--blue)',
                          opacity: 0.45,
                          lineHeight: 1,
                          flexShrink: 0,
                          minWidth: '1.8rem',
                          paddingTop: '0.1rem',
                        }}
                      >
                        {step.number}
                      </span>
                      <div>
                        <h4
                          style={{
                            fontFamily: 'var(--serif-cn)',
                            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                            fontWeight: 400,
                            color: 'var(--ink)',
                            marginBottom: '0.5rem',
                            lineHeight: 1.3,
                          }}
                        >
                          {step.title}
                        </h4>
                        <p
                          style={{
                            fontFamily: 'var(--sans)',
                            fontSize: '0.875rem',
                            lineHeight: 1.75,
                            color: 'var(--muted)',
                          }}
                        >
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── RIGHT: Sticky blue card ── */}
          <div
            className="r-r process-aside"
            style={{
              position: 'sticky',
              top: '5rem',
            }}
          >
            <div
              style={{
                background: 'var(--blue)',
                padding: 'clamp(2rem, 4vw, 3.5rem)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative large number */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: '-1rem',
                  right: '-0.5rem',
                  fontFamily: 'var(--serif-en)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  fontSize: 'clamp(7rem, 14vw, 12rem)',
                  color: 'rgba(255,255,255,0.06)',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  letterSpacing: '-0.04em',
                }}
              >
                30+
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Label */}
                <div
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.45)',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.7rem',
                  }}
                >
                  <span style={{ width: 16, height: 1, background: 'rgba(255,255,255,0.35)', display: 'inline-block', flexShrink: 0 }} />
                  科研荣誉 · Research
                </div>

                {/* Headline */}
                <h3
                  style={{
                    fontFamily: 'var(--serif-cn)',
                    fontWeight: 400,
                    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '1.25rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  三十余年科研积淀，
                  <br />
                  五项国家科技进步奖
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '0.875rem',
                    lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.65)',
                    marginBottom: '2rem',
                  }}
                >
                  宝秀兰团队以严谨的循证研究为基础，多项成果填补国内空白，所建立的高危儿早期干预体系已在全国数十家医疗机构推广应用。
                </p>

                {/* Honors list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {HONORS.map((honor, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        fontSize: '0.85rem',
                        color: 'rgba(255,255,255,0.85)',
                        fontFamily: 'var(--sans)',
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          flexShrink: 0,
                          marginTop: '0.15em',
                          fontSize: '0.75rem',
                          color: 'rgba(255,255,255,0.5)',
                        }}
                      >
                        ✓
                      </span>
                      {honor}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
          .process-aside {
            position: relative !important;
            top: auto !important;
          }
        }
      `}</style>
    </section>
  )
}
