# Feature Specification: 1.3.4 Build primary booking flow interactions

**Feature Branch**: `016-booking-flow`  
**Created**: 2026-03-24  
**Status**: Finalized  
**Input**: User description: "Feature 1.3.4: Build primary booking flow interactions. Ensure robust integration with Booksy links site-wide and format secondary contact options efficiently."

## Clarifications

### Session 2026-03-24

- Q: Booksy Widget Implementation → A: Use the Booksy Widget only for the Hero section CTA. All other booking buttons (Mobile Menu, Footer, etc.) must use a direct link to the Booksy URL.
- Q: Conversion Tracking → A: Skip tracking/analytics implementation for now to maintain focus on core interactions.
- Q: Magnetic Effects on Mobile → A: Disable magnetic effects for ALL interactive elements on mobile viewports. Only standard tap highlights should be used to maintain high performance.
- Q: Carousel Redirection → A: For now, Carousel CTAs should simply redirect to the `/oferta` page without specific anchors. Anchors will be implemented alongside the 'Oferta' page feature itself.
- Q: Secondary Contact Context → A: Confirmed in code; phone/email links are already present in the Footer. A direct "Zarezerwuj" link should be added to the Footer navigation for consistency.
- Q: Booksy Widget Fallback → A: Use a hybrid fallback; the Hero button should be a direct link by default and "upgrade" to the widget only if the script loads successfully.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Primary Booking Access (Priority: P1)

As a Prospective Client, I want to see a prominent "Book Now" (Zarezerwuj) button in the Hero section and Mobile Menu so I can start the booking process immediately.

**Why this priority**: Directly addresses the primary business goal of converting visitors into Booksy appointments.

**Independent Test**: Can be tested by clicking the "Zarezerwuj" button in the Hero section and verifying it opens the official Booksy link (`https://booksy.com/pl-pl/336663...`) in a new tab.

**Acceptance Scenarios**:

1. **Given** the user is on the Hero section, **When** they click "Zarezerwuj masaż", **Then** the official Booksy URL opens in a new tab.
2. **Given** the user is browsing the Massage Carousel, **When** they click the CTA on a card, **Then** they are redirected to the corresponding section of the 'Oferta' page.

---

### User Story 2 - Alternative Contact Path (Priority: P2)

As a Prospective Client with specific questions or custom requirements, I want to find clear phone and email contact options so I can choose my preferred communication method.

**Why this priority**: Reduces friction for users who aren't ready for automated booking or have special needs.

**Independent Test**: Can be tested by clicking the phone number and email in the footer/contact section to ensure they trigger the correct device protocols (`tel:` and `mailto:`).

**Acceptance Scenarios**:

1. **Given** the user is at the bottom of the page, **When** they click the phone number, **Then** the device's dialer opens with "+48 780 530 235".
2. **Given** the user is at the bottom of the page, **When** they click the email address, **Then** the default email client opens addressed to "pm.otulenie@gmail.com".

---

### User Story 3 - Service Discovery (Priority: P2)

As a Prospective Client, I want to learn more about a specific massage type from the Carousel before booking, so I can make an informed choice.

**Why this priority**: Supports the educational funnel and trust-building before the final conversion.

**Independent Test**: Can be tested by clicking a Carousel card CTA and verifying it navigates to the `/oferta` page with the correct anchor.

**Acceptance Scenarios**:

1. **Given** the user is on the homepage Carousel, **When** they click "Dowiedz się więcej" (or similar), **Then** they navigate to `/oferta#[service-id]`.

---

### Edge Cases

- **What happens when the Booksy platform is preferred in certain regions?** The system uses a centralized external URL that can be updated easily.
- **How does system handle users with `prefers-reduced-motion`?** CTAs perform immediate transitions without GSAP stagger/hover scaling effects.

## Assumptions

- **Official Data Source**: All contact and booking information is sourced from `.specify/context/contact.md`.
- **Booksy URL**: The primary booking link is `https://booksy.com/pl-pl/336663_otulenie-praktyka-masazu_masaz_13715_wroclaw`.
- **Contact Details**: The official phone is `+48 780 530 235` and email is `pm.otulenie@gmail.com`.
- **Magnetic Buttons**: It is assumed the `MagneticButton` component is already functional and can be used for all CTAs.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST centralize the Booksy booking URL in a single constant file (`src/constants/links.js` or similar) to ensure site-wide consistency.
- **FR-002**: Direct "Zarezerwuj" (Book) buttons (e.g., Hero, Mobile Menu) MUST use the official Booksy URL from the central constant.
- **FR-003**: Carousel Card CTAs MUST be changed from "Zarezerwuj" to "Dowiedz się więcej" (or local equivalent) and link directly to the '/oferta' page (without anchors for now).
- **FR-004**: System MUST implement a "Secondary Contact" block formatting phone and email as interactive `tel:` and `mailto:` links, ensuring they do not compete visually with the primary booking action.
- **FR-005**: The Phone Number MUST be displayed as "+48 780 530 235" for readability but use the raw "+48780530235" as the link target.
- **FR-005**: The Mobile Navigation Modal MUST include a primary "Zarezerwuj" CTA at the bottom of the link list pointing to the official Booksy URL.
- **FR-006**: System MUST implement the Booksy Widget Script specifically for the Hero section CTA. All other "Zarezerwuj" CTAs MUST remain as direct `href` links to the centralized Booksy URL.
- **FR-007**: All booking and contact CTAs MUST implement a "Magnetic" hover effect only on desktop viewports. This effect MUST be strictly disabled on mobile/touch interfaces for all interactive elements to ensure layout stability and performance (Ref: Constitution).
- **FR-008**: System MUST provide clear `aria-label` attributes for all external booking and social links.

### Key Entities *(include if feature involves data)*

- **BookingLink**: Represents the primary conversion target (URL, label).
- **ContactSchema**: Represents the secondary contact points (Phone, Email, Instagram, Facebook).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of "Zarezerwuj" buttons point to the correct, centralized Booksy URL.
- **SC-002**: Contact links (Phone/Email) are reachable within 1 scroll swipe or 1 tap from navigation on mobile.
- **SC-003**: All CTAs maintain the "Otulenie Calm" aesthetic (vibrant hover states, premium typography).
- **SC-004**: Screen readers correctly announce the purpose of the booking buttons as external links.
