# Tasks: 017-svg-logo

**Input**: Design documents from `/specs/017-svg-logo/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Default Structure**: `src/App.jsx`, `src/index.css`
- **Component Breakout**: `src/components/[ComponentName].jsx`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Update feature status in `.specify/backlog/otulenie-website-backlog.md` to `Tasked`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [ ] T002 [P] Modify `public/logo.svg` to replace `fill="#000000"` with `fill="currentColor"`
- [ ] T003 [P] Create `src/components/Logo.jsx` with responsive height `h-8` (32px) and fallback text

**Checkpoint**: Foundation ready - logo asset and component available for integration

---

## Phase 3: User Story 1 - Brand Consistency in Navigation (Priority: P1) 🎯 MVP

**Goal**: Replace text logo in Navbar with dynamic SVG logo and magnetic interaction.

**Independent Test**: Verify `logo.svg` renders in Navbar, transitions colors on scroll, and has a magnetic effect.

### Implementation for User Story 1

- [ ] T004 [US1] Import `Logo` and `MagneticButton` into `src/components/Navbar.jsx`
- [ ] T005 [US1] Wrap `<Logo />` in `MagneticButton` with `strength={0.1}` in `src/components/Navbar.jsx`
- [ ] T006 [US1] Implement dynamic color classes (`text-linen` vs `text-moss`) based on `delayedIsHero` state in `src/components/Navbar.jsx`
- [ ] T007 [US1] Add accessibility `aria-label="Otulenie - Strona główna"` to the logo link in `src/components/Navbar.jsx`

**Checkpoint**: User Story 1 (Navbar Logo) is fully functional

---

## Phase 4: User Story 2 - Brand Presence in Footer (Priority: P2)

**Goal**: Replace text logo in Footer with SVG logo.

**Independent Test**: Verify `logo.svg` renders in Footer with fixed `Linen` color.

### Implementation for User Story 2

- [ ] T008 [US2] Import `Logo` into `src/components/Footer.jsx`
- [ ] T009 [US2] Replace `<h2>Otulenie</h2>` with `<Logo className="text-linen h-8" />` wrapped in `<a href="/" aria-label="Otulenie - Strona główna">` in `src/components/Footer.jsx` (FR-003)
- [ ] T010 [US2] Ensure logo link in Footer also uses `aria-label="Otulenie - Strona główna"`

**Checkpoint**: User Story 2 (Footer Logo) is fully functional

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T011 [P] Verify `prefers-reduced-motion` compliance for Navbar color transitions
- [ ] T012 [P] Validate responsive scaling on 390px viewport per `quickstart.md`
- [ ] T013 Run final manual verification suite from `plan.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 - BLOCKS US1 and US2
- **User Stories (Phase 3+)**: Depend on Foundational (Phase 2)
- **Polish (Phase 5)**: Depends on US1 and US2 completion

### User Story Dependencies

- **User Story 1 (P1)**: Independent after Phase 2
- **User Story 2 (P2)**: Independent after Phase 2

### Parallel Opportunities

- T002 and T003 (Foundational) can run in parallel
- Once Phase 2 is done, US1 and US2 can run in parallel (different files: `Navbar.jsx` vs `Footer.jsx`)
- T011 and T012 can run in parallel

---

## Parallel Example: User Story 1 & 2 Integration

```bash
# Develop Navbar and Footer integrations simultaneously:
Task US1: "Integrate Logo into Navbar.jsx"
Task US2: "Integrate Logo into Footer.jsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup & Foundational
2. Complete User Story 1 (Navbar)
3. **VALIDATE**: Verify Navbar logo before proceeding to Footer

### Incremental Delivery

1. Foundation ready
2. Navbar Logo (High Impact)
3. Footer Logo (Consistency)
4. Polish (Refinement)
