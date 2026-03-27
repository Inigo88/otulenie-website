# Bug B007: Hamburger Icon Line Count

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P2 (Visual Consistency)
**Found in**: Feature 1.2.2 (Full Mobile Navigation Modal)
**Date Created**: 2026-03-12
**Date Resolved**: 2026-03-12

## Description
The mobile hamburger icon was rendering with only 2 horizontal lines. Standard UI design conventions and explicit user request specify a 3-line hamburger menu for better recognition as a navigation trigger.

## Steps to Reproduce
1. Look at the Navbar on a mobile-sized screen.
2. Observe the hamburger icon.

## Expected Behavior
The hamburger icon should consist of 3 horizontal lines of equal thickness and width.

## Actual Behavior
Only the top and bottom lines were present.

## Technical Root Cause
The "precision morph" implementation in `Navbar.jsx` had removed the middle line to simplify the geometry shift towards the two lines of an "X".

## Proposed Fix
Add a third `<line>` to the SVG in `Navbar.jsx` and update the GSAP timeline to handle its visibility (opacity) during the morph.

### Detailed Task List
- [x] [T001] [Implementation]: Add `lineMidRef` and middle line SVG element.
- [x] [T002] [Implementation]: Update GSAP logic in `Navbar.jsx` to fade out middle line on open.
- [x] [T003] [Verification]: Visual check of 3-line state.

## Resolution
Restored the middle line and updated the GSAP orchestration to ensure a clean 3-line to 2-line (X) transition.

## Verification
- [x] [Visual]: Hamburger has 3 visible lines when menu is closed.
- [x] [Visual]: Transition to 'X' remains graceful and symmetric.
