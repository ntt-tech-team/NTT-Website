import { HeroSection } from '@/components/home/HeroSection'
import { StatsStrip } from '@/components/home/StatsStrip'
import { AnnouncementsSection } from '@/components/home/AnnouncementsSection'
import { UpcomingEventsSection } from '@/components/home/UpcomingEventsSection'
import { HomeCalendar } from '@/components/home/HomeCalendar'

export default function HomePage() {
  return (
    <div className="px-4 py-4 space-y-5 max-w-lg mx-auto">
      <HeroSection />
      <StatsStrip />
      <HomeCalendar />
      <AnnouncementsSection />
      <UpcomingEventsSection />
    </div>
  )
}
