# Motion and career update — 23 November 2026

## Career content

Rohit's supplied appointment letter establishes the Software Engineer title and Bosch Global Software Technologies, Bengaluru. Rohit supplied the start date of 5 January 2027. Home and About show the role as upcoming. The apprenticeship remains a separate entry without an invented end date. No compensation, grade, private correspondence or offer-letter PDF is shipped in the public site.

The downloadable resume has been replaced with the latest Software Engineer resume supplied in the subsequent visual-refinement request. The upcoming career entry remains in the site's timeline and About text.

## Motion direction

The site uses one timing scale: fast 180 ms, normal 350 ms, slow 600 ms; 65 ms stagger and a smooth easing curve. Values are shared in `lib/motion-tokens.ts`. The Motion library coordinates the site-wide entrances and the native dialog's entry/exit. Its browser animation support avoids React updates per frame.

- Hero artwork settles from a small scale change. Identity and actions arrive in sequence, remaining readable throughout.
- Page navigation gets a short top-edge light sweep and a small content settling movement.
- Project collections, research, career rows, contact options and case-study sections reveal once as they enter view. Search results registered later also receive the same treatment.
- Project previews enter and exit before route closure; native modal focus containment, Escape, scroll lock and browser history remain in control.
- Cards, action arrows, navigation and contact choices have restrained hover/press feedback.
- The existing mouse light trail remains a homepage-only enhancement.

All source content renders normally on the server and remains visible without JavaScript. Reveals begin from readable opacity, never an invisible page waiting for scrolling. Off-screen elements are not animated in a permanent loop. Animations affect transform/opacity rather than layout dimensions. Turning on reduced motion cancels running entrances and prevents new ones. The mouse effect also stops for touch and forced-color modes.

## SEO

About search/social descriptions explicitly state that the role is upcoming and begins 5 January 2027. Schema retains the existing general professional title and does not assert the future employer as a current role. Home/About sitemap modification dates reflect the actual content edit, 23 November 2026. Existing URLs, canonical tags, project schema and social images remain covered by the 17-page raw-HTML audit.

## Visual refinement

The homepage now uses an opening-title sequence by name line and a fine-pointer depth response on the original hero artwork. The depth response stops when settled, offscreen, in another tab or in a project preview. Touch, reduced motion and forced colors disable it. Redundant down-scroll and circular project-card arrows, the decorative side counter, repeat hero branding and the duplicate audience strip were removed. Carousel controls are hidden when the collection fits in its viewport.

Contact blocks retain the supplied titles and descriptions. Their complete surface is a standard mailto anchor. The browser tests intercept activation to verify recipient/subjects and keyboard/title/body hit targets without launching an external program or sending email. An installed mail app or configured browser mail handler controls the final composer handoff.

## References

- The shared timing and once-only reveals follow the installed motion-foundations and motion-patterns guidance.
- Transform/opacity choices follow [web.dev's animation performance guidance](https://web.dev/articles/animations-guide).
- Animation controls use the [Motion animate API](https://motion.dev/docs/animate).
- Structured data is kept consistent with visible career text, following [Google's structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
