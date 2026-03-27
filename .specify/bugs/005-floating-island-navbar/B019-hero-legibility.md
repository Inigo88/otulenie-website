# Bug B019: Hero State Legibility Issues

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P1 (Visual/UX)
**Found in**: Feature 1.2.1 (Floating Island Navbar)
**Date Created**: 2026-03-11
**Date Resolved**: 2026-03-11

## Description
In the initial "Hero" state (at the top of the page), the navigation links and logo were using a color that lacked sufficient contrast against the `linen` background. This made the primary navigation difficult to read for users.

## Steps to Reproduce
1. Load the website and stay at the Hero section.
2. Observe the logo and navigation links.
3. Notice the low contrast against the linen background.

## Expected Behavior
The Navbar should be perfectly legible across both Hero and Island states, matching the background color it sits on.

## Actual Behavior
The menu used a light theme on a light background.

## Technical Root Cause
The component was designed with a light-colored theme intended for a dark background (cinematic approach), but the initial implementation of the landing page used a light `linen` background for the hero section.

## Proposed Fix
Update the `NavLink` and Logo styles in `Navbar.jsx` to use the primary `text-moss` color in the Hero state. 

### Detailed Task List
- [x] [T001] [Implementation]: Update `Navbar.jsx` to use `text-moss` in Hero state.
- [x] [T002] [Verification]: Verify legibility in browser.

## Resolution
Updated the `NavLink` and Logo styles in `Navbar.jsx` to use the primary `text-moss` color in the Hero state. Added transition effects to ensure a smooth color shift.

## Verification
- [x] [Visual]: Text is clearly legible in the Hero state.
- [x] [Accessibility]: Contrast ratios meet WCAG compliance.
- [x] [Technical]: Smooth color transition on scroll.
