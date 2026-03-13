# Bug B001: Redundant "Start" Navigation Link

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P2 (UX Consistency)
**Found in**: Feature 1.2.2 (Full Mobile Navigation Modal)
**Date Created**: 2026-03-12
**Date Resolved**: 2026-03-12

## Description
The "Start" link was present in the navigation array, appearing in both the desktop navbar and mobile menu. In modern web design, the brand logo "Otulenie" typically handles the home redirect, making an explicit "Start" link redundant and cluttering the navigation space.

## Steps to Reproduce
1. View the Navbar in desktop or mobile view.
2. Observe the "Start" link in the navigation list.
3. Click the "Otulenie" logo and observe it also redirects to home.

## Expected Behavior
The navigation menu should only contain content links (Oferta, O mnie, etc.), while the logo acts as the primary Home button.

## Actual Behavior
Both a "Start" link and the Logo were providing the same functionality.

## Technical Root Cause
The `links` array in `Navbar.jsx` included the home path `/` with the label "Start".

## Proposed Fix
Remove the "Start" entry from the navigation array and ensure the logo is properly wrapped/handled for navigation.

### Detailed Task List
- [x] [T001] [Cleanup]: Remove "Start" link from the `links` array in `Navbar.jsx`.
- [x] [T002] [Verification]: Confirm logo redirection still works.

## Resolution
Removed the "Start" link. The desktop and mobile menus now start with "Oferta".

## Verification
- [x] [Functional]: "Start" link is absent from all navigation menus.
- [x] [Functional]: Clicking "Otulenie" logo redirects to home.
- [x] [Technical]: Build passes.
