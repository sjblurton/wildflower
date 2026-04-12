---
description: 'Single-entry orchestration prompt: preview plan first, then execute full stage chain after explicit approval.'
agent: 'orchestrator'
---

Orchestrate one vertical slice using the repository workflow.

If the user does not provide a mode, default to preview mode.

Accepted modes:

- `preview`: produce Plan output only, then stop and wait for approval.
- `execute`: run the full chain for the approved slice.

Required inputs:

- `slice_name`
- `slice_goal`
- `mode` (optional, defaults to `preview`)

If `slice_name` or `slice_goal` is missing, ask one short clarification question.

Execution policy:

1. Always follow the canonical sequence:
   Tester (baseline) -> Plan -> Architect -> Build -> Tester (post-build) -> Refactor -> Tester (post-refactor) -> Reviewer -> Documentation -> clean commit ready -> stop
2. Enforce one vertical slice only.
3. Do not allow scope creep without explicit user approval.
4. Enforce hard stop at clean commit ready.
5. Do not start another slice automatically.

Mode behaviour:

## Preview mode

- Run Tester (baseline) first. If any quality gate fails, halt and report errors; do not proceed to Plan.
- If baseline passes, run Plan only.
- Output a plan package with:
  - Scope (in and out)
  - Acceptance criteria
  - Risks
  - Dependencies
  - Refactor opportunities (mandatory or optional)
  - Recommended Architect next step
- End with: `Awaiting approval to execute.`

## Execute mode

- Require explicit statement that plan is approved.
- Tester runs first to establish baseline coverage and quality gates. If any gate fails, halt and report errors; do not proceed to Plan.
- Then execute all stages in order.
- After each edit stage (Build, Refactor), tester runs again and reports coverage delta (increase, decrease, unchanged) compared to baseline.
- For each stage, output a compact handoff using the matching template format from `.github/prompts/handoffs`.
- At final stage, output clean commit ready summary with:
  - Slice summary
  - Files changed
  - Gate status: lint, typecheck, style checks, tests, coverage
  - Exceptions and approvals
  - Residual risks
  - Proposed commit message
  - Stop confirmation awaiting user commit decision

Quality and governance rules:

- Use British English spelling and phrasing.
- Keep output concise, specific, and evidence-based.
- Any coverage ignore-list change requires explicit user confirmation.

Output contract:

- First line: `Mode: <preview|execute>`
- Second line: `Slice: <slice_name>`
- Then provide the stage output.
- At each tester stage, output the coverage delta (increase, decrease, unchanged) compared to baseline.
