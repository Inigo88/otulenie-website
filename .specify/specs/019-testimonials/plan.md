# Implementation Plan: 019-testimonials

**Branch**: `019-testimonials` | **Date**: 2026-03-27 | **Spec**: [.specify/specs/019-testimonials/spec.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/.specify/specs/019-testimonials/spec.md)
**Input**: Feature specification for "Featured Testimonials Section"

## Summary

Implement a premium, GSAP-animated "Featured Testimonials" section titled "Głosy spokoju". This section will showcase 5 client reviews from Booksy using a cinematic layout that stacks vertically on mobile and uses a horizontal auto-playing slider on desktop. The implementation will focus on high-fidelity animations and adherence to the "Otulenie Calm" design system.

## Technical Context

**Language/Version**: React 19.x, Tailwind CSS v4.x
**Primary Dependencies**: GSAP 3 (ScrollTrigger), Lucide React (Star, Quote icons)
**Storage**: Static data array in `App.jsx`
**Testing**: Manual visual verification on mobile (390px) and desktop viewports.
**Target Platform**: Mobile-first Web
**Project Type**: Web Application Landing Page
**Performance Goals**: 60fps animations, smooth ScrollTrigger reveals
**Constraints**: Tailwind v4 direct styling, single `App.jsx` (currently ~400 lines), absolute positioning for noise overlay.
**Scale/Scope**: Section-level implementation with custom `TestimonialCard` component.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[x] I. Premium Aesthetic Foundation (Moss #374833, Linen #fdfaf0, Olive #6E8068; Fraunces/Inter fonts; Noise overlay)
[x] II. The Focus on Conversion (Establishes trust via social proof to drive Booksy bookings)
[x] III. Micro-Interaction Polish (GSAP staggered fade-up; subtle hover lift on desktop)
[x] IV. Mobile-First Experience (Vertical stack on mobile; simplified navigation)
[x] V. Reusable Component Architecture (Applying `RoundedContainer` styling pattern to cards)
[x] VI. Accessibility Standards (WCAG 2.2 AA contrast; `prefers-reduced-motion` support; Semantic `<article>` tags)

## Project Structure

### Documentation (this feature)

```text
.specify/specs/019-testimonials/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── App.jsx              # Main application (Add Testimonials section)
└── index.css            # Use existing Tailwind v4 setup
```

**Structure Decision**: Add `TestimonialSection` and `TestimonialCard` components directly to `App.jsx` as it is currently below the 600-line threshold.

## Complexity Tracking

*No constitution violations identified.*
