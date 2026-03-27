# Implementation Plan: Footer

**Branch**: `015-footer` | **Date**: 2026-03-23 | **Spec**: [spec.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/015-footer/spec.md)
**Input**: Feature specification from `/specs/015-footer/spec.md`

## Summary
Implement a global deep-dark footer (`bg-moss`) with a rounded top edge (`rounded-t-[3rem]`). The footer will contain brand identification, navigation links (reusing the Navbar pattern), contact details, and social media icons (Lucide Instagram). It will be integrated directly into `App.jsx` to maintain the project's flat structure.

## Technical Context

**Language/Version**: React 19.x, Tailwind CSS v4.x
**Primary Dependencies**: GSAP 3 (ScrollTrigger), Lucide React
**Storage**: N/A
**Testing**: Manual verification on mobile (390px) and desktop viewports.
**Target Platform**: Mobile-first Web
**Project Type**: Web Application Landing Page
**Performance Goals**: 60fps animations, fast LCP for mobile
**Constraints**: No Tailwind unless explicitly required, single App.jsx as it is currently ~315 lines.
**Scale/Scope**: High-fidelity, cinematic 1:1 pixel-perfect implementation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[x] I. Premium Aesthetic Foundation (0.05 opacity noise, Otulenie Calm palette, correct typography)
[x] II. The Focus on Conversion (Supports primary navigation; removed competing booking CTA per spec)
[x] III. Micro-Interaction Polish (Subtle hover effects on icons and links)
[x] IV. Mobile-First Experience (Vertical stacking for mobile viewports)
[x] V. Reusable Component Architecture (Reusing `NavLink` pattern from Navbar)
[x] VI. Accessibility Standards (WCAG 2.2 AA: semantic `<footer>` tag, accessible naming for icons: Instagram, Facebook)

## Project Structure

### Documentation (this feature)

```text
specs/015-footer/
├── spec.md              # Input specification
├── plan.md              # This file
├── research.md          # Component reuse and aesthetic research
├── data-model.md        # Footer and link structures
├── quickstart.md        # Integration guide
└── tasks.md             # Implementation tasks (Phase 2 output)
```

### Source Code (repository root)

```text
src/
├── App.jsx              # Main application (Footer component will be added here)
└── index.css            # Tailwind directives and noise overlay
```

**Structure Decision**: Integrated into `App.jsx` to adhere to the rule of keeping components in a single file until it exceeds 600 lines.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

*(No violations identified)*

## Verification Plan

### Manual Verification
1. **Visual Alignment**: Verify `bg-moss` (#374833) background and `text-linen` (#fdfaf0) text.
2. **Rounded Edge**: Confirm `rounded-t-[2rem]` on mobile and `rounded-t-[3rem]` on desktop.
3. **Links**: Test all navigation links (Home, Oferta, O mnie, Obszar dojazdu, FAQ, Privacy Policy).
4. **Icons**: Verify Lucide Instagram and Facebook icons are visible and clickable.
5. **Responsiveness**: Check vertical stacking on mobile (390px viewport).
6. **Noise Overlay**: Ensure the global noise pattern is visible over the moss background.
7. **Accessibility**: Verify use of `<footer>` semantic tag and `aria-label` on social links.
