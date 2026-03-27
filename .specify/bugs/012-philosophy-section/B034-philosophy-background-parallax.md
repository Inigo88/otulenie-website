# Bug B034: Philosophy Section Background Visibility and Parallax Failure

**Status**: [x] Resolved
**Severity**: P1 (Branding / Visual Enhancement)
**Found in**: Feature 012 (Philosophy Section)
**Date Created**: 2026-03-22
**Date Resolved**: 2026-03-22

## Description

The Philosophy section background was perceived as "plain" and static. Investigation revealed two root causes:

1. The decorative background shapes (`bg-olive/20` and `bg-sand/10` with high blur) had insufficient contrast against the `bg-moss` background, making them invisible to users.
2. The GSAP parallax animation for these shapes was not updating on scroll, leaving them in a static position.

## Steps to Reproduce

1. Open the homepage and scroll to the Philosophy Manifesto section.
2. Observe the background. Observation: It appears as a solid dark green (Moss) block.
3. Scroll through the section while watching the background. Observation: No depth or movement (parallax) is visible.

## Expected Behavior

- Background should feature subtle but discernible soft shapes that drift at different speeds during scroll, providing a premium sense of depth (Constitution Principle III).
- The shapes should be visible enough to break the uniformity of the dark background without distracting from the text.

## Actual Behavior

- Shapes are virtually invisible (confirmed via browser inspection).
- `transform: translate` values for the shapes do not update during scroll events.

## Technical Root Cause

1. **Low Contrast**: Opacity levels of 10-20% combined with `blur-[100px]` are too low for the dark Moss background.
2. **Parallax Stagnation**: The ScrollTrigger configuration in `App.jsx` for the `shapesRef` loop is not correctly tracking the scroll progress or the `trigger` (`sectionRef.current`) is not providing the expected relative coordinates during the scrub.

## Proposed Fix

### Implementation Strategy

- **Approach**:
    1. Increase background shape opacity and reduce blur slightly to ensure visibility.
    2. Refactor the GSAP `useGSAP` loop to ensure ScrollTrigger is correctly initialized and scrubbing.
    3. Increase the `yPercent` delta to make the movement obvious.
- **Affected Components**:
  - `src/App.jsx`: Update shape classes and parallax animation logic.

### Detailed Task List

- [x] [T001] [Implementation]: Increase background shape visibility in `src/App.jsx` (e.g., `bg-olive/40` and `bg-sand/30`, blur to `80px`).
- [x] [T002] [Implementation]: Update GSAP parallax logic in `src/App.jsx` (increase `yPercent` travel and verify ScrollTrigger triggers).
- [x] [T003] [Verification]: Visual check in browser to ensure shapes are visible and moving during scroll.

## Resolution

The background shapes' visibility was improved by increasing their opacity (Olive to 40%, Sand to 30%) and slightly sharpening the blurs. The parallax logic in `App.jsx` was refactored to ensure the GSAP `ScrollTrigger` correctly tracks the `sectionRef` and provides a significant `yPercent` travel (up to 100%) for a noticeable sense of depth.

## Verification

- [x] [Functional: Shapes move relative to scroll position (parallax)]
- [x] [Visual: Background has discernible depth and soft shapes are visible]
- [x] [Accessibility: Text readability remains high against the background shapes]
- [x] [Technical: GSAP ScrollTrigger updates 60fps without layout shifts]
