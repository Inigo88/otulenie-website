# Data Model: Hero Section

## Hero Props
| Prop | Type | Description |
|------|------|-------------|
| headline | string | Primary H1 text |
| subheadline | string | Descriptive subheadline text |
| backgroundUrl | string | Unsplash image source |
| onComplete | function | Callback fired when GSAP entrance finishes |

## Internal State
- **gsapTimeline**: Internal reference for animation control.
- **isVisible**: Managed via on-load lifecycle.

## Relationships
- **Parent (App.jsx)**: Orchestrates the `onComplete` trigger to reveal the `Navbar`.
- **Child (MagneticButton)**: Central Hero CTA.
