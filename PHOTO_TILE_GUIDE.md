# 📸 Photo Tile Guide — Core Team Photos

> Quick reference for adding, renaming, or updating photos displayed in the **Core Team** tile on the left sidebar.

---

## Where Photos Live

All team photos go inside:

```
/public/team/
```

This folder is served at the URL root `/team/…`, so a file at `/public/team/social.jpg` is referenced in code as `/team/social.jpg`.

---

## Current Photos & Naming Map

| Role               | File Name in Code         | Actual File Needed at             | Format  |
| ------------------ | ------------------------- | --------------------------------- | ------- |
| **President**      | `/team/president.jpg`     | `public/team/president.jpg`       | `.jpg`  |
| **Vice President** | `/team/VP.jpg`            | `public/team/VP.jpg`              | `.jpg`  |
| **Secretary**      | `/team/Secretary.jpeg`    | `public/team/Secretary.jpeg`      | `.jpeg` |
| **Treasurer**      | `/team/Treasurer.jpeg`    | `public/team/Treasurer.jpeg`      | `.jpeg` |
| **Technical Lead** | `/team/tech-lead.jpg`     | `public/team/tech-lead.jpg`       | `.jpg`  |
| **Social Media**   | `/team/social.jpg`        | `public/team/social.jpg`          | `.jpg`  |
| **Design Lead 1**  | `/team/design-lead-1.jpg` | `public/team/design-lead-1.jpg`   | `.jpg`  |
| **Design Lead 2**  | `/team/design-lead-2.jpg` | `public/team/design-lead-2.jpg`   | `.jpg`  |
| **Event Coord 1**  | `/team/event-coord-1.jpg` | `public/team/event-coord-1.jpg`   | `.jpg`  |
| **Event Coord 2**  | `/team/event-coord-2.jpg` | `public/team/event-coord-2.jpg`   | `.jpg`  |
| **Event Coord 3**  | `/team/event-coord-3.jpg` | `public/team/event-coord-3.jpg`   | `.jpg`  |

> [!IMPORTANT]
> **File names are case-sensitive.** `Treasurer.jpeg` ≠ `treasurer.jpeg`. Make sure the file name exactly matches the `photo` field in the code.

> [!NOTE]
> **Design Lead is now a 2-member role.** It previously pointed at `MD Lead.jpeg`, but that file was actually the **Media Lead's** photo, not Design Lead's — it has been removed from this entry. Design Lead now has two photo slots (`design-lead-1.jpg` and `design-lead-2.jpg`), same pattern as Event Coordinator. Drop both team members' photos into `public/team/` using those exact names and they'll appear automatically — no code changes needed.

---

## Supported Image Formats

| Extension | Notes                                                     |
| --------- | --------------------------------------------------------- |
| `.jpg`    | ✅ Recommended — good quality, small file size             |
| `.jpeg`   | ✅ Same as `.jpg`, just a different extension               |
| `.png`    | ✅ Works — larger file size, supports transparency          |
| `.webp`   | ✅ Modern format — best compression, not all tools export it |
| `.avif`   | ⚠️ Works in modern browsers only                           |
| `.gif`    | ⚠️ Avoid — low quality for photos                          |
| `.svg`    | ❌ Not suitable for photos                                  |

### Recommended Specs

- **Dimensions**: At least **400×400 px** (photos are displayed at 92 px small / 200 px in lightbox)
- **Aspect ratio**: **1:1 (square)** — photos are rendered in circles, so square crops look best
- **File size**: Keep under **200 KB** for fast loading
- **Crop**: Center the face in the frame for best results with circular masking

---

## How to Add or Update a Photo

### Step 1 — Prepare the image

1. Crop to a **square** (1:1) ratio
2. Resize to around **400×400 px**
3. Save as `.jpg` or `.jpeg`

### Step 2 — Place the file

Copy the image into:

```
public/team/
```

### Step 3 — Update the code (if needed)

Open [`components/team/data.ts`](./components/team/data.ts) and find the `CORE_TEAM` array. This is the single source of truth — both the desktop sidebar (`SidebarLeft.tsx`) and the mobile Core Team page (`app/team/page.tsx`) render from it via `<CoreTeamShowcase />`.

Each role entry looks like this:

```typescript
{
  role: 'President',
  accent: '#7C6EFF',
  members: [
    { name: 'President', initials: 'PR', photo: '/team/president.jpg' },
  ],
},
```

Update the `photo` field to match your file name **exactly** (including extension and case):

```typescript
photo: '/team/your-file-name.jpg'
```

### Step 4 — Verify

Run the dev server and check the sidebar. If the image fails to load, the initials fallback will appear instead (gradient circle with letters). This usually means the file name doesn't match.

---

## Naming Convention (Recommended)

Use **lowercase, kebab-case** names to avoid confusion:

```
✅  president.jpg
✅  vice-president.jpg
✅  tech-lead.jpg
✅  social-media.jpg
✅  event-coord-1.jpg

❌  Vice President Photo.jpeg    (spaces + mixed case = trouble)
❌  IMG_20260815_123456.jpg       (meaningless name)
❌  photo(1).jpeg                 (parentheses cause issues)
```

> [!TIP]
> If you rename a file, remember to update the `photo` field in `SidebarLeft.tsx` to match!

---

## Adding a Multi-Member Role

Some roles (like Event Coordinator and Design Lead) support multiple members. Just add more entries to the `members[]` array:

```typescript
{
  role: 'Event Coordinator',
  accent: '#38C2FF',
  members: [
    { name: 'Event Coord 1', initials: 'EC', photo: '/team/event-coord-1.jpg' },
    { name: 'Event Coord 2', initials: 'EC', photo: '/team/event-coord-2.jpg' },
    { name: 'Event Coord 3', initials: 'EC', photo: '/team/event-coord-3.jpg' },
  ],
},
```

```typescript
{
  role: 'Design Lead',
  accent: '#7C6EFF',
  members: [
    { name: 'Design Lead 1', initials: 'DL', photo: '/team/design-lead-1.jpg' },
    { name: 'Design Lead 2', initials: 'DL', photo: '/team/design-lead-2.jpg' },
  ],
},
```

The tile will automatically switch to a row layout showing all members side by side — this happens whenever a role has more than 1 entry in `members[]`, no other code changes required. To add a 3rd Design Lead later, just append another `{ name, initials, photo }` entry the same way Event Coordinator has three.

---

## Adding / Updating Partner & Sponsor Logos

The left sidebar's **Partners** card (`components/PartnersStrip.tsx`) works the same way as team photos: it points at a file path, and shows a clean text-wordmark fallback badge (e.g. "AWS", "KL") until that file exists — so the card never looks broken while logos are pending.

| Partner                    | Expected path                                | File to drop in `public/partners/`     |
| --------------------------- | --------------------------------------------- | --------------------------------------- |
| **AWS User Group — Trichy** | `/partners/aws-user-group-trichy.png`         | `aws-user-group-trichy.png`             |
| **Kuralit**                  | `/partners/kuralit.png`                       | `kuralit.png`                           |

**To add a logo:** create the `public/partners/` folder if it doesn't exist yet, and drop in a file with the exact name above (PNG with transparent background looks best — the badge has its own padding and background already).

**To add a new partner:** open `components/PartnersStrip.tsx` and add another entry to the `PARTNERS` array:

```typescript
{
  name: 'Partner Full Name',
  short: 'PN',              // shown in the fallback badge if the logo is missing
  logo: '/partners/partner-slug.png',
  href: 'https://partner-website.com', // optional — omit to make it non-clickable
},
```

---

## Troubleshooting

| Symptom                          | Cause                                       | Fix                                                    |
| -------------------------------- | ------------------------------------------- | ------------------------------------------------------ |
| Initials showing instead of photo | File name mismatch or file missing          | Check exact file name (case-sensitive!) in `/public/team/` |
| Photo looks stretched/squished   | Non-square image                            | Crop to 1:1 before adding                              |
| Photo is blurry in lightbox      | Image too small (e.g., 50×50)               | Use at least 400×400 px                                |
| Photo not updating after change  | Browser cache                               | Hard refresh (`Ctrl+Shift+R`) or clear cache           |
| 404 in console for photo         | Wrong path or file not in `public/team/`    | Verify file exists at the exact path                   |
