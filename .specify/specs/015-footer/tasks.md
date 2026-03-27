# Tasks: Footer Implementation

**Input**: Design documents from `/specs/015-footer/`
**Prerequisites**: [plan.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/015-footer/plan.md) (required), [spec.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/015-footer/spec.md) (required for user stories), [research.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/015-footer/research.md), [data-model.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/015-footer/data-model.md), [quickstart.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/015-footer/quickstart.md)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Basic environment check.

- [x] T001 [P] Verify GSAP registration (ScrollTrigger) remains functional in [src/main.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/main.jsx)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Define the data structures for the footer to be used in US1.

- [x] T002 [P] Define `FOOTER_LINKS`, `SOCIAL_LINKS`, and `LEGAL_LINKS` constants in [src/App.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/App.jsx)

---

## Phase 3: User Story 1 - Information Discovery (Priority: P1) 🎯 MVP

**Goal**: Implement a global deep-dark footer with brand ID, navigation, and contact info.

**Independent Test**: Scroll to the bottom of the page in the browser. Verify that the "Otulenie" brand, navigation links, and contact icons are visible, correctly styled (`bg-moss`, `text-linen`), and functional.

### Implementation for User Story 1

- [x] T003 [US1] Build semantic `<footer>` structure with `bg-moss` and `rounded-t-[2rem]` (mobile) / `rounded-t-[3rem]` (desktop) in [src/App.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/App.jsx)
- [x] T004 [P] [US1] Implement Brand Logo section ("Otulenie") with serif typography in [src/App.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/App.jsx)
- [x] T005 [P] [US1] Implement Navigation Links column using `FOOTER_LINKS` in [src/App.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/App.jsx)
- [x] T006 [P] [US1] Implement Contact & Social Icons (Lucide Instagram, Facebook) with `target="_blank"` and `rel="noopener noreferrer"` in [src/App.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/App.jsx)
- [x] T007 [US1] Implement Bottom Bar with Copyright boilerplate and Privacy Policy link in [src/App.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/App.jsx)
- [x] T008 [US1] Apply responsive grid/flex layout (stacking elements vertically on mobile) in [src/App.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/App.jsx)
- [x] T009 [US1] Add Constitution-mandated hover effects (`scale(1.03)`, `translateY(-1px)`) for links and social icons in [src/App.jsx](file:///Users/szymon.stec/Documents/Code/otulenie-website/src/App.jsx)

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final verification, accessibility, and consistency.

- [x] T010 [P] Verify 0.05 noise overlay visibility over the deep-dark footer background
- [x] T011 Perform accessibility audit (check `aria-label` on social links and semantic `<footer>` usage)
- [x] T012 Manual viewport testing at 390px (iPhone 12 Pro) vs Desktop (1440px)
- [x] T013 Run [quickstart.md](file:///Users/szymon.stec/Documents/Code/otulenie-website/specs/015-footer/quickstart.md) validation steps
- [x] T014 [P] Verify 60fps animation performance for footer entrance and hover effects

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies, can be verified immediately.
- **Foundational (Phase 2)**: Depends on Setup (T001).
- **User Story 1 (Phase 3)**: Depends on completion of Foundational (T002).
- **Polish (Phase 4)**: Depends on User Story 1 completion.

### Parallel Opportunities

- T001 (Setup) and T002 (Foundational constants) can be handled consecutively with low risk.
- Once the `<footer>` structure (T003) is in place, tasks T004, T005, and T006 can run in parallel.
- Polish tasks T010 and T011 can run in parallel after US1 implementation.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2 to prepare constants and environment.
2. Implement User Story 1 in `src/App.jsx`.
3. **Validate**: Perform the Independent Test for US1.
4. Complete Polish phase to ensure high-fidelity "Otulenie Calm" aesthetic.
