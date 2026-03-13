# Bug B025: Navbar Transition Sequencing

**Feature**: 1.2.3 Hero Section
**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved

## Resolution
Implemented a staggered transition logic in `Navbar.jsx`.
- Introduced `delayedIsHero` state which lags behind the `isHero` prop by 200ms using `setTimeout`.
- Background, border, and backdrop filter (controlled by GSAP) react immediately to the `isHero` change.
- Text and Icon colors react to `delayedIsHero`.
- Result: Background morphs/colors first, text follows. Verified visually in the browser.
