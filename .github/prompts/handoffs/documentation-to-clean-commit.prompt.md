---
description: 'Stage handoff template: Documentation to clean commit ready with final evidence pack.'
agent: 'documentation'
---

Create a stage handoff from Documentation to clean commit ready.

Use this output structure exactly:

## Stage Handoff

- From: Documentation
- To: Clean Commit Ready
- Slice: {{slice_name}}

## Documentation Updates

- Developer documentation updated:
- User-facing documentation updated:

## Final Evidence Pack

- Lint status:
- Typecheck status:
- Style checks status:
- Test status:
- Coverage status:

## Exceptions And Approvals

- Exceptions accepted:
- Explicit user confirmations received:

## Proposed Commit Message

- {{commit_message_draft}}

## Stop Confirmation

- Workflow is stopped at clean commit ready.
- Awaiting explicit user approval for commit and next slice.
