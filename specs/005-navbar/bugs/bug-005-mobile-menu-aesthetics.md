# Bug Report: Mobile Menu Aesthetic & CTA Visibility

## Status
Fixed

## Severity
Medium (UX/Design)

## Description
The initial mobile menu redesign used a full-screen linen overlay that felt "not modern" and lacked visual hierarchy. Specifically, the "Zarezerwuj" (CTA) button was nearly invisible against the light backdrop.

## Root Cause
Poor contrast selection for the mobile-only components and a generic full-screen layout that didn't match the premium "wellness" branding.

## Resolution
- **Layout**: Transitioned from a full-screen overlay to a centered, rounded-corner modal (`rounded-[40px]`).
- **Aesthetic**: Implemented a dark theme (`bg-moss`) for the modal body to create a high-end feel.
- **Contrast**: Updated the CTA button to use `bg-linen` with `text-moss`, ensuring it is the most prominent element in the menu.
- **Interactivity**: Added click-to-close logic for the backdrop.

## Verification
- Mobile user flow verification confirmed that the CTA is now the first thing users notice.
- Visual verification against branding guidelines (premium, cinematic, calm).
