# Bug Report: Navbar Header Continuity Issues (B006)

**Feature**: 1.2.2 Full Mobile Navigation Modal


## Status
Fixed

## Severity
High (Visual Polish / Discontinuity)

## Description
The hamburger morph animation in the `Navbar` is correctly visible over the modal (due to z-index 70), but the `Navbar` logo also remains visible, creating a "weird" floating header that duplicates branding or creates visual clutter.

## Root Cause
- `Navbar` z-index (70) keeps all its children (Logo + Button) on top of the `MobileMenu` (60).
- Lack of conditional visibility for the logo when `isMenuOpen` is true.

## Resolution
[To be implemented: Add a conditional fade/opacity for the Navbar logo when isMenuOpen is true.]

## Verification
- [ ] Navbar logo fades out when menu is open.
- [ ] Morphing 'X' remains visible and functional.
- [ ] Build passes / No regressions
