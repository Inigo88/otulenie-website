# Bug Report: Inconsistent Navigation Links Across Components and Specs

## Status
Fixed

## Severity
Medium (Consistency / UX / Product Alignment)

## Description
The navigation links in the desktop `Navbar.jsx` were out of sync with the product backlog and feature specifications. Specifically, it was missing the "Start" and "Obszar dojazdu" links. Additionally, the primary CTA button used the label "Zarezerwuj" instead of the canonical "Zarezerwuj masaż".

## Root Cause
The initial `Navbar.jsx` implementation used a simplified set of links that did not account for the defined scope in the product backlog and the "Floating Island Navbar" specification (005).

## Resolution
- Synchronized the `links` array in `Navbar.jsx` to include: Start, Oferta, O mnie, Obszar dojazdu, and FAQ.
- Updated the primary CTA button label to "Zarezerwuj masaż".
- Updated `specs/005-navbar/spec.md` to reflect the unified canonical link list.

## Verification
- [x] Confirmed `Navbar.jsx` contains 5 links + 1 CTA.
- [x] Confirmed all links map to existing backlog features.
- [x] Confirmed `specs/005-navbar/spec.md` is consistent with the implementation.
- [x] Build passes.
