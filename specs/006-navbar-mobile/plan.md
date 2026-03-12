# Implementation Plan: Full Mobile Navigation Modal

**Branch**: `006-navbar-mobile` | **Date**: 2026-03-12 | **Spec**: [spec.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/006-navbar-mobile/spec.md)
**Input**: Feature specification from `/specs/006-navbar-mobile/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Develop a high-fidelity "Full Mobile Navigation Modal" for mobile viewports (< 768px). The modal will feature a staggered GSAP reveal of navigation links (Start, Oferta, O mnie, Obszar dojazdu, FAQ) and a prominent "Zarezerwuj masaż" CTA. The navbar will morph into a "Close" button using GSAP path animation. Accessibility will be prioritized with a focus trap and ARIA landmarks to meet WCAG 2.2 AA standards.

## Technical Context

**Language/Version**: React 19.x, Tailwind CSS v4.x
**Primary Dependencies**: GSAP 3 (ScrollTrigger), Lucide React
**Storage**: N/A
**Testing**: Manual Browser Verification (Mobile Viewport)
**Target Platform**: Mobile-first Web
**Performance Goals**: 60fps animations, fast LCP for mobile
**Constraints**: No Tailwind unless explicitly required, single App.jsx unless >600 lines
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
specs/006-navbar-mobile/
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
└── components/          
    ├── Navbar.jsx       # Modified to trigger modal
    ├── MagneticButton.jsx
    └── MobileMenu.jsx   # [NEW] Modal component
```

**Structure Decision**: Modular breakout of `MobileMenu.jsx` to keep `Navbar.jsx` clean and adhere to Principle V.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [None] | | |
