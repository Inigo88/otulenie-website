# Tasks: Massage Types Carousel

**Input**: Design documents from `/specs/009-massage-types-carousel/`
**Prerequisites**: [plan.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/009-massage-types-carousel/plan.md), [spec.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/009-massage-types-carousel/spec.md), [research.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/009-massage-types-carousel/research.md), [data-model.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/009-massage-types-carousel/data-model.md)

**Tests**: Tests are OPTIONAL. Browser-based verification will be used as per `quickstart.md`.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create `src/constants/massageData.js` with data (specifically using `shortDescription` for card content) extracted from `.specify/context/massage-descriptions.md`
- [X] T002 Create `src/components/MassageCarousel.jsx` with basic React component structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 [P] Register GSAP `ScrollTrigger` and `Draggable` in `src/main.jsx`
- [X] T004 Implement standard Otulenie section container with 0.05 opacity noise overlay in `src/components/MassageCarousel.jsx`
- [X] T005 [P] Ensure `MagneticButton` component is available and correctly exported for carousel use

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Browsing Massage Types (Priority: P1) 🎯 MVP

**Goal**: Enable users to browse 4 massage types via a high-fidelity horizontal carousel.

**Independent Test**: Verify cards are visible, readable in Polish, and navigate via scroll/swipe.

### Implementation for User Story 1

- [X] T006 [P] [US1] Build horizontal slide layout with responsive stacking/reveal rules in `src/components/MassageCarousel.jsx`
- [X] T007 [US1] Map `massageData` (name, duration, price, short description) to interactive slide cards
- [X] T008 [US1] Integrate GSAP `ScrollTrigger` for horizontal translation on vertical scroll
- [X] T009 [US1] Integrate GSAP `Draggable` for touch and mouse swipe navigation
- [X] T010 [US1] Implement pagination dots indicator with active state feedback

**Checkpoint**: User Story 1 (Browsing) is functional and testable independently.

---

## Phase 4: User Story 2 - Direct Booking from Carousel (Priority: P2)

**Goal**: Allow clients to initiate booking immediately from any active massage card.

**Independent Test**: Click "Zarezerwuj" and verify it opens the correct Booksy URL in a new tab.

### Implementation for User Story 2

- [X] T011 [P] [US2] Add "Zarezerwuj" `MagneticButton` to the massage slide template in `src/components/MassageCarousel.jsx`
- [X] T012 [US2] Wire button action to open `booksyUrl` in a new tab (`target="_blank"`)

**Checkpoint**: User Story 2 (Booking) is functional and can be tested alongside US1.

---

## Phase 5: User Story 3 - Interactive Polish & Transitions (Priority: P3)

**Goal**: Ensure the carousel feels "alive" with premium GSAP animations and brand-aligned styling.

**Independent Test**: Observe staggered reveal, auto-rotation, and hover effects.

### Implementation for User Story 3

- [X] T013 [P] [US3] Implement staggered fade-up entrance animation using GSAP `ScrollTrigger`
- [X] T014 [US3] Implement 5-second auto-rotation interval with hover/interaction pause logic
- [X] T015 [US3] Apply cinematic styling using "Otulenie Calm" palette and premium typography
- [X] T016 [US3] Implement magnetic hover reaction on cards (`translateY` or scale)

**Checkpoint**: All user stories are complete and the interface feels premium.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final integration and edge-case handling.

- [X] T017 [MODIFY] `src/App.jsx` to replace current "Oferta" and feature cards with `MassageCarousel`
- [X] T018 [P] Implement "Free consultation" fallback card in `src/components/MassageCarousel.jsx`
- [X] T019 Run manual verification per `quickstart.md` (responsiveness, Booksy links, interactions)
- [X] T020 Perform accessibility audit (`accessibility_audit`) on the landing page

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1 completion.
- **User Stories (Phase 3-5)**: All depend on Phase 2 completion.
  - US1 (P1) is the MVP and should be prioritized.
  - US2 and US3 can proceed in parallel once US1 structure is established.
- **Polish (Phase 6)**: Depends on completion of all user stories.

### Parallel Opportunities

- T003 and T005 can run in parallel.
- T011 can be prepared in parallel once slide template (T006) exists.
- T013 and T018 can run in parallel in different files/parts of the component.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational phases.
2. Complete US1 (T006-T010).
3. **VALIDATE**: Verify carousel scrolls and displays data correctly.

### Incremental Delivery

1. Add US2 (Booking) → Test conversion flow.
2. Add US3 (Polish) → Test animation fidelity.
3. Integrate into `App.jsx` and finalize fallback logic.
