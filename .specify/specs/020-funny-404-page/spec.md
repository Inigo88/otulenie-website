# Feature Specification: Build a 'funny' 404 Error Page

**Feature Branch**: `020-funny-404-page`  
**Created**: 2026-03-27  
**Status**: Finalized  
**Input**: User description: "Build a 'funny' 404 Error Page"

## Clarifications

### Session 2026-03-27

- Q: Navigation Scope: Should the 404 page include links to major sections or only a minimal "Return Home" button? → A: Option A: Minimal - only a prominent "Return Home" button.
- Q: Humor and Messaging Tone → A: Option C (Selected): "Zatopiliśmy się w relaksie tak głęboko, że zgubiliśmy ten adres. Odnajdźmy się wspólnie."
- Q: Implementation "Graphic" → A: Option A: A feature requirement - include a simple, AI-generated humorous graphic as a visual asset.
- Q: Graphic Interactivity → A: Option A: Static - high-quality static image/SVG with a calm entrance animation.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Land on Non-existent URL (Priority: P1)

As a visitor, I want to see a helpful and on-brand page when I accidentally navigate to a URL that doesn't exist, so that I don't feel lost or frustrated.

**Why this priority**: Essential for maintaining brand continuity and preventing user drop-off.

**Independent Test**: Can be fully tested by navigating to any non-existent route and verifying the custom 404 page renders.

**Acceptance Scenarios**:

1. **Given** a visitor navigates to an invalid URL, **When** the page loads, **Then** a custom 404 page is displayed instead of a default browser error.
2. **Given** the 404 page is displayed, **When** the visitor clicks "Strona główna" (Return Home) button, **Then** they are redirected to the homepage.
3. **Given** the 404 page is displayed, **When** viewing navigation options, **Then** only the "Strona główna" button and the primary brand logo are present (no full sitemap or search).

---

### User Story 2 - Brand Personality & Humor (Priority: P2)

As a visitor, I want the error page to feel like it belongs to Otulenie through its calm aesthetic and a gentle, humorous message, so that the error becomes a pleasant brand interaction.

**Why this priority**: Enhances brand experience and reinforces the "premium digital instrument" aesthetic.

**Independent Test**: Verify the 404 page uses the same "Otulenie Calm" palette, noise overlay, and typography as defined in the global design system.

**Acceptance Scenarios**:

1. **Given** the 404 page is open, **When** it renders, **Then** the "Otulenie Calm" palette and global noise overlay are active.
2. **Given** the 404 page content, **When** the text is viewed, **Then** it conveys the "premium-calm" tagline: "Zatopiliśmy się w relaksie tak głęboko, że zgubiliśmy ten adres. Odnajdźmy się wspólnie."

---

### Edge Cases

- **Mobile Viewports**: The 404 page elements must stack or scale correctly on 390px viewports, maintaining readability.
- **Deep Linking**: Accessing a non-existent sub-resource (e.g., `/oferta/wrong-id`) should correctly trigger the 404 page.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST intercept all invalid routes and render the custom 404 component.
- **FR-002**: System MUST implement a "Strona główna" (Return Home) button using the `MagneticButton` component pattern.
- **FR-003**: System MUST apply the 0.05 opacity SVG noise overlay globally to the 404 view.
- **FR-004**: System MUST use GSAP (`useGSAP`) to implement a calm entrance animation for the 404 message and call-to-action.
- **FR-005**: System MUST strictly adhere to the project palette (#374833 Moss, #fdfaf0 Linen).
- **FR-006**: System MUST include a central AI-generated humorous graphic (stored in the `/public` root) that maintains the brand's calm aesthetic, featuring a gentle GSAP entrance animation.

### Key Entities *(include if feature involves data)*

- N/A (Static informational page)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of non-matching routes within the application domain result in the 404 page display.
- **SC-002**: Navigation back to the homepage from the 404 page takes exactly one click.
- **SC-003**: Entrance animations execute smoothly at 60fps without layout shifts.
- **SC-004**: Visual design matches the cinematic quality of the homepage (no generic "404" text).
