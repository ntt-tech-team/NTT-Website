import { getAnnouncements } from '@/lib/data'
import { AnnouncementsClient } from '@/components/announcements/AnnouncementsClient'

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements()
  return <AnnouncementsClient announcements={announcements} />
}
