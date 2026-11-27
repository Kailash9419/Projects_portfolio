# DevLabs site (v2)

Static, bilingual (EN/HI) portfolio for DevLabs Software Studio. The brief and all decisions are in
[`V2_BRIEF.md`](V2_BRIEF.md); the build follows `../../heavy-visual-web-bible`.

## Commands
| Command | What it does |
|---|---|
| `npm run dev` | Dev server at http://localhost:4321 |
| `npm run build` | Static build to `dist/` (images → AVIF/WebP, sitemap) |
| `npm run preview` | Serve `dist/` |
| `npm run check` | Astro + TypeScript diagnostics |
| `npm test` | Vitest unit tests (geometry, links, i18n, copy completeness) |
| `npm run shots [slug]` | Re-capture live-site screenshots (home desktop, home mobile @2x, deeper "detail" view; popups removed) into `src/assets/projects/` |
| `node scripts/render-poster.mjs <slug>` | Render placeholder artwork from `scripts/posters/<slug>.html` |
| `node tests/e2e/hero.mjs [url] [outDir]` | Hero showcase QA: autoplay, pause, reduced motion, 4 widths, Hindi, no JS |
| `node tests/e2e/sections.mjs [url] [outDir] [width]` | Per-section shots, the 4 phone states and the services hover |
| `node tests/e2e/shoot.mjs [url] [outDir]` | Visual QA: desktop, mobile, Hindi, reduced motion, no-JS, console/request errors |

Requires Node ≥ 22.12 (Astro 6). Uses the installed Chrome for screenshots and QA.

## Structure
```text
src/
  content/   types.ts · projects.ts · site.ts      typed data, all copy in EN + HI
  lib/       i18n.ts · whatsapp.ts                 pure helpers
  runtime/   motion.ts · reveal.ts                 shared browser services
  features/
    hero/      Hero.astro                          S1 headline + live-project showcase (showcase.ts)
    work/      WorkSection.astro · work-wall.ts · wall-geometry.ts   S2 3D wall
    phone/     PhoneSection.astro · phone.ts       S3 sticky phone (admin app, 4 story states)
    services/  preview.ts                          pointer-following project preview
    contact/   ContactSection.astro · composer.ts  WhatsApp / email composer
  components/  BaseLayout · SiteHeader · SiteFooter · Services · Proof · Shot · Icon
  views/       HomeView · ProjectView              shared by EN and /hi routes
  pages/       / · /work/[slug] · /hi/ · /hi/work/[slug] · 404
```

## Verification (2026-11-27)
- `npm run build`: 11 pages, no errors.
- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm test`: 23/23 passed.
- `tests/e2e/shoot.mjs` against the build: no console errors, no failed requests. Checked at
  1440×900 and 390×844; Hindi pages; reduced motion (wall falls back to the static grid);
  JavaScript disabled (all content and links present).
- Weight: JS ≈ 3.4 KB gzip on the home page, CSS ≈ 7 KB gzip. Screenshots 10–70 KB each (from 0.2–0.7 MB PNGs).

**Not yet measured:** Lighthouse / Core Web Vitals on a throttled real phone, screen-reader pass
(NVDA / VoiceOver), Safari and Firefox, 200% zoom. Do these before launch.

## Known gaps
- **Valley of Birds is offline** (`valleyofbird.vercel.app` returns 404). Its cover is original
  placeholder artwork, labelled on the page. Redeploy it or supply a screenshot, then run
  `npm run shots valley-of-birds` and set `status: 'live'` in `projects.ts`.
- Project metrics come from v1 and are `verified: false`; pages say "as reported by the client".
- Hindi copy needs a native-speaker review.
- No analytics, no CMS, no `/admin` (see brief §9).

## Asset inventory
| Asset | Source | Rights |
|---|---|---|
| `src/assets/projects/*-desktop.png`, `*-mobile.png` | Headless-Chrome screenshots of the live client sites, 2026-11-27 | Client sites built by DevLabs; confirm client approval |
| `valley-of-birds-*.png` | Rendered from `scripts/posters/valley-of-birds.html` | Original, DevLabs |
| Bricolage Grotesque, Mukta | Fontsource, self-hosted | SIL OFL 1.1 |
| `public/favicon.svg`, icons in `Icon.astro` | Original | DevLabs |
