---
description: "Stage handoff template: Architect to Build with structure, boundaries, and test approach."
agent: "architect"
---

Create a stage handoff from Architect to Build.

Use this output structure exactly:

## Stage Handoff

- From: Architect
- To: Build
- Slice: {{slice_name}}
- Goal: {{slice_goal}}

## Proposed Structure

- Files to add:
- Files to update:
- Files to avoid changing:

## Boundaries

- Container versus presentation split:
- Data, render, logic split:
- Shared placement decisions (`src/lib` versus `src/components`):

## Quality Constraints

- Consistency requirements:
- DRY expectations:
- SOLID notes:

## Test Strategy Requirements

- Behaviour tests required:
- Presentation smoke tests required:
- Coverage expectations and any justified exceptions:

## Recommendation

- Recommended implementation order for Build.
