# Bug Report: Redundant "Start" Navigation Link

## Status
Fixed

## Severity
Low (UX Consistency)

## Description
The "Start" link is present in the navigation array, appearing in both the desktop navbar and mobile menu. The brand logo "Otulenie" should handle the home redirect, making an explicit "Start" link redundant.

## Root Cause
Hardcoded "Start" entry in the `links` array within `Navbar.jsx`.

## Resolution
[To be implemented: Remove "Start" from the links array and wrap the logo in an interactive element.]

## Verification
- [ ] "Start" link is absent from desktop navbar
- [ ] "Start" link is absent from mobile navigation menu
- [ ] Clicking the "Otulenie" logo redirects to home
- [ ] Build passes / No regressions
