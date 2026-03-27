---
description: Generate a pull request description and optionally create the PR using the gh CLI.
---

# User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1. **Commit and push all changes**:
   - Before gathering any diffs or building the description, ensure all local changes are staged, committed, and pushed to the remote branch.
   - Use a descriptive commit message following the convention (e.g., `git add . && git commit -m "feat(scope): description" && git push`).

2. **Gather branch and changes**:
   - Current branch name (e.g. `git branch --show-current`)
   - List of changed files (e.g. `git diff --name-status main...HEAD` or `origin/main...HEAD`)
   - Short commit summary for this branch (e.g. `git log main..HEAD --oneline` or equivalent)
   - Optionally: patch summary (e.g. `git diff main...HEAD --stat`) to infer scope

3. **Optional context** (if present in repo):
   - If `FEATURE_DIR` or a spec exists for this feature (e.g. from `specs/` or `.specify`), briefly note the feature name or spec title for the PR title/description. Do not require it.

4. **Build the PR description**:
   - **Title**: Follow the **PR Title Convention** below (type + optional scope + imperative description).
   - **What does this PR do?** 1–3 sentences summarizing the overall goal and why. Use this as the description heading so reviewers see it clearly.
   - **Changes**: Group changes logically by theme or component. Use either:
     - **Flat list** (small PRs): single bullets (e.g. "Add Next.js app scaffold", "Add spec 004 plan and tasks").
     - **Nested list** (larger PRs): bold component/theme, then sub-bullets with specific details (e.g. "**App scaffold** — Add Next.js app, add layout and home page" then "**Spec 004** — Add plan and tasks"). Base everything on the actual diff/commits, not generic text.
   - **Testing / checklist** (optional): Short "How to test" or "Checklist" if relevant (e.g. "Run `npm run build`", "Spec passes").
   - Keep it concise; no need for long prose.
  
5. **Update Backlog (If Applicable)**:
   - Check if there is an existing backlog file in `.specify/backlog/` (e.g. `product-name-backlog.md`).
   - If a backlog exists and the feature you are creating a PR for is listed in it as a Feature, update the `**Status**:` field for that specific feature to `Done`.
   - After updating the feature status, **always** run the automation script to propagate status changes to Epics and Milestones:

     ```bash
     chmod +x .specify/scripts/bash/update-backlog-status.sh && ./.specify/scripts/bash/update-backlog-status.sh
     ```

   - Do not edit the backlog if the feature cannot be found.

6. **Update README.md (if Applicable)**:
   - *After receiving user confirmation but before executing the PR command*:
   - Analyze the purpose of the current branch and the changes that have been made.
   - Check if these changes introduce new functionality, architectural decisions, or configurations that should be documented in the `README.md`.
   - If an update is necessary, carefully modify the `README.md` file.
   - If the `README.md` was modified, immediately commit and push those changes to the current branch (e.g., `git add README.md && git commit -m "docs: update README for current feature additions" && git push`).

7. **Execution**:
   - Do **not** emit the PR description into the chat or save it to a permanent file.
   - Check if a PR already exists for the current branch using `gh pr view`.
   - **Ask the user** for confirmation before proceeding to either `create` or `edit` the PR.

8. **Finalize PR creation**:
   - Once the README step is complete (or skipped), write the drafted body to a temporary file, execute the PR command, and **clean up** the file afterward.
   - For example:

     ```bash
     cat << 'EOF' > /tmp/PR_DESCRIPTION.md
     <Body content>
     EOF
     
     # If PR exists, ask user if they want to update it.
     # If PR doesn't exist, ask user if they want to create it.
     if gh pr view >/dev/null 2>&1; then
       # [Agent prompts user: "A PR already exists. Update description?"]
       gh pr edit --title "<Title>" --body-file /tmp/PR_DESCRIPTION.md
     else
       # [Agent prompts user: "No PR exists. Create a new one?"]
       gh pr create --title "<Title>" --body-file /tmp/PR_DESCRIPTION.md
     fi
     
     rm -f /tmp/PR_DESCRIPTION.md
     ```

## PR Title Convention

Use **Conventional Commits** style: `type(scope): short description`.

- **type**: `feat` (feature), `fix` (bugfix), `docs`, `chore`, `refactor`, `test`, `ci`, `build`, etc.
- **scope** (optional): area of the repo (e.g. `app`, `api`, `spec-004`).
- **description**: imperative, lowercase after the colon, no period at the end, ~50 chars or less when possible.

**Good examples**:

- `feat(app): add skeleton Next.js setup`
- `fix(auth): correct session expiry handling`
- `docs(spec): add 004 skeleton app plan and tasks`
- `chore(deps): upgrade React to 19`
- `refactor(api): simplify error middleware`

**Bad examples**:

- `Added skeleton app` — missing type; use imperative "add" not "added"
- `FEAT: Add skeleton app` — type should be lowercase
- `feat: Add skeleton app.` — no period; "add" can stay capitalized after colon if team prefers, but lowercase is conventional
- `feat(skeleton-app-setup): Implement the full skeleton application setup for the project` — too long; keep description short
- `WIP` or `fix stuff` — not descriptive; use proper type and description

## PR Body Structure

Use this structure for the body content:

```markdown
### What does this PR do?
<1–3 sentences summarizing the goal and why>

### Changes
- ...
- (Or grouped: **Component/theme** with sub-bullets per area)

### Checklist / How to test (optional)
- ...
```
