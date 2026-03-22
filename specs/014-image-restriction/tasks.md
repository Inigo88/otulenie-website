# Tasks: 1.1.4 - Image Restriction

**Input**: Design documents from `/specs/014-image-restriction/`
**Prerequisites**: [plan.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/014-image-restriction/plan.md) (required), [spec.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/014-image-restriction/spec.md) (required for user stories), [research.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/014-image-restriction/research.md), [data-model.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/014-image-restriction/data-model.md)

**Tests**: Manual visual verification on 390px viewport and network tab audit.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create destination directory `public/images-small/`
- [ ] T002 Copy high-res source assets from `.specify/context/images/*.jpg` to `public/images-small/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T003 Batch resize (max-width 2560px) and convert assets to `.webp` using `sips` in `public/images-small/`
- [ ] T004 Remove temporary JPEG files from `public/images-small/`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - 100% Brand Control (Priority: P1) 🎯 MVP

**Goal**: Eliminate external image dependencies and use branded Hero visuals.

**Independent Test**: Verify Hero section loads `images-small/IMG-06.webp` and network tab shows no external photography calls.

### Implementation for User Story 1

- [ ] T005 [P] [US1] Update `HERO_IMAGE` constant to `/images-small/IMG-06.webp` in `src/App.jsx`
- [ ] T006 [US1] Ensure `Hero` component renders the updated local path in `src/App.jsx`
- [ ] T007 [US1] Audit code for any remaining Unsplash or external photography URLs and remove them

**Checkpoint**: User Story 1 (MVP) is fully functional and testable independently.

---

## Phase 4: User Story 2 - Accurate Service Representation (Priority: P2)

**Goal**: Show actual photos of massage setup in Stacking Archive.

**Independent Test**: Verify Stacking Archive display relevant local WebP assets.

### Implementation for User Story 2

- [ ] T008 [P] [US2] Update `STACKING_CARDS` array with local WebP paths in `src/App.jsx`
- [ ] T009 [US2] Verify `StackingArchive` correctly renders local assets with depth effects in `src/App.jsx`

**Checkpoint**: User Story 2 is fully functional and integrates with local asset library.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T010 [P] Verify image focus and `object-cover` behavior on 390px viewport
- [ ] T011 [P] Validate WebP optimization and load times (< 200ms LCP for Hero)
- [ ] T012 Run `quickstart.md` validation steps

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup completion.
- **User Stories (Phase 3+)**: Depend on Foundational (Phase 2). US1 and US2 can run in parallel.
- **Polish (Final Phase)**: Depends on US1 and US2 completion.

### User Story Dependencies

- **User Story 1 (P1)**: Independent after Phase 2.
- **User Story 2 (P2)**: Independent after Phase 2.

---

## Parallel Example: Implementation

```bash
# Developer A starts US1:
Task: "Update HERO_IMAGE constant"

# Developer B starts US2:
Task: "Update STACKING_CARDS array"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Complete Phase 3 (US1).
3. **STOP and VALIDATE**: Verify local Hero image and zero external calls.

### Incremental Delivery

1. Deploy MVP (US1).
2. Follow up with US2 (Archive enhancement).
3. Final polish and verification.
