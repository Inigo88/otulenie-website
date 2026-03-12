# Feature Specification: Full Mobile Navigation Modal

**Feature Branch**: `006-navbar-mobile`  
**Created**: 2026-03-12  
**Status**: Finalized  
##- [x] Answer clarification questions (Max 5) <!-- id: 2 -->
- [x] Update feature spec with clarifications <!-- id: 3 -->
**Input**: User description: "Full Mobile Navigation Modal: Develop the overlay modal for mobile devices, featuring high-fidelity animations, brand presence, and clear navigation links."

## Clarifications

### Session 2026-03-12
- Q: Should the navigation modal implement a focus trap and ARIA attributes (roles, labels) to ensure a premium accessibility experience for all users? → A: Full Focus Trap & ARIA (Best practice)
- Q: How should the Navbar behave when the modal is active? → A: Option C - Navbar morphs into 'Close' inside Modal
- Q: Should the mobile navigation modal also include secondary contact links (Phone, Instagram) for easier access? → A: No, keep it minimal (Nav + Booksy only)
- Q: Should the hamburger menu icon morph into an "X" close icon using a GSAP path/rotation animation? → A: GSAP Path Morph/Rotation (High-fidelity)
- Q: What should be the visual style of the modal's backdrop? → A: Option A - Backdrop Blur + Subtle Tint (System default)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Basic Modal Navigation (Priority: P1)

As a mobile visitor, I want to access the navigation menu so that I can easily move between different sections of the website.

**Why this priority**: Core navigation is fundamental to the user experience on mobile devices where space is limited and the desktop menu is hidden.

**Independent Test**: Can be fully tested by clicking the hamburger/menu icon in the Navbar on a mobile viewport and verifying that the modal opens with all navigation links present.

**Acceptance Scenarios**:

1. **Given** the mobile homepage is loaded, **When** the user clicks the menu icon in the Floating Island Navbar, **Then** a full-screen overlay modal appears.
2. **Given** the navigation modal is open, **When** the user clicks any navigation link (e.g., "Oferta"), **Then** the modal closes and the user is navigated to the respective section/page.

---

### User Story 2 - High-Fidelity Brand Presence (Priority: P2)

As a prospective client, I want the navigation experience to feel "premium" and "calm" so that it aligns with the brand promise of Otulenie.

**Why this priority**: The website's aesthetic is a key differentiator; the mobile experience must maintain the high-fidelity cinematic feel established on desktop.

**Independent Test**: Can be tested by observing the GSAP animations during modal transition and verifying they follow the `power3.out` easing and `Otulenie Calm` palette.

**Acceptance Scenarios**:

1. **Given** the menu is closed, **When** the user clicks to open it, **Then** the modal fades in or slides up with a staggered reveal of the navigation items using GSAP.
2. **Given** the modal is open, **Then** the background uses `Warm Linen (#fdfaf0)` with `Forest Moss (#374833)` text and rounded containers (`rounded-[2rem]`).

---

### User Story 3 - Conversion Focus (Sticky CTA) (Priority: P3)

As a busy mother or desk worker, I want to quickly book a massage from the mobile menu so that I don't have to hunt for the booking button.

**Why this priority**: Conversion is the primary business goal. A clear CTA in the modal ensures the "Booksy" funnel is always accessible.

**Independent Test**: Can be tested by verifying the presence and functionality of a prominent "Zarezerwuj masaż" button within the modal on a mobile device.

**Acceptance Scenarios**:

1. **Given** the navigation modal is open, **When** the user sees the "Zarezerwuj masaż" button, **Then** it should be visually distinct (using accent color) and link directly to the Booksy page.

---

### Edge Cases

- **Viewport Transitions**: How does the modal behave if the device orientation changes while the modal is open? (Requirement: Modal should re-calculate center/full-screen properties or close).
- **Navigation Lock**: Does the background scroll when the modal is open? (Requirement: Page scrolling should be disabled when the modal is active).
- **External Links**: How does the system handle clicks on the Booksy link? (Requirement: Should open in a new tab/window to keep the user context).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST implement a full-screen or large center-aligned overlay modal specifically for mobile viewports (breakpoint < 768px).
- **FR-002**: Modal MUST contain the following navigation links: Start, Oferta, O mnie, Obszar dojazdu, FAQ.
- **FR-003**: System MUST include a prominent "Zarezerwuj masaż" CTA within the modal, styled with the `Soft Olive (#6E8068)` accent color.
- **FR-004**: Opening and closing transitions MUST be implemented using GSAP with `power3.out` easing and a staggered entrance for nav items (stagger: 0.1).
- **FR-005**: Modal MUST adhere to the `Otulenie Calm` system: `Warm Linen` background, `Forest Moss` text, and `rounded-[2rem]` corners.
- **FR-006**: System MUST disable background page scrolling while the modal is open to ensure a focused user interaction.
- **FR-007**: The Floating Island Navbar MUST morph into a dedicated "Close" button when the modal is active, using a high-fidelity GSAP path/rotation animation for the menu icon to ensure a premium visual transition.
- **FR-008**: System MUST implement a focus trap within the modal to ensure keyboard/screen-reader navigation is contained.
- **FR-009**: Modal and its contents MUST use appropriate ARIA landmarks (e.g., `role="dialog"`, `aria-modal="true"`, and descriptive `aria-label` for links).
- **FR-010**: System MUST apply a `backdrop-blur-xl` and a subtle primary color tint (`Forest Moss` with reduced opacity) to the page content behind the modal when active.

### Key Entities

- **Navigation Modal**: A React component representing the overlay UI.
- **NavLink**: An interactive entity representing a destination on the site.
- **Booking CTA**: A specialized NavLink with conversion-focused styling and behavior.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All navigation items are accessible within 2 clicks from any mobile page state.
- **SC-002**: GSAP animations maintain 60fps on standard mobile devices without layout thrashing.
- **SC-003**: Navigation modal strictly adheres to the "Otulenie Calm" color palette and typography (Fraunces for headers/links).
- **SC-004**: The modal correctly disables body scroll on 100% of tested mobile browsers (iOS Safari, Android Chrome).


