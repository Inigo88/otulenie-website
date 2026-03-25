# Feature Specification: Implement SVG Logo

**Feature Branch**: `017-svg-logo`  
**Created**: 2026-03-25  
**Status**: Draft  
**Input**: User description: "Implement SVG Logo across the application"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Brand Consistency in Navigation (Priority: P1)

As a visitor, I want to see the official Otulenie logo in the navbar instead of plain text, so that the brand feels more professional and authentic.

**Why this priority**: High. The logo is the primary brand identifier and sets the cinematic tone of the website.

**Independent Test**: Can be fully tested by loading the homepage and verifying that the `public/logo.svg` asset is rendered in the Navbar instead of the word "Otulenie".

**Acceptance Scenarios**:

1. **Given** the user is at the top of the page (Hero state), **When** the navbar is visible, **Then** the SVG logo should be rendered in `Linen` (#fdfaf0) color.
2. **Given** the user scrolls down (Island state), **When** the navbar morphs, **Then** the SVG logo should transition its color to `Moss` (#374833).
3. **Given** the user clicks the logo, **When** they are on the homepage, **Then** the page should scroll smoothly to the top.

---

### User Story 2 - Brand Presence in Footer (Priority: P2)

As a visitor reaching the end of the page, I want to see the official logo in the footer to reinforce brand recognition before I leave or take a final action.

**Why this priority**: Medium. Ensures brand closure at the end of the user journey.

**Independent Test**: Can be fully tested by scrolling to the bottom and verifying the SVG logo is present in the Footer.

**Acceptance Scenarios**:

1. **Given** the user scrolls to the Footer, **When** the footer is visible, **Then** the SVG logo should be rendered in `Linen` (#fdfaf0) color to contrast against the `Moss` background.

---

### Edge Cases

- **Mobile Viewports**: Ensure the SVG scales appropriately on small screens (width: 390px) without breaking the navbar layout.
- **Reduced Motion**: Ensure the color transition in the navbar respects the `prefers-reduced-motion` setting (instant change vs transition).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render the `public/logo.svg` asset in the `Navbar` component.
- **FR-002**: System MUST render the `public/logo.svg` asset in the `Footer` component.
- **FR-003**: The logo MUST be wrapped in a link pointing to the homepage (`/`).
- **FR-004**: In the `Navbar`, the logo's color MUST dynamically transition between `Linen` (#fdfaf0) and `Moss` (#374833) based on the `isHero` state.
- **FR-005**: In the `Footer`, the logo color MUST be `Linen` (#fdfaf0).
- **FR-006**: The SVG MUST use `fill="currentColor"` internal implementation to allow CSS-based color control.
- **FR-007**: System MUST maintain the existing `font-serif` fallback or accessibility labels for screen readers.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Official SVG logo is visible in both Navbar and Footer on Desktop and Mobile.
- **SC-002**: Logo color transitions in the Navbar align with the existing background/text animation timing (0.5s duration).
- **SC-003**: Navigation functionality (scroll-to-top) is preserved when clicking the logo.
- **SC-004**: The implementation strictly adheres to the "Otulenie Calm" palette (#374833 and #fdfaf0).
