export function formatEventDate(iso: string, short = false) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    ...(short ? {} : { year: 'numeric' }),
  })
}

export function eventDayKey(iso: string) {
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function timeAgo(iso: string) {
  const seconds = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export const ANNOUNCEMENT_STYLES = {
  Urgent: {
    dotColor: '#FF4848',
    textColor: '#FF7070',
    bg: 'var(--urgent-bg)',
    border: 'var(--urgent-border)',
  },
  Event: {
    dotColor: '#7C6EFF',
    textColor: '#7C6EFF',
    bg: 'rgba(124,110,255,0.07)',
    border: 'rgba(124,110,255,0.2)',
  },
  General: {
    dotColor: '#6B6B9B',
    textColor: 'var(--text-muted)',
    bg: 'var(--glass-bg)',
    border: 'var(--glass-border)',
  },
  Technical: {
    dotColor: '#38C2FF',
    textColor: '#38C2FF',
    bg: 'rgba(56,194,255,0.07)',
    border: 'rgba(56,194,255,0.18)',
  },
} as const
