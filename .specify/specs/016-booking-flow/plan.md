# Implementation Plan: 1.3.4 Build primary booking flow interactions

**Branch**: `016-booking-flow` | **Date**: 2026-03-25 | **Spec**: [spec.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/016-booking-flow/spec.md)
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

The goal of this feature is to robustly integrate Booksy booking interactions across the website, centralizing contact data, and providing a premium, seamless transition to the booking platform. This includes a dynamic Booksy widget in the Hero section, direct links in other areas, and formatted secondary contact options in the footer.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: React 19.x, Tailwind CSS v4.x, Node >= 20
**Primary Dependencies**: GSAP 3 (ScrollTrigger), Lucide React, @gsap/react
**Storage**: N/A
**Testing**: Manual verification via browser; responsiveness audit at 390px
**Target Platform**: Mobile-first Web
**Project Type**: Web Application Landing Page
**Performance Goals**: 60fps animations, fast LCP for mobile (< 2.5s)
**Constraints**: Tailwind v4 (CSS-first), single App.jsx (currently ~440 lines), magnetic disabled on mobile.
**Scale/Scope**: High-fidelity, cinematic 1:1 pixel-perfect implementation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[x] I. Premium Aesthetic Foundation (0.05 opacity noise, Otulenie Calm palette, correct typography)
[x] II. The Focus on Conversion (Supports primary booking action on Booksy)
[x] III. Micro-Interaction Polish (Magnetic buttons, GSAP animations in useEffect contexts)
[x] IV. Mobile-First Experience (Vertical stacking, sticky CTA)
[x] V. Reusable Component Architecture (MagneticButton is used consistently)
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
## Proposed Changes

### Configuration

#### [NEW] [links.js](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/constants/links.js)
Centralized file for all external links and contact information.

### Components

#### [MODIFY] [Hero.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/components/Hero.jsx)
- Load Booksy widget script dynamically.
- Add `ms-booking-button` class to the CTA.
- Use centralized `BOOKSY_URL`.
- Implement `aria-label="Zarezerwuj masaż (otwiera nową kartę)"`.
- Ensure `target="_blank"` is applied.

#### [MODIFY] [MassageCarousel.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/components/MassageCarousel.jsx)
- Change CTA from "Zarezerwuj" to "Dowiedz się więcej".
- Update link to `/oferta`.
- Implement descriptive `aria-label` for service navigation.

#### [MODIFY] [MobileMenu.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/components/MobileMenu.jsx)
- Update "Zarezerwuj" button to use `BOOKSY_URL`.
- Implement `aria-label="Zarezerwuj masaż (otwiera nową kartę)"`.
- Ensure `target="_blank"` is applied.

#### [MODIFY] [DiagnosticShuffler.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/components/FeatureCards/DiagnosticShuffler.jsx)
- Update code to use centralized `BOOKSY_URL` (Secondary conversion point).
- Implement `aria-label="Zarezerwuj masaż (otwiera nową kartę)"`.
- Ensure `target="_blank"` is applied.

#### [MODIFY] [App.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/App.jsx)
- Update `Footer` component:
    - Add "Zarezerwuj" to Navigation links.
    - Ensure Phone and Email are interactive `tel:` and `mailto:` links using constants.
    - Implement `aria-label` for all contact and navigation links.

#### [MODIFY] [massageData.js](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/constants/massageData.js)
- Update `booksyUrl` fields if needed (though Carousel will link to `/oferta`).

## Verification Plan

### Automated Tests
- N/A (Project currently lacks automated test suite).

### Manual Verification
1. **Hero Section**:
    - Verify "Zarezerwuj masaż" opens the Booksy widget if possible, or falls back to the URL.
    - Check if the script loads correctly.
2. **Carousel**:
    - Verify cards link to `/oferta`.
    - Verify label is "Dowiedz się więcej".
3. **Mobile Menu**:
    - Open menu on mobile (390px).
    - Verify "Zarezerwuj masaż" link at the bottom.
4. **Footer**:
    - Click phone number and verify `tel:` protocol.
    - Click email and verify `mailto:` protocol.
    - Click "Zarezerwuj" in navigation.
5. **Magnetic Audit**:
    - Verify magnetic effect works on desktop.
    - Verify magnetic effect is disabled on mobile (390px in devtools).
