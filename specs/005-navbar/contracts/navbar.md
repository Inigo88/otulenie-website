# Interface Contracts: Floating Island Navbar

## Component: `Navbar`

The primary navigation component.

### Props (Internal use within App.jsx)

- `onNavigate`: callback function when a link is clicked (optional).

### Sub-components

#### `NavLink`
- **Purpose**: Individual navigation item.
- **Logic**: Uses `MagneticButton` internally.
- **Props**: `label`, `href`, `isCTA` (boolean).

#### `MobileOverlay`
- **Purpose**: Full-screen navigation for mobile viewports.
- **Style**: Full-screen, Linen background, `backdrop-blur-md`.
- **Visibility**: Controlled by `isMobileMenuOpen` state.

## ScrollTrigger Integration

```javascript
gsap.to(".navbar", {
  scrollTrigger: {
    trigger: "body",
    start: "80px top",
    onEnter: () => setNavbarState('island'),
    onLeaveBack: () => setNavbarState('hero'),
  }
})
```

## CSS Classes/Variables

- `--navbar-height`: 80px (desktop), 64px (mobile)
- `--navbar-bg`: Transparent (hero), Linen/70 with blur (island)
