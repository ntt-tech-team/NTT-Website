import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserId, saveMembershipApplication } from '@/lib/membership'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { full_name, email, year, department, skills, reason, links } = body

    if (!full_name || !email || !year || !department || !reason) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const userId = await getCurrentUserId()
    const { error } = await saveMembershipApplication({
      user_id: userId,
      full_name: full_name.trim(),
      email: email.trim().toLowerCase(),
      year,
      department: department.trim(),
      skills: skills?.trim() || null,
      reason: reason.trim(),
      links: links?.trim() || null,
      status: 'pending',
    })

    if (error) {
      console.error('[membership] insert error:', error)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'An application with this email already exists.' },
          { status: 409 }
        )
      }
      return NextResponse.json({ error: 'Failed to submit application.' }, { status: 500 })
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('[membership] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
