# Bug B032: Duplicated Cards in Wellness Wheel

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P1 (Branding/Logic)
**Found in**: Feature 1.2.7 (Wellness Wheel)
**Date Created**: 2026-03-22
**Date Resolved**: 2026-03-22

## Description

The "Wellness Wheel" carousel currently displays duplicated cards at the end of the track. While this was previously intended for an "infinite loop" effect in epic 010, the current requirement for the 011 Wellness Wheel is to have only individual cards per massage record. The presence of duplicates is confusing for users and breaks the "individual record" mental model.

## Steps to Reproduce

1. Open the site and navigate to the "Oferta" section.
2. Drag the carousel to the end of the list.
3. Observe that the first few cards repeat at the end of the track.

## Expected Behavior

The carousel should only contain as many cards as there are records in `MASSAGE_DATA`. There should be no repetition/cloning of items. The track should have clear bounds at the start and end.

## Actual Behavior

The `DISPLAY_DATA` array clones the first three items and appends them to the end, resulting in 8 cards instead of 5.

In `src/components/MassageCarousel.jsx`:

- Line 26: `const DISPLAY_DATA = [...MASSAGE_DATA, ...MASSAGE_DATA.slice(0, 3)];` explicitly clones items.
- Line 148-149: `Draggable` use modulo arithmetic (`% baseWidth`) to create the infinite wrapping effect.
- Line 169-170: `onThrowComplete` searches across all children (including clones).

## Proposed Fix

### Implementation Strategy

- **Approach**: Switch from `DISPLAY_DATA` back to the raw `MASSAGE_DATA`. Remove the modulo/infinite wrapping logic in `Draggable`. Implement edge resistance or strict bounds for the carousel track so it stops at the last card.
- **Affected Components**:
  - `src/components/MassageCarousel.jsx`: Remove cloning, update `Draggable` bounds, remove wrapping math in `onDrag`/`onThrowUpdate`.

### Detailed Task List

- [ ] [T001] [Preparation]: Verify current number of DOM nodes in the carousel.
- [ ] [T002] [Implementation]: Replace `DISPLAY_DATA` with `MASSAGE_DATA` in the `.map()` function.
- [ ] [T003] [Implementation]: Update `Draggable.create` to use fixed bounds instead of modulo wrapping.
- [ ] [T004] [Implementation]: Adjust `getXForIndex` and search logic to handle the restricted range correctly.
- [ ] [T005] [Verification]: Ensure dragging stops at the last card and no duplicates are visible.

## Resolution

The carousel was refactored to remove the `DISPLAY_DATA` cloning logic. The modulo wrapping and infinite loop calculations in `Draggable` were replaced with strict `bounds` calculated via `getXForIndex`. This ensures a single set of cards that hit a physical stop at the edges, satisfying the requirement for "individual card per massage record".

## Verification

- [x] [Functional: Carousel shows only 5 cards (matching MASSAGE_DATA)]
- [x] [Functional: Carousel stops at edges without wrapping]
- [x] [Visual: Wheel effect remains intact for the single set of cards]
- [x] [Technical: No modulo logic or clones remaining in code]
