# Tasks: 020-funny-404-page

**Input**: Design documents from `/specs/020-funny-404-page/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Asset management and dependency initialization

- [ ] T001 [P] Move "Calm Sloth" asset to `public/404-sloth.webp` (C2)
- [ ] T002 Install `react-router-dom` dependency

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Routing infrastructure that MUST be complete before user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T003 Implement `BrowserRouter` and basic `Routes` structure in `src/App.jsx`
- [ ] T004 Create placeholder `NotFound` component and map to `*` route in `src/App.jsx`

**Checkpoint**: Foundation ready - the application now handles routing and intercepts invalid paths.

---

## Phase 3: User Story 1 - Land on Non-existent URL (Priority: P1) 🎯 MVP

**Goal**: A visitor sees a branded 404 page with a "Return Home" CTA when hitting an invalid URL.

**Independent Test**: Navigate to `http://localhost:5173/non-existent-path` and verify the `NotFound` component renders with a working "Strona główna" button.

### Implementation for User Story 1

- [ ] T005 [US1] Build the `NotFound` component visual structure (Moss/Linen palette) in `src/App.jsx`
- [ ] T006 [US1] Implement standard "Strona główna" layout with brand logo in `src/App.jsx`
- [ ] T007 [US1] Integrate `MagneticButton` for the "Strona główna" CTA in `src/App.jsx`
- [ ] T008 [US1] Use `Link` from `react-router-dom` for no-reload navigation back to `/`

**Checkpoint**: At this point, User Story 1 is fully functional and testable independently.

---

## Phase 4: User Story 2 - Brand Personality & Humor (Priority: P2)

**Goal**: The 404 page feels branded through a "Calm Sloth" visual and premium entrance animations.

**Independent Test**: Refresh the 404 page and observe the sloth image entrance and staggered text reveal animations.

### Implementation for User Story 2

- [ ] T009 [US2] Add the "Calm Sloth" image asset to the `NotFound` component in `src/App.jsx`
- [ ] T010 [US2] Implement finalized tagline ("Zatopiliśmy się w relaksie...") in the `NotFound` component
- [ ] T011 [US2] Implement `useGSAP` entrance animation for the sloth (scale/opacity) in `src/App.jsx`
- [ ] T012 [US2] Implement GSAP staggered fade-up for tagline and CTA in `src/App.jsx`
- [ ] T013 [US2] Ensure 0.05 opacity noise overlay is active on the 404 view background

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements and mobile validation

- [ ] T014 [P] Verify mobile layout stacking on 390px viewport
- [ ] T015 [P] Verify deep-link routing (e.g., `/oferta/wrong-id`) triggers 404
- [ ] T016 Run `quickstart.md` validation scenarios
- [ ] T017 [P] Verify 60fps animation performance on mobile device using Chrome DevTools (G1)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all user stories being complete

### Parallel Opportunities

- T001 (Asset) can be done anytime.
- Once Phase 2 is done, US1 and US2 implementation steps in `src/App.jsx` can be handled sequentially but are grouped logically.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Complete Phase 3 (US1).
3. **STOP and VALIDATE**: Verify a basic 404 page with a Home button works.

### Full Polish

1. Complete Phase 4 (US2) to add the "Soul" of the page.
2. Complete Phase 5 (Polish).
