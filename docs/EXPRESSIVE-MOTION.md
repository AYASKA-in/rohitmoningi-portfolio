# Expressive motion refinement

This pass builds on the existing cinematic design with distinct behavior for each surface. It adds no controls, introductory gates or animation dependencies.

- **Project posters:** artwork settles from a slower zoom while the title and captions arrive in sequence. A delegated controller adds a maximum three-degree fine-pointer tilt and a moving, translucent light reflection. Only one poster can be active. Keyboard, scroll, pointer leave, tab visibility, preference changes and preview opening clear the interaction.
- **Research feature:** the visual moves by at most 18 px in response to native scroll. It stops receiving animation frames while offscreen and is static in reduced-motion and forced-color modes.
- **Navigation:** a shared marker glides between top-level pages. Work stays active on individual project stories. It follows reduced-motion preferences.
- **Project previews:** entry direction and origin are derived from the selected card when available. The dialog settles from 94% scale with a capped position offset; artwork and summary have their own entrance. Exit remains short, then returns focus and route history. Native dialog semantics and scroll lock are retained.
- **Inner pages:** introduction elements arrive in sequence rather than shifting the entire page subtree. Repeating nested reveal motion is avoided.

Timing and limits are centralized in `lib/motion-tokens.ts`. All content stays readable in server HTML; there is no CSS-hidden pre-animation state. Shared-layout animation is restricted to the small navigation marker. Fine-pointer depth uses transforms and a static gradient layer instead of animating layout dimensions or repainting the gradient on every frame.

Validation covers poster click-through/focus, native editorial scrolling, current navigation on nested routes, touch and reduced-motion behavior, existing modal/history/resume/contact journeys, responsive layouts, server HTML and SEO metadata. Local performance observations are recorded separately from production field metrics.

Implementation references: [Motion shared layout documentation](https://motion.dev/docs/react-layout-animations) and [web.dev animation performance guidance](https://web.dev/articles/animations-guide).
