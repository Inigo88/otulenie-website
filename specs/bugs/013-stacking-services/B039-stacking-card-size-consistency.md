# Bug B039: Stacking Card Size Consistency

**Status**: Resolved  
**Created**: 2026-03-22  
**Date Resolved**: 2026-03-22  
**Feature**: [013-stacking-services](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/013-stacking-services/spec.md)

## Description

The first stacking card (and potentially others) has a different height compared to others because it uses a vertical image. The goal is to keep the image but ensure all cards have a consistent height/size on desktop.

## Steps to Reproduce

1. Scroll to the "Stacking Services" section.
2. Observe the first card (`IMG-07.webp` - vertical) vs other cards.
3. Notice the height discrepancy.

## Expected Behavior

All stacking cards should have identical dimensions on desktop (1280px+) to maintain a premium, rhythmic scroll experience.

## Actual Behavior

Cards vary in height based on their content and image aspect ratio, specifically the first card which uses a vertical image.

## Technical Root Cause

In `src/App.jsx`, the `StackingCard` component's image container uses `md:h-auto` (line 155), which allows the container to grow to match the image's height or the text content's height. Since the card container itself has no fixed height, this results in variable card sizes.

## Proposed Fix

Set a consistent fixed height for the `StackingCard` container on desktop and ensure the image side uses `h-full` with `object-cover`.

### Implementation Strategy

- **Approach**: Apply a fixed height (e.g., `md:h-[500px]` or `md:h-[60vh]`) to the main card container in `StackingCard`. Use `object-cover` to ensure the image fills its half of the card without distortion.
- **Affected Components**:
  - `src/App.jsx`: Update `StackingCard` classes and layout properties.

### Detailed Task List

- [x] [T001] [Implementation]: Set fixed height for `StackingCard` on desktop in `src/App.jsx`.
- [x] [T002] [Implementation]: Ensure image container and img tag use `h-full` and `object-cover`.
- [x] [T003] [Verification]: Verify all 3 cards have identical heights in the browser.

## Resolution

The `StackingCard` component was updated to include a fixed height of `md:h-[500px]` on desktopviewports. The internal image container was switched from `md:h-auto` to `md:h-full` to ensure the `object-cover` behavior fills the space uniformly regardless of source image orientation.

## Verification

- [x] [Functional]: Cards still stack and animate correctly with GSAP.
- [x] [Visual]: All cards have identical height on desktop (1280px).
- [x] [Accessibility]: No impact on screen readers.
- [x] [Technical]: Mobile layout (vertical stack) remains unaffected and functional.
