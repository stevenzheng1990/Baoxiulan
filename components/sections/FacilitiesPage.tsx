'use client'

import { useEffect, useRef } from 'react'

interface Program {
  slug: string
  name: string
  summary: string
  age?: string
  audience?: string
  highlights: string[]
}

const PROGRAMS: Program[] = [
  {
    slug: 'early',
    name: '早期综合训练',
    summary:
      '基于国际 ICF-CY 框架与自主研发的 ACTED 评估训练体系，为 0–1 岁婴幼儿尤其是高危儿提供个性化、目标导向的综合训练，全方位促进体格、运动、认知、言语与行为发展。',
    age: '0–1 岁',
    audience: '婴幼儿 · 高危儿',
    highlights: ['视听训练', '抚触按摩', '主动运动', '前庭功能训练'],
  },
  {
    slug: 'inclusion',
    name: '融合教育',
    summary:
      '以「游戏为基础的跨学科训练」科学理论为指导，融合引导式教育、游戏治疗、地板时光、感统与思维训练，结构化课程让儿童主动参与，全面提升智力、语言、社交、情绪与运动能力。',
    audience: '发育迟缓 · 孤独症 · 社交障碍',
    highlights: ['情绪控制课', '生活自理课', '社交沟通游戏', '规则秩序课'],
  },
  {
    slug: 'speech',
    name: '言语认知训练',
    summary:
      '融合言语训练 S-S 法与特殊教育经验，针对认知理解落后、表达能力欠佳、构音障碍、口吃、口肌障碍等问题，制定个性化方案，提升儿童言语、认知与学习能力。',
    age: '0–6 岁',
    audience: '语言发育迟缓 · 早产 / 高危儿',
    highlights: ['认知训练', '语言训练', '学习能力训练', '亲子合训课'],
  },
  {
    slug: 'motor',
    name: '运动训练',
    summary:
      '以 Bobath、Vojta、Rood 疗法结合引导式教育与儿童游戏，针对早产儿、高危儿、脑瘫、自闭症等儿童进行个体化运动训练，全面提高运动、认知、语言与社交能力。',
    audience: '早产儿 · 脑瘫 · 发育迟缓',
    highlights: ['运动功能训练', '立位训练', '悬吊运动训练 (S-E-T)', '减重步态训练'],
  },
  {
    slug: 'behavior',
    name: '行为矫正训练',
    summary:
      '以国际领先的《应用行为分析》(ABA) 为指导，采用 VB-MAPP 全面评估，运用 DTT、密集教学、PECS、PRT 等方法，引导儿童提升注意力、认知、语言与社交，调整情绪、减少问题行为。',
    audience: '孤独症谱系 · 行为发育问题',
    highlights: ['VB-MAPP 评估', 'DTT 回合训练', 'PECS 图片交换', '家庭训练支持'],
  },
  {
    slug: 'sensory',
    name: '感觉统合训练',
    summary:
      '采用美国感觉统合（SIPT）训练理念，应用悬吊设施进行多感觉统合训练，纠正感觉反应不足/过度/调节困难，同时促进认知、言语、情绪、专注力与社交能力发展。',
    age: '0–12 岁',
    audience: '感统失调 · 协调与专注力发展',
    highlights: ['悬吊感统训练', '多感觉刺激', '协调能力建立', '专注力提升'],
  },
  {
    slug: 'ot',
    name: '作业训练',
    summary:
      '基于国际感统理论与 ICF-CY 框架，依托 ACTED 评估训练体系，通过教具操作与感知觉游戏，建立肩、肘、腕关节正确活动，提高抓握、手眼协调、运笔书写与日常生活技能。',
    age: '0–6 岁',
    audience: '上肢活动受限 · 精细运动落后',
    highlights: ['上肢功能训练', '精细动作训练', '日常生活活动 (ADL)', '入园前能力建设'],
  },
  {
    slug: 'tuina',
    name: '小儿推拿',
    summary:
      '在中医儿科学与推拿学理论指导下，依据中医辨证，通过穴位点按疏通经络、调和气血，平衡阴阳改善儿童体质。适用于婴幼儿与学龄前儿童，效果尤佳。',
    age: '0–14 岁',
    audience: '婴幼儿 · 学龄前儿童',
    highlights: ['中医辨证', '穴位点按', '调和气血', '体质改善'],
  },
]

const FEATURES = [
  { label: '诊疗领域', value: '八大康复方向' },
  { label: '评估体系', value: 'ACTED 自主研发' },
  { label: '理论基础', value: 'ICF-CY 国际框架' },
  { label: '协作医院', value: '全国 21 家' },
]

export default function FacilitiesPage() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    requestAnimationFrame(() => el.classList.add('fac-ready'))
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.fac-r')
    if (!els.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ╔═══════════ Hero with facilities video ═══════════ */}
      <section ref={heroRef} className="fac-hero">
        <video
          className="fac-hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/video/facilities.mp4" type="video/mp4" />
        </video>

        {/* White transparent overlay — lets video breathe through */}
        <div aria-hidden="true" className="fac-hero-overlay" />

        <div className="fac-hero-inner">
          <div className="fac-crest fac-r">
            <span className="fac-crest-mark" aria-hidden="true" />
            <span className="fac-crest-text">机　构　设　施</span>
          </div>

          <h1 className="fac-hero-title fac-r">
            <span>循证设计的康复空间</span>
            <span>让训练自然发生</span>
          </h1>

          <p className="fac-hero-lede fac-r">
            宝秀兰医疗依托三十余年临床积淀，配置覆盖感觉统合、运动、言语、作业、行为矫正等多维度的康复训练空间，由专业团队与个性化方案陪伴儿童早期发展每一关键阶段。
          </p>

          <div className="fac-hero-meta fac-r">
            {FEATURES.map((f, i) => (
              <div key={f.label} className="fac-hero-meta-cell" style={{ ['--d' as string]: `${0.9 + i * 0.1}s` }}>
                <div className="fac-hero-meta-value">{f.value}</div>
                <div className="fac-hero-meta-label">{f.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div aria-hidden="true" className="fac-hero-cue">
          <span>向 下</span>
          <span className="fac-hero-cue-line" />
        </div>
      </section>

      {/* ╔═══════════ Programs ═══════════ */}
      <section id="programs" className="fac-section">
        <div aria-hidden="true" className="fac-section-bg" />

        <div className="fac-container">
          <header className="fac-header fac-r">
            <div className="fac-crest">
              <span className="fac-crest-mark" aria-hidden="true" />
              <span className="fac-crest-text">诊　疗　康　复　项　目</span>
            </div>

            <div className="fac-head-rule" aria-hidden="true">
              <span className="fac-head-rule-line" />
              <span className="fac-head-rule-diamond" />
              <span className="fac-head-rule-line" />
            </div>

            <h2 className="fac-section-title">八大康复方向，覆盖儿童早期发展关键期</h2>
            <p className="fac-section-lede">
              以国际 ICF-CY 框架为基础，结合自主研发的 ACTED 评估训练体系，为每一位儿童制定个性化、目标导向的干预方案。所有项目均由资深临床团队主导，并提供家庭训练指导。
            </p>
          </header>

          <ol className="fac-grid">
            {PROGRAMS.map((p, i) => (
              <li
                key={p.slug}
                className="fac-card fac-r"
                style={{ ['--d' as string]: `${(i % 2) * 0.1}s` }}
              >
                <span className="fac-card-bd fac-bd-t" aria-hidden="true" />
                <span className="fac-card-bd fac-bd-r" aria-hidden="true" />
                <span className="fac-card-bd fac-bd-b" aria-hidden="true" />
                <span className="fac-card-bd fac-bd-l" aria-hidden="true" />
                <span className="fac-card-corner fac-c-tl" aria-hidden="true" />
                <span className="fac-card-corner fac-c-br" aria-hidden="true" />

                <header className="fac-card-head">
                  <span className="fac-card-no">{String(i + 1).padStart(2, '0')}</span>
                  <span className="fac-card-rule" aria-hidden="true" />
                </header>

                <h3 className="fac-card-title">{p.name}</h3>

                <div className="fac-card-tags">
                  {p.age && <span className="fac-card-tag fac-card-tag-age">{p.age}</span>}
                  {p.audience && <span className="fac-card-tag">{p.audience}</span>}
                </div>

                <p className="fac-card-summary">{p.summary}</p>

                <div className="fac-card-divider" aria-hidden="true" />

                <ul className="fac-card-hl">
                  {p.highlights.map((h) => (
                    <li key={h}>
                      <span className="fac-card-hl-mark" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <style>{`
        /* ════════════════════════════════════════════════
           FACILITIES — white ground · blue text · gold accent
           ════════════════════════════════════════════════ */
        :root {
          --fac-gold: #B08A4A;
          --fac-gold-soft: rgba(176, 138, 74, 0.72);
          --fac-gold-line: rgba(176, 138, 74, 0.4);
          --fac-blue: #0003A3;
          --fac-blue-soft: rgba(0, 3, 163, 0.7);
          --fac-blue-mute: rgba(0, 3, 163, 0.55);
          --fac-line: rgba(0, 3, 163, 0.14);
        }

        /* ╔═══════════ Hero ═══════════ */
        .fac-hero {
          position: relative;
          min-height: 86svh;
          background: #ffffff;
          overflow: hidden;
          padding: 110px 1.5rem 5rem;
          isolation: isolate;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--fac-blue);
          font-family: var(--serif-cn);
        }
        .fac-hero-video {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover; object-position: center;
          z-index: 0; pointer-events: none;
          opacity: 0;
          animation: fac-videoIn 2.4s cubic-bezier(0.16,1,0.3,1) 0.2s forwards;
        }
        @keyframes fac-videoIn {
          from { opacity: 0; transform: scale(1.06); }
          to   { opacity: 1; transform: scale(1); }
        }
        .fac-hero-overlay {
          position: absolute; inset: 0; z-index: 1;
          pointer-events: none;
          background:
            radial-gradient(ellipse 55% 50% at 50% 45%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.78) 70%, rgba(255,255,255,0.9) 100%),
            linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.82) 100%);
        }

        .fac-hero-inner {
          position: relative;
          z-index: 2;
          width: min(1080px, 100%);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: clamp(1rem, 2.5vw, 1.6rem);
        }

        /* ── Reveal classes (server-render-safe) ── */
        .fac-r {
          opacity: 0;
          transform: translateY(16px);
          filter: blur(4px);
          transition:
            opacity 1.1s cubic-bezier(0.16,1,0.3,1),
            transform 1.1s cubic-bezier(0.16,1,0.3,1),
            filter 1.1s cubic-bezier(0.16,1,0.3,1);
        }
        .fac-ready .fac-r,
        .fac-r.in {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
        .fac-ready .fac-hero-title { transition-delay: 0.45s; }
        .fac-ready .fac-hero-lede  { transition-delay: 0.7s; }
        .fac-ready .fac-hero-meta  { transition-delay: 0.9s; }

        /* ── Crest (shared) ── */
        .fac-crest {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
        }
        .fac-crest-mark {
          width: 8px; height: 8px;
          background: var(--fac-gold);
          transform: rotate(45deg);
        }
        .fac-crest-text {
          font-family: var(--serif-cn);
          font-size: clamp(0.78rem, 1vw, 0.92rem);
          letter-spacing: 0.04em;
          color: var(--fac-gold);
          font-weight: 500;
        }

        .fac-hero-title {
          margin: 0;
          font-family: var(--serif-cn);
          font-weight: 500;
          font-size: clamp(2rem, 4.4vw, 3.4rem);
          letter-spacing: 0.06em;
          line-height: 1.32;
          color: var(--fac-blue);
          display: flex;
          flex-direction: column;
          gap: 0.15em;
          padding-left: 0.06em;
        }
        .fac-hero-title span { display: block; }

        .fac-hero-lede {
          max-width: 720px;
          font-family: var(--serif-cn);
          font-size: clamp(0.94rem, 1.15vw, 1.05rem);
          line-height: 1.9;
          letter-spacing: 0.06em;
          color: var(--fac-blue-soft);
          margin: 0;
        }

        .fac-hero-meta {
          margin-top: clamp(1rem, 2vw, 1.4rem);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(0.6rem, 1.5vw, 1.2rem);
          width: 100%;
          max-width: 880px;
        }
        .fac-hero-meta-cell {
          padding: clamp(0.85rem, 1.6vw, 1.1rem) clamp(0.5rem, 1vw, 0.8rem);
          border-top: 1px solid var(--fac-gold-line);
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          align-items: center;
          background: rgba(255,255,255,0.45);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          min-width: 0;
        }
        .fac-hero-meta-value {
          font-family: var(--serif-cn);
          font-weight: 500;
          font-size: clamp(0.92rem, 1.2vw, 1.08rem);
          letter-spacing: 0.06em;
          line-height: 1.4;
          color: var(--fac-blue);
          text-align: center;
          word-break: break-word;
          overflow-wrap: anywhere;
        }
        .fac-hero-meta-label {
          font-family: var(--serif-cn);
          font-size: 0.7rem;
          letter-spacing: 0.32em;
          padding-left: 0.32em;
          color: var(--fac-gold-soft);
        }

        .fac-hero-cue {
          position: absolute;
          right: clamp(1.25rem, 2.5vw, 2rem);
          bottom: clamp(1.5rem, 3vw, 2rem);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.7rem;
          z-index: 3;
        }
        .fac-hero-cue > span:first-child {
          font-family: var(--serif-cn);
          font-size: 0.7rem;
          letter-spacing: 0.4em;
          color: var(--fac-blue-mute);
          writing-mode: vertical-rl;
        }
        .fac-hero-cue-line {
          width: 1px; height: 48px;
          background: rgba(0,3,163,0.18);
          position: relative; overflow: hidden;
        }
        .fac-hero-cue-line::after {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 40%;
          background: var(--fac-blue);
          animation: fac-drop 2.6s cubic-bezier(0.45,0,0.55,1) infinite;
        }
        @keyframes fac-drop {
          0%   { transform: translateY(-100%); opacity: 1; }
          80%  { transform: translateY(260%); opacity: 0.3; }
          100% { transform: translateY(260%); opacity: 0; }
        }

        /* ╔═══════════ Section ═══════════ */
        .fac-section {
          position: relative;
          padding-block: clamp(4.5rem, 8vw, 7rem);
          background: var(--paper);
          overflow: hidden;
          isolation: isolate;
          color: var(--fac-blue);
        }
        .fac-section-bg {
          position: absolute; inset: 0; z-index: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 50% 40% at 12% 18%, rgba(176,138,74,0.06) 0%, rgba(176,138,74,0) 60%),
            radial-gradient(ellipse 45% 40% at 88% 82%, rgba(0,3,163,0.05) 0%, rgba(0,3,163,0) 60%);
        }
        .fac-container {
          position: relative; z-index: 1;
          width: min(1240px, 100%);
          margin: 0 auto;
          padding: 0 clamp(1.25rem, 4vw, 2.5rem);
        }

        .fac-header {
          text-align: center;
          margin-bottom: clamp(3rem, 6vw, 4.5rem);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .fac-head-rule {
          width: min(420px, 80%);
          display: flex; align-items: center; gap: 0.85rem;
          margin: clamp(1rem, 1.6vw, 1.3rem) 0 clamp(1.3rem, 2vw, 1.6rem);
        }
        .fac-head-rule-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg,
            rgba(176,138,74,0) 0%,
            var(--fac-gold-line) 50%,
            rgba(176,138,74,0) 100%);
        }
        .fac-head-rule-diamond {
          width: 5px; height: 5px;
          background: var(--fac-gold);
          transform: rotate(45deg);
        }
        .fac-section-title {
          font-family: var(--serif-cn);
          font-weight: 500;
          font-size: clamp(1.5rem, 2.6vw, 2.1rem);
          letter-spacing: 0.06em;
          line-height: 1.4;
          color: var(--fac-blue);
          margin: 0 0 clamp(0.85rem, 1.6vw, 1.2rem);
          padding-left: 0.06em;
        }
        .fac-section-lede {
          max-width: 660px;
          font-family: var(--serif-cn);
          font-size: clamp(0.88rem, 1vw, 0.96rem);
          line-height: 1.9;
          letter-spacing: 0.06em;
          color: var(--fac-blue-soft);
          margin: 0;
        }

        /* ── Programs grid ── */
        .fac-grid {
          list-style: none;
          margin: 0; padding: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(1rem, 2vw, 1.6rem);
        }
        .fac-card {
          position: relative;
          background: #ffffff;
          padding: clamp(1.6rem, 3vw, 2.2rem) clamp(1.4rem, 2.5vw, 2rem) clamp(1.6rem, 3vw, 2rem);
          display: flex;
          flex-direction: column;
          gap: clamp(0.85rem, 1.4vw, 1.1rem);
          transition: transform 0.55s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.55s ease;
          min-width: 0;
        }
        .fac-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 26px 60px -32px rgba(0,3,163,0.28);
        }

        /* 4-segment border */
        .fac-card-bd {
          position: absolute;
          background: var(--fac-line);
        }
        .fac-bd-t { top: 0; left: 0; height: 1px; width: 100%; }
        .fac-bd-r { top: 0; right: 0; width: 1px; height: 100%; }
        .fac-bd-b { bottom: 0; right: 0; height: 1px; width: 100%; }
        .fac-bd-l { bottom: 0; left: 0; width: 1px; height: 100%; }

        /* Gold corner foils */
        .fac-card-corner {
          position: absolute;
          width: 12px; height: 12px;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .fac-c-tl { top: -1px; left: -1px; border-top: 1px solid var(--fac-gold); border-left: 1px solid var(--fac-gold); }
        .fac-c-br { bottom: -1px; right: -1px; border-bottom: 1px solid var(--fac-gold); border-right: 1px solid var(--fac-gold); }
        .fac-card:hover .fac-card-corner { opacity: 0.85; }

        .fac-card-head {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .fac-card-no {
          font-family: var(--serif-cn);
          font-weight: 500;
          font-size: clamp(0.78rem, 0.95vw, 0.88rem);
          letter-spacing: 0.18em;
          color: var(--fac-gold);
        }
        .fac-card-rule {
          flex: 1; height: 1px;
          background: var(--fac-line);
        }
        .fac-card-title {
          font-family: var(--serif-cn);
          font-weight: 500;
          font-size: clamp(1.25rem, 1.9vw, 1.55rem);
          letter-spacing: 0.06em;
          line-height: 1.3;
          color: var(--fac-blue);
          margin: 0;
          padding-left: 0.06em;
          word-break: break-word;
          overflow-wrap: anywhere;
        }
        .fac-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }
        .fac-card-tag {
          font-family: var(--serif-cn);
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          padding: 0.3rem 0.7rem;
          border: 1px solid var(--fac-line);
          color: var(--fac-blue-soft);
          background: #ffffff;
        }
        .fac-card-tag-age {
          border-color: var(--fac-gold-line);
          color: var(--fac-gold);
        }
        .fac-card-summary {
          font-family: var(--serif-cn);
          font-size: clamp(0.86rem, 1vw, 0.94rem);
          line-height: 1.85;
          letter-spacing: 0.04em;
          color: var(--fac-blue-soft);
          margin: 0;
          word-break: break-word;
          overflow-wrap: anywhere;
        }
        .fac-card-divider {
          width: 28px; height: 1px;
          background: var(--fac-gold-line);
          margin-top: 0.2rem;
        }
        .fac-card-hl {
          list-style: none;
          margin: 0; padding: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem 1rem;
        }
        .fac-card-hl li {
          display: flex;
          align-items: baseline;
          gap: 0.55rem;
          font-family: var(--serif-cn);
          font-size: 0.84rem;
          letter-spacing: 0.04em;
          color: var(--fac-blue);
          line-height: 1.5;
          word-break: break-word;
          overflow-wrap: anywhere;
          min-width: 0;
        }
        .fac-card-hl-mark {
          width: 4px; height: 4px;
          background: var(--fac-gold);
          transform: rotate(45deg);
          flex-shrink: 0;
          translate: 0 -2px;
        }

        /* ╔═══════════ Responsive ═══════════ */
        @media (max-width: 860px) {
          .fac-hero { min-height: 80svh; padding: 96px 1rem 4rem; }
          .fac-hero-meta { grid-template-columns: repeat(2, 1fr); }
          .fac-grid { grid-template-columns: 1fr; }
          .fac-hero-cue { display: none; }
        }
        @media (max-width: 480px) {
          .fac-hero-title { letter-spacing: 0.03em; font-size: clamp(1.7rem, 8vw, 2.3rem); }
          .fac-section-title { font-size: clamp(1.3rem, 6vw, 1.7rem); letter-spacing: 0.04em; }
          .fac-card-hl { grid-template-columns: 1fr; }
          .fac-hero-meta-value { letter-spacing: 0.04em; font-size: 0.92rem; }
          .fac-hero-meta-label { letter-spacing: 0.22em; padding-left: 0.22em; }
        }

        @media (prefers-reduced-motion: reduce) {
          .fac-hero-video { animation: none; opacity: 1; transform: none; }
          .fac-hero-cue-line::after { animation: none; }
          .fac-r { transition: none !important; opacity: 1 !important; transform: none !important; filter: none !important; }
        }
      `}</style>
    </>
  )
}
