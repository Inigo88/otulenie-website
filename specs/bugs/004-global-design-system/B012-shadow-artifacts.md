# Bug Report: Shadow Artifacts ("Dark Blob")

**Feature**: 1.1.1 Global Design System


## Status
Fixed

## Severity
Low (Visual Polish)

## Description
When the navbar transitioned from the Hero state to the "Island" state (on scroll), a dark smudge or "blob" artifact would briefly appear during the morphing animation, particularly around the edges of the pill container.

## Root Cause
The shadow classes were being applied abruptly during the GSAP transition, and the `backdrop-filter` clipping area was mismatched with the container's morphing `border-radius`.

## Resolution
- Refined the GSAP animation to smoothly interpolate the `backgroundColor` and `backdropFilter`.
- Reduced the initial shadow intensity and used `shadow-md` specifically for the final Island state.
- Ensured `overflow-hidden` was correctly applied to the morphing container.

## Verification
- Slow-motion verification of the GSAP transition confirmed the removal of the artifact.
- Visual inspection on both light and dark background elements.
