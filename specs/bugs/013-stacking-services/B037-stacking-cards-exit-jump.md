# Bug B037: Stacking Cards Exit Jump

**Status**: [ ] Open | [ ] Investigating | [ ] Fix Proposed | [x] Resolved
**Severity**: P2 (Visual Enhancement)
**Found in**: Feature 013 (Stacking Services)
**Date Created**: 2026-03-22
**Date Resolved**: 2026-03-22

## Description

When a card in the "Stacking Services" section is leaving focus (scrolling away), there is a non-smooth transition. Specifically, a "jump" in size occurs instead of a fluid scaling animation. This disrupts the premium feel of the interactive archive.

## Steps to Reproduce

1. Open the site and scroll to the "Stacking Services" section.
2. Scroll through the cards so that a card starts to stack/exit the viewport.
3. Observe the transition as the card leaves the active focus area.
4. Note the abrupt change (jump) in scale.

## Expected Behavior

The transition should be perfectly smooth, with the card scaling down and dimming (brightness) in a continuous motion as it stacks, following the GSAP ScrollTrigger timeline without any abrupt jumps in property values.

## Actual Behavior

The card exhibits an abrupt jump in scale when it reaches a certain scroll threshold or starts leaving the focus area, breaking the fluid animation.

## Technical Root Cause

Investigation via browser automation reveals that the stacking animation (scaling down to 0.9) is triggered prematurely and executes too rapidly. Specifically:

- The scale jump from `1.0` to `0.9` occurs over a tiny scroll window (approx. 16px).
- The trigger `start: "top 80%"` and `end: "top 20%"` for `cards[i+1]` is likely being reached almost immediately because `cards[i+1]` is also `sticky`. Once it reaches its sticky position (at `~8vh`), its `top` relative to the viewport stops changing in the way ScrollTrigger expects if not configured for sticky triggers.
- There is a "dead zone" of ~580px where the active card has already shrunk but the next card hasn't yet entered the top view area, leading to a jarring visual gap.

## Proposed Fix

Adjust the exit (stacking) animation to be triggered by the *entry* of the next card into the active "stacking zone" rather than just its general viewport entry. We need to synchronize the previous card's shrinkage with the next card's arrival at its sticky destination.

### Implementation Strategy

- **Approach**: Shift the `ScrollTrigger` start/end points for the stacking animation. Instead of using the next card reaching `80%` of the viewport (which is too early), we should use a range that corresponds to the next card moving from its entry point to just before it hits sticky.
- **Affected Components**:
  - `src/App.jsx`: Update `StackingArchive` scroll animation logic.

### Detailed Task List

- [x] [T001] [Preparation]: Investigate `App.jsx` stacking logic and GSAP timeline.
- [x] [T002] [Implementation]: Update `ScrollTrigger` breakpoints for stacking transition in `App.jsx`.
- [x] [T003] [Verification]: Verify smooth exit on mobile and desktop viewports.
- [x] [T004] [Cleanup]: Remove any temporary monitoring code if added.

## Resolution

The scale "jump" was caused by conflicting `ScrollTrigger` instances targeting the same `scale` and `filter` properties with overlapping scroll ranges. Because the cards are physically close (approx. 72% of viewport height apart), the next card's entrance trigger would fire before the previous card's entry animation had finished, causing a race condition and a "snap" to the final value.

The solution involved refactoring the animation logic into a **unified lifecycle timeline** for each card:

- A single `ScrollTrigger` now manages the entire span from a card's entry to its stacking behind the next card.
- `immediateRender: false` was used to prevent pre-capturing incorrect scale states.
- The lifecycle is sequenced (Entry -> Hold -> Exit) within one GSAP timeline, ensuring perfect property ownership and smoothness.

## Verification

- [x] [Functional: Card stacks correctly without jumping]
- [x] [Visual: Smooth scaling and brightness transition spanning ~400px of scroll]
- [x] [Accessibility: No jarring flashes or sudden shifts]
- [x] [Technical: GSAP cleanup is maintained via useGSAP]
