# Bug B006: Navbar Header Continuity Issues

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P1 (Visual Polish / Discontinuity)
**Found in**: Feature 1.2.2 (Full Mobile Navigation Modal)
**Date Created**: 2026-03-12
**Date Resolved**: 2026-03-12

## Description
When the mobile modal was open, the Navbar logo remained visible at the top, creating a cluttered "floating header" that overlapped the modal's internal aesthetics. While the 'X' button should stay, the logo creates unnecessary branding duplication.

## Steps to Reproduce
1. Open the mobile menu.
2. Observe the top-left corner of the screen.
3. Observe the Navbar logo still visible over the overlay.

## Expected Behavior
The Logo should fade out or be hidden when the mobile menu is active, leaving only the close button ('X') for a clean, immersive modal experience.

## Actual Behavior
The Logo stayed visible with high contrast over the modal links.

## Technical Root Cause
The `Navbar` z-index (70) placed all its children (Logo + Hamburger) on top of the `MobileMenu` (60), and there was no conditional opacity logic for the logo child.

## Proposed Fix
Add a conditional opacity/translation class to the Logo in `Navbar.jsx` that triggers when `isMenuOpen` is true.

### Detailed Task List
- [x] [T001] [Implementation]: Add conditional classes to the Logo anchor in `Navbar.jsx`.
- [x] [T002] [Verification]: Verify Logo fades out when menu toggle is clicked.

## Resolution
Implemented a smooth fade-out and slight translation for the Logo when the menu is open, ensuring the mobile modal feels like its own dedicated space.

## Verification
- [x] [Visual]: Navbar logo fades out when menu is open.
- [x] [Functional]: 'X' button remains visible and functional.
- [x] [Technical]: Build passes.
