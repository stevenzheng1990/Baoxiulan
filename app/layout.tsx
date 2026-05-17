import type { Metadata } from 'next'
import { Noto_Serif_SC, Noto_Sans_SC } from 'next/font/google'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/seo/JsonLd'
import { buildMetadata, orgJsonLd } from '@/lib/seo'
import { SITE_CONFIG } from '@/content/site'

// next/font self-hosts the fonts — no runtime Google request, safe in CN networks
const notoSerifSC = Noto_Serif_SC({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-serif-cn',
  display: 'swap',
  preload: false,
})
const notoSansSC = Noto_Sans_SC({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-sans-cn',
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = buildMetadata({})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isProd = process.env.NODE_ENV === 'production'
  const hasBaiduId = SITE_CONFIG.baiduAnalyticsId !== 'REPLACE_WITH_BAIDU_ANALYTICS_ID'

  return (
    <html lang="zh-CN" className={`${notoSerifSC.variable} ${notoSansSC.variable}`}>
      <head>
        <JsonLd data={orgJsonLd()} />
        {isProd && hasBaiduId && (
          <script dangerouslySetInnerHTML={{
            __html: `var _hmt=_hmt||[];(function(){var hm=document.createElement("script");hm.src="https://hm.baidu.com/hm.js?${SITE_CONFIG.baiduAnalyticsId}";var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(hm,s);})();`
          }} />
        )}
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
