---
trigger: always_on
---

# otulenie-website Development Guidelines

Last updated: 2026-03-11

## Active Technologies
- Local file system (`public/images-small/`) (014-image-restriction)
- React 19.x, Tailwind CSS v4.x + GSAP 3 (ScrollTrigger), Lucide Reac (015-footer)
- React 19.x, Tailwind CSS v4.x, Node >= 20 + GSAP 3 (ScrollTrigger), Lucide React, @gsap/reac (016-booking-flow)

- **Runtime**: Node.js >= 20.0.0 (Enforced)
- **Framework**: React 19.x, Vite 6.x
- **Styling**: Tailwind CSS v4.x (CSS-first configuration via `@theme`)
- **Animations**: GSAP 3 (with ScrollTrigger + Draggable + InertiaPlugin, `@gsap/react`)
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Fraunces, Inter, Cormorant Garamond)

## Project Structure

```text
src/
├── App.jsx          # Core application (logic + interactive components)
├── index.css        # Tailwind v4 directives, @theme tokens, and noise overlay
└── main.jsx         # Entry point (GSAP registration, strict mode)
```

## Architectural Constraints (from Constitution)

- **Mobile-First**: All layouts must stack vertically on mobile and prioritize tap targets.
- **Aesthetic**: Strictly adhere to #374833 (Moss), #fdfaf0 (Linen), and #6E8068 (Olive).
- **Noise Overlay**: A persistent `0.05` opacity noise pattern must be present globally.
- **GSAP Context**: Always use `@gsap/react` hooks (`useGSAP`) for clean cleanup in React components.
- **Flat Structure**: Keep components in `App.jsx` until it exceeds 600 lines.
- **Interactive Polish**:
  - Magnetic buttons MUST use a dampened offset (30-50%) on hover (desktop).
  - Rounded containers MUST use `backdrop-blur-md` and 60-80% opacity.

## Commands

- `npm run dev`: Start development server (Node 20 required)
- `npm run build`: Production build (Vite 6)

## Recent Milestones

- **002-project-setup**: Base infrastructure initialized (React 19 + Vite 6).
- **003-design-system**: Tailwind v4 tokens and noise overlay specified.
- **004-base-components**: Interactive components (MagneticButton, RoundedContainer) designed and planned.

## Rules

- Always verify animations on a mobile-sized viewport (width: 390px).
- Use `lucide-react` for all functional iconography.
- **Constitution Maintenance**: Do not update `constitution.md` or its version solely to record synchronization with other artifacts (e.g. backlog). Only update when material changes to Principles, Audience, or Constraints occur.

<!-- MANUAL ADDITIONS START -->
<!-- These section are for user input only and should preserved across auto-updates -->

<!-- MANUAL ADDITIONS END -->

## Recent Changes
- 017-svg-logo: Added React 19.x, Tailwind CSS v4.x + GSAP 3 (ScrollTrigger), Lucide Reac
- 016-booking-flow: Added React 19.x, Tailwind CSS v4.x, Node >= 20 + GSAP 3 (ScrollTrigger), Lucide React, @gsap/reac
- 015-footer: Added React 19.x, Tailwind CSS v4.x + GSAP 3 (ScrollTrigger), Lucide Reac

