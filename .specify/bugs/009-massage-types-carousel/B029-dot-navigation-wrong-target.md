# Bug B029: Dot Navigation Targets Wrong Card Position

**Status**: [ ] Open | [ ] Investigating | [ ] Fix Proposed | [x] Resolved  
**Severity**: P1 (Core navigation is unreliable)  
**Found in**: Feature 009 (Massage Types Carousel) — shipped code  
**Date Created**: 2026-03-18  
**Date Resolved**: 2026-03-19
**Fix Branch**: `010-carousel-modern`

## Description

Clicking a pagination dot does not navigate to the correct card. The formula used to compute the target `x` position divides `scrollWidth` (which includes 3 clone cards) by `DISPLAY_DATA.length` (7), causing overshoots or undershoots depending on the card index.

## Steps to Reproduce

1. Open the site and scroll to "Oferta".
2. Click pagination dot #3 (index 2, "Czułe Otulenie").
3. Observe: the carousel scrolls to a position that may show a clone or an offset card depending on viewport width.
4. Compare with dragging manually to "Czułe Otulenie" — the positions do not match.

## Expected Behavior

Clicking dot N snaps to the Nth card, centered in the viewport.

## Actual Behavior

Clicking dot N navigates to a position proportional to `N/7` of total scrollWidth, which does not correspond to the actual card position.

## Technical Root Cause

```js
// MassageCarousel.jsx, line 108
const targetX = -(index * (horizontalRef.current.scrollWidth / DISPLAY_DATA.length));
//                                                              ^^^^^^^^^^^^^^^^^^
// DISPLAY_DATA has 7 items (4 real + 3 clones)
// scrollWidth includes all 7 cards + all gaps
// But card widths are not uniform relative to scrollWidth / 7
```

The correct approach uses each card element's actual `offsetLeft`, as already calculated in the `getXForIndex` helper inside `useGSAP` — but that helper is not accessible to `handleDotClick` because it's defined inside the `useGSAP` closure.

## Proposed Fix

Lift `getXForIndex` into a `useCallback` or store in a `ref` so it can be shared between `useGSAP` and `handleDotClick`:

```js
const getXForIndex = useCallback((index) => {
  if (!horizontalRef.current || !triggerRef.current) return 0;
  const children = Array.from(horizontalRef.current.children);
  const targetItem = children[index];
  if (!targetItem) return 0;
  const parentWidth = triggerRef.current.offsetWidth;
  return -(targetItem.offsetLeft - parentWidth / 2 + targetItem.offsetWidth / 2);
}, []);

// In handleDotClick:
const targetX = getXForIndex(index);
gsap.to(horizontalRef.current, { x: targetX, duration: 1.0, ease: 'power3.inOut', overwrite: 'auto' });
```

## Resolution

The dot navigation targets were fixed by:
1. **Lifting `getXForIndex`**: Extracted the centering logic into a stable `useCallback` shared across all navigation triggers.
2. **Correcting targetX**: Replaced the proportional formula with the actual `offsetLeft`-based calculation to ensure precision.

## Verification
- [x] Clicking dot 1 navigates to "Mocne Otulenie" (index 0)
- [x] Clicking dot 2 navigates to "Głębokie Otulenie" (index 1)
- [x] Clicking dot 3 navigates to "Czułe Otulenie" (index 2)
- [x] Clicking dot 4 navigates to "Ciepłe Otulenie" (index 3)
- [x] Active dot updates to reflect the navigated card
