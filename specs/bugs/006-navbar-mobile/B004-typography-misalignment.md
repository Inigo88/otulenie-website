# Bug B004: Typography Misalignment in Mobile Menu

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P1 (Brand Consistency)
**Found in**: Feature 1.2.2 (Full Mobile Navigation Modal)
**Date Created**: 2026-03-12
**Date Resolved**: 2026-03-12

## Description
The navigation links in the mobile menu were using the bold serif font (`Fraunces`). Brand guidelines specify that while headlines should use serifs, navigation elements should use a cleaner, more readable sans-serif font to maintain legibility at various scales.

## Steps to Reproduce
1. Open the mobile menu.
2. Observe the typeface used for "Oferta", "O mnie", etc.

## Expected Behavior
Navigation links should use the brand's sans-serif font for a modern, accessible look.

## Actual Behavior
Links were using `font-serif`, which felt too "heavy" for navigation.

## Technical Root Cause
The `font-serif` utility class was applied to the navigation anchors in `MobileMenu.jsx`.

## Proposed Fix
Switch the utility class to `font-sans` and verify font-weight.

### Detailed Task List
- [x] [T001] [Implementation]: Update CSS classes in `MobileMenu.jsx`.
- [x] [T002] [Verification]: Compare against design system.

## Resolution
Updated the typeface to sans-serif. This improved general legibility and better differentiated navigation from header content.

## Verification
- [x] [Visual]: Mobile links use brand sans-serif typography.
- [x] [Accessibility]: Legibility is maintained.
