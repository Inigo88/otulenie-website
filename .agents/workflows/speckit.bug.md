---
description: Execute the end-to-end bug resolution workflow - from reporting and planning to implementation and verification.
---

# User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding. This includes the bug description, reproduction steps, and any provided media (screenshots/recordings).

## Outline

1. **Setup & Identify**:
    - **Report & Initialize**: Run the bug creation script to generate the BXXX ID and register the bug.
    - `bash .specify/scripts/bash/create-bug.sh "[Title]" --feature "XXX-slug"`
    - If it's a general bug, omit the `--feature` flag.
    - This script handles folder creation, template copying, and `.specify/bugs/bug-report.md` synchronization.

2. **Report & Investigate**:
    - Fill out the **Description**, **Steps to Reproduce**, and **Actual/Expected Behavior** based on user input.
    - If media was provided, move it to the artifacts directory and embed it in the report.
    - Perform a technical investigation to identify the **Technical Root Cause**. cite specific files and lines.

3. **Plan the Fix**:
    - Complete the **Proposed Fix** section in the bug report file.
    - Define a clear **Implementation Strategy**.
    - Detail **Affected Components** and create a **Detailed Task List** (T001, T002...) similar to a feature `tasks.md`.

4. **Approval Gate**:
    - **STOP**. Use `notify_user` to present the bug report and proposed plan to the user.
    - Do NOT proceed with implementation until the user provides explicit approval of the plan.
    - **Synchronize Registry**: Update the bug status to `🟡 Fix Proposed` in `.specify/bugs/bug-report.md`.

5. **Execute the Fix**:
    - Once approved, implement the tasks defined in the **Detailed Task List**.
    - Mark tasks as completed `[x]` in the bug file as you progress.
    - Maintain the project's code quality and architectural standards.

6. **Verify & Resolve**:
    - Perform the steps defined in the **Verification** section (Functional, Visual, Accessibility, Technical).
    - If visual, capture proof (screenshots/recordings).
    - Fill out the **Resolution** section summarizing the fix.
    - Update the **Status** to `Resolved` and set the **Date Resolved**.
    - **Synchronize Registry**: Update status to `✅ Resolved` in `.specify/bugs/bug-report.md`, add a concise one-line summary to the "Fix" column, and update header counts.

7. **Finalize**:
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
>
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
