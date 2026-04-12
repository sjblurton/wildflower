---
description: 'Stage handoff template: Reviewer to Documentation with approved changes and caveats.'
agent: 'reviewer'
---

Create a stage handoff from Reviewer to Documentation.

Use this output structure exactly:

## Stage Handoff

- From: Reviewer
- To: Documentation
- Slice: {{slice_name}}

## Review Outcome

- Findings status:
- Critical issues:
- Medium issues accepted or resolved:

## Approved Change Summary

- User-visible changes:
- Maintainer-facing changes:
- Constraints to document:
- DRY/code reuse findings (must check entire codebase for reuse opportunities):
- Container/presentation split (required):
- Tailwind-only styling (CSS only if justified):
- Data/logic/render folders (as needed):

## Testing And Risk Notes

- Validation summary:
- Exceptions recorded:
- Residual risks to note in docs:

## Documentation Targets

- Files or sections to update:

## Recommendation

- Documentation priority order.
