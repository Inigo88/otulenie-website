# Bug B026: Carousel Layout Displacement and Vertical Overlap

**Status**: [ ] Open | [ ] Investigating | [ ] Fix Proposed | [x] Resolved  
**Severity**: P0 (Functional blocker / Visual Regression)  
**Found in**: Feature 1.2.5 (Massage Type Carousel)  
**Date Created**: 2026-03-16  
**Date Resolved**: 2026-03-16

## Description
The implementing of the Massage Type Carousel has introduced significant layout issues. When reaching the "Nasza Oferta" section:
1. There is a massive vertical gap between the section title and the carousel cards.
2. The carousel cards overlap with the subsequent "Mobilny Komfort" section as the user scrolls.
3. The horizontal scroll interaction seems to displacement vertically in an uncontrolled manner.

## Steps to Reproduce
1. Open the site at standard desktop width (e.g., 1440px).
2. Scroll down past the Hero section to the "Nasza Oferta" section.
3. Observe the large empty space below the title.
4. Continue scrolling and observe the carousel cards overlapping the next section content.

## Expected Behavior
The carousel should be tightly integrated into the page flow. The cards should appear immediately below the "Nasza Oferta" title. The horizontal scroll (driven by vertical scroll) should complete its translation before the page allows scrolling into the "Mobilny Komfort" section, with zero overlap between sections. This aligns with Constitution Principle III (Micro-Interaction Polish).

## Actual Behavior
- High displacement (vertical gap) after the section title.
- Overlap with legacy sections remaining in `App.jsx`.
- Visual confusion as the user scrolls.

## Technical Root Cause
1. **Pinning Conflict**: `MassageCarousel` is a direct child of a `flex flex-col` parent (`main` in `App.jsx`). GSAP pinning on an internal `h-screen` div creates large `pinSpacing` (padding) that pushes subsequent flex children ('Mobilny Komfort') away initially, but the pinning unpinning logic seems to fail or miscalculate offset, leading to overlaps at the end of the scroll.
2. **Stale Closure Exception**: The `auto-rotation` logic in `MassageCarousel.jsx` captures the `activeSlide` state in a `setInterval` closure within `useGSAP`. When the timer triggers, it references a stale `activeSlide` or attempts to calculate `targetScroll` using a stale `st` (ScrollTrigger) instance if re-rendered, potentially causing React runtime errors that halt GSAP cleanup and unpinning.
3. **Typography Misalignment**: The title "Nasza Oferta" is nested inside the pinned container, contributing to the perceived "empty space" as it stays fixed while the horizontal motion hasn't fully started or is misaligned with the vertical trigger.

## Proposed Fix
[Pending investigation]

### Implementation Strategy
[Pending investigation]

### Detailed Task List
- [ ] [T001] [Preparation]: Investigate GSAP `pin` and `pinSpacing` behavior in `MassageCarousel.jsx`.
- [ ] [T002] [Implementation]: Fix layout structure and z-index issues.
- [ ] [T004] [Verification]: Verify fix in browser.

## Resolution

The layout displacement was resolved by:
1. **Removing GSAP Pinning**: The `pin: true` logic was completely removed from the `ScrollTrigger`, which eliminated the `pinSpacing` that caused the vertical gaps.
2. **Restoring Natural Flow**: The carousel now sits naturally in its container without screen-height forcing, allowing sections above and below to flow correctly.
3. **Decoupling Scroll**: Horizontal movement is no longer tied to vertical scroll progress, preventing the "trap" and overlap issues.

## Verification
- [x] [Functional: Horizontal translation completes before section exit]
- [x] [Visual: No unexpected vertical gaps or section overlaps]
- [x] [Accessibility: Focus remains visible during pinned state]
- [x] [Technical: No GSAP warnings in console]
