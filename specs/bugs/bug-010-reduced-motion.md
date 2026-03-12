# Bug Report: GSAP Animations Ignore prefers-reduced-motion

## Status
Fixed

## Severity
Medium (Accessibility / WCAG 2.2 AA — SC 2.3.3 Animation from Interactions)

## Description
Two GSAP animations did not check `prefers-reduced-motion`: the header entrance fade-up in `App.jsx` and the navbar morph transition in `Navbar.jsx`. Users who request reduced motion still experienced animated transitions.

## Root Cause
Only `MagneticButton.jsx` implemented the `prefers-reduced-motion` check. The other GSAP usages were not wrapped in the same guard.

## Resolution
- **App.jsx**: Header entrance animation is now wrapped in a `matchMedia('(prefers-reduced-motion: reduce)')` check — skipped entirely when reduced motion is preferred.
- **Navbar.jsx**: Added a `reducedMotion` state with a `useEffect` listener. The GSAP morph animation duration is set to `0` when reduced motion is preferred, applying styles instantly.

## Verification
- Tested with `prefers-reduced-motion: reduce` enabled in browser DevTools.
- Header appears instantly without fade/slide animation.
- Navbar morph applies background/blur changes instantly.
- Build passes without errors.
