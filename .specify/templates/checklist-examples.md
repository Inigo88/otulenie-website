# Checklist Writing Guide

**HOW TO WRITE CHECKLIST ITEMS - "Unit Tests for English"**:

❌ **WRONG** (Testing implementation):

- "Verify landing page displays 3 episode cards"
- "Test hover states work on desktop"
- "Confirm logo click navigates home"

✅ **CORRECT** (Testing requirements quality):

- "Are the exact number and layout of featured episodes specified?" [Completeness]
- "Is 'prominent display' quantified with specific sizing/positioning?" [Clarity]
- "Are hover state requirements consistent across all interactive elements?" [Consistency]
- "Are keyboard navigation requirements defined for all interactive UI?" [Coverage]
- "Is the fallback behavior specified when logo image fails to load?" [Edge Cases]
- "Are loading states defined for asynchronous episode data?" [Completeness]
- "Does the spec define visual hierarchy for competing UI elements?" [Clarity]

**ITEM STRUCTURE**:

Each item should follow this pattern:

- Question format asking about requirement quality
- Focus on what's WRITTEN (or not written) in the spec/plan
- Include quality dimension in brackets [Completeness/Clarity/Consistency/etc.]
- Reference spec section `[Spec §X.Y]` when checking existing requirements
- Use `[Gap]` marker when checking for missing requirements

**EXAMPLES BY QUALITY DIMENSION**:

Completeness:

- "Are error handling requirements defined for all API failure modes? [Gap]"
- "Are accessibility requirements specified for all interactive elements? [Completeness]"
- "Are mobile breakpoint requirements defined for responsive layouts? [Gap]"

Clarity:

- "Is 'fast loading' quantified with specific timing thresholds? [Clarity, Spec §NFR-2]"
- "Are 'related episodes' selection criteria explicitly defined? [Clarity, Spec §FR-5]"
- "Is 'prominent' defined with measurable visual properties? [Ambiguity, Spec §FR-4]"

Consistency:

- "Do navigation requirements align across all pages? [Consistency, Spec §FR-10]"
- "Are card component requirements consistent between landing and detail pages? [Consistency]"

Coverage:

- "Are requirements defined for zero-state scenarios (no episodes)? [Coverage, Edge Case]"
- "Are concurrent user interaction scenarios addressed? [Coverage, Gap]"
- "Are requirements specified for partial data loading failures? [Coverage, Exception Flow]"

Measurability:

- "Are visual hierarchy requirements measurable/testable? [Acceptance Criteria, Spec §FR-1]"
- "Can 'balanced visual weight' be objectively verified? [Measurability, Spec §FR-2]"

**Scenario Classification & Coverage** (Requirements Quality Focus):

- Check if requirements exist for: Primary, Alternate, Exception/Error, Recovery, Non-Functional scenarios
- For each scenario class, ask: "Are [scenario type] requirements complete, clear, and consistent?"
- If scenario class missing: "Are [scenario type] requirements intentionally excluded or missing? [Gap]"
- Include resilience/rollback when state mutation occurs: "Are rollback requirements defined for migration failures? [Gap]"

**Traceability Requirements**:

- MINIMUM: ≥80% of items MUST include at least one traceability reference
- Each item should reference: spec section `[Spec §X.Y]`, or use markers: `[Gap]`, `[Ambiguity]`, `[Conflict]`, `[Assumption]`
- If no ID system exists: "Is a requirement & acceptance criteria ID scheme established? [Traceability]"

**Surface & Resolve Issues** (Requirements Quality Problems):

Ask questions about the requirements themselves:

- Ambiguities: "Is the term 'fast' quantified with specific metrics? [Ambiguity, Spec §NFR-1]"
- Conflicts: "Do navigation requirements conflict between §FR-10 and §FR-10a? [Conflict]"
- Assumptions: "Is the assumption of 'always available podcast API' validated? [Assumption]"
- Dependencies: "Are external podcast API requirements documented? [Dependency, Gap]"
- Missing definitions: "Is 'visual hierarchy' defined with measurable criteria? [Gap]"

**Content Consolidation**:

- Soft cap: If raw candidate items > 40, prioritize by risk/impact
- Merge near-duplicates checking the same requirement aspect
- If >5 low-impact edge cases, create one item: "Are edge cases X, Y, Z addressed in requirements? [Coverage]"

**🚫 ABSOLUTELY PROHIBITED** - These make it an implementation test, not a requirements test:

- ❌ Any item starting with "Verify", "Test", "Confirm", "Check" + implementation behavior
- ❌ References to code execution, user actions, system behavior
- ❌ "Displays correctly", "works properly", "functions as expected"
- ❌ "Click", "navigate", "render", "load", "execute"
- ❌ Test cases, test plans, QA procedures
- ❌ Implementation details (frameworks, APIs, algorithms)

**✅ REQUIRED PATTERNS** - These test requirements quality:

- ✅ "Are [requirement type] defined/specified/documented for [scenario]?"
- ✅ "Is [vague term] quantified/clarified with specific criteria?"
- ✅ "Are requirements consistent between [section A] and [section B]?"
- ✅ "Can [requirement] be objectively measured/verified?"
- ✅ "Are [edge cases/scenarios] addressed in requirements?"
- ✅ "Does the spec define [missing aspect]?"

## Example Checklist Types & Sample Items

**UX Requirements Quality:** `ux.md`

Sample items (testing the requirements, NOT the implementation):

- "Are visual hierarchy requirements defined with measurable criteria? [Clarity, Spec §FR-1]"
- "Is the number and positioning of UI elements explicitly specified? [Completeness, Spec §FR-1]"
- "Are interaction state requirements (hover, focus, active) consistently defined? [Consistency]"
- "Are accessibility requirements specified for all interactive elements? [Coverage, Gap]"
- "Is fallback behavior defined when images fail to load? [Edge Case, Gap]"
- "Can 'prominent display' be objectively measured? [Measurability, Spec §FR-4]"

**API Requirements Quality:** `api.md`

Sample items:

- "Are error response formats specified for all failure scenarios? [Completeness]"
- "Are rate limiting requirements quantified with specific thresholds? [Clarity]"
- "Are authentication requirements consistent across all endpoints? [Consistency]"
- "Are retry/timeout requirements defined for external dependencies? [Coverage, Gap]"
- "Is versioning strategy documented in requirements? [Gap]"

**Performance Requirements Quality:** `performance.md`

Sample items:

- "Are performance requirements quantified with specific metrics? [Clarity]"
- "Are performance targets defined for all critical user journeys? [Coverage]"
- "Are performance requirements under different load conditions specified? [Completeness]"
- "Can performance requirements be objectively measured? [Measurability]"
- "Are degradation requirements defined for high-load scenarios? [Edge Case, Gap]"

**Security Requirements Quality:** `security.md`

Sample items:

- "Are authentication requirements specified for all protected resources? [Coverage]"
- "Are data protection requirements defined for sensitive information? [Completeness]"
- "Is the threat model documented and requirements aligned to it? [Traceability]"
- "Are security requirements consistent with compliance obligations? [Consistency]"
- "Are security failure/breach response requirements defined? [Gap, Exception Flow]"

## Anti-Examples: What NOT To Do

**❌ WRONG - These test implementation, not requirements:**

```markdown
- [ ] CHK001 - Verify landing page displays 3 episode cards [Spec §FR-001]
- [ ] CHK002 - Test hover states work correctly on desktop [Spec §FR-003]
- [ ] CHK003 - Confirm logo click navigates to home page [Spec §FR-010]
- [ ] CHK004 - Check that related episodes section shows 3-5 items [Spec §FR-005]
```

**✅ CORRECT - These test requirements quality:**

```markdown
- [ ] CHK001 - Are the number and layout of featured episodes explicitly specified? [Completeness, Spec §FR-001]
- [ ] CHK002 - Are hover state requirements consistently defined for all interactive elements? [Consistency, Spec §FR-003]
- [ ] CHK003 - Are navigation requirements clear for all clickable brand elements? [Clarity, Spec §FR-010]
- [ ] CHK004 - Is the selection criteria for related episodes documented? [Gap, Spec §FR-005]
- [ ] CHK005 - Are loading state requirements defined for asynchronous episode data? [Gap]
- [ ] CHK006 - Can "visual hierarchy" requirements be objectively measured? [Measurability, Spec §FR-001]
```

**Key Differences:**

- Wrong: Tests if the system works correctly
- Correct: Tests if the requirements are written correctly
- Wrong: Verification of behavior
- Correct: Validation of requirement quality
- Wrong: "Does it do X?"
- Correct: "Is X clearly specified?"
