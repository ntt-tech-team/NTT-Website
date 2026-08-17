import { HeroSection } from '@/components/home/HeroSection'
import { StatsStrip } from '@/components/home/StatsStrip'
import { AnnouncementsSection } from '@/components/home/AnnouncementsSection'
import { UpcomingEventsSection } from '@/components/home/UpcomingEventsSection'
import { getAnnouncements, getClubStats, getUpcomingEvents } from '@/lib/data'

export default async function HomePage() {
  const [stats, announcements, events] = await Promise.all([
    getClubStats(),
    getAnnouncements(3),
    getUpcomingEvents(2),
  ])

  return (
    <div className="px-4 py-4 space-y-5 max-w-lg mx-auto">
      <HeroSection />
      <StatsStrip stats={stats} />
      <AnnouncementsSection items={announcements} />
      <UpcomingEventsSection events={events} />
    </div>
  )
}
