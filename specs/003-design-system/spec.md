# Feature Specification: Global Design System

**Feature Branch**: `003-design-system`  
**Created**: 2026-03-10  
**Status**: Finalized  
**Input**: User description: "Implement global CSS and typography system (Apply the 'Otulenie Calm' preset colors, typography, and the 0.05 opacity SVG noise overlay across the application.)"

## Clarifications

### Session 2026-03-10
- Q: Should the noise overlay be rendered as a live SVG filter or a static pattern? → A: Option B - Static Image Pattern (Performance optimized).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Visual Atmospheric Continuity (Priority: P1)

As a visitor, I want the entire website to have a consistent, calming visual texture so that I feel immersed in a professional wellness environment from the first scroll.

**Why this priority**: The "Calm" aesthetic is the core brand differentiator. Without the correct colors and textures, the cinematic feel is lost.

**Independent Test**: Can be fully tested by opening any page and visually confirming the `linen` background, `moss` text, and the subtle grain of the noise overlay.

**Acceptance Scenarios**:

1. **Given** any page in the application, **When** it loads, **Then** the background color must be exactly the specified Linen (`#fdfaf0`).
2. **Given** the global view, **When** looking closely at flat colored areas, **Then** a subtle, non-distracting SVG noise grain (0.05 opacity) must be visible.

---

### User Story 2 - Typographic Hierarchy & Elegance (Priority: P1)

As a visitor, I want the text to be elegantly formatted with distinct serif and sans-serif pairings so that the content is both readable and feels premium.

**Why this priority**: Typography is the primary conveyor of the "Premium" brand voice.

**Independent Test**: Can be fully tested by inspecting heading and body elements to ensure they use the correct font families (Fraunces/Inter).

**Acceptance Scenarios**:

1. **Given** a heading element, **When** rendered, **Then** it must use the Fraunces font family.
2. **Given** a body text block, **When** rendered, **Then** it must use the Inter font family.
3. **Given** an accent or emphasized text span, **When** rendered, **Then** it must use Cormorant Garamond in italics.

---

### User Story 3 - Responsive Design Integrity (Priority: P2)

As a mobile user, I want the design system to scale perfectly to smaller screens so that the "Calm" experience isn't compromised by cramped layout or oversized text.

**Why this priority**: Most target users (mothers, busy professionals) will access the site via mobile devices.

**Independent Test**: Can be fully tested by resizing the browser to mobile widths and verifying that font sizes adjust gracefully.

**Acceptance Scenarios**:

1. **Given** a mobile viewport, **When** the page renders, **Then** typography scale must adjust to maintain legibility without horizontal scrolling.

---

### Edge Cases

- **Loading States**: What happens to the design system (especially the noise overlay) while content is still loading? (Assumption: Background and overlay should be the first things rendered).
- **Reduced Motion/Aesthetics**: How does the system handle users who have "prefers-reduced-opacity" or similar accessibility overrides? (Assumption: Standard SVG filters will respect core browser settings if applicable, but we prioritize the brand aesthetic).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST define the "Otulenie Calm" color palette as global CSS variables: Moss (`#374833`), Linen (`#fdfaf0`), and Olive (`#6E8068`).
- **FR-002**: System MUST implement a global body style that defaults to `linen` background and `moss` text color.
- **FR-003**: System MUST load and apply the following font weights: Fraunces (Headings), Inter (Body), and Cormorant Garamond (Italic Accents).
- **FR-004**: System MUST apply a persistent, tiled noise pattern (static PNG/SVG) with `0.05` opacity as a global overlay to ensure high performance on mobile devices.
- **FR-005**: System MUST ensure the noise overlay does not interfere with the click-ability of interactive elements (z-index and pointer-events management).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of visible pages utilize the Linen/Moss color palette.
- **SC-002**: The noise overlay is verified to have exactly `0.05` opacity in the CSS/SVG definition.
- **SC-003**: Typographic weights and families match the "Otulenie Calm" spec exactly (Fraunces for H1-H6, Inter for P/Body).
- **SC-004**: The design remains visually consistent across Chrome, Safari (iOS), and Firefox.
