# Bug Report: Typography Misalignment in Mobile Menu

**Feature**: 1.2.2 Full Mobile Navigation Modal


## Status
Fixed

## Severity
Medium (Brand Consistency)

## Description
The navigation links in the mobile menu are currently using a "fancy" serif font (`Fraunces`). User requirements specify a simpler, non-fancy (sans-serif) font for these navigation elements.

## Root Cause
The `font-serif` utility class is applied to the navigation anchors in `MobileMenu.jsx`.

## Resolution
[To be implemented: Replace `font-serif` with `font-sans` in MobileMenu navigation links.]

## Verification
- [ ] Mobile navigation links use standard sans-serif typography
- [ ] Legibility is maintained at all viewport scales
- [ ] Build passes / No regressions
