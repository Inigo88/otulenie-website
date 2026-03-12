# Bug Report: Missing Skip-to-Content Link

## Status
Fixed

## Severity
Low (Accessibility / WCAG 2.2 AA — SC 2.4.1 Bypass Blocks)

## Description
The page had no skip-to-content link, forcing keyboard-only users to Tab through the entire navbar before reaching the main content on every page load.

## Root Cause
The skip link was not included in the original implementation.

## Resolution
Added a visually-hidden skip link (`"Przejdź do treści"`) before the `<Navbar>` in `App.jsx` that becomes visible on focus. It targets `#main-content` which was added as an `id` on the `<main>` element. The noise overlay was also given `aria-hidden="true"`.

## Verification
- Tab into the page — the skip link appears visually on first Tab press.
- Activating the link moves focus to the main content area.
- Link is hidden again when not focused.
