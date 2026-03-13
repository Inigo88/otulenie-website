# Bug B012: Shadow Artifacts ("Dark Blob")

**Status**: [x] Open | [x] Investigating | [x] Fix Proposed | [x] Resolved
**Severity**: P2 (Visual Polish)
**Found in**: Feature 1.1.1 (Global Design System)
**Date Created**: 2026-03-10
**Date Resolved**: 2026-03-10

## Description
When the navbar transitioned from the Hero state to the "Island" state (on scroll), a dark smudge or "blob" artifact would briefly appear during the morphing animation, particularly around the edges of the pill container.

## Steps to Reproduce
1. Scroll down until the navbar morphs into the Island state.
2. Observe the edges of the container during the transition.
3. Notice a brief dark flicker/artifact at the corners.

## Expected Behavior
The transition should be visually seamless without any temporary rendering artifacts or shadow glitches.

## Actual Behavior
A dark smudge appeared briefly during the interpolation.

## Technical Root Cause
The shadow classes were being applied abruptly during the GSAP transition, and the `backdrop-filter` clipping area was mismatched with the container's morphing `border-radius`.

## Proposed Fix
Refine the GSAP timeline to smoothly interpolate `backgroundColor` and `backdropFilter`, and manage shadow intensity programmatically.

### Detailed Task List
- [x] [T001] [Implementation]: Update GSAP interpolation values in `Navbar.jsx`.
- [x] [T002] [Implementation]: Apply `overflow-hidden` to avoid clipping artifacts.
- [x] [T003] [Verification]: Visual slow-motion check.

## Resolution
- Smoothly interpolated `backgroundColor` and `backdropFilter`.
- Reduced initial shadow intensity and used `shadow-md` for the final state.

## Verification
- [x] [Visual]: Slow-motion verification confirmed removal of the artifact.
- [x] [Technical]: Transition is smooth on all background elements.
- [x] [Technical]: Build passes.
