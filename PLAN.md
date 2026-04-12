# Agent Workflow Playbook

## Objective

Run reliable, repeatable, single-slice delivery cycles with explicit handoffs and review gates.

## Lifecycle

### Stage 0: Tester (baseline)

- Run all quality gates and record baseline coverage before any work begins. If any gate fails, halt and report; no work proceeds until baseline is healthy.

### Stage 1: Plan

- Produce slice definition, acceptance criteria, constraints, risks, and explicit out-of-scope items.

### Stage 2: Architect

- Produce implementation design, boundaries, consistency guidance, DRY/SOLID assessment, and test approach.

### Stage 3: Build

- Implement approved changes only.

### Stage 4: Tester (post-build)

- Run all quality gates and compare coverage to baseline. Report coverage delta (increase, decrease, unchanged). If any gate fails or coverage regresses, halt and report; do not proceed until all gates pass.
- Add or update tests for changed behaviour if required.

### Stage 5: Refactor

- Apply safe structural improvements that increase reuse and consistency.

### Stage 6: Tester (post-refactor)

- Run all quality gates and compare coverage to baseline. Report coverage delta (increase, decrease, unchanged). If any gate fails or coverage regresses, halt and report; do not proceed until all gates pass.

### Stage 7: Reviewer

- Perform findings-first review and classify risks by severity.

### Stage 8: Documentation

- Update concise documentation aligned to final implemented behaviour.

### Stage 9: Handoff

- Prepare clean commit ready summary and stop.

## Canonical Sequence

`Tester (baseline) -> Plan -> Architect -> Build -> Tester (post-build) -> Refactor -> Tester (post-refactor) -> Reviewer -> Documentation -> clean commit ready -> stop`

## Definition Of Clean Commit Ready

All conditions must hold:

- Required gates complete and passing, with coverage delta (increase, decrease, unchanged) reported compared to baseline.
- No unresolved high-severity findings.
- Any medium findings are either resolved or explicitly accepted by the user.
- Exceptions are documented with rationale.
- Commit message draft is prepared.
- Next actions are listed, but no further implementation starts.

## Required Validation Commands

- `npm run check:all`

## Refactor Rules

- Default flow includes Refactor after Tester.
- If mandatory refactor is identified early and lowers risk, use a refactor-first slice.
- Refactor-first slice must still complete Tester (baseline and post-refactor), Reviewer, Documentation, and clean commit ready stop before feature continuation.

## Testing Rules

- Prioritise behaviour-focused tests.
- Presentation components require smoke coverage with varied props.
- Meaningful logic should reach full coverage unless exception is justified.
- No ignore-list updates without explicit user confirmation.
- Tester agent runs first and after each edit stage to validate and report coverage delta.
- If additional tests are required, orchestrator halts and assigns the task to the build or refactor agent. Workflow resumes only when all gates pass.

## Documentation Rules

- Keep updates concise and useful for maintainers and CMS users.
- Record any changed usage expectations.
- Capture Storybook relevance notes when components are affected.
- Storybook publishing process is intentionally deferred.

## Handoff Template Per Stage

- Scope completed.
- Decisions made.
- Risks found.
- Tests or checks run.
- Outstanding items.
- Recommendation for next stage.

## Final Handoff Template

- Slice summary.
- Files changed and purpose.
- Gate results.
- Exceptions and justifications.
- Residual risks.
- Proposed commit message.
- Explicit stop confirmation awaiting user approval.

## Working Agreements

- Single vertical slice per commit by default.
- No silent scope expansion.
- Clarity over cleverness.
- Consistency over novelty.
- Human approval before each new slice.
