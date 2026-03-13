# Bug Report: Mobile Menu Icon Visibility

**Feature**: 1.2.2 Full Mobile Navigation Modal


## Status
Fixed

## Severity
High (Blocking UX)

## Description
On mobile devices, the hamburger menu icon was invisible in the Hero state. While the navbar was present, users had no visual indicator of how to open the navigation menu.

## Root Cause
The icon was hardcoded or conditionally styled to use `text-linen` in the Hero state, which matched the background color almost exactly.

## Resolution
Modified the conditional styling in `Navbar.jsx` for the mobile trigger to use `text-moss` consistently in the Hero state, ensuring it is always visible on the light landing sections.

## Verification
- Verified visibility on 390px viewport (iPhone 12 Pro).
- Confirmed the toggle to the 'X' icon (Close) also remains visible when the overlay is active.
