# Tasks: Global Design System

**Input**: Design documents from `/specs/003-design-system/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Default Structure**: `src/App.jsx`, `src/index.css`
- **Component Breakout**: `src/components/[ComponentName].jsx` (only if App.jsx > 600 lines)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 [P] Configure Google Fonts `<link>` tags in `index.html` (Fraunces, Inter, Cormorant Garamond)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Define core design tokens (Moss, Linen, Olive) in `src/index.css` using Tailwind v4 `@theme` directive
- [x] T003 [P] Implement the `.noise-overlay` utility class in `src/index.css` using the Base64 SVG pattern (must include `pointer-events: none`)
- [x] T004 Setup global base styles (Body background, text color, and default font) in `src/index.css` `@layer base`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Visual Atmospheric Continuity (Priority: P1) 🎯 MVP

**Goal**: Implement the core "Otulenie Calm" colors and texture overlay across the entire site.

**Independent Test**: Open the application and verify the Linen background, Moss text, and grainy noise texture.

### Implementation for User Story 1

- [x] T005 [P] [US1] Mount the `<div className="noise-overlay" />` as the first child of the main layout in `src/App.jsx`
- [x] T006 [US1] Apply `bg-linen` and `text-moss` to the root container in `src/App.jsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Typographic Hierarchy & Elegance (Priority: P1)

**Goal**: Apply premium font pairings (Fraunces/Inter) to establish the brand voice.

**Independent Test**: Inspect text elements to ensure they use the correct font families and weights.

### Implementation for User Story 2

- [x] T007 [P] [US2] Map `font-serif` (Fraunces) to all Heading elements (h1-h6) in `src/index.css` or `src/App.jsx`
- [x] T008 [P] [US2] Ensure `font-sans` (Inter) is applied to all paragraph and body text in `src/App.jsx`
- [x] T009 [P] [US2] Apply `font-accent` (Cormorant Garamond) to highlighted or italicized spans in `src/App.jsx`

**Checkpoint**: User Stories 1 AND 2 should now be integrated and functional.

---

## Phase 5: User Story 3 - Responsive Design Integrity (Priority: P2)

**Goal**: Ensure typography scales gracefully across mobile and desktop viewports.

**Independent Test**: Resize browser and verify that heading sizes adjust without overflow or horizontal scrolling.

### Implementation for User Story 3

- [x] T010 [US3] Implement fluid typography scaling for headings in `src/index.css` using Tailwind v4 modifiers or `clamp()`
- [x] T011 [US3] Verify horizontal spacing and container padding on mobile widths (390px) in `src/App.jsx`

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T012 [P] Verify performance of noise overlay and visual consistency across Chrome, Safari, and Firefox
- [x] T013 Run `quickstart.md` verification steps

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories.
- **User Stories (Phase 3+)**: All depend on Foundational phase completion.
- **Polish (Final Phase)**: Depends on all user stories being complete.

### Parallel Opportunities

- T001 (Fonts) and T002 (Tokens) can start in parallel.
- Once Phase 2 is done, US1 and US2 implementation can proceed in parallel as they touch different CSS classes/components.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (Fonts)
2. Complete Phase 2: Foundational (Tokens + Noise Utility)
3. Complete Phase 3: User Story 1 (Mount Noise + Apply Colors)
4. **STOP and VALIDATE**: Verify the "Calm" atmosphere is achieved.
