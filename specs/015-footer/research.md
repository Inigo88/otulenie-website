# Research: Footer Feature

## Decision: Component Structure
- **Rationale**: The footer is a global component that should be placed at the root of the application, similar to the `Navbar`. It will be added to `App.jsx` to maintain the flat structure as long as it stays under 600 lines.
- **Alternatives considered**: Creating a separate `components/Footer.jsx`. Rejected for now to adhere to the "Flat Structure" rule while `App.jsx` is ~315 lines.

## Decision: Navigation Links Pattern
- **Rationale**: Reuse the `links` data structure from `Navbar` for consistency. The footer will extend this list to include "Home" and "Privacy Policy".
- **Findings**: `Navbar.jsx` defines `links` as an array of objects with `label` and `href`.

## Decision: Aesthetic & Icons
- **Rationale**: Use `bg-moss` and `text-linen` as per FR-001 and SC-001. `Lucide Instagram` will be used for social links.
- **Micro-interactions**: Footer links will use a subtle hover effect (opacity or color shift) but won't be magnetic unless they are buttons, to avoid over-animating the bottom of the page.
- **Noise Overlay**: Verified that the global noise overlay in `App.jsx` covers the entire viewport, including the footer area.

## Decision: Mobile Stacking
- **Rationale**: Use Tailwind's `flex-col` for mobile and `flex-row` for desktop (md:). `rounded-t-[2rem]` for mobile and `rounded-t-[3rem]` for desktop.
