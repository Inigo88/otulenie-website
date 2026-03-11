# otulenie-website Development Guidelines

Last updated: 2026-03-10

## Active Technologies
- **Runtime**: Node.js >= 20.0.0 (Enforced)
- **Framework**: React 19.x, Vite 6.x
- **Styling**: Tailwind CSS v4.x (CSS-first configuration via `@theme`)
- **Animations**: GSAP 3 (with ScrollTrigger plugin)
- **Icons**: Lucide Reactt
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
- **GSAP Context**: Always use `@gsap/react` hooks or `gsap.context()` for clean cleanup in React components.
- **Flat Structure**: Keep components in `App.jsx` until it exceeds 600 lines.

## Commands
- `npm run dev`: Start development server (Node 20 required)
- `npm run build`: Production build (Vite 6)

## Recent Milestones
- **002-project-setup**: Base infrastructure initialized (React 19 + Vite 6).
- **003-design-system**: Tailwind v4 tokens and noise overlay specified.

<!-- MANUAL ADDITIONS START -->
<!-- These items are preserved across auto-updates -->
- Always verify animations on a mobile-sized viewport (width: 390px).
- Use `lucide-react` for all functional iconography.
<!-- MANUAL ADDITIONS END -->
