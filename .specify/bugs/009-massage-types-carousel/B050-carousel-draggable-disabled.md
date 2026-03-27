# Bug B050: Carousel Draggable Disabled

**Status**: [ ] Open | [ ] Investigating | [ ] Fix Proposed | [ ] Resolved
**Severity**: [e.g., P0 (Functional blocker) / P1 (Branding) / P2 (Visual Enhancement)]
**Found in**: [e.g., Feature 1.2.3 (Hero Section)]
**Date Created**: [2026-03-27]
**Date Resolved**: [2026-03-27]

## Description

The `MassageCarousel` component currently allows users to drag the massage cards horizontally using GSAP's `Draggable` plugin. However, the user requires that the carousel should not be draggable. Instead, it should only move when a card is clicked (which should center that specific card). The current implementation also uses `cursor-grab` and `active:cursor-grabbing`, which implies draggability and should be updated to a standard pointer cursor.

## Steps to Reproduce

1. Open the website and scroll to the "Oferta" (Offer) section.
2. Attempt to drag the massage cards horizontally using a mouse or touch.
3. Observation: The cards follow the drag interaction, which is the unwanted behavior.

## Expected Behavior

The carousel should ignore dragging gestures. Clicking on any card should trigger the centering animation for that card. The mouse cursor over the cards should be a standard pointer (`cursor-pointer`) to indicate it's clickable but not draggable.

## Actual Behavior

The carousel is fully draggable via GSAP `Draggable`. The cursor is set to `cursor-grab`.

## Technical Root Cause

In `src/components/MassageCarousel.jsx`, lines 136-182 implement a `Draggable` instance on a `dragProxy` element, with `trigger: horizontalItems`. This captures drag events and updates the carousel's `x` position. Additionally, line 333 sets the CSS class `cursor-grab active:cursor-grabbing` on each card.

## Proposed Fix

### Implementation Strategy

- **Approach**: Remove the `Draggable` logic from `MassageCarousel.jsx` and update the card styles to use `cursor-pointer`. This will prevent drag interactions while preserving the existing `onClick` behavior that already handles centering the clicked card.
- **Affected Components**:
  - `src/components/MassageCarousel.jsx`: Remove `Draggable.create` and metadata, update card cursor classes.

### Detailed Task List

- [ ] [T001] [Implementation]: Remove `Draggable` creation and cleanup logic in `MassageCarousel.jsx`.
- [ ] [T002] [Implementation]: Update card cursor classes from `cursor-grab` to `cursor-pointer`.
- [ ] [T003] [Verification]: Verify that the carousel is no longer draggable and cards still center on click.

## Resolution

The `Draggable` implementation was removed from `MassageCarousel.jsx`, and the card container's CSS classes were updated to use `cursor-pointer` and `select-none`. The restrictive `pointer-events` guard on the `.booksy-cta` buttons was removed, and the card's `onClick` handler now correctly captures clicks across the entire card area.

## Verification

- [x] [Functional: Carousel does not react to drag events but centers cards on click]
- [x] [Functional: Entire card area, including buttons on non-centered cards, triggers centering]
- [x] [Visual: Cards display `cursor-pointer` on hover and `select-none` prevents accidental text selection]
- [x] [Technical: GSAP Draggable logic and pointer-events guards were removed correctly]
