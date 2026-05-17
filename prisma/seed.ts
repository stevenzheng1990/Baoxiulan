/**
 * Seed script — run with:
 *   npx ts-node prisma/seed.ts
 *
 * Idempotent: uses upsert throughout, safe to re-run.
 * Default admin password: env ADMIN_INITIAL_PASSWORD or "admin123"
 */

import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import bcrypt from 'bcryptjs'
import { EXPERTS_SEED, SERVICES_SEED, SITE_CONFIG } from '../content/site'

const adapter = new PrismaLibSql({
  url: process.env.TURSO_DATABASE_URL ?? process.env.DATABASE_URL ?? 'file:dev.db',
  authToken: process.env.TURSO_AUTH_TOKEN,
})
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0])

async function main() {
  console.log('🌱 Starting seed...')

  // ── 1. Admin user ────────────────────────────────────────────────────────
  const rawPassword = process.env.ADMIN_INITIAL_PASSWORD ?? 'admin123'
  const hashedPassword = await bcrypt.hash(rawPassword, 10)

  await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: { password: hashedPassword },
    create: { username: 'admin', password: hashedPassword },
  })
  console.log('  ✓ Admin user upserted (username: admin)')

  // ── 2. Experts ───────────────────────────────────────────────────────────
  for (const expert of EXPERTS_SEED) {
    await prisma.expert.upsert({
      where: { slug: expert.slug },
      update: {
        name: expert.name,
        nameEn: expert.nameEn,
        title: expert.title,
        role: expert.role,
        org: expert.org,
        bio: expert.bio,
        specialties: JSON.stringify(expert.specialties),
        credentials: JSON.stringify(expert.credentials),
        photoPath: expert.photoPath,
        sortOrder: expert.sortOrder,
        isFounder: expert.isFounder,
      },
      create: {
        slug: expert.slug,
        name: expert.name,
        nameEn: expert.nameEn,
        title: expert.title,
        role: expert.role,
        org: expert.org,
        bio: expert.bio,
        specialties: JSON.stringify(expert.specialties),
        credentials: JSON.stringify(expert.credentials),
        photoPath: expert.photoPath,
        sortOrder: expert.sortOrder,
        isFounder: expert.isFounder,
      },
    })
  }
  console.log(`  ✓ ${EXPERTS_SEED.length} experts upserted`)

  // ── 3. Services ──────────────────────────────────────────────────────────
  for (const service of SERVICES_SEED) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        name: service.name,
        shortDesc: service.shortDesc,
        sortOrder: service.sortOrder,
      },
      create: {
        slug: service.slug,
        name: service.name,
        shortDesc: service.shortDesc,
        sortOrder: service.sortOrder,
        published: true,
      },
    })
  }
  console.log(`  ✓ ${SERVICES_SEED.length} services upserted`)

  // ── 4. Site settings ─────────────────────────────────────────────────────
  const defaultSettings: Record<string, string> = {
    phone: SITE_CONFIG.phone,
    address: SITE_CONFIG.address,
    email: SITE_CONFIG.email,
    hours: SITE_CONFIG.hours,
    baiduAnalyticsId: SITE_CONFIG.baiduAnalyticsId,
    baiduVerification: SITE_CONFIG.baiduVerification,
  }

  for (const [key, value] of Object.entries(defaultSettings)) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: {},                  // Don't overwrite existing values on re-seed
      create: { key, value },
    })
  }
  console.log('  ✓ Site settings upserted')

  // ── 5. Sample articles ───────────────────────────────────────────────────
  const sampleArticles = [
    {
      slug: 'gaoweierhaoer-zaori-jieru-zhinan',
      title: '高危儿早期干预：把握脑发育黄金窗口期',
      excerpt:
        '高危儿是指在胎儿期、分娩时或新生儿期受到各种高危因素侵害的婴儿。早期识别并及时干预，可显著改善预后，降低残障发生率。本文详述鲍秀兰教授原创干预方案的核心要点。',
      content: `高危儿是指在胎儿期、分娩时或新生儿期受到各种高危因素侵害的婴儿，包括早产儿、低出生体重儿、窒息儿、颅内出血儿等。

**为什么要早期干预？**

人脑在出生后的前三年发育最为迅速，神经突触连接在这一时期大量形成并修剪。科学研究表明，0–1岁是脑发育的第一黄金窗口期，此时干预效果最为显著。

**鲍秀兰教授原创方案**

鲍秀兰教授在三十余年临床实践中，建立了一套完整的高危儿早期干预体系：
1. 新生儿行为神经测查（NBNA）：全面评估新生儿神经行为状态
2. 20项行为测查法：系统评估高危儿各项发育指标
3. 运动干预训练：针对性的主动运动与被动运动训练
4. 认知刺激方案：视觉、听觉、触觉多感官综合训练

**家长的作用**

父母是孩子最好的康复师。宝秀兰医疗为家长提供系统的家庭训练指导，将干预融入日常照护，实现全天候的发育促进。

如需了解更多或预约评估，请致电：400-0066-650`,
      category: '高危儿管理',
      author: '鲍秀兰教授',
      published: true,
    },
    {
      slug: 'zaochan-er-jiankang-guanli-yaodian',
      title: '早产儿出院后的健康管理要点',
      excerpt:
        '早产儿出院后的随访管理是影响长期预后的关键环节。本文从营养支持、发育监测、疫苗接种、家庭环境优化等方面，为早产宝宝家长提供实用指导。',
      content: `早产儿（胎龄 < 37周）出院后，需要比足月儿更密集的健康随访与管理。

**营养支持**

- 母乳喂养是首选，可使用早产儿强化剂补充营养密度
- 纠正月龄至40周时，如体重增长满意，可逐步过渡至普通配方
- 铁剂补充：出院后继续口服元素铁2mg/kg/天，至12月龄（纠正）
- 维生素D：800–1000IU/天

**发育监测**

以纠正年龄评估发育里程碑，不应与实际月龄比较。定期进行：
- Gesell发育评估（3、6、12、24月龄纠正）
- 神经行为评估（NBNA）
- 视力、听力筛查

**危险信号**

以下情况需立即就医：
- 4月龄（纠正）无法竖头
- 6月龄（纠正）手不能主动抓握
- 12月龄（纠正）无法独坐

**宝秀兰门诊**

我们为早产儿提供专属随访门诊，由周丛乐教授团队提供神经发育全面评估，制定个性化随访计划。`,
      category: '早期干预',
      author: '周丛乐教授',
      published: true,
    },
    {
      slug: 'asd-zaopi-zhenduan-yu-jieru',
      title: '自闭症谱系障碍的早期识别与干预',
      excerpt:
        '自闭症谱系障碍（ASD）的早期识别对干预效果至关重要。研究证实，2岁前开始干预可显著改善社交、语言和认知能力。本文介绍早期预警信号及宝秀兰的多维度干预方案。',
      content: `自闭症谱系障碍（ASD）是一类以社交沟通障碍、重复刻板行为为核心特征的神经发育障碍，全球患病率约为1/54。

**早期预警信号（"五不"行为）**

- 不看：少眼神对视
- 不应：呼名无反应或反应迟钝
- 不指：12月龄无食指指向
- 不说：16月龄仍无有意义单词
- 不玩：缺乏假想性游戏

若发现以上任一信号，建议立即寻求专业评估。

**宝秀兰ASD干预方案**

**1. 多维度评估**
- ADOS-2（自闭症诊断观察量表）
- ADI-R（自闭症诊断访谈量表）
- Vineland-Ⅱ适应行为量表

**2. 个性化干预**
- ABA（应用行为分析）：强化正向行为，系统建立技能
- RDI（人际关系发展干预）：促进社交参照与共同关注
- PRT（关键反应训练）：在自然情境中嵌入学习机会

**3. 家庭赋能**
定期家长培训，将干预策略融入家庭日常互动。

预约ASD评估请拨打：400-0066-650`,
      category: '育儿课堂',
      author: '宝秀兰医疗团队',
      published: false,
    },
  ]

  for (const article of sampleArticles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        author: article.author,
        published: article.published,
      },
      create: article,
    })
  }
  console.log(`  ✓ ${sampleArticles.length} sample articles upserted`)

  console.log('\n✅ Seed complete.')
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
