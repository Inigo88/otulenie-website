# Bug B008: Modal Layout and Header Continuity

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P0 (Visual Polish / Layout)
**Found in**: Feature 1.2.2 (Full Mobile Navigation Modal)
**Date Created**: 2026-03-12
**Date Resolved**: 2026-03-12

## Description
The mobile navigation modal suffered from several layout issues:
1. Content was centered vertically, wasting space at the top.
2. The Navbar's "island" background and border remained visible over the modal when the page was scrolled down.
3. CSS transitions were fighting GSAP animations for control over transparency.

## Steps to Reproduce
1. Scroll down on a mobile screen.
2. Open the mobile menu.
3. Notice the island border cutting through the modal header area.

## Expected Behavior
The mobile modal should be a clean, full-screen (or near full-screen) overlay that starts from the top. The Navbar container should be completely transparent and borderless when the modal is active.

## Actual Behavior
The "Island" shape of the navbar was visible as a ghost-like container over the modal links.

## Technical Root Cause
- The `Navbar` container z-index (70) was higher than the modal (60).
- GSAP's `backgroundColor` and `borderColor` animations were overriding the conditional Tailwind classes used for menu-open states.

## Proposed Fix
Neutralize the Navbar container styles (background, border, shadow) within the GSAP animation block when `isMenuOpen` is true.

### Detailed Task List
- [x] [T001] [Implementation]: Update GSAP `to()` block in `Navbar.jsx` to force transparency on `isMenuOpen`.
- [x] [T002] [Implementation]: Align `MobileMenu` content to `top`.
- [x] [T003] [Verification]: Verify no border artifacts on open menu.

## Resolution
Orchestrated the GSAP background morph to favor transparency whenever the menu is open, and moved modal content alignment to `items-start`.

## Verification
- [x] [Visual]: No Navbar island border or shadow is visible when menu is open.
- [x] [Visual]: Modal content is naturally positioned near the top.
- [x] [Technical]: Build passes.
