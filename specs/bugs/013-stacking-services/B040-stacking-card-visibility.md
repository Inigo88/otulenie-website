# Bug B040: Stacking Card Visibility (Last Card)

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P1 (UX & Visual)
**Found in**: Feature 013-stacking-services
**Date Created**: 2026-03-23
**Date Resolved**: 2026-03-23

## Description

The 3rd card ("Głęboka Regeneracja") in the `StackingArchive` section is not fully visible on shorter viewports when it reaches its sticky position. It either gets partially covered by the navbar or leaves its sticky state too early as the section ends, preventing a "centered" focus.

## Steps to Reproduce

1. Open the website on a viewport with height < 800px (e.g., standard laptop).
2. Scroll to the "Archiwum Korzyści" section.
3. Observe the 3rd card's behavior.
4. Note that the top part (title) might be under the navbar or the card scrolls away too fast.

## Expected Behavior

The 3rd card should remain clearly visible and "centered" in the viewport (minus the stacking offset) for a sufficient scroll duration, consistent with the first two cards.

## Actual Behavior

On short viewports:
- The `top: calc(8vh + 64px)` offset was too small to clear the fixed navbar (~70px) and provide breathing room.
- The 3rd card lacked a "scroll buffer" at the bottom of the section, causing it to scroll up immediately instead of staying sticky.
- The 3rd card is slightly taller (due to more text), exacerbating the tight fit.

## Technical Root Cause

1. **Sticky Offset**: `8vh` was insufficient on small screens to clear the navbar and create aesthetic balance.
2. **Section Height**: The `StackingArchive` section's padding ended immediately after the last card's natural position, giving `ScrollTrigger` no room to "hold" the 3rd card.

## Proposed Fix

### Implementation Strategy

- **Approach**: Increase the vertical "sticky" offset to `15vh` and add a `60vh` bottom padding to the section to create a substantial scroll buffer for the last card.
- **Affected Components**:
  - `src/App.jsx`: Updated `StackingCard`'s `top` calculation and `StackingArchive`'s container padding.

### Detailed Task List

- [x] [T001] [Implementation]: Update `top` offset in `StackingCard` to `calc(15vh + ${index * 32}px)`.
- [x] [T002] [Implementation]: Add `pb-[60vh]` to `StackingArchive` section in `App.jsx`.
- [x] [T003] [Implementation]: Verify all cards clear the navbar and remain sticky.

## Resolution

The visibility issue for the 3rd stacking card was resolved by adjusting the sticky `top` property and the parent section's padding. By increasing the offset to `15vh`, the card headers now consistently clear the floating navbar even on small laptop screens. The addition of `60vh` bottom padding to the `StackingArchive` container provides a dedicated scroll buffer, ensuring the last card remains "pinned" for a sufficient duration before being pushed up by the footer.

## Verification

- [x] [Functional]: 3rd card stays sticky for at least 15vh of scroll distance.
- [x] [Visual]: 3rd card title is never obscured by the navbar.
- [x] [Technical]: No regressions in GSAP animations or other stacking cards.
