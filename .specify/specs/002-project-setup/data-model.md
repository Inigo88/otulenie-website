# Phase 1: Data Model & State Managment

**Feature**: `002-project-setup`

## Local State Elements

As this feature represents the foundational project scaffold, no persistent backend entities or complex relational data models exist. The application is completely local and static.

### Minimal Feature State
Any component requiring state (e.g., the mobile navigation toggle or the FAQ accordion defined in future milestones) will utilize standard React `useState`.

### Static Content Dictionaries
Future features (e.g., the 4 massage protocols or practitioner philosophy) will be managed via static JSON objects or arrays exported from local constants files to maintain the single-file `App.jsx` structure until the 600-line limit is reached.
