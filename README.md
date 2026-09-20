# The Odyssey — Hossam Dwidar

A one-page editorial portfolio, built as a modern take on a Greco-Roman museum catalogue.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · GSAP (ScrollTrigger + SplitText)

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Structure

```
app/
  layout.tsx              fonts, metadata (OG/Twitter), motion bootstrap
  page.tsx                the six spreads, JSON-LD
  projects/[slug]/        static project detail pages (generateStaticParams)
  sitemap.ts · robots.ts · icon.png · apple-icon.png · not-found.tsx
components/
  Navigation · MobileMenu · Hero · About · Tools · Work · ProjectItem
  ProjectMedia · Journey · Contact · Footer
  motion/MotionController the only GSAP entry point (declarative data-attributes)
  ui/                     SectionMark, Laurel, Icons
data/                     site.ts, disciplines.ts, projects.ts   ← content
lib/projects.ts           async repository — the only way the UI reads projects
types/project.ts          Project model (incl. order / status / seo for phase 2)
scripts/                  asset pipelines (see Assets below)
```

### Phase 2 readiness

The UI never imports `data/projects.ts` directly — it calls `getProjects()`,
`getFeaturedProjects()`, `getProjectBySlug()` and `getProjectSlugs()` in
`lib/projects.ts`. Replace their bodies with database/API calls and every page
keeps working. `status: "draft"` projects are already filtered out, `order`
already drives sorting, and `seo` overrides are already read by the detail page.

- `liveUrl` → "View live →" only renders when set.
- `image` missing → an editorial typographic plate is rendered instead.
- `image.treatment: "cutout"` → a transparent object on a dark film plate, with an optional `caption`.

To add a screenshot: put it in `public/assets/projects/` and add
`image: { src, alt, width, height }` to the project.

## Animation

Declared in markup, wired in `components/motion/MotionController.tsx`:

| attribute            | effect                                         |
| -------------------- | ---------------------------------------------- |
| `data-split`         | headline lines rise through a mask             |
| `data-reveal="up"`   | fade + 28px rise                               |
| `data-reveal="fade"` | opacity only                                   |
| `data-reveal="image"`| clip-path reveal with a slight settle          |
| `data-parallax="n"`  | drifts ±n% while its section crosses           |
| `data-hero="…"`      | hero layers: plate / disc / statue / content   |

`prefers-reduced-motion: reduce` disables all of it (content is never hidden
unless motion is allowed and the script has loaded).

## Assets

`node scripts/prepare-assets.mjs "<path to source img folder>"` regenerates
`public/assets` and `public/og.jpg`. Beyond renaming, it:

- zeroes the hidden RGB "glow" stored in fully transparent pixels of the cutouts;
- **splits the hero statue** (`me.png`: statue + terracotta disc in one layer)
  into `hero-me.png` and `hero-me-disc.png` by colour-keying the terracotta inside
  the disc's measured geometry, so the two can move independently;
- converts `background.png` (ruins + column) into `hero-background.jpg`;
- derives every logo size from the single `logo.png`: `logo.webp` (nav + footer),
  `app/icon.png` (favicon) and `app/apple-icon.png`;
- trims the four tool busts to their bounding boxes so they share one scale;
- recomposes plate + disc + statue into the 1200×630 Open Graph card.

`scripts/prepare-aqari.mjs` and `scripts/prepare-projects.mjs` do the same for the
project case-study screenshots, writing WebP versions and one cover crop per
project into `public/assets/projects/<slug>/`.
