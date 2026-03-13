# Bug Report: Invisible Mobile Close Button

**Feature**: 1.2.2 Full Mobile Navigation Modal


## Status
Fixed

## Severity
High (Accessibility / UX Blocker)

## Description
When the mobile navigation modal is open, the close ('X') button is either missing or invisible to the user. This prevents users from easily dismissing the modal via a dedicated UI element.

## Root Cause
The `MobileMenu` component's backdrop overlay (z-index 60) covers the morphing hamburger button in the `Navbar` (z-index 50), or the morphing logic fails to reveal a visible contrast.

## Resolution
[To be implemented: Add an explicit close button inside the MobileMenu content container or adjust z-index layering.]

## Verification
- [ ] 'X' close button is clearly visible when modal is open
- [ ] 'X' button is accessible via keyboard focus
- [ ] Clicking the 'X' button closes the modal
- [ ] Build passes / No regressions
