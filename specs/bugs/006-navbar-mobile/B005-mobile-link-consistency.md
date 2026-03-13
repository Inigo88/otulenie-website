# Bug Report: Mobile Menu Link Inconsistency (B005)

**Feature**: 1.2.2 Full Mobile Navigation Modal


## Status
Fixed

## Severity
Medium (UI/UX Consistency)

## Description
The navigation links in the mobile menu lack the magnetic animation present in the desktop navbar. Additionally, the font size (`text-4xl`) is significantly larger than the CTA button (`text-xl`), causing visual imbalance.

## Root Cause
- `MagneticButton.jsx` does not support `forwardRef`, preventing GSAP in `MobileMenu.jsx` from targeting the DOM elements for stagger animations.
- Font size mismatch between links and CTA.

## Resolution
[To be implemented: Add forwardRef to MagneticButton, update MobileMenu typography to text-2xl, and fix GSAP targets.]

## Verification
- [ ] Mobile navigation links have magnetic pull effect.
- [ ] Font size matches/complements the CTA button typography.
- [ ] Stagger entrance animation works.
- [ ] Build passes / No regressions
