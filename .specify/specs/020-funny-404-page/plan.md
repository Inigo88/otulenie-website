# Implementation Plan: 020-funny-404-page

**Branch**: `020-funny-404-page` | **Date**: 2026-03-27 | **Spec**: [spec.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/.specify/specs/020-funny-404-page/spec.md)
**Input**: Feature specification from `/specs/020-funny-404-page/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Build a branded, "premium-calm" 404 error page for the Otulenie website. The feature includes:
- A custom 404 view that intercepts all non-existent routes.
- A humorous yet calm tagline (3 options to be proposed).
- An AI-generated central visual asset (static image) with a gentle GSAP entrance animation (stored in the `/public` root).
- A "Wróć na stronę główną" (Return Home) button using the `MagneticButton` pattern.
- Strict adherence to the "Otulenie Calm" palette and noise overlay.
- Implementation of `react-router-dom` (or equivalent) to manage routing state.

## Technical Context

**Language/Version**: React 19.x, Tailwind CSS v4.x
**Primary Dependencies**: GSAP 3 (ScrollTrigger), Lucide React, `react-router-dom` (to be added)
**Storage**: N/A (Static Page)
**Testing**: Manual routing verification and mobile viewport check (390px)
**Target Platform**: Mobile-first Web
**Project Type**: Web Application Landing Page
**Performance Goals**: 60fps animations, fast LCP for mobile
**Constraints**: Single `App.jsx` with internal `NotFound` component
**Scale/Scope**: High-fidelity, cinematic 1:1 pixel-perfect implementation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[x] I. Premium Aesthetic Foundation (0.05 opacity noise, Otulenie Calm palette, correct typography)
[x] II. The Focus on Conversion (Retains user via elegant "Return Home" CTA)
[x] III. Micro-Interaction Polish (Magnetic button, GSAP entrance animation)
[x] IV. Mobile-First Experience (Vertical layout stacking)
[x] V. Reusable Component Architecture (Uses existing `MagneticButton`)
[x] VI. Accessibility Standards (Semantic HTML, contrast ratios, keyboard-nav focus)

## Project Structure

### Documentation (this feature)

```text
specs/020-funny-404-page/
├── plan.md              # This file
├── research.md          # Routing decision, visual asset, taglines
├── data-model.md        # UI state documentation
├── quickstart.md        # Feature test guide
├── contracts/           # (Empty)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── App.jsx              # Main application with new Route definitions and NotFound component
├── index.css            # Tailwind directives, noise overlay, custom utilities
└── components/          # Shared primitives (MagneticButton, Navbar, Footer)
```

**Structure Decision**: The feature follows the standard Otulenie single-page structure, but introduces `react-router-dom` to manage the root and "*" routes. `NotFound` will be a well-encapsulated component within `App.jsx`.

## Complexity Tracking

*No violations to document.*
