# Feature Specification: Footer

**Feature Branch**: `015-footer`  
**Created**: 2026-03-23  
**Status**: Finalized  
**Input**: User description: "Build Footer with operational indicator. Develop the deep dark rounded-top footer containing navigation links and a pulsing 'System Operational' interactive dot."

## Clarifications

### Session 2026-03-23
- Q: Language Consistency (Operational Indicator) -> A: The functional requirement for the operational indicator has been removed entirely per user request.
- Q: Booking CTA Behavior -> A: The booking button ("Zarezerwuj masaż") has been removed entirely per user request.
- Q: Social Media Links Behavior -> A: Simple clickable icons (e.g., Lucide Instagram, Facebook) linking directly to the profiles.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Information Discovery (Priority: P1)

As a prospective client who has scrolled to the bottom of the page, I want to find contact information and navigation links so that I can easily reach out or explore other parts of the site.

**Why this priority**: Essential for user retention and conversion at the end of the scroll journey.

**Independent Test**: Can be fully tested by scrolling to the bottom of the page and verifying the presence and functionality of links and contact info.

**Acceptance Scenarios**:

1. **Given** the user is at the bottom of any page, **When** they view the footer, **Then** they should see the "Otulenie" brand, navigation links, and a clear path to contact info.
2. **Given** the footer is visible, **When** the user clicks a navigation link, **Then** they should be taken to the corresponding section or page.

---

### Edge Cases

- **Mobile Viewport**: The footer must stack elements vertically and maintain readable text sizes.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render a footer with a deep dark background (`bg-moss`) and a rounded top edge (`rounded-t-[3rem]` on desktop, adjusted for mobile).
- **FR-002**: System MUST include the "Otulenie" logo/name in a prominent serif font.
- **FR-003**: System MUST provide navigation links to: Home, Oferta, O mnie, Obszar dojazdu, FAQ.
- **FR-004**: System MUST show contact details: Phone number, Email address, and Social Media links (Instagram, Facebook) as simple clickable icons.
- **FR-005**: System MUST include legal boilerplate: Copyright notice and a link to the Privacy Policy.

### Key Entities

- **Footer**: A global UI component present at the bottom of all routes.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Footer adheres to the "Otulenie Calm" palette (Moss background, Linen/Sand text).
- **SC-002**: All links in the footer are functional and lead to correct destinations.
- **SC-003**: Footer is fully responsive, stacking vertically on viewports narrower than 768px.
- **SC-004**: 0.05 opacity noise overlay remains visible over the footer background.
