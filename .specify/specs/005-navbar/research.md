# Research: Floating Island Navbar

## Decisions

- **Component Extraction**: I will extract `MagneticButton` and `RoundedContainer` from `App.jsx` into separate files in `src/components/` to maintain clean code as the navbar logic is added.
- **GSAP ScrollTrigger**: Confirmed usage of GSAP `ScrollTrigger` for state transitions at the 80px scroll threshold.
- **Navbar Structure**:
  - `Hero` state: Transparent background, white/light text (moss on linen if section is dark, but spec says transparent). Spec says "transparent background and white/light text" on landing.
  - `Island` state: Semi-transparent linen background with `backdrop-blur-md` and Moss text.
- **Responsive Handling**: Uses Tailwind's `md:` prefix for 768px break-point. Below this, it renders a Hamburger trigger.

## Rationale

- **Clean Code**: Moving existing components to dedicated files prevents `App.jsx` from becoming bloated (approaching the 600-line limit).
- **Consistency**: Reusing the existing `MagneticButton` logic ensures micro-interactions match the project's established "Otulenie Calm" aesthetic.
- **Performance**: `gsap.quickTo` is already being used in the project for smooth, high-60fps magnetic interactions; this pattern will be extended to the navbar transitions.

## Alternatives Considered

- **CSS Transitions**: Rejected in favor of GSAP to maintain consistency with the project's animation engine and to handle complex scroll-aware morphing more precisely.
- **Internal Components**: Kept in `App.jsx` was considered but rejected because the Navbar + Mobile Overlay will likely push `App.jsx` close to the threshold where extraction would be required anyway.
