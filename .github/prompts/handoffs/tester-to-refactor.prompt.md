---
description: "Stage handoff template: Tester to Refactor with confidence status and safe refactor candidates."
agent: "tester"
---

Create a stage handoff from Tester to Refactor.

Use this output structure exactly:

## Stage Handoff

- From: Tester
- To: Refactor
- Slice: {{slice_name}}

## Test Outcome

- Test status:
- Coverage status:
- Failed or flaky areas:

## Confidence Summary

- High-confidence areas:
- Areas needing caution:

## Exception Register

- Accepted exceptions and rationale:
- Confirmation status for any ignore-list proposal:

## Safe Refactor Candidates

- Candidate:
- Why safe now:
- Behaviour-preservation guardrails:

## Recommendation

- Refactor changes to prioritise before review.
