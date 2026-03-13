# Bug B010: Navbar Border Definition in Hero State

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P2 (Visual Enhancement)
**Found in**: Feature 1.2.3 (Hero Section)

## Description
The Navbar island lacked a defining border when at the top of the page (Hero state). While functional, the transition to the "Island" state (which has a border) felt inconsistent, and the element lacked visual structure against the dark background.

## Expected Behavior
The Navbar should maintain its "Island" shape definition across both states, using a subtle linen border in the Hero state to match the light-on-dark palette.

## Technical Root Cause
The GSAP timeline in `Navbar.jsx` was explicitly setting `borderColor` to transparent (`rgba(58, 77, 57, 0)`) when `isHero` was true.

## Resolution
Updated the GSAP timeline in `Navbar.jsx` to apply a subtle linen border (`rgba(253, 250, 240, 0.15)`) specifically for the Hero state.
- Verified via browser screenshots `hero_navbar_border_check` and `island_navbar_border_check`.
