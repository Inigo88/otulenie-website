---
description: Execute the end-to-end bug resolution workflow - from reporting and planning to implementation and verification.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding. This includes the bug description, reproduction steps, and any provided media (screenshots/recordings).

## Outline

1.  **Setup & Identify**: 
    - Determine the next available Bug ID (BXXX) by checking `specs/bugs/`.
    - Identify the related Feature ID to determine the correct subfolder (e.g., `specs/bugs/007-hero-section/`).
    - **Create the target subfolder if it does not exist** before proceeding.
    - Create the bug report file using `.specify/templates/bug-template.md`.

2.  **Report & Investigate**:
    - Fill out the **Description**, **Steps to Reproduce**, and **Actual/Expected Behavior** based on user input.
    - If media was provided, move it to the artifacts directory and embed it in the report.
    - Perform a technical investigation to identify the **Technical Root Cause**. cite specific files and lines.

3.  **Plan the Fix**:
    - Complete the **Proposed Fix** section in the bug report file.
    - Define a clear **Implementation Strategy**.
    - Detail **Affected Components** and create a **Detailed Task List** (T001, T002...) similar to a feature `tasks.md`.

4.  **Approval Gate**:
    - **STOP**. Use `notify_user` to present the bug report and proposed plan to the user.
    - Do NOT proceed with implementation until the user provides explicit approval of the plan.

5.  **Execute the Fix**:
    - Once approved, implement the tasks defined in the **Detailed Task List**.
    - Mark tasks as completed `[x]` in the bug file as you progress.
    - Maintain the project's code quality and architectural standards.

6.  **Verify & Resolve**:
    - Perform the steps defined in the **Verification** section (Functional, Visual, Accessibility, Technical).
    - If visual, capture proof (screenshots/recordings).
    - Fill out the **Resolution** section summarizing the fix.
    - Update the **Status** to `Resolved` and set the **Date Resolved**.

7.  **Finalize**:
    - Update the **walkthrough.md** if the fix has a user-facing impact.
    - Commit and push all changes: `fix(scope): resolve BXXX [Title]`.

## Task Rules

### Bug Identification (BXXX)
- Always check established bug directories to increment the number correctly.
- Ensure the filename follows the convention: `BXXX-slug-name.md`.

### Planning Depth
- The **Proposed Fix** must be actionable and detailed. Vague plans like "fix the css" are unacceptable.
- Every affected file must be listed with the specific intended change.

### Verification Standards
- Use `browser_subagent` for UI/UX verification.
- Always check for regressions in related components designated in the **Technical Root Cause**.

## Examples

### ✅ GOOD: Structured & Precise
> **Bug B025: Navbar Transition Sequencing**
> **Technical Root Cause**: The `isHero` prop triggers background (GSAP) and font color (CSS transition) simultaneously.
> **Proposed Fix**: 
> - **Strategy**: Use a `delayedIsHero` state in `Navbar.jsx` with a 200ms `setTimeout`.
> - **Tasks**:
>   - [x] [T001] [Preparation]: Verify current transition timing.
>   - [x] [T002] [Implementation]: Add `delayedIsHero` state to `Navbar.jsx`.
>   - [x] [T003] [Verification]: Visual check of staggered effect.

### ❌ BAD: Vague & Unstructured
> **Bug B099: Button looks wrong**
> **Description**: The button is ugly.
> **Technical Root Cause**: CSS is bad.
> **Proposed Fix**: Change the CSS classes until it looks better. No task list provided.

## Key Rules
- Use absolute paths at all times.
- Never skip the **Approval Gate** for non-trivial fixes.
- Always update the bug documentation *before* and *after* the fix.
