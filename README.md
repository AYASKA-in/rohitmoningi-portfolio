# Rohit Moningi — portfolio

A cinematic Next.js portfolio with curated project collections, searchable work, accessible project previews, full case studies, and direct hiring/client contact paths.

## Local development

Use Node.js 24 LTS and npm. Run `npm ci`, then `npm run dev`. The default address is `http://localhost:3000`.

## Validation

- `npm run typecheck`
- `npm run lint`
- `npm run validate:content`
- `npm run build`
- `npm run audit:seo` (requires the running server; validates the actual HTML, schema, social images and crawler endpoints for all 17 pages)
- `npm run test:e2e` (requires a production server at `http://localhost:3000`, or `BASE_URL`; install Chromium with `npx playwright install chromium`, or set `CHROME_PATH` to a local Chromium executable)

## Content and assets

- `lib/content.ts`: the 13 project stories, status labels and links.
- `lib/site.ts`: identity, experience, capabilities and contact details.
- `public/resume.pdf`: supplied resume, served at a stable URL.
- `public/images`: local WebP media. `docs/ASSETS.md` records provenance.
- `docs/EDITORIAL.md`: unresolved claims and publication notes.
- `lib/seo.ts` and `docs/SEO.md`: page metadata, structured data and deployment-dependent search checks.

The homepage has a decorative crimson cursor trail for mouse users. It preserves the native pointer, fades when idle and stops for keyboard input, other routes, project previews, reduced motion and touch devices.

Site-wide hero, section and route entrances, preview entry/exit and interaction feedback share motion tokens. Content remains server-rendered and readable before animation. See `docs/MOTION.md` for the animation design and the upcoming Bosch role dated 5 January 2027.

Existing project slugs remain available. Navigation from the catalogue opens a native dialog through intercepted routes; direct navigation and refresh show the complete case study. Dialogs support Escape, focus containment and return, and back/forward navigation.

There is no contact form backend, tracking integration, account system or database. Contact actions open the visitor's email client. Copy-email failure leaves the address selectable.

The existing Vercel deployment model is retained. This branch is a reviewable redesign; deploying the production domain is separate from local development.
