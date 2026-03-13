# Bug Report: Nested Interactive Elements in NavLink

## Status
Fixed

## Severity
Medium (Accessibility / WCAG — Invalid HTML Nesting)

## Description
The `NavLink` component wrapped an `<a>` element inside a `MagneticButton` which rendered as a `<button>`. This created invalid HTML (`<a>` inside `<button>`), which confuses assistive technology and produces unpredictable behavior across browsers.

## Root Cause
`MagneticButton` was hard-coded to always render a `<button>`, but `NavLink` needed anchor semantics (`<a>`) for proper navigation.

## Resolution
Made `MagneticButton` polymorphic by adding an `as` prop (defaults to `'button'`). `NavLink` now passes `as="a"` and `href` directly to `MagneticButton`, eliminating the nested interactive elements.

## Verification
- No `<a>` elements nested inside `<button>` elements in the rendered HTML.
- Navigation links still function correctly with `href` attributes.
- Build passes without errors.
