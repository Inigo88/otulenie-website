# Bug B030: Active Dot Desync After Drag Inertia

**Status**: [ ] Open | [ ] Investigating | [ ] Fix Proposed | [x] Resolved  
**Severity**: P2 (Visual inconsistency)  
**Found in**: Feature 009 (Massage Types Carousel) — shipped code  
**Date Created**: 2026-03-18  
**Date Resolved**: 2026-03-19
**Fix Branch**: `010-carousel-modern`

## Description

After a user drags the carousel and releases it (triggering GSAP inertia/throw), the carousel settles on a new card but the active pagination dot does not update. The dot remains on the index it was at before the drag began.

## Steps to Reproduce

1. Open the site and scroll to "Oferta".
2. The active dot (pill shape) is on card 1 (index 0).
3. Drag the carousel quickly to the right to advance 2–3 cards.
4. Release the drag. The carousel settles via GSAP inertia on card 3.
5. Observe: the active pagination dot still shows card 1, not card 3.

## Expected Behavior

After drag inertia settles, the active dot reflects the card currently centered in the viewport.

## Actual Behavior

Active dot only updates during active dragging (`onDrag`) but not once inertia completes (`onThrowComplete`).

## Technical Root Cause

The `Draggable.create` configuration only updates `activeSlide` state in `onDrag`:

```js
onDrag: function() {
  // ...updates activeSlideRef / setActiveSlide during drag
}
// ❌ No onThrowComplete callback
```

Once the user releases and `onThrowUpdate` takes over (running inertia physics), `setActiveSlide` is never called again with the final settled index.

## Proposed Fix

Add `onThrowComplete` to the `Draggable.create` config:

```js
onThrowComplete: function() {
  const baseWidth = getBaseWidth();
  const currentX = gsap.getProperty(horizontalItems, 'x');
  // Normalize X against base width
  let normalizedX = ((currentX % baseWidth) + baseWidth) % baseWidth;
  normalizedX = baseWidth - normalizedX; // Convert to positive offset
  // Calculate nearest card index
  const children = Array.from(horizontalItems.children).slice(0, MASSAGE_DATA.length);
  let closestIndex = 0;
  let closestDist = Infinity;
  children.forEach((child, idx) => {
    const dist = Math.abs(child.offsetLeft - normalizedX);
    if (dist < closestDist) {
      closestDist = dist;
      closestIndex = idx;
    }
  });
  activeSlideRef.current = closestIndex;
  setActiveSlide(closestIndex);
}
```

## Resolution

The drag inertia desync was fixed by:
1. **Adding `onThrowComplete`**: Implemented the missing callback to detect the final settled position after GSAP inertia completes.
2. **Nearest Card Logic**: Integrated the same centering logic used for dots to find the closest card and force-sync the `activeSlide` state.

## Verification
- [x] After drag and inertia settle, the active dot reflects the card now centered in the viewport
- [x] After drag, active dot does not flicker or jump
- [x] Active dot state is consistent with `activeSlideRef.current` value
