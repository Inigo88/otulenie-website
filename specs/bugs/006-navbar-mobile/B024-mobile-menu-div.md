# Bug B024: Mobile Menu Trigger Non-Interactive

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P0 (Accessibility / WCAG 2.2 AA)
**Found in**: Feature 1.2.2 (Full Mobile Navigation Modal)
**Date Created**: 2026-03-13
**Date Resolved**: 2026-03-13

## Description
The mobile hamburger menu trigger was implemented as a `<div>` element instead of a `<button>`. This made the site completely unusable for keyboard and screen reader users, as the menu couldn't be focused or activated.

## Steps to Reproduce
1. Tab through the site using a keyboard.
2. Observe that the focus skips the mobile menu trigger.
3. Inspect the element and see it is a `div`.

## Expected Behavior
All interactive elements must use semantic HTML tags (`<button>`, `<a>`) to ensure keyboard accessibility and proper ARIA roles.

## Actual Behavior
The trigger was a non-semantic `div`.

## Technical Root Cause
During a cleanup pass, the interactive `<button>` was accidentally replaced with a `<div>` wrapper.

## Proposed Fix
Replace the `<div>` with a semantic `<button type="button">` and add necessary `aria-label` attributes.

### Detailed Task List
- [x] [T001] [Implementation]: Replace `div` with `button` in `Navbar.jsx`.
- [x] [T002] [Implementation]: Add `aria-label` and focus-visible styles.
- [x] [T003] [Verification]: Verify Keyboard Tab focus.

## Resolution
Restored semantic integrity by using a proper button element with accessible labeling.

## Verification
- [x] [Accessibility]: Trigger is focusable via keyboard.
- [x] [Accessibility]: Screen readers announce it as a button.
- [x] [Technical]: Build passes.
