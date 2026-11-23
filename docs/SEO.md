# SEO implementation and release notes

## Search intent

| Page | Primary topic | Visitor's next step |
| --- | --- | --- |
| `/` | Rohit Moningi, full-stack software engineer in Bengaluru | Explore work or contact |
| `/projects` | Full-stack projects, business software and AI research | Open a case study |
| `/about` | Rohit's engineering experience, skills and education | Read resume or inspect project proof |
| `/contact` | Contact Rohit for engineering roles and product projects | Email or open a professional profile |
| `/projects/[slug]` | The individual project's actual subject and implementation | Read the story, source or available demo |

These topics follow the supplied resume and actual project content. They are not search-volume estimates or ranking promises. No paid keyword dataset was used.

## Implemented

- Centralized search and social metadata in `lib/seo.ts`: unique titles/descriptions, absolute canonical URLs, Open Graph and Twitter fields for all 17 public pages.
- Separate generated social images for Home, Work, About, Contact and all 13 case studies. Preview routes are not listed as duplicate public pages.
- A linked Person/WebSite graph, a ProfilePage for About, CollectionPage/ItemList for Work, ContactPage, and WebPage/CreativeWork entities for project stories. Entities refer to the same person ID.
- Visible breadcrumbs with matching BreadcrumbList JSON-LD. Full case studies use the actual project name as their H1; the cinematic cover title is decorative page copy.
- HTML anchors expose every project before client JavaScript runs. Existing project slugs, canonical sitemap and permissive robots rules are retained.
- Unknown projects and unknown pages return 404 with noindex. No fictitious ratings, prices, business addresses, publication dates or freshness timestamps were added.
- JSON-LD escapes less-than characters to keep future content out of script markup.
- Optional Search Console HTML verification via `GOOGLE_SITE_VERIFICATION`; no verification tag is rendered unless a real token is configured.
- The 23 November career edit is represented as an upcoming Bosch Software Engineer role starting 5 January 2027 in visible content and About metadata. It is not an asserted current employer in schema. Home/About sitemap modification dates reflect this actual edit.

## Validation

Run the production server, then `npm run audit:seo`. It checks actual HTTP HTML and image responses for all 17 pages, including unique titles/descriptions, self-canonicals, social metadata, one H1, linked entities, breadcrumb order, crawlable project links, sitemap coverage and 404/noindex behavior. Results default to `test-results/seo-audit.json`; pass a file path to save them elsewhere.

`npm run test:e2e` covers navigation, previews, mobile layouts, zoom, failure states and the homepage cursor. The cursor uses no animation library, stops drawing after idle, preserves the native pointer and does not allocate its canvas on touch/reduced-motion displays.

Automated validation checks document structure and HTTP behavior. It does not prove Google has indexed a page or that a rich result will be shown.

## Deployment-dependent steps

1. Deploy the reviewed source. Inspect the new production HTML and social images; the current live domain still serves the previous release.
2. In the owner's Search Console property, use existing domain verification or set the real `GOOGLE_SITE_VERIFICATION` token for URL-prefix verification. Submit `https://www.rohitmoningi.in/sitemap.xml` and inspect the home, About, catalogue and representative project URLs. No token, account changes or submissions were made in this task.
3. Check Rich Results Test on the deployed pages, then monitor Search Console indexing and Core Web Vitals. Real-user LCP/INP/CLS need production traffic; local observations are not field measurements.

Read-only domain checks on 18 November 2026: HTTP apex redirects 308 to HTTPS apex, which redirects 308 to HTTPS `www`; the final homepage returns 200. This matches the canonical origin. Hosting configuration was not changed.

## Primary references

- Descriptive, distinct titles follow [Google's title-link guidance](https://developers.google.com/search/docs/appearance/title-link).
- Canonicals and the sitemap use the same preferred origin, following [Google's canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
- Breadcrumb structure follows [Google's BreadcrumbList documentation](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb).
- The About page represents the owner of this site, matching the focus described in [Google's ProfilePage guidance](https://developers.google.com/search/docs/appearance/structured-data/profile-page).
- Metadata is generated on the server using the [Next.js 15 Metadata API](https://nextjs.org/docs/15/app/api-reference/functions/generate-metadata).
