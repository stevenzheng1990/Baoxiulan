export interface Article {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  publishedAt: Date
  updatedAt: Date
  published: boolean
  coverImage?: string | null
  metaTitle?: string | null
  metaDesc?: string | null
}

export interface Expert {
  id: number
  slug: string
  name: string
  nameEn?: string | null
  title: string
  role: string
  org?: string | null
  bio: string
  specialties: string[]
  credentials: string[]
  photoPath?: string | null
  sortOrder: number
  isFounder: boolean
  updatedAt: Date
}

export interface Service {
  id: number
  slug: string
  name: string
  shortDesc: string
  fullDesc?: string | null
  sortOrder: number
  published: boolean
  updatedAt: Date
}

export interface SiteSettings {
  phone: string
  address: string
  email: string
  mapUrl: string
  hours: string
  wechatQr: string
  baiduAnalyticsId: string
  baiduVerification: string
}
