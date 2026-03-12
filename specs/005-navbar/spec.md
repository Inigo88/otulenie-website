# Feature Specification: Floating Island Navbar

**Feature Branch**: `005-navbar`  
**Created**: 2026-03-11  
**Status**: Finalized  
**Input**: User description: "Implement the Floating Island Navbar: Build a fixed, pill-shaped navbar that morphs its background and style based on the page's scroll position."

## Clarifications

### Session 2026-03-11
- Q: What should be the exact scroll distance (in pixels) that triggers the transition? → A: 80px
- Q: How should the navigation links be handled on smaller mobile screens (390px)? → A: Hamburger Menu
- Q: Should the navigation links be represented by text labels, icons, or a combination? → A: Text Labels Only
- Q: Which navigation links should appear in the navbar? → A: Oferta, O mnie, FAQ + Rezerwacja CTA button
- Q: What should the mobile hamburger menu look like when opened? → A: Full-screen linen overlay, links centred vertically
- Q: Is GSAP (ScrollTrigger) already installed as a project dependency? → A: Yes, already installed
- Q: Should the Rezerwacja CTA be visually distinct from regular nav links? → A: Pill-shaped button in accent colour (Soft Olive)
- Q: Should the navbar work with JavaScript disabled (CSS-only fallback)? → A: JS required, no fallback needed

## User Scenarios & Testing *(mandatory)*

### User Story 1 - At-Home Landing (Priority: P1)

As a site visitor, when I first land on the page, I want to see a clear, elegant navigation bar that doesn't distract from the cinematic hero imagery but gives me immediate access to key sections.

**Why this priority**: Core navigation is essential for user orientation and conversion flow to Booksy.

**Independent Test**: Landing on the site shows the navbar at the top with a transparent background and highly legible links.

**Acceptance Scenarios**:

1. **Given** the user is at the top of the homepage, **When** the page loads, **Then** the navbar should appear fixed at the top, with a transparent background and white/light text.
2. **Given** the navbar is visible, **When** the user hovers over a link, **Then** the link should exhibit a subtle magnetic pull and scale up by 1.03 (consistent with brand micro-interactions).

---

### User Story 2 - Morphing on Scroll (Priority: P1)

As I scroll down the page to read more about the services, the navbar should "morph" into a more solid, readable pill-shaped island to remain functional against varying section backgrounds.

**Why this priority**: Maintains usability and "Otulenie Calm" aesthetic consistency throughout the long-scroll experience.

**Independent Test**: Scroll down 100px; the navbar background should transition to semi-transparent linen with a backdrop blur.

**Acceptance Scenarios**:

1. **Given** the user starts scrolling down, **When** scroll reach exceeds 80px, **Then** the navbar container should shrink slightly and transition to a semi-transparent linen background with `backdrop-blur-md`.
2. **Given** the navbar has morphed, **When** the user scrolls back to the very top, **Then** the navbar should return to its initial transparent state.

---

### User Story 3 - Mobile Navigation (Priority: P2)

As a mobile user, I need a condensed version of the navbar that doesn't consume excessive vertical space but remains accessible.

**Why this priority**: Mobile-first design is critical for the target audience (busy mothers and professionals).

**Independent Test**: Open the site on a mobile device; the navbar should occupy minimal width and potentially hide labels or transition to a hamburger/icon-only layout if space is premium.

**Acceptance Scenarios**:

1. **Given** a 390px viewport, **When** the page scrolls, **Then** the navbar remains fixed and morphs into a compact "hamburger" trigger.
2. **Given** the hamburger trigger is tapped, **When** the overlay opens, **Then** a full-screen linen-background overlay (semi-transparent, `backdrop-blur`) appears with navigation links (Oferta, O mnie, FAQ) and Rezerwacja CTA centred vertically, and a visible close (✕) button in the top-right corner.

---

### Edge Cases

- **Rapid Scrolling**: Navbar transitions must be smooth and not flicker when scrolling rapidly between states.
- **Section Color Clashes**: The "Island" state (morphed) must be legible over both light (linen) and dark (moss) background sections.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST implement the navbar as a `fixed` position element at the top of the viewport.
- **FR-002**: System MUST use GSAP `ScrollTrigger` or `scroll` listeners to toggle between "Hero" (transparent) and "Island" (morphed) states at an 80px threshold. GSAP is a confirmed existing project dependency (`@gsap/` package).
- **FR-003**: System MUST apply `backdrop-blur-md` and `bg-linen/70` to the navbar in the "Island" state.
- **FR-004**: Navbar links MUST implement `MagneticButton` micro-interaction logic (scale 1.03, subtle dampening).
- **FR-005**: The navbar MUST have fully rounded corners (`rounded-full`) in both states, maintaining a "pill" aesthetic.
- **FR-006**: System MUST use high-quality typography (Inter/Fraunces) for navigation labels, avoiding icons in the "Island" state to maintain a grounded aesthetic.
- **FR-009**: System MUST ensure text color remains legible during transitions (e.g., transitioning from white text on transparent to moss text on linen).
- **FR-007**: System MUST be responsive, transitioning to a compact "hamburger" menu trigger on viewports below 768px.
- **FR-008**: The mobile menu overlay MUST be a **full-screen overlay** with a semi-transparent linen background and `backdrop-blur`. Navigation links (Oferta, O mnie, FAQ) and the Rezerwacja CTA MUST be centred vertically and horizontally. A clearly visible close (✕) button MUST appear in the top-right corner.
- **FR-010**: The Rezerwacja CTA MUST be rendered as a pill-shaped (`rounded-full`) button in the accent colour (Soft Olive `#6E8068`), visually distinct from the plain text nav links, and MUST use the existing `MagneticButton` component with the sliding hover layer.

### Key Entities

- **Navigation Item**: Represents a single destination link (Title, URL). The canonical set is: Oferta (`/oferta`), O mnie (`/o-mnie`), FAQ (`/faq`) — rendered as plain text links — and Rezerwacja — rendered as a pill-shaped accent button linking to the Booksy booking page.
- **Navbar State**: Represents the visual state (Transparent vs. Island) based on context.

### Constraints & Tradeoffs

- **JavaScript Required**: The navbar's scroll morphing and mobile overlay depend on JavaScript (GSAP, React state). No CSS-only fallback is required; the entire site is a React/Vite SPA where JS is a foundational prerequisite.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Navbar state transitions occur within 300-500ms for a fluid, cinematic feel.
- **SC-002**: Interactive navbar links maintain 60fps during magnetic hover interactions.
- **SC-003**: Navbar height does not exceed 80px on desktop and 64px on mobile.
- **SC-004**: All links are keyboard accessible with clear focus rings.
