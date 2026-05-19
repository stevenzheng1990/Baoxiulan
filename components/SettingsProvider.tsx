'use client'

import { createContext, useContext, ReactNode } from 'react'
import { DEFAULT_SETTINGS, type SiteSettings } from '@/lib/siteSettings'

const SettingsContext = createContext<SiteSettings>(DEFAULT_SETTINGS)

export function SettingsProvider({
  value,
  children,
}: {
  value: SiteSettings
  children: ReactNode
}) {
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

/** Read site settings from any client component beneath SettingsProvider. */
export function useSettings(): SiteSettings {
  return useContext(SettingsContext)
}
