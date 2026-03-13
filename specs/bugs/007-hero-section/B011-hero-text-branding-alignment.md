# Bug B011: Hero Text Branding Alignment

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P1 (Branding Consistency)
**Found in**: Feature 1.2.3 (Hero Section)
**Date Created**: 2026-03-13
**Date Resolved**: 2026-03-13

## Description
The Hero section headline and CTA button were using standard `white` text instead of the project's primary light neutral, `linen`. This violated the "Grounding Wellness" design system principles and created a slight visual mismatch with other UI elements.

## Steps to Reproduce
1. View the Hero section.
2. Inspect the headline and button text.
3. Compare the color to the "Linen" brand token.

## Expected Behavior
All "off-white" text throughout the application should consistently use the `linen` color token to ensure a warm, premium brand feel.

## Actual Behavior
The text was using hardcoded `#FFFFFF` (white).

## Technical Root Cause
The `h1` and `MagneticButton` components in `Hero.jsx` were hardcoded with `text-white` utility classes instead of the brand `text-linen`.

## Proposed Fix
Replace all instances of `text-white` in `Hero.jsx` with `text-linen`.

### Detailed Task List
- [x] [T001] [Implementation]: Update Headline class in `Hero.jsx`.
- [x] [T002] [Implementation]: Update CTA Button class in `Hero.jsx`.
- [x] [T003] [Verification]: Confirm visual alignment with other linen elements.

## Resolution
Replaced all instances of `text-white` in `Hero.jsx` with `text-linen`.
- Updated `h1` headline.
- Updated `MagneticButton` CTA.

## Verification
- [x] [Visual]: Content matches the brand's linen palette.
- [x] [Visual]: Global palette consistency is maintained.
- [x] [Technical]: Build passes.
