# Research: Hero Section Technical Patterns

## Decision: Unsplash for Background Assets
- **Decision**: Use high-resolution Unsplash images filtered by the "Otulenie Calm" palette.
- **Rationale**: Project constitution mandates real images with specific mood. Option B (Grounding Wellness) requires high-quality textures (wood/linen).
- **Alternatives considered**: AI-generated images (rejected per constitution), Stock libraries (rejected for cost/authenticity).

## Decision: GSAP staggered fade-up for React 19
- **Decision**: Use `@gsap/react` `useGSAP` hook for scoped animation management.
- **Rationale**: Ensures animations are cleaned up on unmount and prevents double-triggers in React 18/19 Strict Mode.
- **Alternatives considered**: Standard `useEffect` (requires manual cleanup), CSS animations (lack fine-grained stagger control).

## Decision: `100dvh` for Viewport Height
- **Decision**: Use `min-h-[100dvh]` via Tailwind.
- **Rationale**: Specifically designed for mobile browsers to handle dynamic address bars without layout jumping.
- **Alternatives considered**: `100vh` (causes overflow shifts), `100svh` (too small when bars hidden).

## Decision: Cross-Component Signalling for Navbar Reveal
- **Decision**: Lift `isHeroComplete` state to `App.jsx` or use a shared layout state. Pass an `onComplete` callback from `App` to `Hero`.
- **Rationale**: Simple, predictable, and React-idiomatic. Decouples the Navbar from the Hero's internal GSAP timelines.
- **Alternatives considered**: Redux/Context (overkill for single state), Custom Events (less "React-way").
