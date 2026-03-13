# Bug B021: Nested Interactive Elements in NavLinks

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P1 (Accessibility / WCAG)
**Found in**: Feature 1.2.1 (Floating Island Navbar)
**Date Created**: 2026-03-11
**Date Resolved**: 2026-03-11

## Description
The `NavLink` component wrapped an `<a>` element inside a `MagneticButton` which rendered as a `<button>`. This created invalid HTML (`<a>` inside `<button>`), which confuses assistive technology and produces unpredictable behavior across browsers.

## Steps to Reproduce
1. Inspect the Navbar in the browser developer tools.
2. Observe the DOM structure of a navigation link.
3. Notice the `<button>` element containing an `<a>` tag.

## Expected Behavior
Interactive elements should not be nested. Navigation links should be semantic `<a>` tags or polymorphic components that render a single interactive tag.

## Actual Behavior
Invalid HTML nesting: `<button><a ...>Link</a></button>`.

## Technical Root Cause
`MagneticButton` was hard-coded to always render a `<button>`, but `NavLink` needed the anchor semantics (`<a>`) for proper browser navigation and SEO.

## Proposed Fix
Make `MagneticButton` polymorphic by adding an `as` prop (defaults to `'button'`). Use a `Component` variable to render the correct tag.

### Detailed Task List
- [x] [T001] [Implementation]: Refactor `MagneticButton.jsx` to be polymorphic.
- [x] [T002] [Implementation]: Update `NavLink` to pass `as="a"`.
- [x] [T003] [Verification]: Inspect DOM for correct nesting.

## Resolution
Made `MagneticButton` polymorphic. `NavLink` now passes `as="a"` and `href` directly to `MagneticButton`, eliminating the nested interactive elements.

## Verification
- [x] [Accessibility]: No `<a>` elements are nested inside `<button>` elements.
- [x] [Functional]: Navigation links still function correctly with keyboard and mouse.
- [x] [Technical]: Build passes.
