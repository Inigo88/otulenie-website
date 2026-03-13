---
description: Generate a pull request description and optionally create the PR using the gh CLI.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1.  **Gather Context & Changes**:
    - **Branch Identity**: Get current branch name (`git branch --show-current`).
    - **Scope Analysis**: Identify the related Feature ID and Specification (e.g., `specs/007-hero-section/`).
    - **Diff Review**: List changed files and summarize commits (`git log main..HEAD --oneline`).
    - **Visual Evidence**: Check for any recently generated artifacts in the brain (screenshots, recordings) that serve as proof of work.

2.  **Draft High-Fidelity Description**:
    - **Title**: Use Conventional Commits: `type(scope): short description`.
    - **Core Summary**: 1–3 high-impact sentences explaining the "What" and "Why".
    - **Logical Grouping**: Categorize changes by component or theme (e.g., Navbar, Global Design System).
    - **Constitution Alignment**: Briefly mention if the PR addresses specific Constitution principles (e.g., "Principle III: Clarity and Guidance").

3.  **Proof of Work & Documentation**:
    - **Media Gallery**: Embed screenshots or recordings from the `artifacts` directory using `![caption](file:///path/to/media.webp)`.
    - **Walkthrough Sync**: Ensure the `walkthrough.md` in the artifacts directory is up to date and linked if relevant.
    - **README Update**: Analyze if new features/configs require documentation in the project `README.md`.

4.  **Backlog & Status Sync**:
    - Locate the backlog in `.specify/backlog/`.
    - Update the status of the feature to `Done`.
    - **Run Automation**: Trigger the status propagation script:
      ```bash
      chmod +x .specify/scripts/bash/update-backlog-status.sh && ./.specify/scripts/bash/update-backlog-status.sh
      ```

5.  **Creation Gate & Execution**:
    - Check for existing PRs via `gh pr view`.
    - **Approval Phase**: Present the drafted description (including media previews) to the user.
    - **Execute**: Once approved, use `gh pr create` or `gh pr edit` with a `--body-file` pointing to a temporary draft.

## PR Title Convention

- `feat(scope): ...` — New feature implementation.
- `fix(scope): ...` — Bug resolution (reference B0XX if applicable).
- `docs(scope): ...` — Documentation updates (specs, templates).
- `refactor(scope): ...` — Code improvement without feature change.

## Examples

### ✅ GOOD: Professional & Visual
> **Title**: `feat(navbar): implement staggered transition for Hero state (B025)`
>
> ### What does this PR do?
> Improves the perceived quality of the Navbar by staggering the color transition between background and text. This ensures the "Island" background morphs before the text changes color, preventing visual "flicker."
>
> ### Changes
> - **Navbar Component**: Added `delayedIsHero` state and 200ms debounce logic.
> - **Bug Documentation**: Updated B025 with resolution details and verification proof.
>
> ### Proof of Work
> ![Staggered Effect](file:///Users/szymon.stec/.../navbar_staggered.webp)

### ❌ BAD: Vague & Low-Fidelity
> **Title**: `PR for navbar`
>
> ### Changes
> - fixed some bugs in navbar.jsx
> - changed colors
> - updated some files

## Key Rules
- Always use absolute paths for file links and media.
- Titles must be imperative (e.g., "add", not "added").
- Every PR should aim to include at least one piece of visual proof if UI changes were made.