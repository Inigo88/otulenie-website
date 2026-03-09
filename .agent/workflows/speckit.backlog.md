---
description: Create a product backlog from a natural language product description.
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

The text the user typed after the command **is** the product description. Assume you always have it available in this conversation even if `$ARGUMENTS` appears literally below. If the user provided an empty command, ask for a short product description before proceeding.

Given the product description, do this:

1. **Resolve output path**:
   - If the user specified a path in the input (e.g. `backlog/my-product.md` or `docs/backlog.md`), use that path (relative to repo root).
   - Otherwise, default to `.specify/backlog/<product-name>-backlog.md` (create the directory if it doesn't exist).
   - All paths are relative to the repo root; use absolute paths when reading/writing files.

2. **Load the template**: Read `.specify/templates/backlog-template.md` to understand the required structure and section order.

3. **Execute backlog generation** (using the product description as source):
   - **Product name**: Derive a concise product name (2–5 words).
   - **Product description**: 2–4 sentences on what the product is, its main purpose, and key value.
   - **Business problem**: Clear statement of the problem or opportunity; who is affected and what outcome we expect.
   - **Actors**: List of actors (user types, roles, or systems) that will use or interact with the product; each with a brief role or description.
   - **Milestones → Epics → Features**: Build a nested backlog:
     - **Milestones**: High-level delivery phases or goals (e.g. MVP, Scale, Optimize). Each has: **Title**, **Description**, **Status**.
     - **Epics** (under each milestone): Larger capability or theme. Each has: **Title**, **Description**, **Status**.
     - **Features** (under each epic): Concrete, testable items. Each has: **Title**, **Description**, **Branch**, **Status**. Do NOT use the "As a user, I want..." format for the feature descriptions. Output simple, direct descriptions of what the feature does. The **Branch** should be a short, git-friendly name (e.g. `1-user-auth`, `2-payment-gateway`).
   - **Status** for every item must be one of: `To do` | `In progress` | `Implemented` | `Blocked` | `Deferred` | `Cancelled`. Newly generated items should use `To do` unless the user input implies otherwise.
   - Use informed guesses and industry norms to fill gaps; keep scope realistic from the product description.

4. **Write the backlog**: Fill the template structure with the generated content. Preserve section order and headings from the template. Set **Created** to the current date. Write the result to the output path from step 1.

5. **Provide Constitution Context**: Extract the entire first section of your generated backlog (Description, Business Problem, and Actors - explicitly EXCLUDING the list of Milestones, Epics, and Features). Present this excerpt to the user and **ask if they would like to initialize or update the project constitution** (`/speckit.constitution`) using this text. *Do not execute the constitution workflow until the user confirms.*

6. **Report**: Confirm the output file path and give a short summary (product name, number of milestones/epics/features).

## Status values

Use exactly one of these for every milestone, epic, and feature:

| Status        | When to use |
|---------------|-------------|
| To do         | Not started; default for new items. |
| In progress   | Currently being worked on. |
| Implemented   | Done and delivered. |
| Blocked       | Blocked by dependency, decision, or another item. |
| Deferred      | Postponed to a later milestone or backlog. |
| Cancelled     | Dropped from scope. |

## Template structure (reminder)

- Product description (short)
- Business problem
- Actors (list with brief role per actor)
- Backlog: nested list of **Milestones** → **Epics** → **Features**
- Each item: **Title**, **Description**, **Status**
- Preserve the status legend and Notes section from the template.

## General guidelines

- Focus on **WHAT** the product does and **WHO** it serves; avoid implementation detail.
- Milestones should be few (e.g. 2–4) and represent major phases.
- Epics group related features; features should be testable and user-valued.
- Do not create or switch git branches.
