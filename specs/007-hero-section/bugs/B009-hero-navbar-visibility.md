# Bug B009: Navbar Visibility on Hero Section

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P0 (Functional/Aesthetic blocker)
**Found in**: Feature 1.2.3 (Hero Section)

## Description
The Navbar is nearly invisible when at the top of the page (Hero state). The text color is currently fixed to `moss` (#374833), which provides insufficient contrast against the dark cinematic background of the Hero section.

## Steps to Reproduce
1. Load the website.
2. Observe the Navbar entrance on the Hero section.
3. Observe that text ("Otulenie", menu links) is very dark and blends into the background.

## Expected Behavior
The Navbar should use **white/linen** text when at the top (Hero state) to ensure high contrast against the dark background, as per FR-002. It should only switch to `moss` text when morphing into the "Island" state (white background).

## Actual Behavior
The Navbar uses `moss` text in both states, resulting in a "hidden" look at the top.

## Technical Root Cause
The `NavLink` and logo text in `Navbar.jsx` are hardcoded to `text-moss/70` and `text-moss`, regardless of the `isHero` prop state.

## Proposed Fix
Update `Navbar.jsx` text color classes to toggle between `text-linen` (when `isHero` is true) and `text-moss` (when `isHero` is false).

## Resolution
Implemented dynamic text color classes in `Navbar.jsx`.
- Logo and Hamburger: Switch between `text-linen` (Hero) and `text-moss` (Island).
- NavLinks: Switch between `text-linen/80` (Hero) and `text-moss/70` (Island).
- Verified via browser screenshots `hero_state_navbar` and `island_state_navbar`.
