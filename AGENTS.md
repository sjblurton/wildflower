# Repository Agent Orchestration Policy

## Purpose

This file defines the default, always-on orchestration policy for agent-driven work in this repository.

Goals:

- Keep delivery human-gated and commit-by-commit.
- Enforce consistent architecture and quality standards.
- Produce portfolio-grade outputs with clear validation evidence.

## Scope

- Applies to all agent-driven tasks across the workspace.
- Covers both website and studio work unless the user explicitly overrides.

## Canonical Sequence

Default stage order:

`Tester (baseline) -> Plan -> Architect -> Build -> Tester (post-build) -> Refactor -> Tester (post-refactor) -> Reviewer -> Clean Commit Ready -> Stop`

## Stage Contracts

### Plan

- Define exactly one vertical slice.
- Record acceptance criteria, risks, dependencies, and out-of-scope items.
- Identify refactor opportunities and classify them as optional or mandatory.

### Architect

- Define file and folder structure and component boundaries.
- Specify all file boundaries (Astro, CSS, test, shared logic).
- Explicitly call out any code that should be moved to shared modules/utilities.
- State if any code is duplicated and where it should be centralised.
- Require all new or changed components to have styles in a separate `.css` file unless explicitly justified.
- List all files to be created/modified, including CSS, test, and shared files.
- Enforce consistency, DRY, and SOLID.
- Define testing approach and any potential exception rationale.

### Build

- Use the `build` custom agent for implementation-stage execution.
- Implement only the approved slice scope.
- Do not introduce scope creep without explicit user approval.

### Tester

- Runs first to establish and store baseline coverage and quality gate status. If any gate fails, halts and reports errors; no work proceeds until baseline is healthy.
- After each edit stage (Build, Refactor), re-runs all quality gates and compares coverage to baseline. Reports coverage delta (increase, decrease, unchanged) at each stage.
- Validates changed behaviour with tests.
- Targets 100% coverage for meaningful executable logic.
- Records any exceptions with explicit rationale.
- If additional tests are required, the orchestrator halts and assigns the task to the build or refactor agent. Workflow resumes only when all gates pass.

### Refactor

- Run after Tester in the default flow.
- Improve reuse, consistency, and structure.
- Preserve behaviour unless the user explicitly approves behaviour changes.
- Keep changes minimal and risk-aware.

### Reviewer

- Report findings first, highest severity first.
- Always output a findings summary, even if “No issues found.”
- Validate regressions, risks, consistency, DRY/SOLID, test adequacy, and file boundaries (Astro, CSS, test, shared logic).
- Check for DRY (no repeated code; shared logic extracted).
- Check for style separation.
- Report residual risks and testing gaps.

### Documentation

- no comments in code files without explicit justification. - any comments determined to be needed should be jsdoc style and provide value beyond what is obvious from the code.

## Stop And Approval Rules

- Hard stop at Clean Commit Ready.
- No automatic progression to the next slice.
- User approval required only at Plan and Clean Commit Ready.
- Next slice starts only after explicit user approval.

## Commit Ownership

- Agent prepares code, validation summary, and a commit message draft.
- User performs final review and final commit decision.

## Quality Gate Requirements

Before a slice is considered clean commit ready, require:

- Lint passes.
- Typecheck passes.
- Style checks pass.
- Tests pass for changed behaviour.
- Coverage expectations met for meaningful logic, with coverage delta (increase, decrease, unchanged) reported compared to baseline.
- Exceptions documented and justified.

## Coverage Exception Policy

- Reasonable exceptions are allowed where direct tests add minimal confidence.
- GROQ query definitions validated through Zod schemas are acceptable by default.
- Selected configuration-only files may be exempt with clear justification.
- Any change to coverage ignore lists requires explicit user confirmation first.

## Output Standards

- Use British English spelling and phrasing in all user-facing output.
- Keep reports concise, specific, and evidence-based.
- Prefer actionable recommendations over stylistic commentary.
- At each tester stage, output the coverage delta (increase, decrease, unchanged) compared to baseline.

## Operational Safeguards

- If quality gates fail, halt and report blockers.
- If architecture conflict is detected, route back to Plan and Architect before continuing.
- If refactor risk is high, split into a dedicated refactor slice and stop at clean commit ready.
