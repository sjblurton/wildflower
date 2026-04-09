---
description: "Compact router prompt: ask for stage name and output the correct handoff template format."
agent: "ask"
---

Route to the correct handoff template format based on stage name.

If stage name is missing, ask one short question:

- "Which stage handoff do you want?"

Accepted stage names and aliases:

- `plan`, `plan-to-architect`, `plan -> architect`
- `architect`, `architect-to-build`, `architect -> build`
- `build`, `build-to-tester`, `build -> tester`
- `tester`, `tester-to-refactor`, `tester -> refactor`
- `refactor`, `refactor-to-reviewer`, `refactor -> reviewer`
- `reviewer`, `reviewer-to-documentation`, `reviewer -> documentation`
- `documentation`, `documentation-to-clean-commit`, `documentation -> clean commit`
- `clean-commit`, `clean-commit-ready-check`, `final-check`

Routing rules:

1. Normalise stage input to lowercase and trim spaces.
2. Match aliases to one canonical template.
3. Output only the selected template format.
4. Preserve section headings and bullet labels exactly.
5. Do not include extra commentary.

Canonical template map:

- `plan-to-architect`: `.github/prompts/handoffs/plan-to-architect.prompt.md`
- `architect-to-build`: `.github/prompts/handoffs/architect-to-build.prompt.md`
- `build-to-tester`: `.github/prompts/handoffs/build-to-tester.prompt.md`
- `tester-to-refactor`: `.github/prompts/handoffs/tester-to-refactor.prompt.md`
- `refactor-to-reviewer`: `.github/prompts/handoffs/refactor-to-reviewer.prompt.md`
- `reviewer-to-documentation`: `.github/prompts/handoffs/reviewer-to-documentation.prompt.md`
- `documentation-to-clean-commit`: `.github/prompts/handoffs/documentation-to-clean-commit.prompt.md`
- `clean-commit-ready-check`: `.github/prompts/handoffs/clean-commit-ready-check.prompt.md`

Output contract:

- First line: `Template: <canonical-template-name>`
- Second line: `Source: <template-path>`
- Then output the selected template body format with placeholders ready to fill.

If the stage name is ambiguous, ask one disambiguation question with the closest two options.
If the stage name is unsupported, list supported canonical template names only.
