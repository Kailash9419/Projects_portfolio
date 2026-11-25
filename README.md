# DevLabs — Studio Portfolio

The website for **DevLabs Software Studio** (Haldwani, Uttarakhand): a portfolio of live client work, services for small businesses, and an inquiry flow that reaches the team by email or WhatsApp. The site is bilingual (English / हिन्दी), and an admin panel lets the studio add and edit projects without a redeploy.

## Features

- **Project showcase:** cover and screenshots, problem and solution, features, results and tech stack for each project, with a dedicated case-study page at `/work/[slug]`
- **Browse:** filter, search and sort on `/work`
- **Admin panel** at `/admin`: password-protected create, edit, delete and feature toggling, plus image uploads
- **Inquiry form:** leads are emailed to the studio through [Resend](https://resend.com), with a one-tap WhatsApp fallback
- **SEO:** per-page metadata, a generated Open Graph image, `sitemap.xml`, `robots.txt` and LocalBusiness JSON-LD
- **Accessibility:** respects `prefers-reduced-motion`, and the layout is responsive

## Tech stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 3, Framer Motion, Vercel Blob, and Resend.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then set ADMIN_PASSWORD at minimum
npm run dev                  # http://localhost:3000
```

In local development, projects are stored in `src/data/projects.json` and uploads in `public/uploads/`. No cloud services are needed.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run the TypeScript check |

## Environment variables

See [`.env.example`](.env.example) for the full list with notes.

| Variable | Required | Purpose |
| --- | --- | --- |
| `ADMIN_PASSWORD` | for admin | Admin login password. Admin is disabled if unset. |
| `ADMIN_SESSION_SECRET` | in production | 32+ character secret that signs admin session cookies |
| `BLOB_READ_WRITE_TOKEN` | in production | Vercel Blob token, which stores projects and uploaded images |
| `RESEND_API_KEY` | for contact form | Sends inquiry emails |
| `CONTACT_TO_EMAIL` | optional | Inbox for inquiries. Defaults to the studio email. |
| `CONTACT_FROM_EMAIL` | recommended | Verified sender address on your Resend domain |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical site URL, used for the sitemap and Open Graph |

## Deploying to Vercel

1. Import the repository into Vercel. The framework preset is detected automatically.
2. **Storage → Create → Blob**, then connect it to the project. This adds `BLOB_READ_WRITE_TOKEN`.
3. Add `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` and `NEXT_PUBLIC_SITE_URL` under **Settings → Environment Variables**.
4. In Resend, verify your sending domain so `CONTACT_FROM_EMAIL` can deliver to any inbox.
5. Deploy.

On the first deploy, the site serves the projects bundled in `src/data/projects.json`. The first save from `/admin` copies the full list into Blob storage, and from then on Blob is the source of truth. Public pages are cached and refreshed right after every admin change.

## Managing projects

Go to `/admin` and sign in with `ADMIN_PASSWORD`. From there you can:

- **Add or edit** a project. Title, tagline and category are required, and the slug is generated from the title if you leave it empty.
- **Upload** a cover and screenshots in PNG, JPEG, WebP, GIF or AVIF format, up to 4 MB each. SVG uploads are blocked for security.
- **Feature** a project to show it in "Selected Work" on the home page.

Studio details such as name, phone numbers, email, social links, stats and SEO keywords live in [`src/data/brand.ts`](src/data/brand.ts). UI copy in both languages is in [`src/data/translations.ts`](src/data/translations.ts).

## Project structure

```text
src/
├── app/
│   ├── page.tsx               # Home
│   ├── work/                  # Project list + case-study pages
│   ├── admin/                 # Admin panel (client)
│   ├── api/
│   │   ├── admin/auth/        # Login / logout / status
│   │   ├── projects/          # Project CRUD (admin-only writes)
│   │   ├── upload/            # Image uploads (admin-only)
│   │   └── contact/           # Inquiry → email
│   ├── opengraph-image.tsx    # Generated social preview
│   ├── sitemap.ts / robots.ts
├── components/                # hero, layout, projects, sections, ui, admin
├── context/LanguageContext.tsx
├── data/                      # brand.ts, translations.ts, projects.json (seed)
├── lib/
│   ├── projects.ts            # Cached reads for public pages
│   └── server/                # auth, storage, API helpers
└── types/project.ts
```
