# Bug B016: GSAP Animations Ignore prefers-reduced-motion

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P1 (Accessibility / WCAG)
**Found in**: Feature 1.1.1 (Global Design System)
**Date Created**: 2026-03-10
**Date Resolved**: 2026-03-10

## Description
Several GSAP animations (header entrance, navbar morph) were ignoring the system's `prefers-reduced-motion` setting. This can cause vestibular issues or discomfort for users who have explicitly requested reduced movement.

## Steps to Reproduce
1. Enable "Reduce Motion" in OS settings.
2. Refresh the site.
3. Observe the header sliding/fading in.

## Expected Behavior
Animations should be either disabled or significantly slowed/simplified when `prefers-reduced-motion` is active.

## Actual Behavior
Full animations were playing regardless of OS settings.

## Technical Root Cause
The GSAP triggers were not checking the `window.matchMedia` state before execution.

## Proposed Fix
Implement a global check for reduced motion and conditional logic within `useGSAP` hooks to adjust durations to 0.

### Detailed Task List
- [x] [T001] [Implementation]: Add `reducedMotion` state to `Navbar.jsx`.
- [x] [T002] [Implementation]: Update `App.jsx` landing animation to check media query.
- [x] [T003] [Verification]: Verify with browser emulation.

## Resolution
- Header entrance animation is now skipped when reduced motion is preferred.
- Navbar morph duration is set to `0`, applying styles instantly.

## Verification
- [x] [Accessibility]: Animations are disabled when `reduce` is active.
- [x] [Functional]: Instant state switching works correctly in the Navbar.
- [x] [Technical]: Build passes.
