# Bug B011: Hero Text Branding Alignment

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P1 (Branding Consistency)
**Found in**: Feature 1.2.3 (Hero Section)

## Description
The Hero section headline and CTA button were using standard `white` text instead of the project's primary light neutral, `linen`. This violated the "Grounding Wellness" design system principles.

## Expected Behavior
All "off-white" text throughout the application should consistently use the `linen` color token to ensure a warm, premium brand feel.

## Technical Root Cause
The `h1` and `MagneticButton` components in `Hero.jsx` were hardcoded with `text-white` utility classes.

## Resolution
Replaced all instances of `text-white` in `Hero.jsx` with `text-linen`.
- Updated `h1` headline.
- Updated `MagneticButton` CTA.
