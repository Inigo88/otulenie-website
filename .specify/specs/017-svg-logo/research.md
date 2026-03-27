# Research: SVG Logo Implementation

## Findings

### SVG Asset Analysis
- **File**: `public/logo.svg`
- **Current State**: Uses hardcoded `fill="#000000"` in the path.
- **Decision**: Modify the SVG to use `fill="currentColor"` to allow dynamic styling via Tailwind CSS classes in `Navbar` and `Footer`.
- **Rationals**: Adheres to FR-006 and allows for the dynamic color transitions required by FR-004.

### Navbar Integration
- **Context**: The `Navbar` component currently uses a text string "Otulenie" within an `<a>` tag.
- **Decision**: 
    - Wrap the SVG in `MagneticButton` with `strength={0.1}` as per FR-009.
    - Keep the `delayedIsHero` logic for matching the background/text animation timing (SC-002).
    - Use `h-8` (32px) for the SVG height to match `text-2xl` as per FR-010.
- **Alternatives Considered**: Direct inclusion of SVG without `MagneticButton`. Rejected because the spec explicitly requests the magnetic effect (FR-009).

### Footer Integration
- **Context**: The `Footer` component uses an `<h2>` for the brand name.
- **Decision**: Replace the `h2` text with the same SVG component, styled with `text-linen` (FR-005).

### Fallback Strategy
- **Decision**: Use a simple conditional render: if the SVG fails or for SSR simplicity, render "Otulenie" in `font-serif` (FR-008). 
- **Implementation Note**: Since we are using an inline SVG (or a specialized component), fallbacks can be handled via CSS or conditional rendering if the SVG is treated as an image. However, for 1:1 pixel perfection and color control, inline SVG is preferred.

## Dependencies
- `@gsap/react` (already in use for `Navbar` and `MagneticButton`).
- GSAP 3 (already in use).
