---
description: "Single-entry orchestration prompt: preview plan first, then execute full stage chain after explicit approval."
agent: "ask"
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
   - Plan -> Architect -> Build -> Tester -> Refactor -> Reviewer -> Documentation -> clean commit ready -> stop
2. Enforce one vertical slice only.
3. Do not allow scope creep without explicit user approval.
4. Enforce hard stop at clean commit ready.
5. Do not start another slice automatically.

Mode behaviour:

## Preview mode

- Run Plan only.
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
- Then execute all stages in order.
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
- Storybook publishing workflow remains out of scope unless explicitly requested.

Output contract:

- First line: `Mode: <preview|execute>`
- Second line: `Slice: <slice_name>`
- Then provide the stage output.
