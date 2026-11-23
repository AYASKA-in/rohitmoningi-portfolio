# Motion continuity update

Researched and implemented 24 November 2026. The direction remains cinematic black/crimson, with equal paths for hiring teams and clients.

## Decisions

| Surface | Previous behavior | Updated behavior and purpose |
| --- | --- | --- |
| Work catalogue | Filtering replaced the grid immediately. | Visible surviving posters move to their new positions; removed cards leave immediately. Newly included cards settle in, and the active filter highlight travels between buttons. This preserves orientation during filtering. |
| Mobile navigation | Panel appeared with a basic entrance and closed instantly; menu/close icons swapped. | Panel fades/slides in and out, links arrive in a short sequence, and two icon strokes rotate into a close mark. Hidden navigation is inert immediately. Rapid reversal and Escape retain ordinary button semantics. |
| Preview → full story | Normal document navigation abruptly replaced the preview. | Supported browsers carry uniquely named project artwork into the full case study using cross-document View Transitions. The header remains a separate visual layer. Native links, history and unsupported-browser navigation continue normally. |
| Homepage hero | Artwork responded to a fine pointer. | A separate desktop layer moves up to 48 px and scales up to 1.045 as the hero leaves the viewport. A native view timeline controls it; the existing pointer response remains independent. Touch receives the static scroll treatment. |

Catalogue reflow uses a small FLIP controller and the browser's Web Animations API. The existing `motion/react` package continues to handle the established entrances and preview animations. No new runtime dependency, video background, loader, scroll replacement, synthetic metric, or user-facing control was introduced. All original content, contact targets, resume bytes and crawlable project URLs remain available.

## Accessibility and runtime boundaries

- Server rendering starts with visible content. A server-safe preference snapshot and interaction-only animation preserve it during hydration.
- Reduced motion and forced colors disable catalogue transforms, native document transitions, hero scroll depth, menu staging and icon animation. Preference changes during rearrangement are covered by browser checks.
- Removed cards leave the DOM immediately. Search/filter controls update immediately; no debounce waits for animation. Reflow captures the current visible positions before a state update, cancels interrupted work, then animates only transform/opacity toward the new positions. Offscreen cards do not receive reflow animations.
- Mobile closing uses progressive CSS discrete-display transitions. Browsers without that feature close normally. The closed menu is hidden and inert, including during its visual departure.
- Cross-document transitions use same-origin, browser-managed snapshots, not a route-interception workaround. Browser support determines whether the enhancement plays; document navigation remains the fallback.
- Hero depth has no JavaScript scroll listener or perpetual animation loop. It is enabled only on desktop with compatible animation timelines and ordinary motion/color preferences.

## Primary research

1. [Motion: layout animation](https://motion.dev/docs/react-layout-animations) — FLIP positioning, layout grouping and shared selection highlights.
2. [Motion: AnimatePresence](https://motion.dev/docs/react-animate-presence) — researched keyed exits and immediate layout reflow. The final catalogue uses native FLIP instead: its layout-feature prototype increased initial route JavaScript, while immediate removal also keeps result targets unambiguous during rapid typing.
3. [Motion: accessibility](https://motion.dev/docs/react-accessibility) — respect reduced motion, including layout transforms.
4. [Chrome: cross-document View Transitions](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document) — same-origin navigation, CSS opt-in and uniquely named snapshot elements.
5. [Chrome: scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations) — native view timelines and bounded scroll-linked transforms.
6. [web.dev: high-performance CSS animations](https://web.dev/articles/animations-guide) — prioritize transform/opacity and avoid unnecessary persistent layer hints.

These sources support the selected techniques; they do not establish a measured ranking of design trends. Deliberately excluded: cursor replacement, magnetic click targets, auto-running marquees, WebGL scenes and repeated text scrambling. The portfolio already has a distinctive cursor trail and artwork response; this pass improves continuity at actual navigation and filtering boundaries.

## Verification

The five new browser journeys cover rapid filter/search changes and preview focus return, reduced motion during reflow, interrupted touch-menu opening and Escape, a real native preview-to-story transition, and bounded hero depth. The broader suite also covers existing contact/resume behavior, failures and empty states, history, no-JavaScript content and responsive layout. Release observations and media are stored in the workspace `outputs/` directory.
