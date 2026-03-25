# Design & Contracts: SVG Logo Implementation

## Data Model (Entities & States)

### Component: LogoSVG
**Description**: A functional component (or direct inline SVG) that renders the brand logo with dynamic color support.

**Properties**:
- `className`: (string) - Applied to the SVG element to control height, width, and color (e.g., `h-8 text-linen`).
- `ariaLabel`: (string) - Accessibility label for the screen reader.

**State Transitions**:
- **Linen to Moss**: In Navbar, transitions from `text-linen` to `text-moss` when the page scrolls away from the Hero section.
- **Moss to Linen**: In Navbar, transitions from `text-moss` to `text-linen` when scrolling back to the Hero section.

## Configuration
- **Height**: Fixed at `32px` (`h-8` in Tailwind CSS v4 context).
- **Color Transitions**: 0.5s duration (sync with navbar background).
- **Magnetic Pull**: `0.1` strength in Navbar.

## Contract (Interface Strategy)
Since this is an internal component implementation, no external API contracts are required. However, the SVG structure itself serves as a contract for styling:
- SVG MUST use `fill="currentColor"`.
- Logo links MUST have `aria-label="Otulenie - Strona główna"`.
