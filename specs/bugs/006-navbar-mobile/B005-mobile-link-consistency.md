# Bug B005: Mobile Menu Link Inconsistency

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P2 (UI/UX Consistency)
**Found in**: Feature 1.2.2 (Full Mobile Navigation Modal)
**Date Created**: 2026-03-12
**Date Resolved**: 2026-03-12

## Description
The navigation links in the mobile menu lacked the magnetic animation present in the desktop navbar. Furthermore, the font size (`text-4xl`) was disproportionately large compared to the CTA button, creating a "clunky" feel.

## Steps to Reproduce
1. Open the mobile menu on a device that supports hover/magnetic effects.
2. Move the cursor near a link; observe no magnetic pull.
3. Observe the scale difference between links and the booking button.

## Expected Behavior
1. All navigation links should follow the "Magnetic" interaction pattern.
2. Typography should have a cohesive hierarchy (links should not dwarf the CTA).

## Actual Behavior
Links were static and oversized.

## Technical Root Cause
- `MagneticButton.jsx` was a functional component without `forwardRef`, so GSAP couldn't target the underlying DOM node for the pull effect.
- The `text-4xl` class was applied unconditionally to the mobile links.

## Proposed Fix
Add `forwardRef` to the `MagneticButton` component and downscale the typography in `MobileMenu.jsx`.

### Detailed Task List
- [x] [T001] [Implementation]: Wrap `MagneticButton` in `forwardRef`.
- [x] [T002] [Implementation]: Adjust font size in `MobileMenu.jsx` to `text-2xl`.
- [x] [T003] [Verification]: Verify magnetic pull on links.

## Resolution
Refactored `MagneticButton` to support refs and adjusted the mobile menu layout for better typographic balance.

## Verification
- [x] [Functional]: Mobile links exhibit magnetic pull.
- [x] [Visual]: Font scale is corrected and harmonious.
