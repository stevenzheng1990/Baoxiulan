'use client'

import { useEffect } from 'react'
import Hero from '@/components/sections/Hero'
import MarqueeBar from '@/components/sections/MarqueeBar'
import Numbers from '@/components/sections/Numbers'
import Services from '@/components/sections/Services'
import Founder from '@/components/sections/Founder'
import Specialists from '@/components/sections/Specialists'
import Therapists from '@/components/sections/Therapists'
import Process from '@/components/sections/Process'
import Articles from '@/components/sections/Articles'
import Cta from '@/components/sections/Cta'
import { SERVICES_SEED } from '@/content/site'

export default function HomePage() {
  useEffect(() => {
    const selectors = '.r, .r-l, .r-r, .r-blur, .r-img, .r-clip, .r-clip-up, .rsg'
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selectors))
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Hero />
      <MarqueeBar />
      <Founder />
      <Specialists />
      <Therapists />
      <Numbers />
      <Services services={SERVICES_SEED} />
      <Process />
      <Articles />
      <Cta />
    </>
  )
}
