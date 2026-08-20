// ─────────────────────────────────────────────────────────────────────────────
// Core Team data — role-based. Each role supports one OR multiple members.
//
// SINGLE-PERSON ROLES  →  keep 1 entry in members[] (large centered layout)
// MULTI-PERSON ROLES   →  add more entries to members[] (row layout, smaller)
//
// To add a photo: place the image in /public/team/ and update the `photo` field.
// If an image fails to load, the initials gradient fallback is shown automatically.
//
// This file is the single source of truth — both the desktop sidebar
// (components/SidebarLeft.tsx) and the mobile Core Team page
// (app/team/page.tsx) render from CORE_TEAM via <CoreTeamShowcase />.
// ─────────────────────────────────────────────────────────────────────────────

export type Member = { name: string; initials: string; photo: string }
export type TeamRole = { role: string; accent: string; members: Member[] }

export const CORE_TEAM: TeamRole[] = [
  {
    role: 'President',
    accent: '#7C6EFF',
    members: [
      { name: 'President', initials: 'PR', photo: '/team/president.jpg' },
    ],
  },
  {
    role: 'Vice President',
    accent: '#38C2FF',
    members: [
      { name: 'Vice President', initials: 'VP', photo: '/team/VP.jpg' },
    ],
  },
  {
    role: 'Secretary',
    accent: '#A78BFA',
    members: [
      { name: 'Secretary', initials: 'SC', photo: '/team/Secretary.jpeg' },
    ],
  },
  {
    role: 'Treasurer',
    accent: '#7C6EFF',
    members: [
      { name: 'Treasurer', initials: 'TR', photo: '/team/Treasurer.jpeg' },
    ],
  },
  {
    role: 'Technical Lead',
    accent: '#38C2FF',
    members: [
      { name: 'Tech Lead', initials: 'TL', photo: '/team/tech-lead.jpg' },
      // Add more: { name: 'Tech Lead 2', initials: 'TL', photo: '/team/tech-lead-2.jpg' },
    ],
  },
  {
    role: 'Social Media Lead',
    accent: '#A78BFA',
    members: [
      { name: 'Social Media', initials: 'SM', photo: '/team/social.jpg' },
    ],
  },
  {
    role: 'Design Lead',
    accent: '#7C6EFF',
    members: [
      { name: 'Design Lead 1', initials: 'DL', photo: '/team/design-lead-1.jpg' },
      { name: 'Design Lead 2', initials: 'DL', photo: '/team/design-lead-2.jpg' },
    ],
  },
  {
    role: 'Event Coordinator',
    accent: '#38C2FF',
    members: [
      { name: 'Event Coord', initials: 'EC', photo: '/team/event-coord-1.jpg' },
      { name: 'Event Coord', initials: 'EC', photo: '/team/event-coord-2.jpg' },
      { name: 'Event Coord', initials: 'EC', photo: '/team/event-coord-3.jpg' },
    ],
  },
]
