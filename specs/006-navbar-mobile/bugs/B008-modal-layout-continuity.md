# Bug Report: Modal Layout and Header Continuity (B008)

## Status
Fixed

## Severity
High (Visual Polish / Layout)

## Description
1. The mobile modal is centered vertically instead of being aligned to the top of the screen.
2. The Navbar's "island" container (border, background, shadow) remains visible over the modal content due to higher z-index, creating a jarring "box-in-box" look.
3. The 'X' button and logo (when hidden) still occupy the navbar container which sits on top of the modal.

## Root Cause
- `Navbar` z-index (70) is higher than `MobileMenu` (60).
- `MobileMenu` container uses `items-center justify-center` and padding.
- `Navbar` container style is not fully neutralized when the menu is open.

## Resolution
[To be implemented: Align modal to top, neutralize Navbar island styles when menu is open, and adjust 'X' button positioning.]

## Verification
- [ ] Modal content starts closer to the top of the screen.
- [ ] No border or shadow from the Navbar is visible when the menu is open.
- [ ] 'X' button is positioned naturally within the header area.
