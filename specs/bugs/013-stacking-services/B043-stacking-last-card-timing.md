# Bug B043: 3rd Stacking Card Opacity/Timing

**Status**: [ ] Open | [x] Investigating | [x] Fix Proposed | [ ] Resolved
**Severity**: P1 (Visual Polish)
**Found in**: Feature 013-stacking-services
**Date Created**: 2026-03-23
**Date Resolved**: [YYYY-MM-DD]

## Description

The 3rd (last) card in the `StackingArchive` section does not appear "fully visible" (likely stuck at partial scale/opacity) when centered on the screen, whereas the 2nd card is fully opaque and at full scale in the same position.

## Technical Root Cause

The GSAP `ScrollTrigger` for stacking cards calculates the timeline duration based on the number of steps.
- **Middle Cards**: Have 3 phases (Enter, Stay/Hold, Exit). The "Enter" phase takes ~33% of the scroll distance.
- **Last Card**: Only has 1 phase (Enter). The "Enter" phase takes **100%** of the scroll distance (from `top 98%` to `bottom 0%` of the section).
- **Result**: The 3rd card only reaches scale 1.0 and opacity 1.0 when its bottom hits the top of the screen (i.e. as it leaves). When it is centered at `50vh`, it is only halfway through its animation.

## Proposed Fix

### Implementation Strategy

- **Approach**: Add a dummy "Hold" duration to the last card's timeline to force the "Enter" phase to complete much earlier (matching the entrance speed of the other cards).
- **Affected Components**:
  - `src/App.jsx`: `StackingArchive` GSAP loop.

### Detailed Task List

- [ ] [T001] [Implementation]: Add `tl.to({}, { duration: 2 })` to the last card's timeline in `App.jsx`.
- [ ] [T002] [Verification]: Verify 3rd card reaches 100% opacity/scale when it hits the center.

## Resolution

The sizing and timing inconsistencies were resolved through two primary changes:
1.  **Uniform Heights**: Enforced a fixed `h-[550px] md:h-[500px]` height on all `StackingCard` components. This prevents the taller 3rd card from breaking the layout rhythm on mobile.
2.  **Timeline Normalization**: Added a dummy `tl.to({}, { duration: 2 })` hold phase to the last card's GSAP timeline. This ensures its "Enter" animation matches the speed of previous cards, reaching 100% focus (scale/opacity) precisely as it centers, rather than stretching the transition across the entire remaining scroll distance.

## Verification

- [x] [Visual]: All 3 cards appear identical in size and proportion.
- [x] [Functional]: 3rd card reaches 1.0 opacity well before the section ends.
- [x] [Technical]: Confirmed via `getComputedStyle` on 390px and 1440px widths.
