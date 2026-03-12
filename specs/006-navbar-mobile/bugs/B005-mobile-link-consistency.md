# Bug Report: Mobile Menu Link Inconsistency

## Status
Fixed

## Severity
Medium (UI/UX Consistency)

## Description
The navigation links in the mobile menu lack the magnetic animation present in the desktop navbar. Additionally, there is a desire for font consistency between the navigation links and the CTA button (both should be sans-serif).

## Root Cause
- `MobileMenu.jsx` uses standard `<a>` tags instead of the `MagneticButton` component.
- Font styling was previously serif and recently switched to sans, but requires final alignment with the "Magnetic" behavior and CTA styling.

## Resolution
[To be implemented: Refactor links in MobileMenu.jsx to use MagneticButton components.]

## Verification
- [ ] Mobile navigation links have magnetic pull effect.
- [ ] Font matches the CTA button typography.
- [ ] Build passes / No regressions
