# Implementation Plan: Implement SVG Logo

**Branch**: `017-svg-logo` | **Date**: 2026-03-25 | **Spec**: [spec.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/017-svg-logo/spec.md)
**Input**: Feature specification from `/specs/017-svg-logo/spec.md`

## Summary

Implement the official Otulenie SVG logo across the application, replacing the current text-based brand identifiers in the `Navbar` and `Footer`. This ensures brand consistency and adheres to the premium aesthetic specified in the project constitution. The implementation involves modifying the `public/logo.svg` to support dynamic coloring and integrating it with existing GSAP-powered transitions and magnetic interactions.

## Technical Context

**Language/Version**: React 19.x, Tailwind CSS v4.x
**Primary Dependencies**: GSAP 3 (ScrollTrigger), Lucide React
**Testing**: Manual Verification (no automated test suite present)
**Target Platform**: Mobile-first Web
**Project Type**: Web Application Landing Page
**Performance Goals**: 60fps animations, fast LCP for mobile
**Constraints**: Single `App.jsx` unless > 600 lines (current: ~80 lines)
**Scale/Scope**: High-fidelity, cinematic 1:1 pixel-perfect implementation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[x] I. Premium Aesthetic Foundation (0.05 opacity noise, Otulenie Calm palette, correct typography)
[x] II. The Focus on Conversion (Supports primary booking action on Booksy via homepage link)
[x] III. Micro-Interaction Polish (Magnetic buttons with dampened strength 0.1)
[x] IV. Mobile-First Experience (Scaled adequately for mobile viewports)
[x] V. Reusable Component Architecture (Common SVG implementation)
[x] VI. Accessibility Standards (ARIA labels, keyboard nav, fallback text)

## Project Structure

### Documentation (this feature)

```text
specs/017-svg-logo/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code

```text
public/
└── logo.svg             # Modified to use fill="currentColor"
src/
├── components/
│   ├── Logo.jsx         # (NEW) Shared Logo component
│   ├── Navbar.jsx       # Updated to use Logo + MagneticButton
│   └── Footer.jsx       # Updated to use Logo
```

**Structure Decision**: Components will be updated in their respective files in `src/components/`.

## Proposed Changes

### [Component] Brand Asset
#### [MODIFY] [logo.svg](file:///Users/szymon.stec/Documents/Code/otulenie-website/public/logo.svg)
- Change `fill="#000000"` to `fill="currentColor"` in the main path.

---

### [Component] Navigation
#### [MODIFY] [Navbar.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/components/Navbar.jsx)
- Import `Logo` (or define inline).
- Replace text "Otulenie" with `<Logo />` inside the existing `<a>` tag.
- Wrap the logo link in `MagneticButton` with `strength={0.1}`.
- Ensure `delayedIsHero` logic correctly Toggles color between `text-linen` and `text-moss`.
- Add `aria-label="Otulenie - Strona główna"`.

---

### [Component] Footer
#### [MODIFY] [Footer.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/components/Footer.jsx)
- Replace `<h2>Otulenie</h2>` with `<Logo />` component.
- Set height to match current visual scale (approx 32px).
- Ensure color is fixed to `text-linen`.

## Verification Plan

### Manual Verification
1. **Logo Rendering**: Open the site and verify the SVG logo is visible in both Navbar and Footer.
2. **Color Transition**: Scroll down and verify the Navbar logo changes from Linen to Moss smoothly.
3. **Magnetic Interaction**: Hover over the Navbar logo and verify a subtle magnetic pull.
4. **Navigation**: Click the logo in Navbar or Footer and verify it scrolls correctly to the top of the homepage.
5. **Accessibility**: Use a screen reader or inspect the DOM to verify `aria-label` is present.
6. **Mobile**: Switch to 390px width and verify the logo scales and aligns correctly.
