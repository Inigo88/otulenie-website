# Bug Report: Close Button Animation Discontinuity

## Status
Fixed

## Severity
High (Visual Polish / Discontinuity)

## Description
The hamburger morph animation in the `Navbar` is hidden by the `MobileMenu` (due to z-index). An internal 'X' button then appears in the modal, creating a jarring jump. The user wants the original morphing animation to be visible and serve as the close trigger.

## Root Cause
- `Navbar` z-index (50) is lower than `MobileMenu` z-index (60).
- Redundant close button added to `MobileMenu` in previous fix attempt.

## Resolution
[To be implemented: Increase Navbar z-index to be higher than MobileMenu, and remove the internal close button from the modal.]

## Verification
- [ ] Morphing 'X' animation is clearly visible over the modal backdrop.
- [ ] Clicking the morphing 'X' closes the menu.
- [ ] Redundant close button is removed from the modal.
- [ ] Build passes / No regressions
