# Implementation Plan: Floating Island Navbar

**Branch**: `005-navbar` | **Date**: 2026-03-11 | **Spec**: [/specs/005-navbar/spec.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/005-navbar/spec.md)
**Input**: Feature specification from `/specs/005-navbar/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Build a fixed, pill-shaped navbar that morphs its background and style based on the page's scroll position (at 80px threshold). The navbar will transition from a transparent "Hero" state to a semi-transparent linen "Island" state with backdrop blur, using GSAP ScrollTrigger for smooth, cinematic transitions.

## Technical Context

**Language/Version**: React 19.x, Tailwind CSS v4.x
**Primary Dependencies**: GSAP 3 (ScrollTrigger), Lucide React
**Storage**: N/A
**Testing**: Playwright (for mobile/desktop visual regression)
**Target Platform**: Mobile-first Web
**Project Type**: Web Application Landing Page
**Performance Goals**: 60fps animations, fast LCP for mobile
**Constraints**: Tailwind CSS v4 required, single App.jsx unless > 600 lines
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
specs/005-navbar/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── App.jsx              # Main application and navbar component definition
├── index.css            # Tailwind directives, noise overlay, custom utilities
└── components/          # MagneticButton, etc. (shared components)
```

**Structure Decision**: Using the default project structure. The navbar component will be defined in `src/App.jsx` unless the file size exceeds 600 lines, in which case it will be moved to `src/components/Navbar.jsx`. Existing `MagneticButton` from `src/components/` will be reused.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | - | - |
