# Feature Specification: Base Interactive UI Components

**Feature Branch**: `004-base-components`  
**Created**: 2026-03-11  
**Status**: Draft  
**Input**: User description: "Create base interactive UI components (Magnetic buttons and rounded containers)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Magnetic Interaction (Priority: P1)

As a visitor, I want buttons to react to my cursor with a subtle magnetic pull so that the interface feels alive and premium.

**Why this priority**: Micro-interactions are a core brand pillar for the cinematic experience.

**Independent Test**: Can be fully tested by hovering over a button and verifying the `scale(1.03)` and magnet lift effect.

**Acceptance Scenarios**:

1. **Given** a magnetic button, **When** the cursor enters its proximity (20-40px), **Then** the button must subtly shift toward the cursor position.
2. **Given** a clicked button, **When** triggered, **Then** it must execute its primary action (e.g., link navigation) without delay.

---

### User Story 2 - Atmospheric Containers (Priority: P1)

As a visitor, I want content to be housed in soft, rounded containers that match the "Otulenie Calm" aesthetic so that the UI feels grounding and natural.

**Why this priority**: Essential for the base layout architecture and aesthetic consistency.

**Independent Test**: Can be fully tested by inspecting pages to ensure all main content blocks use consistent `border-radius` and background opacity.

**Acceptance Scenarios**:

1. **Given** a rounded container, **When** rendered, **Then** it must have a `border-radius` (e.g., `2rem` or `3rem`) that aligns with the premium design language.
2. **Given** multiple containers, **When** stacked, **Then** they must maintain consistent spacing and responsive padding.

---

### User Story 3 - Responsive Component Scaling (Priority: P2)

As a mobile user, I want the buttons and containers to scale appropriately to my screen size so that the cinematic feel remains readable and usable.

**Why this priority**: The majority of users will use mobile devices.

**Independent Test**: Can be fully tested by resizing to mobile viewport (390px) and verifying component proportions.

**Acceptance Scenarios**:

1. **Given** a mobile viewport, **When** components render, **Then** they must adjust their internal padding and font sizes to prevent overflow.

---

### Edge Cases

- **Touch Devices**: How does the "magnetic" effect behave on mobile where there is no hover state? (Assumption: Magnetic effect is disabled or replaced with a subtle scale on tap for mobile).
- **Reduced Motion**: How do these components behave for users with `prefers-reduced-motion`? (Assumption: Animations and magnetic offsets are disabled or simplified).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a reusable `MagneticButton` component using GSAP for the hover offset.
- **FR-002**: Buttons MUST apply a `scale(1.03)` transformation and precisely defined `cubic-bezier` easing on interaction.
- **FR-003**: System MUST provide a `RoundedContainer` component with global consistency for `border-radius` and layout padding.
- **FR-004**: Components MUST strictly use the "Otulenie Calm" palette (`moss`, `linen`, `olive`).
- **FR-005**: Magnetic interactions MUST be performant and not cause layout thrashing (GSAP `x/y` transforms).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of primary buttons exhibit magnetic hover behavior on desktop.
- **SC-002**: All main content sections use the standardized `RoundedContainer` for layout.
- **SC-003**: Components maintain 60fps performance during interactive animations.
- **SC-004**: Buttons remain fully functional and accessible via keyboard navigation.
