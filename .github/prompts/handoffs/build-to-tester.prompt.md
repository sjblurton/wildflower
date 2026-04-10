---
description: "Stage handoff template: Build to Tester with implementation delta and validation targets."
agent: "build"
---

Create a stage handoff from Build to Tester.

Use this output structure exactly:

## Stage Handoff

- From: Build
- To: Tester
- Slice: {{slice_name}}

## Implementation Summary

- What changed:
- Why it changed:
- What did not change:
- Container/presentation split (required):
- Tailwind-only styling (CSS only if justified):
- Data/logic/render folders (as needed):

## Behaviour Delta

- New behaviour:
- Updated behaviour:
- Edge cases to verify:

## Files Changed

-

## Known Risks

-

## Testing Targets

- Required behaviour tests:
- Required smoke tests:
- Coverage focus areas:

## Recommendation

- Recommended test execution order.
