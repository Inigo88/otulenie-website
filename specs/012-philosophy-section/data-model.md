# Phase 1: Data Model

## Entities

### Manifesto Section State

Since this is a static UI section, the primary "data" represents the section's content and styling states, and does not require a backend data model.

- **Theme**: String (`dark`) - Applies the "Otulenie Calm" dark palette (e.g., Forest Moss background, Linen text).
- **Animation Context**: 

  - `parallaxEnabled`: boolean (dependent on `prefers-reduced-motion: no-preference`)
  - `revealEnabled`: boolean (dependent on `prefers-reduced-motion: no-preference`)

## Interactive State Transitions

- **Scroll Entry**: User scrolls top boundary of the Manifesto section into view -> Trigger parallax `scrub` timeline for background shapes.
- **Content Reveal**: User scrolls heading/paragraphs into view -> Trigger text splitting and staggered reveal animations line-by-line.
