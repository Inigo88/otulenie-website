---
description: Execute the implementation planning workflow using the plan template to generate design artifacts.
handoffs: 
  - label: Create Tasks
    agent: speckit.tasks
    prompt: Break the plan into tasks
    send: true
  - label: Create Checklist
    agent: speckit.checklist
    prompt: Create a checklist for the following domain...
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1. **Setup**: Run `.specify/scripts/bash/setup-plan.sh --json` from repo root and parse JSON for FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

2. **Load context**: Read FEATURE_SPEC and `.specify/memory/constitution.md`. Load IMPL_PLAN template (already copied).

3. **Execute plan workflow**: Follow the structure in IMPL_PLAN template to:
   - Fill plan header metadata variables (`[FEATURE]`, `[###-feature-name]`, `[DATE]`, `[link]`)
   - Fill Technical Context (mark unknowns as "NEEDS CLARIFICATION")
   - Fill Constitution Check section from constitution
   - Evaluate gates (ERROR if violations unjustified)
   - Phase 0: Generate research.md (resolve all NEEDS CLARIFICATION)
   - Phase 1: Generate data-model.md, contracts/, quickstart.md
   - Phase 1: Update agent context by running the agent script
   - Re-evaluate Constitution Check post-design

4. **Update Backlog (If Applicable)**:
   - Check if there is an existing backlog file in `.specify/backlog/` (e.g. `product-name-backlog.md`).
   - If a backlog exists and the feature you are planning is listed in it as a Feature, update the `**Status**:` field for that specific feature to `Planned`.
   - After updating the feature status, **always** run the automation script to propagate status changes to Epics and Milestones:
     ```bash
     chmod +x .specify/scripts/bash/update-backlog-status.sh && ./.specify/scripts/bash/update-backlog-status.sh
     ```
   - Do not edit the backlog if the feature cannot be found.

5. **Stop and report**: Command ends after Phase 2 planning. Report branch, IMPL_PLAN path, and generated artifacts.

## Phases

### Phase 0: Outline & Research

1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:

   ```text
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

### Phase 1: Design & Contracts

**Prerequisites:** `research.md` complete

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Define interface contracts** (if project has external interfaces) → `/contracts/`:
   - Identify what interfaces the project exposes to users or other systems
   - Document the contract format appropriate for the project type
   - Examples: public APIs for libraries, command schemas for CLI tools, endpoints for web services, grammars for parsers, UI contracts for applications
   - Skip if project is purely internal (build scripts, one-off tools, etc.)

3. **Agent context update**:
   - Run `.specify/scripts/bash/update-agent-context.sh agy` to perform the automated update or initial creation.
   - **Critical Review**: Immediately after the script runs, perform a manual review of the updated rules file (e.g., `.agent/rules/specify-rules.md`).
   - **Refine & Fix**: Use your intelligence to polish the automated output:
     - Merge new technical details, dependencies, and project metadata into a clean, professional structure.
     - Correct any typos, truncation errors, or formatting issues introduced by the automation.
     - Align architectural constraints with the latest design decisions and project state.
     - Ensure all `<!-- MANUAL ADDITIONS -->` blocks are intact.
   - **Goal**: Use the script for syncing and the agent for high-fidelity quality control.

**Output**: data-model.md, /contracts/*, quickstart.md, agent-specific rules file (audited and refined).

## Key rules

- Use absolute paths
- ERROR on gate failures or unresolved clarifications
