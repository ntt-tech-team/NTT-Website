import { isSupabaseConfigured } from '@/lib/supabase/config'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

type Application = {
  full_name: string
  email: string
  year: string
  department: string
  skills: string | null
  reason: string
  links: string | null
  user_id: string | null
  status: 'pending'
}

export async function saveMembershipApplication(app: Application) {
  const { data: existing, error: readError } = await supabaseAdmin
    .from('broadcasts')
    .select('id,target,channels')

  if (readError) return { error: readError }

  const already = (existing ?? []).some(row => {
    const channels = Array.isArray(row.channels) ? row.channels : []
    const target = (row.target ?? {}) as { email?: string }
    return channels.includes('membership') && target.email === app.email
  })
  if (already) {
    return { error: { code: '23505', message: 'duplicate' } }
  }

  const { error } = await supabaseAdmin.from('broadcasts').insert({
    title: `${app.full_name} — membership application`,
    body: app.reason,
    channels: ['membership'],
    target: {
      type: 'membership_application',
      ...app,
    },
  })
  return { error }
}

export async function getMembershipStatusForEmail(email: string | null | undefined) {
  if (!email || !isSupabaseConfigured()) return 'not_applied' as const
  const { data } = await supabaseAdmin.from('broadcasts').select('target,channels')
  const match = (data ?? []).find(row => {
    const channels = Array.isArray(row.channels) ? row.channels : []
    const target = (row.target ?? {}) as { email?: string; status?: string }
    return channels.includes('membership') && target.email === email.toLowerCase()
  })
  if (!match) return 'not_applied' as const
  const status = (match.target as { status?: string } | null)?.status
  if (status === 'approved' || status === 'rejected' || status === 'pending') return status
  return 'pending' as const
}

export async function getCurrentUserId() {
  if (!isSupabaseConfigured()) return null
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user?.id ?? null
}
