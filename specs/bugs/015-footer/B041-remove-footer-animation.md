# Bug B041: Remove Footer Entrance Animation

**Status**: [ ] Open | [x] Investigating | [x] Fix Proposed | [ ] Resolved
**Severity**: P2 (Visual Preference)
**Found in**: Feature 015-footer
**Date Created**: 2026-03-23
**Date Resolved**: [YYYY-MM-DD]

## Description

The user wants to remove the entrance animation (scroll-triggered fade/slide) from the footer component to simplify the page transition and speed up access to contact information.

## Steps to Reproduce

1. Scroll to the bottom of the page.
2. Observe the footer sliding up and fading in as it enters the viewport.

## Expected Behavior

The footer should be statically rendered or at least not have a delayed entrance animation when scrolling into view.

## Actual Behavior

The footer has a GSAP `from` animation that triggers when the top of the footer reaches 95% of the viewport.

## Technical Root Cause

The `Footer` component in `src/App.jsx` contains a `useGSAP` hook that implements a `gsap.from` animation with a `ScrollTrigger`.

## Proposed Fix

### Implementation Strategy

- **Approach**: Remove the `useGSAP` hook and its associated `gsap` imports/logic from the `Footer` component. Remove the `footerRef` if it's no longer used for anything else.
- **Affected Components**:
  - `src/App.jsx`: `Footer` component logic.

### Detailed Task List

- [ ] [T001] [Implementation]: Remove `useGSAP` block from `Footer` component in `App.jsx`.
- [ ] [T002] [Cleanup]: Remove `footerRef` and the `ref={footerRef}` prop if unused.
- [ ] [T003] [Verification]: Verify that the footer is visible immediately upon scrolling without animation.

## Resolution

The entrance animation (gsap.from with ScrollTrigger) was removed from the `Footer` component in `App.jsx`. This ensures the footer is statically rendered and immediately visible as soon as the user scrolls to the bottom, improving perceived performance and accessibility to contact information.

## Verification

- [x] [Functional]: Footer appears instantly without slide/fade.
- [x] [Visual]: Verified static render via browser screenshot.
