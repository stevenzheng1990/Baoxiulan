'use client'

/**
 * ProgramArt
 * 八幅诊疗康复项目的自绘 SVG 插图 + 编排化动画
 *
 * 设计原则
 * - 240×240 viewBox，留白充裕（≥24px padding）
 * - 主结构 stroke 1.6，次结构 1.2，强调线 2
 * - 金色点缀（#B08A4A）控制在 3-5 处以内
 * - 每张图建立独立的入场叙事：先骨架、后细节、最后金色焦点
 * - 入场后保留低幅度的持续动画（呼吸 / 漂移 / 脉冲）赋予生命感
 * - hover 时所有图整体放大 1.05 + 关键元素加强动作
 *
 * 动画机制
 * - 所有 path/circle 使用 pathLength="1" → stroke-dasharray:1 stroke-dashoffset:1→0
 * - 通过 CSS 变量 --seq 控制每个元素的序列号
 * - 当父级 .fac-r 进入视口加上 .in 类时触发整套编排
 * - prefers-reduced-motion 全部跳过
 */

const COMMON = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  pathLength: 1,
}

const GOLD = '#B08A4A'

interface ArtProps {
  slug: string
}

export default function ProgramArt({ slug }: ArtProps) {
  switch (slug) {
    /* ──────────── 01 早期综合训练 ────────────
       视觉叙事：被环抱的初生婴儿，五种感官从中心向外辐射
       构图：左侧大弧 = 拥抱；中心填充小圆 = 婴儿；
            右上方 5 条短射线 + 金点 = 视/听/触/动/前庭感官 */
    case 'early':
      return (
        <svg viewBox="0 0 240 240" className="art-svg art-early" aria-hidden="true">
          {/* 背景两道更柔和的拥抱波 */}
          <path d="M 36 80 Q 96 36 196 96" {...COMMON} strokeWidth={1.1} className="art-l art-bg-1" />
          <path d="M 30 130 Q 84 90 200 156" {...COMMON} strokeWidth={1.1} className="art-l art-bg-2" />

          {/* 主拥抱弧（最厚） */}
          <path d="M 84 36 C 28 96, 28 168, 96 208" {...COMMON} strokeWidth={2} className="art-l art-embrace" />

          {/* 婴儿轮廓 */}
          <circle cx="138" cy="128" r="16" {...COMMON} strokeWidth={1.6} className="art-l art-baby" />
          <path d="M 122 138 Q 138 162 154 138" {...COMMON} strokeWidth={1.6} className="art-l art-baby-body" />

          {/* 婴儿填充小金芯 */}
          <circle cx="138" cy="128" r="3.2" fill={GOLD} className="art-d art-heart" />

          {/* 五条感官射线（从婴儿头部边缘向外） */}
          <g className="art-rays">
            <line x1="151" y1="115" x2="184" y2="84" {...COMMON} strokeWidth={1.3} className="art-l art-ray" style={{ ['--seq' as string]: 0 }} />
            <line x1="156" y1="128" x2="194" y2="128" {...COMMON} strokeWidth={1.3} className="art-l art-ray" style={{ ['--seq' as string]: 1 }} />
            <line x1="151" y1="142" x2="184" y2="172" {...COMMON} strokeWidth={1.3} className="art-l art-ray" style={{ ['--seq' as string]: 2 }} />
            <line x1="138" y1="111" x2="156" y2="74" {...COMMON} strokeWidth={1.3} className="art-l art-ray" style={{ ['--seq' as string]: 3 }} />
            <line x1="124" y1="115" x2="100" y2="84" {...COMMON} strokeWidth={1.3} className="art-l art-ray" style={{ ['--seq' as string]: 4 }} />
          </g>

          {/* 五个金色感官点 */}
          <g className="art-dots">
            <circle cx="184" cy="84" r="3.4" fill={GOLD} className="art-d" style={{ ['--seq' as string]: 0 }} />
            <circle cx="194" cy="128" r="3.4" fill={GOLD} className="art-d" style={{ ['--seq' as string]: 1 }} />
            <circle cx="184" cy="172" r="3.4" fill={GOLD} className="art-d" style={{ ['--seq' as string]: 2 }} />
            <circle cx="156" cy="74" r="3.4" fill={GOLD} className="art-d" style={{ ['--seq' as string]: 3 }} />
            <circle cx="100" cy="84" r="3.4" fill={GOLD} className="art-d" style={{ ['--seq' as string]: 4 }} />
          </g>
        </svg>
      )

    /* ──────────── 02 融合教育 ────────────
       视觉叙事：1 位老师居中，5 位孩童围绕，外环 dashed 表示融合空间
       入场：外环旋转扫入 → 中心圆 → 卫星圆顺时针 → 连线 → 金点 */
    case 'inclusion':
      return (
        <svg viewBox="0 0 240 240" className="art-svg art-inclusion" aria-hidden="true">
          {/* 外环 dashed (大圆) */}
          <circle cx="120" cy="120" r="84" strokeDasharray="3 6" {...COMMON} strokeWidth={1.2} className="art-l art-orbit" />

          {/* 中心 facilitator */}
          <circle cx="120" cy="120" r="16" {...COMMON} strokeWidth={1.8} className="art-l art-core" />
          <circle cx="120" cy="120" r="4" fill={GOLD} className="art-d art-core-fill" />

          {/* 5 个卫星圆（位置围绕中心 72°） */}
          <g className="art-sats">
            <circle cx="120" cy="46" r="10" {...COMMON} strokeWidth={1.4} className="art-l art-sat" style={{ ['--seq' as string]: 0 }} />
            <circle cx="190" cy="98" r="10" {...COMMON} strokeWidth={1.4} className="art-l art-sat" style={{ ['--seq' as string]: 1 }} />
            <circle cx="164" cy="184" r="10" {...COMMON} strokeWidth={1.4} className="art-l art-sat" style={{ ['--seq' as string]: 2 }} />
            <circle cx="76" cy="184" r="10" {...COMMON} strokeWidth={1.4} className="art-l art-sat" style={{ ['--seq' as string]: 3 }} />
            <circle cx="50" cy="98" r="10" {...COMMON} strokeWidth={1.4} className="art-l art-sat" style={{ ['--seq' as string]: 4 }} />
          </g>

          {/* 连接线（中心到各卫星） */}
          <g className="art-links">
            <line x1="120" y1="104" x2="120" y2="56" {...COMMON} strokeWidth={1} className="art-l art-link" style={{ ['--seq' as string]: 0 }} />
            <line x1="134" y1="115" x2="180" y2="100" {...COMMON} strokeWidth={1} className="art-l art-link" style={{ ['--seq' as string]: 1 }} />
            <line x1="130" y1="135" x2="158" y2="174" {...COMMON} strokeWidth={1} className="art-l art-link" style={{ ['--seq' as string]: 2 }} />
            <line x1="110" y1="135" x2="82" y2="174" {...COMMON} strokeWidth={1} className="art-l art-link" style={{ ['--seq' as string]: 3 }} />
            <line x1="106" y1="115" x2="60" y2="100" {...COMMON} strokeWidth={1} className="art-l art-link" style={{ ['--seq' as string]: 4 }} />
          </g>

          {/* 金色节点夹角 */}
          <g className="art-dots">
            <circle cx="120" cy="46" r="2.6" fill={GOLD} className="art-d" style={{ ['--seq' as string]: 0 }} />
            <circle cx="190" cy="98" r="2.6" fill={GOLD} className="art-d" style={{ ['--seq' as string]: 1 }} />
            <circle cx="164" cy="184" r="2.6" fill={GOLD} className="art-d" style={{ ['--seq' as string]: 2 }} />
            <circle cx="76" cy="184" r="2.6" fill={GOLD} className="art-d" style={{ ['--seq' as string]: 3 }} />
            <circle cx="50" cy="98" r="2.6" fill={GOLD} className="art-d" style={{ ['--seq' as string]: 4 }} />
          </g>
        </svg>
      )

    /* ──────────── 03 言语认知 ────────────
       视觉叙事：右向头部侧影，脑内螺旋（思维），口部三道波（言语）
       入场：头部轮廓 → 脑内螺旋 → 三波依次扩散 → 金点
       持续：三波循环脉动；脑内金点缓慢呼吸 */
    case 'speech':
      return (
        <svg viewBox="0 0 240 240" className="art-svg art-speech" aria-hidden="true">
          {/* 头部侧影（朝右） */}
          <path
            d="M 78 76 Q 78 50 108 46 Q 152 42 168 78 Q 178 102 168 132 L 156 132 L 156 156 L 130 162 L 120 188 L 76 188 L 76 144 Q 60 132 64 110 Q 68 88 78 76 Z"
            {...COMMON}
            strokeWidth={1.6}
            className="art-l art-head"
          />

          {/* 脑内螺旋 (思维) */}
          <path
            d="M 124 96 m 18 0 a 18 18 0 1 1 -18 -18 a 12 12 0 0 1 12 12 a 6 6 0 0 1 -6 6"
            {...COMMON}
            strokeWidth={1.3}
            className="art-l art-spiral"
          />
          {/* 螺旋中心金点 */}
          <circle cx="124" cy="96" r="3" fill={GOLD} className="art-d art-thought" />

          {/* 言语三波 (从口部向右扩散) */}
          <g className="art-waves">
            <path d="M 175 150 Q 188 156 175 168" {...COMMON} strokeWidth={1.4} className="art-l art-wave" style={{ ['--seq' as string]: 0 }} />
            <path d="M 188 142 Q 208 156 188 174" {...COMMON} strokeWidth={1.4} className="art-l art-wave" style={{ ['--seq' as string]: 1 }} />
            <path d="M 200 134 Q 226 156 200 180" {...COMMON} strokeWidth={1.4} className="art-l art-wave" style={{ ['--seq' as string]: 2 }} />
          </g>
        </svg>
      )

    /* ──────────── 04 运动训练 ────────────
       视觉叙事：从左到右三个形态——爬→坐→站，进阶发展
       入场：基线 → 三人依次绘出 → 金色阶段点连成轨迹
       持续：站立小人头部轻微浮动（呼吸） */
    case 'motor':
      return (
        <svg viewBox="0 0 240 240" className="art-svg art-motor" aria-hidden="true">
          {/* 基线 */}
          <line x1="32" y1="190" x2="208" y2="190" {...COMMON} strokeWidth={1.4} className="art-l art-baseline" />

          {/* 爬行 baby */}
          <g className="art-stage" style={{ ['--seq' as string]: 0 }}>
            <circle cx="55" cy="160" r="9" {...COMMON} strokeWidth={1.5} className="art-l" />
            <path d="M 47 168 Q 60 180 78 175" {...COMMON} strokeWidth={1.5} className="art-l" />
            <line x1="55" y1="169" x2="48" y2="188" {...COMMON} strokeWidth={1.4} className="art-l" />
            <line x1="68" y1="172" x2="70" y2="188" {...COMMON} strokeWidth={1.4} className="art-l" />
          </g>

          {/* 坐立 toddler */}
          <g className="art-stage" style={{ ['--seq' as string]: 1 }}>
            <circle cx="120" cy="138" r="11" {...COMMON} strokeWidth={1.5} className="art-l" />
            <path d="M 120 149 L 120 178 Q 120 188 110 188 L 132 188" {...COMMON} strokeWidth={1.5} className="art-l" />
            <line x1="120" y1="160" x2="106" y2="166" {...COMMON} strokeWidth={1.4} className="art-l" />
            <line x1="120" y1="160" x2="134" y2="166" {...COMMON} strokeWidth={1.4} className="art-l" />
          </g>

          {/* 直立 child */}
          <g className="art-stage art-stage-stand" style={{ ['--seq' as string]: 2 }}>
            <circle cx="190" cy="100" r="13" {...COMMON} strokeWidth={1.6} className="art-l art-stand-head" />
            <line x1="190" y1="113" x2="190" y2="160" {...COMMON} strokeWidth={1.6} className="art-l" />
            <line x1="190" y1="125" x2="172" y2="148" {...COMMON} strokeWidth={1.5} className="art-l" />
            <line x1="190" y1="125" x2="208" y2="148" {...COMMON} strokeWidth={1.5} className="art-l" />
            <line x1="190" y1="160" x2="178" y2="190" {...COMMON} strokeWidth={1.5} className="art-l" />
            <line x1="190" y1="160" x2="202" y2="190" {...COMMON} strokeWidth={1.5} className="art-l" />
          </g>

          {/* 进阶金色轨迹点（上方） */}
          <g className="art-progress">
            <circle cx="55" cy="60" r="3" fill={GOLD} className="art-d" style={{ ['--seq' as string]: 0 }} />
            <circle cx="120" cy="50" r="3" fill={GOLD} className="art-d" style={{ ['--seq' as string]: 1 }} />
            <circle cx="190" cy="42" r="4" fill={GOLD} className="art-d art-d-final" style={{ ['--seq' as string]: 2 }} />
          </g>
          {/* 连接进阶点的虚线 */}
          <path d="M 55 60 Q 110 38 190 42" {...COMMON} strokeWidth={1} strokeDasharray="2 4" className="art-l art-progress-line" />
        </svg>
      )

    /* ──────────── 05 行为矫正 ────────────
       视觉叙事：左侧无序散点（with 弱连线）→ 中央箭头 → 右侧规整 3×3 矩阵
       入场：散点抖动出现 → 箭头扫过 → 矩阵 snap-in → 金色成功点
       持续：左侧散点保持微抖动（无序状态），右侧静止（秩序） */
    case 'behavior':
      return (
        <svg viewBox="0 0 240 240" className="art-svg art-behavior" aria-hidden="true">
          {/* 左侧散乱点 */}
          <g className="art-scatter">
            <circle cx="42" cy="64" r="3.5" {...COMMON} strokeWidth={1.4} className="art-l art-scatter-c" style={{ ['--seq' as string]: 0 }} />
            <circle cx="74" cy="98" r="3.5" {...COMMON} strokeWidth={1.4} className="art-l art-scatter-c" style={{ ['--seq' as string]: 1 }} />
            <circle cx="38" cy="138" r="3.5" {...COMMON} strokeWidth={1.4} className="art-l art-scatter-c" style={{ ['--seq' as string]: 2 }} />
            <circle cx="64" cy="172" r="3.5" {...COMMON} strokeWidth={1.4} className="art-l art-scatter-c" style={{ ['--seq' as string]: 3 }} />
            <circle cx="86" cy="58" r="3.5" {...COMMON} strokeWidth={1.4} className="art-l art-scatter-c" style={{ ['--seq' as string]: 4 }} />
          </g>
          {/* 散乱点之间的弱连线 */}
          <g className="art-scatter-lines">
            <path d="M 42 64 Q 56 80 74 98" {...COMMON} strokeWidth={0.8} className="art-l art-scatter-l" />
            <path d="M 74 98 Q 48 120 38 138" {...COMMON} strokeWidth={0.8} className="art-l art-scatter-l" />
            <path d="M 38 138 Q 56 160 64 172" {...COMMON} strokeWidth={0.8} className="art-l art-scatter-l" />
            <path d="M 86 58 Q 80 80 74 98" {...COMMON} strokeWidth={0.8} className="art-l art-scatter-l" />
          </g>

          {/* 中央过渡箭头 */}
          <g className="art-arrow">
            <line x1="106" y1="120" x2="138" y2="120" {...COMMON} strokeWidth={1.6} className="art-l art-arrow-l" />
            <polyline points="130 113, 138 120, 130 127" {...COMMON} strokeWidth={1.6} className="art-l art-arrow-h" />
          </g>

          {/* 右侧规整 3×3 矩阵 */}
          <g className="art-grid">
            <circle cx="160" cy="64" r="3.5" {...COMMON} strokeWidth={1.4} className="art-l art-grid-c" style={{ ['--seq' as string]: 0 }} />
            <circle cx="186" cy="64" r="3.5" {...COMMON} strokeWidth={1.4} className="art-l art-grid-c" style={{ ['--seq' as string]: 1 }} />
            <circle cx="212" cy="64" r="3.5" {...COMMON} strokeWidth={1.4} className="art-l art-grid-c" style={{ ['--seq' as string]: 2 }} />
            <circle cx="160" cy="120" r="3.5" {...COMMON} strokeWidth={1.4} className="art-l art-grid-c" style={{ ['--seq' as string]: 3 }} />
            <circle cx="186" cy="120" r="3.5" {...COMMON} strokeWidth={1.4} className="art-l art-grid-c" style={{ ['--seq' as string]: 4 }} />
            <circle cx="212" cy="120" r="3.5" {...COMMON} strokeWidth={1.4} className="art-l art-grid-c" style={{ ['--seq' as string]: 5 }} />
            <circle cx="160" cy="176" r="3.5" {...COMMON} strokeWidth={1.4} className="art-l art-grid-c" style={{ ['--seq' as string]: 6 }} />
            <circle cx="186" cy="176" r="3.5" {...COMMON} strokeWidth={1.4} className="art-l art-grid-c" style={{ ['--seq' as string]: 7 }} />
            <circle cx="212" cy="176" r="3.5" {...COMMON} strokeWidth={1.4} className="art-l art-grid-c" style={{ ['--seq' as string]: 8 }} />
          </g>
          {/* 矩阵格线 */}
          <g className="art-grid-lines">
            <line x1="160" y1="64" x2="212" y2="64" {...COMMON} strokeWidth={0.8} className="art-l art-grid-ln" style={{ ['--seq' as string]: 0 }} />
            <line x1="160" y1="120" x2="212" y2="120" {...COMMON} strokeWidth={0.8} className="art-l art-grid-ln" style={{ ['--seq' as string]: 1 }} />
            <line x1="160" y1="176" x2="212" y2="176" {...COMMON} strokeWidth={0.8} className="art-l art-grid-ln" style={{ ['--seq' as string]: 2 }} />
            <line x1="160" y1="64" x2="160" y2="176" {...COMMON} strokeWidth={0.8} className="art-l art-grid-ln" style={{ ['--seq' as string]: 3 }} />
            <line x1="186" y1="64" x2="186" y2="176" {...COMMON} strokeWidth={0.8} className="art-l art-grid-ln" style={{ ['--seq' as string]: 4 }} />
            <line x1="212" y1="64" x2="212" y2="176" {...COMMON} strokeWidth={0.8} className="art-l art-grid-ln" style={{ ['--seq' as string]: 5 }} />
          </g>
          {/* 成功金点 */}
          <circle cx="212" cy="64" r="4" fill={GOLD} className="art-d art-success" />
        </svg>
      )

    /* ──────────── 06 感觉统合 ────────────
       视觉叙事：5 片花瓣从中心呈 72° 辐射，外环连接花瓣尖端 = 整合
       入场：外环 → 花瓣顺时针逐片绘出 → 花瓣尖金点 → 中心金芯（最后）
       持续：整组花瓣极慢顺时针旋转（120s/圈） */
    case 'sensory':
      return (
        <svg viewBox="0 0 240 240" className="art-svg art-sensory" aria-hidden="true">
          {/* 外环 (连接花瓣尖端) */}
          <circle cx="120" cy="120" r="86" {...COMMON} strokeWidth={1} strokeDasharray="2 5" className="art-l art-outer-ring" />

          {/* 5 片花瓣（leaf 形）— 旋转组 */}
          <g className="art-petals" style={{ transformOrigin: '120px 120px' }}>
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <g key={i} transform={`rotate(${angle} 120 120)`} className="art-petal-wrap" style={{ ['--seq' as string]: i }}>
                {/* 花瓣轮廓 */}
                <path
                  d="M 120 40 Q 132 80 120 120 Q 108 80 120 40 Z"
                  {...COMMON}
                  strokeWidth={1.4}
                  className="art-l art-petal"
                />
                {/* 花瓣尖金点 */}
                <circle cx="120" cy="40" r="3" fill={GOLD} className="art-d art-petal-tip" />
              </g>
            ))}
          </g>

          {/* 中心金芯 */}
          <circle cx="120" cy="120" r="6" fill={GOLD} className="art-d art-center" />
        </svg>
      )

    /* ──────────── 07 作业训练 ────────────
       视觉叙事：手掌 + 5 指 + 拇指/食指捏取处金色 object + 三圈触觉波
       入场：腕→掌→拇指→四指依次→金 object pop→三圈扩散
       持续：三圈触觉波循环向外脉动 */
    case 'ot':
      return (
        <svg viewBox="0 0 240 240" className="art-svg art-ot" aria-hidden="true">
          {/* 腕带 */}
          <path d="M 90 200 L 90 212 L 158 212 L 158 200" {...COMMON} strokeWidth={1.5} className="art-l art-cuff" />

          {/* 掌轮廓 */}
          <path
            d="M 76 200 L 76 130 Q 76 110 88 110 L 88 134 L 100 134 L 100 80 Q 100 70 110 70 Q 120 70 120 80 L 120 134 L 132 134 L 132 64 Q 132 54 142 54 Q 152 54 152 64 L 152 134 L 164 134 L 164 90 Q 164 80 172 80 Q 180 80 180 90 L 180 200 Z"
            {...COMMON}
            strokeWidth={1.6}
            className="art-l art-palm"
          />

          {/* 拇指 (外凸曲线) */}
          <path
            d="M 76 142 Q 50 140 50 116 Q 50 92 70 100 L 88 130"
            {...COMMON}
            strokeWidth={1.6}
            className="art-l art-thumb"
          />

          {/* 食指与拇指捏取点 */}
          <circle cx="70" cy="98" r="4.5" fill={GOLD} className="art-d art-pinch" />

          {/* 三圈触觉扩散波 */}
          <g className="art-pulse">
            <circle cx="70" cy="98" r="10" {...COMMON} strokeWidth={1} className="art-l art-ring art-ring-1" />
            <circle cx="70" cy="98" r="18" {...COMMON} strokeWidth={1} className="art-l art-ring art-ring-2" />
            <circle cx="70" cy="98" r="28" {...COMMON} strokeWidth={1} className="art-l art-ring art-ring-3" />
          </g>
        </svg>
      )

    /* ──────────── 08 小儿推拿 ────────────
       视觉叙事：儿童侧坐剪影 + 沿背部经络的金色穴位 + 上方推拿之手
       入场：身体轮廓 → 经络曲线 → 4 穴位依次（头→腰） → 推拿手
       持续：穴位金点沿经络方向逐个脉动（top→bottom 2.5s 循环） */
    case 'tuina':
      return (
        <svg viewBox="0 0 240 240" className="art-svg art-tuina" aria-hidden="true">
          {/* 儿童侧坐剪影：头 + 弯曲脊柱 + 蜷起的腿 */}
          <circle cx="100" cy="60" r="14" {...COMMON} strokeWidth={1.6} className="art-l art-head" />
          <path d="M 100 74 Q 108 130 122 168" {...COMMON} strokeWidth={1.8} className="art-l art-spine" />
          {/* 腿 */}
          <path d="M 122 168 Q 158 168 168 144" {...COMMON} strokeWidth={1.6} className="art-l art-leg" />
          {/* 手臂 */}
          <path d="M 102 92 Q 130 102 138 122" {...COMMON} strokeWidth={1.5} className="art-l art-arm" />

          {/* 经络曲线 (虚线沿脊柱) */}
          <path d="M 100 88 Q 108 130 122 162" {...COMMON} strokeWidth={1} strokeDasharray="2 3" className="art-l art-meridian" />

          {/* 4 个金色穴位（top→bottom） */}
          <g className="art-points">
            <circle cx="100" cy="88" r="3.8" fill={GOLD} className="art-d art-point" style={{ ['--seq' as string]: 0 }} />
            <circle cx="105" cy="112" r="3.8" fill={GOLD} className="art-d art-point" style={{ ['--seq' as string]: 1 }} />
            <circle cx="112" cy="138" r="3.8" fill={GOLD} className="art-d art-point" style={{ ['--seq' as string]: 2 }} />
            <circle cx="122" cy="162" r="3.8" fill={GOLD} className="art-d art-point" style={{ ['--seq' as string]: 3 }} />
          </g>

          {/* 推拿之手（仅两小指头示意） */}
          <g className="art-hand">
            <path d="M 60 96 Q 70 86 80 92" {...COMMON} strokeWidth={1.5} className="art-l" />
            <path d="M 64 110 Q 74 100 84 106" {...COMMON} strokeWidth={1.5} className="art-l" />
          </g>
        </svg>
      )

    default:
      return null
  }
}
