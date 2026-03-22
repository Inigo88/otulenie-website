# Quickstart: Carousel Modernization (010-carousel-modern)

**Branch**: `010-carousel-modern` | **Date**: 2026-03-18

## Overview

This feature modernizes the `MassageCarousel` component by fixing 4 bugs, resolving 3 constitution violations, and adding 2 UX enhancements. The codebase impact is confined to two files: `MassageCarousel.jsx` and `massageData.js`.

## Dev Environment

```bash
# Ensure you're on the correct branch
git checkout 010-carousel-modern

# Install dependencies (if not already done)
npm install

# Start the dev server
npm run dev
# → http://localhost:5173
```

## Files to Change

| File | Change |
|---|---|
| `src/constants/massageData.js` | Remove `imageMood` from all 5 entries |
| `src/components/MassageCarousel.jsx` | Full rewrite of interaction logic; heading copy fix |

## Key Areas to Work On (In Order)

1. **Data cleanup first** — remove `imageMood` from `massageData.js` (quick, no risk).
2. **Fix B029** — replace `handleDotClick` formula with a `useCallback`-based `getXForIndex`.
3. **Fix B028** — add `onEnter`/`onLeave`/`onEnterBack`/`onLeaveBack` to ScrollTrigger; update `useEffect` auto-rotation interval to read `isInViewRef.current`; fix interval to 5000ms.
4. **Fix B030** — add `onThrowComplete` to `Draggable.create()`.
5. **Fix B031** — add `onKeyDown`, `role`, `aria-label`, `tabIndex` to the track container.
6. **Add FR-009** — add `useEffect` that watches `activeSlide` and applies GSAP scale/opacity to cards.
7. **Add FR-012** — entrance animation via `hasAnimatedRef` guard in ScrollTrigger `onEnter`.
8. **Add NFR-001** — `prefersReducedMotion` check on mount; pass to GSAP durations.
9. **Fix V-001** — change heading to `"Oferta"`.

## Verification Checklist

- [ ] Auto-rotation fires every 5 seconds when "Oferta" is in view
- [ ] Auto-rotation pauses on section `mouseenter`; resumes on `mouseleave`
- [ ] Clicking any dot scrolls to the correct card
- [ ] Active dot updates after drag inertia completes
- [ ] Arrow keys navigate the carousel when section is focused
- [ ] Active card is at full scale/shadow; adjacent cards are `scale(0.95)`, `opacity: 0.7`
- [ ] Cards fade in on first scroll-in; no replay on subsequent scroll-ins
- [ ] All animations instant/disabled with `prefers-reduced-motion: reduce`
- [ ] Heading reads "Oferta" (no "Nasza")
- [ ] Mobile 390px: swipe/touch interaction works
