# Implementation Plan: Massage Types Carousel

**Branch**: `009-massage-types-carousel` | **Date**: 2026-03-15 | **Spec**: [spec.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/009-massage-types-carousel/spec.md)
**Input**: Feature specification from `/specs/009-massage-types-carousel/spec.md`

## Summary

Consolidate the "Oferta" CTA and micro-interaction cards into a single, high-fidelity responsive carousel using GSAP and ScrollTrigger. The carousel will showcase 4 signature massage types with direct Booksy booking capability, including a "Free consultation" fallback for missing data.

## Technical Context

**Language/Version**: React 19.x, Tailwind CSS v4.x
**Primary Dependencies**: GSAP 3 (ScrollTrigger), Lucide React
**Storage**: N/A
**Testing**: Playwright (for cross-browser responsiveness and interaction)
**Target Platform**: Mobile-first Web
**Project Type**: Web Application Landing Page
**Performance Goals**: 60fps animations, fast LCP for mobile
**Constraints**: Tailwind v4.x, single App.jsx (unless >600 lines), GSAP for all animations
**Scale/Scope**: High-fidelity, cinematic 1:1 pixel-perfect implementation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[x] I. Premium Aesthetic Foundation (0.05 opacity noise, Otulenie Calm palette, correct typography)
[x] II. The Focus on Conversion (Supports primary booking action on Booksy)
[x] III. Micro-Interaction Polish (Magnetic buttons, GSAP animations in useEffect contexts)
[x] IV. Mobile-First Experience (Vertical stacking, sticky CTA)
[x] V. Reusable Component Architecture (Shared primitives in `components/`)
[x] VI. Accessibility Standards (WCAG 2.2 AA: semantic HTML, 4.5:1 contrast, keyboard nav, visible focus, 24×24px targets, ARIA, `prefers-reduced-motion`)

## Project Structure

### Documentation (this feature)

```text
specs/009-massage-types-carousel/
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

**Structure Decision**: Standard Otulenie structure. Will evaluate if `src/components/MassageCarousel.jsx` is needed if `App.jsx` grows.

## Proposed Changes

### UI Components

#### [NEW] [MassageCarousel.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/components/MassageCarousel.jsx)

Implement a high-fidelity carousel using GSAP `ScrollTrigger` and `Draggable`.
- Render 5 cards (4 massage types + 1 Consultation fallback).
- Support horizontal translation on vertical scroll (desktop) and direct touch/drag (mobile).
- Implement 5s auto-rotation (pause on hover).
- Display pagination dots reflecting active slide.
- Use `useReducedMotion` hook for accessibility.

---

### Application Entry

#### [MODIFY] [App.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/App.jsx)

- Import and mount `MassageCarousel`.
- Remove current "Oferta" section (`RoundedContainer` with CTA) and `<FeatureCards />`.
- Ensure proper spacing and section background consistency.

## Verification Plan

### Automated Tests
*Note: No existing test suite found. Browser-based verification will be used.*

1. **Accessibility Scan**:
   - Run `accessibility_audit` on the landing page once the carousel is mounted.
   - Verify 4.5:1 contrast and semantic header hierarchy.

### Manual Verification
1. **Responsiveness**:
   - Resize browser to 375px (Mobile). Verify cards stack or partially reveal to indicate horizontal scroll. Test swipe interaction.
   - Resize browser to >1024px (Desktop). Verify cards are centered and translate horizontally on vertical scroll.
2. **Interactions**:
   - Verify hover on "Zarezerwuj" button scales by 1.03.
   - Verify clicking dots navigates to the respective card.
   - Verify auto-rotation triggers every 5 seconds and pauses on hover.
3. **Conversion**:
   - Verify clicking any "Zarezerwuj" button opens `booksy.com` in a NEW tab.
4. **Fallback**:
   - Manually corrupt a section in `massage-descriptions.md`. Verify the "Free consultation" fallback logic is triggered or the UI remains stable.
