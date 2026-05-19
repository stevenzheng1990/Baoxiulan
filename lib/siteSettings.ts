import { prisma } from '@/lib/db'
import { SITE_CONFIG } from '@/content/site'

/**
 * Single source of truth for editable site-wide settings.
 * Reads from the SiteSetting table; falls back to the seed values in
 * content/site.ts so the site keeps working before the admin enters anything.
 */

export const SETTING_KEYS = [
  // Basic
  'name',
  'tagline',
  'description',
  'established',
  // Contact
  'phone',
  'email',
  'address',
  'hours',
  // Social + QR
  'wechatId',
  'wechatQr',
  'weiboUrl',
  'weiboQr',
  // Brand
  'logo',
  'ogImage',
  // SEO
  'baiduAnalyticsId',
  'baiduVerification',
] as const

export type SettingKey = (typeof SETTING_KEYS)[number]
export type SiteSettings = Record<SettingKey, string>

export const DEFAULT_SETTINGS: SiteSettings = {
  name: SITE_CONFIG.name,
  tagline: SITE_CONFIG.tagline,
  description: SITE_CONFIG.description,
  established: SITE_CONFIG.established,

  phone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  address: SITE_CONFIG.address,
  hours: SITE_CONFIG.hours,

  wechatId: SITE_CONFIG.social.wechat,
  wechatQr: '/qr/wechat.png',
  weiboUrl: SITE_CONFIG.social.weibo,
  weiboQr: '/qr/weibo.png',

  logo: SITE_CONFIG.logo,
  ogImage: SITE_CONFIG.ogImage,

  baiduAnalyticsId: SITE_CONFIG.baiduAnalyticsId,
  baiduVerification: SITE_CONFIG.baiduVerification,
}

/** Read all settings from DB, merged with defaults. Safe to call from server components. */
export async function getSiteSettings(): Promise<SiteSettings> {
  const result: SiteSettings = { ...DEFAULT_SETTINGS }
  try {
    const rows = await prisma.siteSetting.findMany({
      where: { key: { in: [...SETTING_KEYS] } },
    })
    for (const row of rows) {
      const key = row.key as SettingKey
      if (SETTING_KEYS.includes(key) && row.value && row.value.trim()) {
        result[key] = row.value
      }
    }
  } catch {
    /* DB unreachable (e.g. during static analysis) — return defaults */
  }
  return result
}

/** Friendly labels shown in the admin UI. */
export const SETTING_LABELS: Record<SettingKey, string> = {
  name: '机构名称',
  tagline: '副标题',
  description: '机构简介',
  established: '创立年份',
  phone: '电话',
  email: '邮箱',
  address: '地址',
  hours: '营业时间',
  wechatId: '微信公众号 ID',
  wechatQr: '微信二维码',
  weiboUrl: '微博地址',
  weiboQr: '微博二维码',
  logo: '站点 Logo',
  ogImage: 'OG 分享图',
  baiduAnalyticsId: '百度统计 ID',
  baiduVerification: '百度站长验证码',
}

/** Which keys hold image URLs (drive the admin to render ImageUploader). */
export const IMAGE_KEYS: SettingKey[] = ['wechatQr', 'weiboQr', 'logo', 'ogImage']

/** Which keys are long-form (textarea). */
export const TEXTAREA_KEYS: SettingKey[] = ['description', 'address']
