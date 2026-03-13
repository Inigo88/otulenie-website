# Bug Report: Layout Jitter on Scroll Transition

**Feature**: 1.2.1 Floating Island Navbar


## Status
Fixed

## Severity
Medium (UX Quality)

## Description
The navbar was changing its horizontal width and padding during the scroll transition between Hero and Island states. This caused content alignment shifts and a horizontal "jitter" effect that felt unpolished.

## Root Cause
The requirement for the "Island" state to be a more compact pill-shaped container conflicted with the seamless scroll experience. Animating `maxWidth` and `padding` on scroll created layout shifts.

## Resolution
Unified the navbar dimensions across both states. The navbar now maintains a consistent `max-w-800px` (variable controlled) and padding logic. Size changes are now only triggered by viewport resizing, not by scrolling.

## Verification
- Verified on desktop and tablet viewports that the navbar stays vertically stable during scroll.
- Confirmed that aesthetic properties (blur, background tint) still transition smoothly.
