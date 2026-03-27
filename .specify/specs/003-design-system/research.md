# Research: Global Design System & Performance Optimization

## Decision 1: Tailwind CSS v4 Theme Integration
- **Choice**: CSS-First Configuration via `@theme` directive.
- **Rationale**: Tailwind v4 moves configuration into the CSS layer, allowing for native CSS variable injection and simpler utility generation.
- **Alternatives**: Using `tailwind.config.js` (legacy approach, not recommended for v4).

## Decision 2: Performance-Optimized Noise Overlay
- **Choice**: Static Tiled SVG Pattern (Base64 Data URI).
- **Rationale**: Live `<feTurbulence>` filters are expensive for mobile GPUs and can cause stuttering during GSAP animations. A tiled SVG pattern provides high-fidelity grain with minimal performance cost.
- **Implementation**: A `100x100` SVG tile with a noise filter will be encoded and applied as a `background-image` to a fixed overlay div (`pointer-events: none`).

## Decision 3: Typography Loading
- **Choice**: Google Fonts `<link>` tags in `index.html`.
- **Rationale**: Easiest way to satisfy the "Otulenie Calm" requirement while ensuring fast caching across browsers.
- **Fonts**: Fraunces (Headings), Inter (Body), Cormorant Garamond (Accents).

## Technical Unknowns Resolved
- **Unknown**: How to handle noise opacity?
- **Resolution**: Set the noise pattern div to `opacity: 0.05` via Tailwind utility.
