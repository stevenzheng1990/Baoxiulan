import { buildMetadata } from '@/lib/seo'
import FacilitiesPage from '@/components/sections/FacilitiesPage'

export const metadata = buildMetadata({
  title: '机构设施',
  description:
    '宝秀兰医疗机构设施与诊疗康复项目：早期综合训练、融合教育、言语认知训练、运动训练、行为矫正、感觉统合、作业训练、小儿推拿等。',
  path: '/facilities',
})

export default function Page() {
  return <FacilitiesPage />
}
