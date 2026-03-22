# Phase 0: Research

## Unknowns Resolved

### 1. Line-by-Line Reveal Functionality

**Decision**: Implement a custom text splitting utility or use `gsap/react`'s capabilities combined with standard DOM manipulation (`SplitType` library) rather than relying on the premium GSAP SplitText plugin.
**Rationale**: The prompt mentions "SplitText reveal animations", however, GSAP SplitText is a Club GSAP premium plugin. To avoid blocking development or encountering licensing issues, we will use a free alternative like `SplitType` or a custom React component that wraps lines in `<span>` tags with `overflow="hidden"` and applies GSAP tweens to their inner children, producing an identical staggered scroll-driven reveal.
**Alternatives considered**:
- Prompting for Club GSAP access (adds dependency friction).
- CSS-only reveal (lacks the precise staggering control and ScrollTrigger integration required by the Constitution).

### 2. Parallax Background Shapes Integration

**Decision**: Use `gsap.to()` within `useGSAP` with `ScrollTrigger` and a `scrub: true` behavior paired with `yPercent` translations on absolutely positioned elements inside the section.
**Rationale**: Using `y` or `yPercent` with `scrub` inside a ScrollTrigger is highly performant. These elements will be placed behind the content (`-z-10`) so they don't block interaction. By defining varying `speed` or `yPercent` values per shape, we achieve depth without triggering document reflows (transformations are hardware-accelerated).
**Alternatives considered**: CSS pure parallax (requires specific 3D DOM structures that often conflict with other ScrollTriggers).
