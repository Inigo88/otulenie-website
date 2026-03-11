# Research: Base Interactive UI Components

## Decision: Testing Strategy
- **Decision**: Utilize manual verification and browser-based inspection for this phase.
- **Rationale**: No testing harness (Vitest/Playwright) is currently initialized in the project. Initializing one is out of scope for the current feature plan. Manual verification will focus on:
    - Mobile viewport (390px) responsiveness.
    - 60fps interaction performance using Chrome DevTools.
    - Hover behavior validation against spec (scale 1.03, magnetic offset).
- **Alternatives considered**: Proposing Vitest installation. Rejected to maintain focus on implementation unless explicitly requested by USER.

## Decision: GSAP Magnetic Implementation
- **Decision**: Use `@gsap/react` `useGSAP()` hook with `gsap.quickTo` for performance.
- **Rationale**: `quickTo` is optimized for high-frequency updates like `mousemove`, preventing layout thrashing and maintaining 60fps.
- **Implementation Pattern**:
    - Trap `mousemove` on the button container.
    - Calculate distance from center.
    - Apply `x` and `y` transforms with 0.4 dampening (within 30-50% spec).
- **Alternatives considered**: Standard `gsap.to` on every mouse move. Rejected due to potential lag in cinematic experience.

## Decision: Tailwind v4 Styling
- **Decision**: Use `@theme` variables defined in `index.css` for "Otulenie Calm" palette.
- **Rationale**: Ensures consistency with existing design tokens.
- **Styling Details**:
    - `RoundedContainer`: `bg-linen/70 backdrop-blur-md rounded-[2rem]`.
    - `MagneticButton`: `bg-moss text-linen rounded-full`.
- **Alternatives considered**: Hardcoded hex values. Rejected for maintainability.
