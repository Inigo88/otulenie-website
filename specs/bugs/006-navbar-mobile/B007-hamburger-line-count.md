# Bug Report: Hamburger Icon Line Count (B007)

**Feature**: 1.2.2 Full Mobile Navigation Modal


## Status
Fixed

## Severity
Low (Visual Consistency)

## Description
The hamburger icon currently renders with only 2 horizontal lines. Standard design convention and user request specify a 3-line hamburger menu.

## Root Cause
- The "precision morph" implementation in `Navbar.jsx` removed the middle line to simplify the morphing transition to an "X".

## Resolution
[To be implemented: Add a middle line to the SVG and update GSAP to fade it out during morph.]

## Verification
- [ ] Hamburger has 3 visible lines in closed state.
- [ ] Morphing to 'X' remains smooth and symmetric.
