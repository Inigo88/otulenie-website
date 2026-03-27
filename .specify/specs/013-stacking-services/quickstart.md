# Quickstart: Sticky Stacking Archive

### Overview
The Stacking Archive feature introduces a 3-card scroll-linked element conveying the brand's core values. It utilizes CSS `position: sticky` and GSAP `ScrollTrigger` mapped to a parent container to animate card scaling and brightness.

### Key Files
- `src/App.jsx`: Contains the implementations for the `StackingArchive` section and the individual `StackingCard` components.
- `specs/013-stacking-services/copy.md`: Source of truth for the protocol copy and text.

### Testing the Component (Manual)
1. Run the local development server: `npm run dev`
2. Open the application in a browser (desktop and a 390px mobile viewport).
3. Scroll down to the new section.
4. Verify that:
   - The first card pins correctly at the top of the viewport.
   - As you scroll further, the next card slides up to overlap the previous.
   - The covered card scales down slightly (e.g., to `0.95`) and darkens (e.g., `brightness(0.6)`).
5. Emulate `prefers-reduced-motion: reduce` in browser DevTools to ensure the fallback layout (standard vertical layout without pinning/scaling) activates correctly.
