'use client'

import Image from 'next/image'

/**
 * ProgramArt — 8 个项目的简笔线描配图
 * 来源：Iconify · material-symbols-light outline rounded（Apache 2.0 商用免费）
 * 已落地为 /public/programs/{slug}.svg（品牌蓝 #0003A3 单色）
 */
export default function ProgramArt({ slug }: { slug: string }) {
  return (
    <div className="art-img">
      <Image
        src={`/programs/${slug}.svg`}
        alt=""
        width={240}
        height={240}
        priority={false}
      />
    </div>
  )
}
