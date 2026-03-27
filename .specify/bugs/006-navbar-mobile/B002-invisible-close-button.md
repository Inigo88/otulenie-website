# Bug B002: Invisible Mobile Close Button

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P0 (Accessibility / UX Blocker)
**Found in**: Feature 1.2.2 (Full Mobile Navigation Modal)
**Date Created**: 2026-03-12
**Date Resolved**: 2026-03-12

## Description
When the mobile navigation modal was open, the close ('X') button was missing or invisible. This created a "trapped" state for mobile users who couldn't easily find how to dismiss the menu overlay.

## Steps to Reproduce
1. Open common mobile menu.
2. Look for the 'X' button to close it.
3. Notice the button is either missing or has zero contrast against the overlay.

## Expected Behavior
The close button ('X') should be prominently visible in the top-right corner or morphing from the hamburger, with high contrast against the menu background.

## Actual Behavior
The menu could only be closed by clicking outside or was completely obscure.

## Technical Root Cause
The `MobileMenu` backdrop overlay (z-index 60) was covering the morphing hamburger in the `Navbar` (z-index 50), and the morphing logic lacked proper color contrast.

## Proposed Fix
Adjust z-index layering and ensure the morphing button triggers a color shift if needed to remain visible over the modal background.

### Detailed Task List
- [x] [T001] [Investigation]: Audit z-index stack of `Navbar` vs `MobileMenu`.
- [x] [T002] [Implementation]: Raise `Navbar` z-index to 70.
- [x] [T003] [Verification]: Verify 'X' button visibility during morph.

## Resolution
Increased `Navbar` z-index above the modal and implemented a precision morph that turns the hamburger into a clearly visible 'X'.

## Verification
- [x] [Functional]: 'X' button is visible and clickable when modal is open.
- [x] [Technical]: Z-index stack is consistent (Navbar: 70 > Menu: 60).
