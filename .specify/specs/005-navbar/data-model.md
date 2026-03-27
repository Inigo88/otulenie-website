# Data Model: Floating Island Navbar

## Navigation Items

The navbar consists of a collection of predefined navigation links.

| Item Name | URL | Render Type |
|-----------|-----|-------------|
| Oferta | `/oferta` | Text Link |
| O mnie | `/o-mnie` | Text Link |
| FAQ | `/faq` | Text Link |
| Rezerwacja | `https://booksy.com/...` | Pill Button (Soft Olive) |

## Navbar State

Represented within the React component logic.

| State Property | Type | Default | Description |
|----------------|------|---------|-------------|
| `isHero` | Boolean | `true` | True when scroll Y < 80px. Transparent style. |
| `isIsland` | Boolean | `false` | True when scroll Y >= 80px. Morphed "Island" style. |
| `isMobileMenuOpen` | Boolean | `false` | True when hamburger menu is active. |

## Transitions

- **Threshold**: 80px vertical scroll.
- **GSAP ScrollTrigger**: Toggles between `isHero` and `isIsland` states.
- **Duration**: 0.4s (Ease Power3.out).
