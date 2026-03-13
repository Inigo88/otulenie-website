# Implementation Plan: Hero Section

**Branch**: `007-hero-section` | **Date**: 2026-03-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/007-hero-section/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

The Hero section is the digital "handshake" for Otulenie, designed to establish a cinematic, premium aesthetic immediately upon landing. It will be a full-height (`100dvh`) section featuring a "Grounding Wellness" static background image (wood, linen, natural light) with a dark gradient overlay for text legibility. Key brand messaging ("Relaks, który przyjeżdża do Ciebie") will be revealed via staggered GSAP fade-up animations. The Navbar (Floating Island) will remain hidden during the initial entrance sequence, fading in ~0.5s after the final Hero element (the CTA button) finishes its entrance. A primary `MagneticButton` for Booksy registration will be the central call to action.

## Technical Context

**Language/Version**: React 19.x, Tailwind CSS v4.x
**Primary Dependencies**: GSAP 3 (ScrollTrigger), Lucide React
**Storage**: N/A
**Testing**: Manual visual verification (Desktop/Mobile), Performance audit (CLS, LCP)
**Target Platform**: Mobile-first Web
**Project Type**: Web Application Landing Page
**Performance Goals**: 60fps animations, fast LCP for mobile, CLS < 0.1
**Constraints**: Strictly adhere to "Otulenie Calm" palette and typography; navbar reveal timing must be frame-accurate to Hero completion.
**Scale/Scope**: High-fidelity, cinematic 1:1 pixel-perfect implementation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] I. Premium Aesthetic Foundation (0.05 opacity noise, Otulenie Calm palette, correct typography)
- [x] II. The Focus on Conversion (Primary "Zarezerwuj masaż" CTA prominent)
- [x] III. Micro-Interaction Polish (Magnetic buttons, GSAP animations in useEffect contexts)
- [x] IV. Mobile-First Experience (Vertical stacking, `dvh` units for viewport height)
- [x] V. Reusable Component Architecture (Reuse `MagneticButton`, encapsulate new `Hero` component)
- [x] VI. Accessibility Standards (WCAG 2.2 AA: semantic H1/H2, 4.5:1 contrast, keyboard nav, prefers-reduced-motion)

## Project Structure

### Documentation (this feature)

```text
specs/007-hero-section/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── App.jsx              # Application orchestration
├── components/          # Reusable components
│   ├── Hero.jsx         # [NEW] Hero section component
│   ├── MagneticButton.jsx # Cross-feature reuse
│   └── Navbar.jsx       # Existing component (to be updated for reveal logic)
└── index.css            # Noise and global styles
```

**Structure Decision**: 
I will create a dedicated `src/components/Hero.jsx` to encapsulate the complex GSAP logic and layout for this section, keeping `App.jsx` clean and following Principle V.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A       |            |                                     |
