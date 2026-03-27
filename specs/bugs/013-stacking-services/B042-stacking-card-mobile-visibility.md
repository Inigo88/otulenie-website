# Bug B042: Stacking Card Mobile Visibility (3rd Card)

**Status**: [ ] Open | [ ] Investigating | [ ] Fix Proposed | [x] Resolved
**Severity**: P1 (UX & Visual)
**Found in**: Feature 013-stacking-services
**Date Created**: 2026-03-23
**Date Resolved**: 2026-03-27

## Description

The 3rd card in the `StackingArchive` section is not fully visible on mobile viewports, even when centered. The 2nd card fits well, but the 3rd card (which has more content or different proportions) appears cut off at the top or bottom.

## Steps to Reproduce

1. Open the website on a mobile viewport (e.g., 390px width).
2. Scroll to the "Archiwum Korzyści" section.
3. Observe the 3rd card as it reaches its sticky position.
4. Note that the top (under navbar) or bottom (cut off) is obscured.

## Expected Behavior

All cards should be fully visible within the safe area (below navbar, above screen bottom) in their sticky state, regardless of content length.

## Actual Behavior

On mobile:
- The fixed `top` calculation (`50vh - 250px`) assumes a 500px height, but the card's dynamic height on mobile might exceed this.
- The stacking offset (`+ index * 32`) adds additional displacement that is not calibrated for short viewports.
- The 3rd card's bottom part is often pushed off-screen.

## Technical Root Cause

1. **Dynamic Height**: On `md:flex-col`, the card height is `250px` (image) + content-based text height. If text is long, height > 500px.
2. **Fixed Centering**: `50vh - 250px` only works for cards exactly 500px tall. For taller cards, they are "centered" but bleed out of the viewport.
3. **Stacking Offset**: The `+ 64px` for the 3rd card is too aggressive for mobile, where vertical space is premium.

## Proposed Fix

### Implementation Strategy

- **Approach**: 
    1. For mobile viewports, normalize the card height or use `min-height` with `overflow-y-auto` (scrolling inside card if too long).
    2. Alternatively, adjust the `top` calculation to use `max(80px, ...)` and a smaller index offset on mobile.
    3. Truncate or condense the 3rd card text to match the 2nd card's height.
- **Affected Components**:
  - `src/App.jsx`: `StackingCard` component styles and text content.

### Detailed Task List

- [x] [T001] [Audit]: Measure actual card heights on 390px viewport.
- [x] [T002] [Implementation]: Implement responsive `top` and `offset` logic.
- [x] [T003] [Content]: Balance text length across all 3 cards.
- [x] [T004] [Verification]: Visual check on mobile.

## Resolution

Implemented a responsive `top` calculation in `StackingArchive.jsx` using CSS variables (`--card-half-height` and `--stack-offset`).
- **Mobile**: Set `card-half-height` to `275px` (half of the 550px mobile height) and reduced `stack-offset` to `16px` per index.
- **Desktop**: Maintained original `250px` half-height and `32px` offset.
This ensures cards are accurately centered and don't bleed out of the viewport on shorter devices.

## Verification

- [x] [Functional]: 3rd card is fully visible on mobile.
- [x] [Visual]: All card headers clear the navbar.
