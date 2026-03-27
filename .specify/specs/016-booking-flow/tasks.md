# Tasks: 1.3.4 Build primary booking flow interactions

**Input**: Design documents from `/specs/016-booking-flow/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Manual verification as specified in each user story. Project lacks automated tests.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Centralize contact and booking data.

- [ ] T001 [P] Create centralized constants in `src/constants/links.js` per `data-model.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure needed for User Story 1.

- [ ] T002 Implement `useBooksyWidget` script loading hook in `src/App.jsx`

**Checkpoint**: Foundation ready - user story implementation can begin.

---

## Phase 3: User Story 1 - Primary Booking Access (Priority: P1) 🎯 MVP

**Goal**: Integrated Booksy booking via Hero button and Mobile Menu.

**Independent Test**: Verify "Zarezerwuj" in Hero and Mobile Menu opens `otulenie.booksy.com/h` (and triggers widget in Hero if script loaded).

### Implementation for User Story 1

- [ ] T003 [P] [US1] Update `src/components/Hero.jsx` to use centralized `BOOKSY_URL` with `target="_blank"` and `aria-label`
- [ ] T004 [US1] Add `ms-booking-button` class and widget trigger logic to `src/components/Hero.jsx`
- [ ] T005 [P] [US1] Update `src/components/MobileMenu.jsx` to use centralized `BOOKSY_URL` for the "Zarezerwuj" button with `target="_blank"` and `aria-label`
- [ ] T006 [P] [US1] Update `src/components/FeatureCards/DiagnosticShuffler.jsx` to use centralized `BOOKSY_URL` with `target="_blank"` and `aria-label`

**Checkpoint**: User Story 1 is functional.

---

## Phase 4: User Story 2 - Alternative Contact Path (Priority: P2)

**Goal**: Interactive phone and email links in Footer.

**Independent Test**: Click phone/email in footer on mobile; verify `tel:` and `mailto:` protocol triggers.

### Implementation for User Story 2

- [ ] T007 [P] [US2] Update `Footer` component in `src/App.jsx` to use interactive links for phone and email with appropriate `aria-label` attributes
- [ ] T008 [US2] Add "Zarezerwuj" direct link with `target="_blank"` and `aria-label` to Footer navigation in `src/App.jsx`

---

## Phase 5: User Story 3 - Service Discovery (Priority: P2)

**Goal**: Carousel cards link to `/oferta` with "Dowiedz się więcej" label.

**Independent Test**: Verify Carousel card buttons link to `/oferta` and display new label.

### Implementation for User Story 3

- [ ] T009 [P] [US3] Update `src/components/MassageCarousel.jsx` card buttons to link to `/oferta`
- [ ] T010 [US3] Change Carousel button labels to "Dowiedz się więcej" in `src/components/MassageCarousel.jsx`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Consistency and quality checks.

- [ ] T011 [P] Verify magnetic effects are disabled on mobile viewports (390px) in all components
- [ ] T012 Run remaining `quickstart.md` validation steps

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on T001.
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion.
- **User Story 2 & 3 (Phases 4 & 5)**: Depend on Phase 1 (constants). Can run in parallel with US1.
- **Polish (Phase 6)**: Depends on all implementation phases.

### Parallel Opportunities

- T001, T003, T005, T006, T007, T009, T011 can all run in parallel if constants are available.
- US1, US2, and US3 are largely independent and can be implemented concurrently.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete T001 (Constants).
2. Complete Phase 2 (Foundational - Widget hook).
3. Complete Phase 3 (US1 - Primary conversion).
4. **VALIDATE**: Test Hero and Mobile Menu booking.

### Incremental Delivery

1. Foundation ready.
2. Add US1 → MVP.
3. Add US2 → Improved contact options.
4. Add US3 → Service discovery.
5. Polish.
