import { requireAdmin } from '@/lib/adminAuth'
import SettingsClient from './SettingsClient'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  await requireAdmin()
  return <SettingsClient />
}
