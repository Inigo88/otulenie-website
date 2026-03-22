# Implementation Plan: Philosophy Manifesto Section

**Branch**: `012-philosophy-section` | **Date**: 2026-03-22 | **Spec**: `/specs/012-philosophy-section/spec.md`
**Input**: Feature specification from `/specs/012-philosophy-section/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Build a dark-themed parallax-supported section using GSAP text reveal animations to highlight brand differentiation. The section will feature abstract, subtle shapes matching the brand palette for background parallax, staggered line-by-line slow text reveal, and fully respect `prefers-reduced-motion` to render static text.

## Technical Context

**Language/Version**: React 19.x, Tailwind CSS v4.x
**Primary Dependencies**: GSAP 3 (ScrollTrigger), Lucide React
**Storage**: N/A
**Testing**: Manual testing and visual verification
**Target Platform**: Mobile-first Web
**Project Type**: Web Application Landing Page
**Performance Goals**: 60fps animations, fast LCP for mobile, no layout thrashing
**Constraints**: Tailwind CSS v4.x is explicitly required, single App.jsx unless >600 lines
**Scale/Scope**: High-fidelity, cinematic 1:1 pixel-perfect implementation

**Technical Decisions**:

- **Text Splitting**: GSAP SplitText is a premium feature, so we will use `SplitType` (or a custom React text-splitting utility) to wrap lines in `overflow-hidden` spans. This achieves the exact line-by-line staggered reveal using standard GSAP `y` translations without requiring a Club GSAP license.
- **Parallax Shapes**: To ensure 60fps performance without layout shifts, background shapes will be implemented as absolute positioned `div`s with CSS radial gradients (or SVGs), using `will-change: transform`. ScrollTrigger will animate their `yPercent` properties (rather than `top` or `margin`).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] I. Premium Aesthetic Foundation (0.05 opacity noise, Otulenie Calm palette, correct typography)
- [x] II. The Focus on Conversion (Supports primary booking action on Booksy)
- [x] III. Micro-Interaction Polish (Magnetic buttons, GSAP animations in useEffect contexts)
- [x] IV. Mobile-First Experience (Vertical stacking, sticky CTA)
- [x] V. Reusable Component Architecture (Check existing components before creating new; single responsibility; shared primitives in `components/`)
- [x] VI. Accessibility Standards (WCAG 2.2 AA: semantic HTML, 4.5:1 contrast, keyboard nav, visible focus, 24×24px targets, ARIA, `prefers-reduced-motion`)

## Project Structure

### Documentation (this feature)

```text
specs/012-philosophy-section/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
└── quickstart.md        # Phase 1 output (/speckit.plan command)
```

### Source Code (repository root)

```text
src/
├── App.jsx              # Implementation of the Manifesto Section contents
└── index.css            # Tailwind directives, noise overlay, custom utilities
```

**Structure Decision**:
The component will be built directly in `src/App.jsx` following the constitution rule (single `App.jsx` unless >600 lines). No complex custom structure is required.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

(No violations found during Constitution Check)
