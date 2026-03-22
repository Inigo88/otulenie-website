# Feature Specification: 1.1.4 - Image Restriction

**Feature Branch**: `014-image-restriction`  
**Created**: 2026-03-22  
**Status**: Draft  
**Input**: User description: "Restrict website imagery to image-small"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 100% Brand Control (Priority: P1)

As a business owner, I want my website to use only my professionally shot local assets instead of generic Unsplash or placeholder images, so that I have complete control over the brand's visual identity and atmosphere.

**Why this priority**: Brand consistency is a core architectural constraint (Constitution). External dependencies for core visuals introduce risk and reduce premium feel.

**Independent Test**: Can be fully tested by auditing the compiled source for any external `http/https` image URLs or missing local assets.

**Acceptance Scenarios**:

1. **Given** the website is running locally, **When** I inspect the network tab, **Then** all image assets must be loaded from the local file system (e.g., `/images-small/`).
2. **Given** the Hero section is rendered, **When** I check the background image, **Then** it must be `IMG-07.jpg` (or another approved local asset) instead of an Unsplash URL.

---

### User Story 2 - Accurate Service Representation (Priority: P2)

As a prospective client, I want to see actual photos of the massage services (oils, table setup, technique) so that I can set realistic expectations for my home visit.

**Why this priority**: Enhances trust (PRD Goal) by showing actual equipment and practitioner technique.

**Independent Test**: Verify that service cards and stacking cards display images that accurately correspond to their descriptions.

**Acceptance Scenarios**:

1. **Given** the "Ciepłe Otulenie" service card, **When** viewed in the carousel, **Then** it must display `IMG-20.jpg` (showing the warm oil pouring).
2. **Given** the "Stacking Services" section, **When** I scroll through the cards, **Then** each card must show a high-quality local JPEG representing the specific benefit (e.g., table setup for "Relaks", macro hands for "Uważność").

---

### Edge Cases

- **Missing Assets**: How does the system handle a missing JPEG in the `public/images-small` folder? (Standard browser fallback applies, but build-time checks or Vite alias should minimize this).
- **Responsive Handling**: Does `object-cover` correctly preserve the focus on the therapist/action across mobile and desktop viewports? (Must be verified on 390px viewport).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST migrate all files from `.specify/context/images-small/` to the directory where they can be served (e.g., `public/images-small/`).
- **FR-002**: System MUST replace the Unsplash URL in the `Hero` component background with `images-small/IMG-07.jpg`.
- **FR-003**: System MUST update `STACKING_CARDS` data in `App.jsx` to use local assets:
    - Card 1 (Relaks): `images-small/IMG-07.jpg` (or `IMG-01.jpg` for portrait focus)
    - Card 2 (Uważność): `images-small/IMG-12.jpg` (Macro close-up)
    - Card 3 (Regeneracja): `images-small/IMG-14.jpg` (Back massage technique)
- **FR-004**: System MUST update `MASSAGE_DATA` constants to include an `image` field mapped to local assets:
    - Mocne Otulenie: `images-small/IMG-10.jpg`
    - Głębokie Otulenie: `images-small/IMG-14.jpg`
    - Czułe Otulenie: `images-small/IMG-08.jpg`
    - Ciepłe Otulenie: `images-small/IMG-21.jpg`
- **FR-005**: `MassageCarousel` and `Hero` components MUST be updated to accept and render these new local image paths.
- **FR-006**: SYSTEM MUST NOT use any external image providers or generated placeholders.

### Key Entities *(include if feature involves data)*

- **Massage Asset**: Represents a local JPEG file in `images-small`.
    - `filename`: e.g., `IMG-01.jpg`
    - `description`: Mapping to specific sections (Hero, Carousel, Archive)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 0% external image URLs in the final production bundle (excluding the SVG noise data URL).
- **SC-002**: All 4 signature massage cards in the Carousel display a unique, relevant local image from the `images-small` library.
- **SC-003**: The Hero section loads a local branded image in under 200ms on a fast 3G connection (due to optimized file sizes).
- **SC-004**: No "broken image" icons are present in any viewport size (Mobile: 390px, Desktop: 1280px).
