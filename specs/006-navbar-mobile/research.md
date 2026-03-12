# Research Notes: Full Mobile Navigation Modal

## Decision 1: GSAP Morphing Animation
**Rationale**: High-fidelity requirement. Since `MorphSVGPlugin` is not available, I will use a custom SVG hamburger icon where the three lines (top, middle, bottom) are animated.
- **Top Line**: Rotate 45deg, Translate Y
- **Middle Line**: Scale X to 0 (Opacity 0)
- **Bottom Line**: Rotate -45deg, Translate Y
**Alternatives**: Simple CSS transition (less controllable/premium), Static icon swap (rejected by spec).

## Decision 2: Focus Trap Implementation
**Rationale**: Accessibility (WCAG 2.2 AA). I will use a custom hook `useFocusTrap` within the `MobileMenu` component. It will:
- Query focusable elements (`a, button, [tabindex]`).
- Listen for `Tab` keydown.
- Cycle focus between the first and last elements.
- Return focus to the trigger on unmount.
**Alternatives**: `focus-trap-react` library (adds dependency).

## Decision 3: Body Scroll Locking
**Rationale**: UX consistency. When the modal is open, I will set `document.body.style.overflow = 'hidden'`.
- This will be managed in a `useEffect` within `MobileMenu.jsx` that cleans up on unmount.
**Alternatives**: `body-scroll-lock` library (unnecessary for simple cases).

## Decision 4: Global Backdrop Blur
**Rationale**: Brand aesthetic. I will use Tailwind's `backdrop-blur-xl` with a subtle tint (`bg-moss/40`).
**Rationale**: Principle I.

## Decision 5: Component Structure
**Rationale**: Principle V. I will create `src/components/MobileMenu.jsx` as a standalone component to prevent bloating `Navbar.jsx`.
- `Navbar.jsx` will manage the `isMenuOpen` state and trigger the animations.
