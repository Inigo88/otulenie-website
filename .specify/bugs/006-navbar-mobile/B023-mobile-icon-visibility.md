# Bug B023: Mobile Menu Icon Visibility

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P0 (Blocking UX)
**Found in**: Feature 1.2.2 (Full Mobile Navigation Modal)
**Date Created**: 2026-03-13
**Date Resolved**: 2026-03-13

## Description
On mobile devices, the hamburger menu icon was practically invisible when positioned over the Hero section. This prevented users from discovering and using the navigation menu on the landing page.

## Steps to Reproduce
1. Load the site on a mobile device or simulator.
2. Look for the menu trigger in the top right.
3. Observe that it blends into the background.

## Expected Behavior
The hamburger menu trigger must have sufficient contrast at all times (matching either the `linen` or `moss` theme of the current navbar state).

## Actual Behavior
The icon was hardcoded or incorrectly styled as `text-linen` while the navbar background at the top was also transparent/light.

## Technical Root Cause
Conditional styling logic in `Navbar.jsx` for the hamburger button was not correctly accounting for the transparent Hero state vs the Island state.

## Proposed Fix
Modify the icon's text color utility to use `text-moss` or `text-linen` dynamically depending on the `isHero` state to ensure contrast.

### Detailed Task List
- [x] [T001] [Implementation]: Update conditional class on the mobile button in `Navbar.jsx`.
- [x] [T002] [Verification]: Verify visibility on 390px (iPhone) viewport.

## Resolution
Standardized the mobile menu trigger to use brand-compliant contrast colors that switch based on the `isHero` and `isMenuOpen` state.

## Verification
- [x] [Visual]: Hamburger is clearly visible in Hero state.
- [x] [Functional]: 'X' icon remains visible when overlay is active.
- [x] [Accessibility]: Passes color contrast check.
