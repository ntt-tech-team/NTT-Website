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
| **Vice President** | `/team/V.jpeg`            | `public/team/V.jpeg`              | `.jpeg` |
| **Secretary**      | `/team/Secretary.jpeg`    | `public/team/Secretary.jpeg`      | `.jpeg` |
| **Treasurer**      | `/team/Treasurer.jpeg`    | `public/team/Treasurer.jpeg`      | `.jpeg` |
| **Technical Lead** | `/team/tech-lead.jpg`     | `public/team/tech-lead.jpg`       | `.jpg`  |
| **Social Media**   | `/team/social.jpg`        | `public/team/social.jpg`          | `.jpg`  |
| **Design Lead**    | `/team/MD Lead.jpeg`      | `public/team/MD Lead.jpeg`        | `.jpeg` |
| **Event Coord**    | `/team/events.jpg`        | `public/team/events.jpg`          | `.jpg`  |

> [!IMPORTANT]
> **File names are case-sensitive.** `Treasurer.jpeg` ≠ `treasurer.jpeg`. Make sure the file name exactly matches the `photo` field in the code.

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

Open [`components/SidebarLeft.tsx`](./components/SidebarLeft.tsx) and find the `CORE_TEAM` array at the top of the file (~line 19).

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

Some roles (like Event Coordinator) support multiple members. Just add more entries to the `members[]` array:

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

The tile will automatically switch to a row layout showing all members side by side.

---

## Troubleshooting

| Symptom                          | Cause                                       | Fix                                                    |
| -------------------------------- | ------------------------------------------- | ------------------------------------------------------ |
| Initials showing instead of photo | File name mismatch or file missing          | Check exact file name (case-sensitive!) in `/public/team/` |
| Photo looks stretched/squished   | Non-square image                            | Crop to 1:1 before adding                              |
| Photo is blurry in lightbox      | Image too small (e.g., 50×50)               | Use at least 400×400 px                                |
| Photo not updating after change  | Browser cache                               | Hard refresh (`Ctrl+Shift+R`) or clear cache           |
| 404 in console for photo         | Wrong path or file not in `public/team/`    | Verify file exists at the exact path                   |
