# Tasks: Featured Testimonials Section

**Input**: Design documents from `/.specify/specs/019-testimonials/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and data preparation

- [ ] T001 Add `testimonials` data array to `src/App.jsx` based on `data-model.md`
- [ ] T002 [P] Scaffold `TestimonialSection` and `TestimonialCard` component skeletons in `src/App.jsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core layout and styling foundation

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T003 Implement section background with subtle gradient and global noise overlay in `src/App.jsx`
- [ ] T004 Apply core typography for "Głosy spokoju" heading in `src/App.jsx`
- [ ] T005 Configure GSAP `useGSAP` hook and `ScrollTrigger` context for the section in `src/App.jsx`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Viewing Social Proof (Priority: P1) 🎯 MVP

**Goal**: Render authentic testimonials with client names and context for trust building.

**Independent Test**: Scroll to the testimonials section and verify that the reviews are visible, legible, and maintain premium typography.

### Implementation for User Story 1

- [ ] T006 [P] [US1] Build static markup for `TestimonialCard` with `backdrop-blur-md` and 60-80% opacity in `src/App.jsx`
- [ ] T007 [P] [US1] Implement Lucide `Star` (Olive #6E8068) and `Quote` (Moss #374833) icons in `TestimonialCard`
- [ ] T008 [US1] Apply responsive layout: vertical stack for mobile, horizontal grid/slider for desktop in `src/App.jsx`

**Checkpoint**: User Story 1 fully functional and testable independently.

---

## Phase 4: User Story 2 - Premium Interactive Experience (Priority: P2)

**Goal**: Present testimonials with smooth, cinematic animations and interactive slider.

**Independent Test**: Observe scroll-triggered reveal animations and verify the auto-playing horizontal slider pauses on hover.

### Implementation for User Story 2

- [ ] T009 [US2] Implement GSAP staggered fade-up reveal for testimonial cards using `ScrollTrigger` in `src/App.jsx`
- [ ] T010 [US2] Create horizontal slider logic for mobile (< 768px) with GSAP `xPercent` transitions in `src/App.jsx`
- [ ] T011 [US2] Implement desktop horizontal slider (3 items) with auto-play and pause on hover in `src/App.jsx`
- [ ] T012 [US2] Add subtle hover lift effect to `TestimonialCard` for desktop viewports in `src/App.jsx`

**Checkpoint**: User Stories 1 AND 2 should both work independently.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Refinements and accessibility support

- [ ] T013 [P] Implement `prefers-reduced-motion` support using simple opacity fades in `src/App.jsx`
- [ ] T014 Final accessibility check: WCAG AA contrast and semantic `<article>` tags in `src/App.jsx`
- [ ] T015 Verify 60fps performance and layout integrity on 390px viewport

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1 completion.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
- **Polish (Final Phase)**: Depends on all user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Independent after Phase 2.
- **User Story 2 (P2)**: Independent after Phase 2.

### Parallel Opportunities

- T002, T006, T007, T013 marked [P] can run in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup + Foundational.
2. Complete User Story 1 (Static display).
3. **STOP and VALIDATE**: Verify social proof visibility.

### Incremental Delivery

1. Foundation ready.
2. Add US1 → Test MVP.
3. Add US2 → Add animations and slider logic.
4. Final Polish.
