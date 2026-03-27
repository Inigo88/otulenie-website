# Implementation Plan: Sticky Stacking Archive

**Branch**: `013-stacking-services` | **Date**: 2026-03-22 | **Spec**: `/specs/013-stacking-services/spec.md`
**Input**: Feature specification from `/specs/013-stacking-services/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Implement a "Sticky Stacking Archive" for massage protocols. The component will render exactly three purely informational scroll-linked stacking cards governed by GSAP ScrollTrigger, providing a 3D pin-and-overlap illusion with depth effects.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: React 19.x, Tailwind CSS v4.x
**Primary Dependencies**: GSAP 3 (ScrollTrigger), Lucide React
**Storage**: N/A
**Testing**: Manual testing in browser + responsive viewports (390px)
**Target Platform**: Mobile-first Web
**Project Type**: Web Application Landing Page
**Performance Goals**: 60fps animations, fast LCP for mobile
**Constraints**: Tailwind v4, global noise, strict color palette, single App.jsx preferred.
**Scale/Scope**: High-fidelity, cinematic 1:1 pixel-perfect implementation (exactly 3 cards).
**Unknowns**: NEEDS CLARIFICATION on optimal GSAP pinning strategy for exactly 3 scaling cards.

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
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# Default Structure (Otulenie Website)
src/
├── App.jsx              # Main application and component definitions
├── index.css            # Tailwind directives, noise overlay, custom utilities
```

**Structure Decision**: Implemented directly in `src/App.jsx` as `StackingArchive` and `StackingCard` components to adhere to the flat structure constraint (until >600 lines).

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
| ----------- | ------------ | ------------------------------------- |
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
