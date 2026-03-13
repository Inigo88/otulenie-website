# Bug B010: Navbar Border Definition in Hero State

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P2 (Visual Enhancement)
**Found in**: Feature 1.2.3 (Hero Section)
**Date Created**: 2026-03-13
**Date Resolved**: 2026-03-13

## Description
The Navbar island lacked a defining border when at the top of the page (Hero state). While functional, the transition to the "Island" state (which has a border) felt inconsistent, and the element lacked visual structure against the dark background.

## Steps to Reproduce
1. Load the page and stay at the Hero section.
2. Observe the edge of the Navbar island.
3. Scroll down and notice the border appearing only after the transition.

## Expected Behavior
The Navbar should maintain its "Island" shape definition across both states, using a subtle linen border in the Hero state to match the light-on-dark palette.

## Actual Behavior
The border was completely transparent in the Hero state, making the navbar feel "rootless" before scrolling.

## Technical Root Cause
The GSAP timeline in `Navbar.jsx` was explicitly setting `borderColor` to transparent (`rgba(58, 77, 57, 0)`) when `isHero` was true.

## Proposed Fix
Update the GSAP timeline in `Navbar.jsx` to apply a subtle linen border (`rgba(253, 250, 240, 0.15)`) specifically for the Hero state.

### Detailed Task List
- [x] [T001] [Implementation]: Modify GSAP `borderColor` value in `Navbar.jsx`.
- [x] [T002] [Verification]: Compare Hero vs Island border definition.

## Resolution
Updated the GSAP timeline in `Navbar.jsx` to apply a subtle linen border (`rgba(253, 250, 240, 0.15)`) specifically for the Hero state.

## Verification
- [x] [Visual]: Navbar island is clearly defined against the dark Hero background.
- [x] [Technical]: Transition between Hero border and Island border is smooth.
- [x] [Technical]: Build passes.
