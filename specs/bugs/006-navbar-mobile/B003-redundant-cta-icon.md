# Bug B003: Unnecessary Icon in Booking CTA

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P2 (Aesthetic Polish)
**Found in**: Feature 1.2.2 (Full Mobile Navigation Modal)
**Date Created**: 2026-03-12
**Date Resolved**: 2026-03-12

## Description
The "Zarezerwuj masaż" Call-to-Action button in the mobile menu contained a calendar icon. UX review identified this as unnecessary visual noise for a minimalist mobile navigation intended to feel "calm and grounding."

## Steps to Reproduce
1. Open the mobile menu.
2. Locate the primary booking button.
3. Observe the icon next to the text.

## Expected Behavior
The CTA should be text-only to maintain the clean, premium aesthetic of the mobile overlay.

## Actual Behavior
A Lucide `Calendar` icon was taking up space and detracting from the typography.

## Technical Root Cause
The `Calendar` icon was explicitly included in the `MagneticButton` content in `MobileMenu.jsx`.

## Proposed Fix
Remove the icon component and adjust the button's internal padding/alignment if necessary.

### Detailed Task List
- [x] [T001] [Cleanup]: Remove icon from `MobileMenu.jsx`.
- [x] [T002] [Verification]: Check button balance.

## Resolution
Removed the icon. The button now focuses purely on the call-to-action text, aligning with the project's minimalist aesthetic.

## Verification
- [x] [Visual]: Booking CTA has no icon.
- [x] [Visual]: Button alignment is centered and visually balanced.
