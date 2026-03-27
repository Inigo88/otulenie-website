# Implementation Plan: Interactive Features Cards

**Branch**: `008-features-cards` | **Date**: 2026-03-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/008-features-cards/spec.md`

## Summary

Implement three micro-UIs (Diagnostic Shuffler, Telemetry Typewriter, and Cursor Protocol Scheduler) to enhance engagement and conversion. The approach uses a responsive grid of card components built with React 19 and GSAP for high-fidelity motion. Data is statically managed via dedicated entities for performance and predictability.

## Technical Context

**Language/Version**: React 19.x, Tailwind CSS v4.x
**Primary Dependencies**: GSAP 3 (ScrollTrigger), Lucide React
**Storage**: N/A
**Testing**: Manual visual regression & accessibility validation
**Target Platform**: Mobile-first Web
**Project Type**: Web Application Landing Page
**Performance Goals**: 60fps animations, fast LCP for mobile
**Constraints**: Single App.jsx unless > 600 lines
**Scale/Scope**: High-fidelity, cinematic 1:1 pixel-perfect implementation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[x] I. Premium Aesthetic Foundation (0.05 opacity noise, Otulenie Calm palette, correct typography)
[x] II. The Focus on Conversion (Supports primary booking action on Booksy)
[x] III. Micro-Interaction Polish (Magnetic buttons, GSAP animations in useEffect contexts)
[x] IV. Mobile-First Experience (Vertical stacking, sticky CTA)
[x] V. Reusable Component Architecture (Check existing components before creating new; single responsibility; shared primitives in `components/`)
[x] VI. Accessibility Standards (WCAG 2.2 AA: semantic HTML, 4.5:1 contrast, keyboard nav, visible focus, 24×24px targets, ARIA, `prefers-reduced-motion`)

## Project Structure

### Documentation (this feature)

```text
specs/008-features-cards/
├── plan.md              # This file
├── research.md          # Technical approach and animation logic
├── data-model.md        # Entity definitions
├── quickstart.md        # Local setup and testing guide
└── tasks.md             # Implementation steps (generated next)
```

### Source Code

```text
src/
├── App.jsx              # Section integration
├── index.css            # Noise and global styles
└── components/
    ├── FeatureCards/
    │   ├── FeatureCards.jsx        # Grid container
    │   ├── DiagnosticShuffler.jsx  # Loop animation
    │   ├── TelemetryTypewriter.jsx # Typing effect
    │   └── CursorProtocolScheduler.jsx # Mock scheduler
    ├── MagneticButton.jsx   # Existing primitive
    └── RoundedContainer.jsx # Existing primitive
```

**Structure Decision**: Using a `FeatureCards/` sub-directory within `components/` to encapsulate the three related micro-UIs while keeping `App.jsx` under the 600-line threshold.

## Complexity Tracking

*No Constitution violations identified.*
