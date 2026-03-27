# Implementation Plan: Base Interactive UI Components

**Branch**: `004-base-components` | **Date**: 2026-03-11 | **Spec**: [spec.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/004-base-components/spec.md)
**Input**: Feature specification from `/specs/004-base-components/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

This feature involves the creation of base interactive UI components: `MagneticButton` and `RoundedContainer`. These components form the foundation of the "Otulenie Calm" aesthetic, emphasizing micro-interactions and cinematic depth. `MagneticButton` will feature a GSAP-powered magnetic pull effect (30-50% dampen), while `RoundedContainer` will use semi-transparent backgrounds with backdrop-blur and consistent rounding (2-3rem).

## Technical Context

**Language/Version**: React 19.x, Tailwind CSS v4.x
**Primary Dependencies**: GSAP 3 (ScrollTrigger), Lucide React
**Storage**: N/A
**Testing**: Vitest for component logic, Playwright for visual regression (NEEDS CLARIFICATION on existing test harness)
**Target Platform**: Mobile-first Web
**Project Type**: Web Application Landing Page
**Performance Goals**: 60fps animations, fast LCP for mobile
**Constraints**: Tailwind v4 for layout/spacing, CSS variables for "Otulenie Calm" palette, GSAP for all transformations. Single `App.jsx` unless >600 lines.
**Scale/Scope**: High-fidelity, cinematic 1:1 pixel-perfect implementation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[x] I. Premium Aesthetic Foundation (0.05 opacity noise, Otulenie Calm palette, correct typography)
[x] II. The Focus on Conversion (Supports primary booking action on Booksy)
[x] III. Micro-Interaction Polish (Magnetic buttons, GSAP animations in useEffect contexts)
[x] IV. Mobile-First Experience (Vertical stacking, sticky CTA)

## Project Structure

### Documentation (this feature)

```text
specs/004-base-components/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
# Default Structure (Otulenie Website)
src/
├── App.jsx              # Main application and component definitions
├── index.css            # Tailwind directives, noise overlay, custom utilities
└── components/          # (Optional) Only if App.jsx > 600 lines
```

**Structure Decision**: The project will follow a single-file approach for simplicity unless the `App.jsx` exceeds 600 lines. Components for `MagneticButton` and `RoundedContainer` will be defined initially within or alongside `App.jsx`.

## Verification Plan

### Automated Tests
*None available in project.* Proposing manual verification flow.

### Manual Verification
1.  **Interaction Check**:
    *   Open dev server (`npm run dev`).
    *   Hover over `MagneticButton`: Verify a smooth magnetic pull (dampened ~40%) and `scale(1.03)`.
    *   Mouse out: Verify smooth return to center.
2.  **Mobile Verification**:
    *   Set Chrome DevTools to `390x844` (iPhone 12/13/14).
    *   Verify `MagneticButton` disables magnetic pull but maintains tap scale/feedback.
    *   Verify `RoundedContainer` padding adjusts correctly for mobile.
3.  **Visual Polish**:
    *   Verify `RoundedContainer` has `backdrop-blur` and ~70% opacity linen background.
    *   Verify typography (Fraunces/Inter) matches the design system.
4.  **Accessibility**:
    *   Verify button is focusable via Tab and has a visible focus ring.
