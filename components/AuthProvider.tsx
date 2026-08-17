'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { isSupabaseConfigured } from '@/lib/supabase/config'
import { mapProfile } from '@/lib/map'
import type { DbProfile, Profile } from '@/lib/supabase/types'
import { AuthSheet } from '@/components/AuthSheet'

type AuthContextValue = {
  user: User | null
  profile: Profile | null
  loading: boolean
  configured: boolean
  openAuth: () => void
  closeAuth: () => void
  signOut: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const configured = isSupabaseConfigured()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(configured)
  const [authOpen, setAuthOpen] = useState(false)

  const refresh = useCallback(async () => {
    if (!configured) {
      setUser(null)
      setProfile(null)
      setLoading(false)
      return
    }
    const supabase = createClient()
    const { data: { user: nextUser } } = await supabase.auth.getUser()
    setUser(nextUser)
    if (nextUser) {
      const { data } = await supabase.from('profiles').select('*').eq('id', nextUser.id).maybeSingle()
      setProfile(data ? mapProfile(data as DbProfile, nextUser.email) : {
        id: nextUser.id,
        full_name: nextUser.user_metadata?.full_name || nextUser.user_metadata?.name || null,
        email: nextUser.email ?? null,
        avatar_url: nextUser.user_metadata?.avatar_url || nextUser.user_metadata?.picture || null,
        year: null,
        department: null,
        membership_status: 'not_applied',
        created_at: '',
        updated_at: '',
      } satisfies Profile)
    } else {
      setProfile(null)
    }
    setLoading(false)
  }, [configured])

  useEffect(() => {
    if (!configured) return
    const supabase = createClient()
    refresh()
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      refresh()
    })
    return () => subscription.unsubscribe()
  }, [configured, refresh])

  const signOut = useCallback(async () => {
    if (!configured) return
    await createClient().auth.signOut()
    setUser(null)
    setProfile(null)
  }, [configured])

  const value = useMemo<AuthContextValue>(() => ({
    user,
    profile,
    loading,
    configured,
    openAuth: () => setAuthOpen(true),
    closeAuth: () => setAuthOpen(false),
    signOut,
    refresh,
  }), [user, profile, loading, configured, signOut, refresh])

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthSheet open={authOpen} onClose={() => setAuthOpen(false)} />
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
