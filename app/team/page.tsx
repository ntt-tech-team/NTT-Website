import Link from 'next/link'
import { CoreTeamShowcase } from '@/components/team/CoreTeamShowcase'

export const metadata = {
  title: 'Core Team — Neuro Tech Titans',
  description: 'Meet the people behind Neuro Tech Titans, SRMIST Trichy.',
}

export default function TeamPage() {
  return (
    <div className="px-4 py-4 space-y-5 max-w-lg mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[11px] font-medium"
        style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back
      </Link>

      <div>
        <h1
          className="text-xl font-bold leading-tight"
          style={{ color: 'var(--text)', fontFamily: 'var(--font-display)' }}
        >
          Core Team
        </h1>
        <p
          className="text-[12px] leading-relaxed mt-1"
          style={{ color: 'var(--text-secondary)' }}
        >
          The people behind Neuro Tech Titans, SRMIST Trichy.
        </p>
      </div>

      <CoreTeamShowcase size="large" />
    </div>
  )
}
