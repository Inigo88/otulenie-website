# Bug B025: Navbar Transition Sequencing

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P2 (Animation Finesse)
**Found in**: Feature 1.2.3 (Hero Section)
**Date Created**: 2026-03-13
**Date Resolved**: 2026-03-13

## Description
When the Navbar transitions between its "Hero" (transparent) and "Island" (sand-glass) states, the background morph and font color shift happen simultaneously. For a more premium, organic feel, the background color transformation should start first, with the text color following slightly after.

## Steps to Reproduce
1. Scroll down from the Hero section.
2. Observe the background and text color changing at the exact same moment.

## Expected Behavior
1. Background color/border begins transition first.
2. Text/Icon color follows with a slight delay (staggered).

## Actual Behavior
Both transitions were synchronized, making the change feel "sharp" rather than layered.

## Technical Root Cause
The `containerRef` was using GSAP for background/border animations, while text colors relied on individual `transition-colors` classes. Both were triggered simultaneously by the `isHero` prop change.

## Proposed Fix
Introduce a staggered delay for the text color transition in `Navbar.jsx` using a `delayedIsHero` state.

### Detailed Task List
- [x] [T001] [Implementation]: Introduce `delayedIsHero` state with `useEffect` and `setTimeout`.
- [x] [T002] [Implementation]: Update text colors to use `delayedIsHero`.
- [x] [T003] [Verification]: Visual check of staggered effect.

## Resolution
Implemented a staggered transition logic in `Navbar.jsx`.
- Introduced `delayedIsHero` state which lags behind the `isHero` prop by 200ms.
- Background, border, and backdrop filter (controlled by GSAP) react immediately.
- Text and Icon colors react to `delayedIsHero`.

## Verification
- [x] [Visual]: Background morphs before text color shifts.
- [x] [Visual]: Interaction feels more organic and high-fidelity.
- [x] [Technical]: Build passes and no impact on scrolling performance.
