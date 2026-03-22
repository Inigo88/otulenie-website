# Feature Specification: Sticky Stacking Archive

**Feature Branch**: `013-stacking-services`  
**Created**: 2026-03-22  
**Status**: Finalized  
**Input**: User description: "Implement Sticky Stacking Archive for massage protocols. Create three scroll-linked stacking cards governed by GSAP ScrollTrigger to display massage protocols and values."

## Clarifications

### Session 2026-03-22

- Q: Do the stacking cards include a "Call to Action" (CTA) button or link, or are they purely informational? → A: Purely informational displays (no CTA).
- Q: Should the component be designed to accept an arbitrary array of `n` cards (making it reusable), or strictly hardcoded for exactly 3 cards? → A: Strictly hardcoded for exactly 3 cards.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Discovering Core Values through Stacking Cards (Priority: P1)

As a prospective client exploring the site, I want to playfully interact with the stacking archive of massage protocols as I scroll, so that I experience the brand's calm and structured philosophy in a premium, engaging way.

**Why this priority**: The stacking archive is a core interactive element (Epic 1.3) designed to convey the brand's premium, grounding nature. It builds trust through high-fidelity visual storytelling.

**Independent Test**: Can be independently tested by rendering the component in isolation and scrolling to trigger the pinning and stacking animations.

**Acceptance Scenarios**:

1. **Given** the user scrolls down to the Stacking Archive section, **When** the top of the section reaches the viewport center/top, **Then** the first card remains fixed in place on the screen.
2. **Given** the user continues scrolling, **When** successive scroll thresholds are hit, **Then** the second and third cards overlap the previous ones with a subtle 3D scale-down and darkening effect on the cards below.

---

### User Story 2 - Digesting Protocols on Mobile (Priority: P2)

As a busy mother or desk worker on a mobile device, I want the stacking cards to be legible, responsive, and easy to scroll through, so that the animation does not hinder the reading experience.

**Why this priority**: Per the mobile-first architectural constraint, the experience must be seamless and frictionless on smaller viewports.

**Independent Test**: Can be tested on a 390px viewport to ensure cards stack correctly and text remains readable without layout thrashing.

**Acceptance Scenarios**:

1. **Given** a user on a mobile device (390px width), **When** scrolling through the section, **Then** the cards stack with appropriate padding and the scroll triggers are calibrated for touch-scrolling speeds.

### Edge Cases

- What happens when the user scrolls rapidly past the section? (The visual state should resolve to the correct final layout without breaking or ghosting).
- How does the system handle "prefers-reduced-motion"? (The parallax/stacking effect should gracefully degrade to a standard vertical list or simple fade-ins).
- How does the system behave on ultra-wide screens? (Cards should maintain maximum width constraints to avoid stretched typography).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render exactly three scroll-linked cards that stack on top of each other as the user scrolls down.
- **FR-002**: System MUST apply a pinning effect to cards as they reach the top of the container, allowing subsequent cards to overlap them.
- **FR-003**: System MUST apply a visual depth effect to pinned cards beneath the active card (e.g., scaling down, decreasing brightness) to create a 3D stacking illusion.
- **FR-004**: System MUST ensure smooth animation performance that bounds to the user's scroll position.
- **FR-005**: System MUST adhere to the aesthetic constraints: using the established brand colors (Moss, Linen, Olive) and maintaining the global noise overlay pattern.
- **FR-006**: System MUST disable or significantly reduce the stacking animations if `prefers-reduced-motion` is active, replacing it with a standard vertical layout.
- **FR-007**: System MUST display the specific copy/content for the three massage protocols and values as defined in the associated `copy.md` document.
- **FR-008**: System MUST render the cards as purely informational displays without any interactive Call to Action (CTA) buttons or links.

### Key Entities

- **StackingCard**: Represents a single protocol/value card. Attributes: Title, Description, Image/Icon, Background Color. (Constraint: Strictly hardcoded for exactly 3 specific cards, not dynamically generated).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of the three stacking cards pin and overlap successfully based on vertical scroll position.
- **SC-002**: Animations run at 60fps on average mobile and desktop devices without jank.
- **SC-003**: On viewports <= 390px, the stacking effect remains functional and text remains fully legible (meeting applicable contrast standards).
- **SC-004**: Users with `prefers-reduced-motion` enabled experience zero parallax or layout-shifting animations in this section.
