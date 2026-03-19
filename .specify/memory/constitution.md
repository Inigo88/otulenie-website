# Otulenie Website Constitution

<!-- Sync Impact Report
Version change: 1.2.0 --- 1.2.1
List of modified principles: II. The Focus on Conversion
Added sections: None
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md (--- updated)
  - .specify/templates/spec-template.md (--- updated)
  - .specify/templates/tasks-template.md (--- updated)
Follow-up TODOs: None
-->

## Core Principles

### I. Premium Aesthetic Foundation
The platform must act as a digital instrument with cinematic, 1:1 pixel-perfect implementation. 
- Use the "Otulenie Calm" preset globally: Forest Moss (#374833) primary, Warm Linen (#fdfaf0) background, Soft Olive (#6E8068) accent.
- Typography strictly follows Fraunces (headings), Inter (body), and Cormorant Garamond Italic (accents).
- Ensure a 0.05 opacity SVG `<feTurbulence>` noise overlay is present on all pages to eliminate flat gradients.

### II. The Focus on Conversion
Every functional and design decision must support the primary booking action.
- The overarching goal is to convert visitors into booked appointments on Booksy. 
- Avoid competing CTAs.
- The primary booking CTA ("Zarezerwuj masa--") is omni-present and sticky on mobile.
- All primary CTAs targeting external booking platforms (e.g., Booksy) MUST always open in a new tab (`target="_blank"`) to preserve user context.

### III. Micro-Interaction Polish
Interactions must feel intentional and magnetic, not static or generic.
- Apply a subtle `scale(1.03)` with specific bezier curves on all button hovers.
- Interactive elements get a `translateY(-1px)` lift.
- Utilize GSAP exclusively for all page animations, adhering strictly to proper React contexts (`gsap.context()` in `useEffect`).

### IV. Mobile-First Experience
Design deeply respects the mobile reality of the target audience.
- Vertical layouts with short, readable text blocks.
- Large tap targets and simplified navigation.
- Mandatory sticky CTA on mobile devices.

### V. Reusable Component Architecture
Prioritize creating separate, well-encapsulated components that can be reused across the application.
- Before creating a new component, always check if an existing component can be extended or composed to fulfill the requirement.
- Components must have a single, clear responsibility and expose a well-defined props/API surface.
- Shared UI primitives (buttons, cards, inputs, modals, etc.) live in a dedicated `components/` directory and are imported wherever needed - never duplicated.
- When modifying a component, ensure all existing consumers remain unaffected or are updated accordingly.
- Document component usage (props, variants) via JSDoc or inline comments at the top of the file.

### VI. Accessibility Standards (WCAG 2.2 Level AA)
The website must meet WCAG 2.2 Level AA conformance to ensure usability for all visitors.
- **Semantic HTML**: Use appropriate HTML5 elements (`<nav>`, `<main>`, `<section>`, `<button>`, `<header>`, `<footer>`, etc.) - never `<div>` for interactive elements.
- **Color Contrast**: Minimum 4.5:1 contrast ratio for normal text and 3:1 for large text (18px+ or 14px+ bold) against backgrounds.
- **Keyboard Navigation**: All interactive elements must be fully operable via keyboard (Tab, Enter, Escape, Arrow keys). No keyboard traps.
- **Focus Indicators**: Visible focus outlines on all interactive elements; focus must not be obscured by overlapping content (SC 2.4.11).
- **Target Size**: Interactive touch targets must be at least 24--24 CSS pixels (SC 2.5.8).
- **ARIA Attributes**: Use `aria-label`, `aria-expanded`, `aria-hidden`, `role`, and other ARIA attributes where native semantics are insufficient.
- **Alt Text**: All meaningful images have descriptive `alt` attributes; decorative images use `alt=""`.
- **Reduced Motion**: Respect `prefers-reduced-motion` media query - disable or reduce GSAP animations for users who prefer reduced motion.
- **Screen Reader Support**: Ensure correct heading hierarchy (`h1`---`h6`), meaningful link text, and logical DOM order matching visual order.

### VII. Professional Solo Voice
The platform represents a sole proprietorship. All copy must avoid plural ("Nasza", "Nasze") or personal possessive ("Moja", "Moje") pronouns in the UI. 
- Use neutral, action-oriented naming (e.g., "Oferta" instead of "Nasza oferta").
- Maintain a tone that is professional, therapeutic, and focused on the client's experience.

## Target Audience & Business Value
Otulenie addresses neck tension, stress, and lack of time for desk workers and busy mothers. The digital presence must clearly articulate the convenience of a mobile massage service in Wroc--aw while building immense trust through calming design elements and transparent communication.

## Technical Constraints
- **Stack:** React 19.x, Vite 6.x, Tailwind CSS v4.x, GSAP 3 (with ScrollTrigger plugin), Lucide React for icons. *Note: Tailwind CSS v4.x is explicitly required here.*
- **Fonts:** Load via Google Fonts `<link>` tags based on the preset (Fraunces, Inter, Cormorant Garamond).
- **Images:** Use real Unsplash URLs matching `imageMood`. Never use placeholder images or placeholder URLs.
- **Structure:** Single `App.jsx` with components defined alongside, or split into a `components/` directory only if the file exceeds 600 lines. Single `index.css` for directives and noise.
- **Completeness:** Every card, label, and animation must be fully implemented and functional. Partial implementations are rejected.
- **Responsiveness:** Mobile-first design is mandatory. Stack elements vertically, reduce heading scales, and collapse navbars minimally on mobile.

## Governance
<!-- Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

All design and implementation files must adhere to the design guidelines established here. Any deviation from the "Otulenie Calm" preset or the specified micro-interaction patterns requires explicit approval before code changes.

**Version**: 1.2.1 | **Ratified**: 2026-03-09 | **Last Amended**: 2026-03-15
