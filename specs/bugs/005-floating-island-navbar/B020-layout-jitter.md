# Bug B020: Layout Jitter on Scroll Transition

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P2 (UX Quality)
**Found in**: Feature 1.2.1 (Floating Island Navbar)
**Date Created**: 2026-03-11
**Date Resolved**: 2026-03-11

## Description
The navbar was changing its horizontal width and padding during the scroll transition between Hero and Island states. This caused content alignment shifts and a horizontal "jitter" effect that felt unpolished and distracting.

## Steps to Reproduce
1. Scroll down slowly from the top.
2. Watch the left and right edges of the Navbar island.
3. Observe the width shrinking/expanding abruptly.

## Expected Behavior
The transition between Hero and Island states should be perfectly smooth, with no horizontal layout shifts.

## Actual Behavior
The Navbar width snapped between a wider and narrower state.

## Technical Root Cause
The requirement for the "Island" state to be a more compact pill-shaped container conflicted with the seamless scroll experience. Animating `maxWidth` and `padding` via GSAP on scroll created layout recalculations.

## Proposed Fix
Unify the navbar dimensions across both states and rely purely on aesthetic transitions (background-color, blur, border-radius) for the "morph" effect.

### Detailed Task List
- [x] [T001] [Implementation]: Standardize `maxWidth` in `Navbar.jsx`.
- [x] [T002] [Cleanup]: Remove width/padding animation from GSAP timeline.
- [x] [T003] [Verification]: Visual check of scroll stability.

## Resolution
Unified the navbar dimensions across both states. The navbar now maintains a consistent `max-w-(--navbar-max-width)` and padding logic.

## Verification
- [x] [Functional]: Navbar stays horizontally stable during scroll.
- [x] [Visual]: Aesthetic properties (blur, background tint) transition smoothly.
- [x] [Technical]: No layout shifts (CLS) observed.
