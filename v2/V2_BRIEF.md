# DevLabs Portfolio: Brief for Building

## What it is
The website of **DevLabs Software Studio** (Haldwani, Uttarakhand, India). The studio builds websites, online stores, booking systems, SaaS dashboards and WhatsApp automation for small businesses, each one owner-managed from a phone admin panel. **The site itself is the sales pitch:** it shows craft through a few signature interactions instead of copy. Copy is deliberately minimal (a few words per section) and bilingual (English and Hindi). Its jobs are to impress, show 4 live projects, and turn visitors into inquiries by email or WhatsApp.

---

> Everything below was added while planning and building v2, following the
> Heavy Visual Website Bible (`../heavy-visual-web-bible`). Labels used:
> **[Fact]** verified from files on disk · **[Decision]** chosen for v2 ·
> **[Assumption]** believed true, needs owner confirmation · **[Open]** question for the owner.

## 1. Discovery (Bible Phase 1)

### Repository facts
- **[Fact]** `devlabs/` had no source code. `Projects_portfolio/` holds only a compiled
  Next.js `.next/` output from v1 (routes `/`, `/work`, `/work/[slug]`, `/admin`).
  No `package.json`, no source, no image assets. v2 is a fresh build; v1 output is left untouched.
- **[Fact]** Content recovered from the v1 output: the 4 projects, their live URLs, stacks,
  problem/build/delivered text, metrics, phone `+91 81685 46173`, email
  `devbrostudio12@gmail.com`, Instagram `devlabs.studio`, domain `devlabs.studio`.
- **[Fact]** Toolchain on this machine: Node 22.16.0, npm 11.6.1, git 2.49, Chrome and Edge installed.

### Audience and conversion
- **Audience:** small-business owners in India (shops, cafés, studios, service businesses,
  tour operators), often browsing on a phone, often more comfortable in Hindi.
- **Primary action:** start a WhatsApp chat with a pre-filled message.
- **Secondary actions:** email; open a live project; read a project story.

### Projects (content owner: DevLabs)
| # | Slug | Name | Type | Year | Live URL |
|---|---|---|---|---|---|
| 01 | `level-40-wellness` | Level 40 Wellness | Café + store + bookings | 2024 | https://level40wellness.com |
| 02 | `mudkraft` | Mudkraft | Online store | 2024 | https://mudkraft.com |
| 03 | `valley-of-birds` | Valley of Birds | Travel + leads | 2023 | https://valleyofbird.vercel.app |
| 04 | `bharat-laundry` | Bharat Laundry | SaaS / ops | 2024 | https://bharat-laundary.vercel.app |

- **[Assumption]** The v1 metrics (e.g. "3x online orders", "2.5x revenue", "+40% lead
  conversion", "4x order volume") are real client results. They are shown on project pages,
  marked in data as `verified: false` until the owner confirms them.
- **[Assumption]** Hindi copy in `src/content/` was written for v2 and needs review by a native speaker.

## 2. Creative brief (Bible `02-design`)

**Experience statement:** *A studio site that feels like holding a finished product: every
section is something you can touch, not something you have to read.*

**Tone:** confident, warm, crafted, local-but-world-class. Not corporate, not "agency-speak".

**Three visual principles**
1. **Big type, few words.** Each section has one headline, one line, one action.
2. **Two scripts, one voice.** Latin and Devanagari are designed together, not translated afterwards.
3. **Show the product, not the promise.** Real screenshots of real live sites; a real-looking admin panel.

**Will not feel like:** a template marketplace, a stock-photo agency, a dashboard SaaS landing page.

### Design system v2 (2026-11-27, after owner review: v1 looked "cheap and all over the place")
Rules that every section must follow (`site/src/styles/tokens.css`, `global.css`):
1. **One background, one surface, one hairline.** `--bg #0c0c0b`, `--surface #151513`, `--line` 9% white. No coloured section blocks.
2. **Marigold `#ffb224` only** for the primary CTA and the single italic accent word in the hero.
3. **Serif for display, sans for everything else.** Instrument Serif (Latin) / Tiro Devanagari Hindi; Inter Tight / Mukta for UI and body. Weight 400–500 only; no ultra-bold.
4. **Six type sizes**: display, h2, h3, lede, body, small. Labels are small uppercase sans.
5. **12-column grid everywhere.** Every section opens with the same header: label in cols 1–3, title in cols 4–12, hairline above (`SectionHead.astro`).
6. **Numbers in mono, muted** (`.num`). Hairline rows instead of boxes.
7. **Motion:** hero lines rise once on load; sections fade up once; the work wall is the only continuous effect.

### Copy rule
Write headlines **natively in each language**; never translate one word-for-word from the other.
Hero: EN "Your business, *online.*" · HI "आपका बिज़नेस, *अब ऑनलाइन।*"

## 3. Sitemap and routes (Bible `03-architecture/03`)

```text
/                      Home (EN)
/work/<slug>/          Project story (EN) × 4
/hi/                   Home (HI)
/hi/work/<slug>/       Project story (HI) × 4
/404                   Not found
/sitemap-index.xml, /robots.txt
```
No `/work` index page: the home page *is* the index (4 projects). No `/contact` page: contact is
the last home section. v1 `/admin` is out of scope for v2 (static site, no backend).

**Home section order:** Hero → Work (signature wall) → Services → "Run it from your phone" → Simple terms + Process → Contact.

## 4. Signature interactions (Bible "design restraint")

### S1. Hero — headline + live-project showcase
- **Layout:** serif headline in cols 1–6; cols 7–12 hold a browser frame with a phone frame
  overlapping it, showing a real live client site (desktop + mobile captures). Caption below:
  "Now showing — {name} · {kind}" linking to the case study. Bottom row: description left, CTAs right.
- **Why:** the first screen must show proof, not only a promise (owner review 2026-11-27: the
  text-only hero left the right half empty). Only `status: 'live'` projects appear.
- **Behaviour:** cycles every 5 s; the progress bar's CSS animation drives the timing. Pauses on
  hover, keyboard focus, offscreen and hidden tab; a pause/play button satisfies WCAG 2.2.2.
  Only the active and next slides render, so later images load just in time.
- **Reduced motion:** no autoplay; the buttons still switch projects. **No JS:** first project shown.
- **Mobile:** headline, then showcase full width, then description and CTAs.
- **[Decision 2026-11-27, owner]** The earlier pointer "lens" effect was removed (it confused
  visitors). Do not add cursor effects to the hero.
- **Screenshots:** `npm run shots` closes/removes popups before capturing (a newsletter modal
  on Mudkraft was caught in one capture). Mobile captures are 2×.

### S2. Work wall — cylindrical CSS 3D gallery
Implements the Bible's case study (`04-visual-media/case-study-cylindrical-portfolio-wall.md`)
with an original implementation.
- **Baseline (no JS, reduced motion):** semantic `<article>` per project in a 2-column grid with
  real `<a>` links, `<img>` with alt text.
- **Desktop (`min-width: 901px` and `min-height: 600px`, motion allowed):** sticky stage; project
  screenshots are cut into 14 vertical slices placed on a virtual cylinder; native scroll rotates it,
  with rest periods on each project (smoothstep), and rAF interpolation that stops when converged.
  Visual layer is `aria-hidden`; captions + links stay in the semantic track. Clicking the front
  panel opens the project; a project switcher (buttons, `aria-pressed`) jumps to each.
- **Touch / narrow:** native horizontal scroll-snap track; distance-from-centre drives a curved
  `rotateY` for each card.
- **Cleanup:** IntersectionObserver gates the loop; mode re-evaluated with `matchMedia` change.

### S3. "Run it from your phone" — sticky phone
- **What:** a phone frame stays sticky while 4 short steps scroll past: *New order → Change a price →
  Mark delivered → UPI lands in your bank*. The phone screen (built in HTML/CSS, not an image)
  switches to match the step in view.
- **Baseline:** the 4 steps are real text in the document; phone shows step 1. No JS → still readable.
- **Reduced motion:** screens switch without crossfade.
- **Mobile:** phone sits above the steps, sticky at the top at reduced size.

### Section improvements (2026-11-27, owner: "improve the rest of the page the same way")
- **Work wall** uses a second, deeper capture of each site (`<slug>-detail.png`, e.g. Mudkraft's
  shop grid) so it never repeats the hero. Each detail image has its own alt text.
- **Services** rows link to the real projects that used each service ("Seen in …"). On desktop
  (fine pointer, motion allowed) a small screenshot of the lead project follows the pointer;
  the links carry the same information for everyone else.
- **Phone** is a believable admin app (stats, order list, tab bar). The four steps change its
  state: new-order banner → price-edit sheet → "Delivered" + WhatsApp sent → UPI received with
  revenue rising. Driven by one `data-screen` attribute; CSS does the rest.
- **Process** steps each get one line of explanation; spacing before Contact tightened.

### Supporting (not signature)
- Section reveals with IntersectionObserver (opacity + 24px translate), off for reduced motion.
- **Language switch:** a real link to the other-language URL (works without JS); `hreflang` alternates.
- **WhatsApp composer:** pick a need chip (Store / Bookings / SaaS / Automation / Website) + optional
  name → builds a `wa.me` link and a `mailto:` link. No server, no data stored.

## 5. Content model (typed, in `src/content/`)

```ts
type Locale = 'en' | 'hi';
type L10n = Record<Locale, string>;

type Project = {
  id: string; slug: string; order: number; year: number;
  name: string;                 // brand name, not translated
  kind: L10n;                   // "Online store"
  tagline: L10n;                // one line
  summary: L10n;                // 1–2 sentences
  problem: L10n; build: L10n;
  delivered: L10n[];
  stack: string[];
  metrics: { value: string; label: L10n; verified: boolean }[];
  liveUrl: string;
  cover: ImageMetadata;         // desktop screenshot (astro:assets)
  coverMobile: ImageMetadata;   // mobile screenshot
  coverAlt: L10n;
};
```
Site strings live in `src/content/site.ts` as `L10n` records. Components receive `locale` and pick strings.

## 6. Stack and decisions (ADRs)

| # | Decision | Alternatives | Why |
|---|---|---|---|
| ADR-001 | **Astro 6 static output** + TypeScript | Next.js (v1), Vite + vanilla TS, React SPA | Content site, 10 static pages, 2 locales. Astro ships 0 JS by default; feature scripts stay small vanilla TS modules. Built-in image pipeline (sharp) and i18n routing. Astro 7 needs Node ≥ 22.23; machine has 22.16. |
| ADR-002 | **Plain CSS** with custom-property tokens, component-scoped `<style>` | Tailwind | Bible default; small surface; no extra tooling. |
| ADR-003 | **CSS 3D** for the work wall | WebGL/Three.js, static grid only | 4 flat panels on a curve — CSS 3D is sufficient (Bible decision rule). |
| ADR-004 | **No hero video** | stock footage | No licensed footage exists; typographic hero is the LCP and the signature. |
| ADR-005 | **Local typed data**, no CMS | headless CMS | 4 projects, one editor (the studio). Revisit if projects > 12. |
| ADR-006 | **No analytics in v2** | Plausible / GA | No consent banner needed. **[Open]** add privacy-friendly analytics later? |
| ADR-007 | Screenshots captured from the **live client sites** with headless Chrome | design mockups | Real proof. **[Assumption]** clients are OK with screenshots on the studio site. |
| ADR-008 | **Vitest** for pure modules (geometry, i18n, WhatsApp link) + **Playwright** smoke tests | none | Bible `08-testing`. |

**Hosting [Assumption]:** any static host (Vercel / Netlify / Cloudflare Pages) on `devlabs.studio`.

## 7. Budgets and acceptance (Bible `06`, `07`)

- LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 (lab, throttled mobile).
- Initial JS (home) ≤ 25 KB gzip. CSS ≤ 25 KB gzip. Fonts: ≤ 3 files on first paint.
- Above-the-fold images: 0 (hero is type). Work screenshots lazy, served as AVIF/WebP via `srcset`.
- Every project reachable by keyboard without the 3D wall. Visible focus everywhere.
- Reduced motion: wall → static grid, no reveals.
- No console errors, no failed requests, no hover-only content.
- Contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text.

## 8. Milestones

0. Brief + ADRs (this file) ✅
1. Astro scaffold, tokens, fonts, layout, i18n, content model, static home + project pages
2. Screenshots + image pipeline
3. S2 work wall (static → swipe → drum)
4. S3 phone, reveals (S1 lens built, then removed per owner)
5. Contact composer, SEO (meta, OG, hreflang, sitemap), 404
6. Tests, build, browser QA (desktop / mobile / reduced motion / no JS), performance check

Progress, verification results and known gaps are tracked in `site/README.md`.

## 9. Open questions for the owner
1. Are the v1 metrics real and OK to publish? (currently shown, flagged `verified: false` in data)
2. Is `devbrostudio12@gmail.com` still the right email, or should it be `hello@devlabs.studio`?
3. Native Hindi review of all `hi` strings.
4. Do clients approve screenshots of their sites? Any logos/testimonials to add?
5. Should the v1 `/admin` panel (editing projects from a phone) come back in v2? It needs a backend.
6. Hosting choice and who owns the `devlabs.studio` DNS.
