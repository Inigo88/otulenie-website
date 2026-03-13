# Tasks: Hero Section

**Input**: Design documents from `/specs/007-hero-section/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Verify project structure and branch `007-hero-section`
- [ ] T002 [P] Research and select high-fidelity "Grounding Wellness" background image from Unsplash

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T003 Implement `isHeroComplete` state and `onHeroComplete` callback in `src/App.jsx`
- [ ] T004 Update `src/components/Navbar.jsx` to accept a `visible` or `revealed` prop for delayed entrance
- [ ] T005 [P] Scaffold empty `Hero` component in `src/components/Hero.jsx`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Cinematic First Impression (Priority: P1) 🎯 MVP

**Goal**: Establish a premium, calm, and professional Hero section with staggered GSAP fade-up.

**Independent Test**: Load page; verify Hero fills viewport height; verify headline and subheadline animate in; verify Navbar is initially hidden.

### Implementation for User Story 1

- [ ] T006 [P] [US1] Create Hero layout with `min-h-[100dvh]` and background container in `src/components/Hero.jsx`
- [ ] T007 [US1] Apply dark gradient overlay and "Grounding Wellness" image in `src/components/Hero.jsx`
- [ ] T008 [US1] Implement staggered GSAP fade-up for H1 ("Relaks, który przyjeżdża do Ciebie") and subheadline in `src/components/Hero.jsx`
- [ ] T009 [US1] Wire the `onComplete` trigger to fire ~0.5s after text animations finish in `src/components/Hero.jsx`
- [ ] T010 [US1] Implement Navbar fade-in transition based on `isHeroComplete` in `src/App.jsx`

**Checkpoint**: User Story 1 fully functional and testable independently

---

## Phase 4: User Story 2 - High-Conversion CTA (Priority: P1)

**Goal**: Provide an immediate Booksy booking action within the Hero section.

**Independent Test**: Verify "Zarezerwuj masaż" button appears as part of stagger; clicking button leads to Booksy.

### Implementation for User Story 2

- [ ] T011 [P] [US2] Integrate `MagneticButton` component into the Hero layout in `src/components/Hero.jsx`
- [ ] T012 [US2] Update GSAP timeline to include CTA entrance in the stagger sequence in `src/components/Hero.jsx`
- [ ] T013 [US2] Configure the Booksy destination URL for the CTA button

**Checkpoint**: User Story 2 should work independently alongside US1

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final refinements and quality assurance.

- [ ] T014 [P] Verify `100dvh` stability on mobile device inspector
- [ ] T015 [P] Implement `prefers-reduced-motion` check for GSAP timeline in `src/components/Hero.jsx`
- [ ] T016 Run `speckit.analyze` for consistency between spec and implementation
- [ ] T017 Final performance audit for CLS and 60fps animations

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1 completion.
- **User Story 1 (Phase 3)**: Depends on Phase 2 completion.
- **User Story 2 (Phase 4)**: Depends on Phase 2 completion (Markup) and Phase 3 (Timing).
- **Polish (Final Phase)**: Depends on all user stories being complete.

### Parallel Opportunities

- T002 (Image research) can run in parallel with Setup and Foundation.
- T014 and T015 (Polish) can run in parallel during the final phase.
