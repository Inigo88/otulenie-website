# Bug Report: Unnecessary Icon in Booking CTA

**Feature**: 1.2.2 Full Mobile Navigation Modal


## Status
Fixed

## Severity
Low (Aesthetic Polish)

## Description
The "Zarezerwuj masaż" Call-to-Action button in the mobile menu contains a calendar icon which has been identified as unnecessary noise for the mobile navigation design.

## Root Cause
The `Calendar` icon from `lucide-react` is explicitly rendered inside the `MagneticButton` in `MobileMenu.jsx`.

## Resolution
[To be implemented: Remove the Calendar icon component from the MobileMenu markup.]

## Verification
- [ ] Booking CTA in mobile menu has no icon
- [ ] Button alignment remains centered and balanced
- [ ] Build passes / No regressions
