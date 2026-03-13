# Bug B017: Missing Skip-to-Content Link

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P2 (Accessibility / WCAG)
**Found in**: Feature 1.1.1 (Global Design System)
**Date Created**: 2026-03-10
**Date Resolved**: 2026-03-10

## Description
The page lacked a "Skip to Content" link. For keyboard users, this meant they had to Tab through every link in the navigation menu on every single page load before reaching the main content.

## Steps to Reproduce
1. Load the page.
2. Press `Tab` repeatedly.
3. Observe that focus starts on the Logo, then links, then buttons.

## Expected Behavior
A "Skip to Content" link should be the first focusable element, allowing users to jump directly to the main landmark.

## Actual Behavior
No skip-link existed.

## Technical Root Cause
The skip-link was overlooked in the initial project setup.

## Proposed Fix
Add a visually hidden anchor that becomes visible on focus at the very top of `App.jsx`.

### Detailed Task List
- [x] [T001] [Implementation]: Add skip-link anchor to `App.jsx`.
- [x] [T002] [Implementation]: Add `#main-content` ID to the `<main>` tag.
- [x] [T003] [Verification]: Test with keyboard Tab.

## Resolution
Added a visually-hidden skip link ("Przejdź do treści") that targets the `#main-content` landmark.

## Verification
- [x] [Accessibility]: Skip link appears visually on first Tab press.
- [x] [Functional]: Activating the link moves focus correctly.
- [x] [Technical]: Build passes.
