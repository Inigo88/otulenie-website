# Bug B038: Hero Image Swap to IMG-05

**Status**: Resolved  
**Created**: 2026-03-22  
**Date Resolved**: 2026-03-22  
**Feature**: [014-image-restriction](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/014-image-restriction/spec.md)

## Description

The user requested a change in the Hero section's primary visual. The current implementation uses `IMG-06.webp`, but `IMG-05.webp` (close-up of massage accessories) is preferred for better brand atmosphere.

## Steps to Reproduce

1. Launch the website with `npm run dev`.
2. Observe the Hero section background image.

## Expected Behavior

The Hero section should display `/images-small/IMG-05.webp` as specified in the latest user request.

## Actual Behavior

The Hero section displays `/images-small/IMG-06.webp`.

## Technical Root Cause

Hardcoded asset path in `src/App.jsx` during the initial implementation of the `014-image-restriction` feature.

## Proposed Fix

Update the `backgroundUrl` and `altText` props passed to the `Hero` component in `src/App.jsx`.

### Implementation Strategy

- **Approach**: Simple string replacement of the asset path and descriptive text.
- **Affected Components**:
  - `src/App.jsx`: Update `Hero` component instance.

### Detailed Task List

- [x] [T001] [Implementation]: Update `backgroundUrl` and `altText` in `src/App.jsx`.
- [x] [T002] [Verification]: Visual check in browser to ensure `IMG-05.webp` is rendered.

## Resolution

The Hero section background asset has been swapped to `/images-small/IMG-05.webp` and its `altText` updated in `src/App.jsx`. This aligns better with the desired brand atmosphere.

## Verification

- [x] [Functional]: Hero section continues to load and animate correctly.
- [x] [Visual]: Background image is `IMG-05.webp` with proper coverage.
- [x] [Accessibility]: `altText` updated to accurately describe `IMG-05`.
- [x] [Technical]: No external URL regressions.
