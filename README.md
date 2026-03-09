# Otulenie Website

This is the website for **Otulenie**, a massage business. The project is managed using **Speckit**, a suite of AI-assisted, markdown-driven workflows designed to streamline product discovery, specification, and implementation.

---

## Available Workflows

The repository contains several automated workflows (accessible via `/speckit.[command]`) to assist with the software development lifecycle:

### Discovery & Planning
*   **/speckit.backlog**: Generate a structured product backlog (Milestones → Epics → Features) based on a natural language product description. Automatically prompts you to extract business context for the project constitution.
*   **/speckit.constitution**: Create or update the project constitution from interactive or provided principle inputs, keeping the project's core non-negotiables in sync.
*   **/speckit.specify**: Create or update a feature specification document from a natural language feature description. Automatically generates git branches and links them back to your backlog.
*   **/speckit.clarify**: Identify underspecified areas in a feature spec by asking targeted clarification questions.
*   **/speckit.plan**: Execute the implementation planning workflow to generate technical design artifacts based on specifications.
*   **/speckit.analyze**: Perform a cross-artifact consistency and quality analysis across your specs, plans, and tasks.

### Execution
*   **/speckit.tasks**: Generate actionable, dependency-ordered tasks based on available design artifacts.
*   **/speckit.taskstoissues**: Convert existing tasks into actionable GitHub issues.
*   **/speckit.implement**: Execute the implementation plan by processing all tasks defined in your task list.
*   **/speckit.checklist**: Generate a custom quality checklist for the current feature.
*   **/speckit.pr**: Generate a pull request description and optionally create the PR using the GitHub CLI.

---

## Directory Structure

*   **.agent/workflows/**: Contains the markdown files defining the execution rules for each Speckit command.
*   **.specify/templates/**: Contains the markdown templates used to structure generated documents (e.g., backlogs, specs, checklists).
*   **.specify/backlog/**: The default output directory for generated product backlogs.
*   **.specify/memory/**: Project context files, including the `constitution.md`.
