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

- Files to add (must include both container and presentation Astro components; add /data, /logic, /render folders if needed):
- Files to update:
- Files to avoid changing:

## Styling Requirements

- All styling must use Tailwind CSS. If any CSS file is proposed, provide explicit justification below:
- CSS justification (if any):

## Boundaries

- Container versus presentation split (required for all components):
- Data, render, logic split (use /data, /logic, /render folders as needed):
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
