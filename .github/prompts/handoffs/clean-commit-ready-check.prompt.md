---
description: "Final gate prompt: verify clean commit ready status before user approval."
agent: "reviewer"
---

Run the final clean-commit-ready check for one slice.

Use this output structure exactly:

## Clean Commit Ready Check

- Slice: {{slice_name}}
- Status: pass or fail

## Gate Results

- Lint:
- Typecheck:
- Style checks:
- Tests:
- Coverage:

## Findings Status

- High severity unresolved:
- Medium severity unresolved:
- Accepted exceptions:

## Governance Checks

- Scope creep introduced:
- Coverage ignore changed without confirmation:
- Sequence followed:

## Decision

- Ready for user review and commit: yes or no
- If no, required remediation:

## Stop Statement

- No further implementation will begin until explicit user approval.
