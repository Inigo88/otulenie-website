# Bug B028: Auto-Rotation Never Fires

**Status**: [ ] Open | [ ] Investigating | [ ] Fix Proposed | [x] Resolved  
**Severity**: P1 (Critical — spec requirement FR-004.1 not met)  
**Found in**: Feature 009 (Massage Types Carousel) — shipped code  
**Date Created**: 2026-03-18  
**Date Resolved**: 2026-03-19
**Fix Branch**: `010-carousel-modern`

## Description

Auto-rotation silently does nothing. The `setInterval` in `useEffect` attempts to gate on `ScrollTrigger.isActive`, but the trigger created inside `useGSAP` is never in a persistent "active" state — its `isActive` flag returns `false` almost immediately after the `start` position fires (no scrub is used). As a result, the `return` guard always exits early and no slide transition is ever triggered automatically.

## Steps to Reproduce

1. Open the site and scroll to the "Oferta" section.
2. Leave the section visible on screen for more than 5 seconds.
3. Observe: no card transition occurs automatically.
4. Open DevTools and add a `console.log` inside the `setInterval` callback — the log fires, but `!st.isActive` is always `true`, so the function always returns early.

## Expected Behavior

The carousel automatically advances to the next card every 5 seconds when the section is in the viewport, pausing on hover or manual interaction (FR-004.1).

## Actual Behavior

Auto-rotation never fires. The `ScrollTrigger.isActive` guard continuously returns `false`.

## Technical Root Cause

```js
// MassageCarousel.jsx, lines 131–133
const st = ScrollTrigger.getAll().find(s => s.trigger === containerRef.current);
if (!st || !st.isActive) return;
```

The `ScrollTrigger` created with `start: 'top center'` / `end: 'bottom center'` has no `scrub` or `pin`. GSAP's `isActive` is `true` only between `onEnter` and `onLeave`. Because the carousel section's height is shorter than the screen, the trigger fires and immediately becomes inactive again. Every subsequent `setInterval` tick finds `isActive === false`.

## Proposed Fix

Replace the `ScrollTrigger.isActive` gate with a simple `isInViewRef` boolean:

```js
const isInViewRef = useRef(false);

// Inside useGSAP:
ScrollTrigger.create({
  trigger: containerRef.current,
  start: 'top bottom',
  end: 'bottom top',
  onEnter: () => { isInViewRef.current = true; },
  onLeave: () => { isInViewRef.current = false; },
  onEnterBack: () => { isInViewRef.current = true; },
  onLeaveBack: () => { isInViewRef.current = false; },
});

// In useEffect auto-rotation:
const interval = setInterval(() => {
  if (!isInViewRef.current) return;
  const nextSlide = (activeSlideRef.current + 1) % MASSAGE_DATA.length;
  handleDotClick(nextSlide, true);
}, 5000); // corrected from 3000
```

## Resolution

Auto-rotation was fixed by:
1. **Implementing `isInViewRef`**: Switched from gating on `ScrollTrigger.isActive` to a custom `isInViewRef` boolean updated by `onEnter`/`onLeave` callbacks.
2. **Standardizing Interval**: Corrected the interval to `5000ms` as per spec.
3. **Motion Safety**: Wrapped the timer in a `prefersReducedMotion` check and gated it with `isHoveredRef` and `isPausedRef` for interaction safety.

## Verification
- [x] Auto-rotation fires every 5 seconds when "Oferta" is in the viewport
- [x] Auto-rotation pauses when cursor hovers over the section
- [x] Auto-rotation does NOT fire when "Oferta" is scrolled out of view
- [x] `prefers-reduced-motion` disables auto-rotation entirely
