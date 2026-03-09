# Otulenie Website Constitution

<!-- Sync Impact Report
Version change: 1.0.0 → 1.1.0
List of modified principles: None
Added sections:
  - Technical Constraints (expanded based on tech-stack.md)
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md (✅ updated)
  - .specify/templates/spec-template.md (✅ updated)
  - .specify/templates/tasks-template.md (✅ updated)
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
- The primary booking CTA ("Zarezerwuj masaż") is omni-present and sticky on mobile.

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

## Target Audience & Business Value
Otulenie addresses neck tension, stress, and lack of time for desk workers and busy mothers. The digital presence must clearly articulate the convenience of a mobile massage service in Wrocław while building immense trust through calming design elements and transparent communication.

## Technical Constraints
- **Stack:** React 19, Tailwind CSS v3.4.17, GSAP 3 (with ScrollTrigger plugin), Lucide React for icons. *Note: Tailwind CSS is explicitly required here, overriding earlier generic constraints.*
- **Fonts:** Load via Google Fonts `<link>` tags based on the preset (Fraunces, Inter, Cormorant Garamond).
- **Images:** Use real Unsplash URLs matching `imageMood`. Never use placeholder images or placeholder URLs.
- **Structure:** Single `App.jsx` with components defined alongside, or split into a `components/` directory only if the file exceeds 600 lines. Single `index.css` for directives and noise.
- **Completeness:** Every card, label, and animation must be fully implemented and functional. Partial implementations are rejected.
- **Responsiveness:** Mobile-first design is mandatory. Stack elements vertically, reduce heading scales, and collapse navbars minimally on mobile.

## Governance
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

All design and implementation files must adhere to the design guidelines established here. Any deviation from the "Otulenie Calm" preset or the specified micro-interaction patterns requires explicit approval before code changes.

**Version**: 1.1.0 | **Ratified**: 2026-03-09 | **Last Amended**: 2026-03-09
