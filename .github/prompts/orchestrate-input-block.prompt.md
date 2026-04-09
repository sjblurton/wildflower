---
description: "Tiny helper prompt: convert a one-line command into a ready input block for orchestrate-slice."
agent: "ask"
---

Generate a ready-to-paste input block for `.github/prompts/orchestrate-slice.prompt.md`.

Input format (single line):

- `<mode> | <slice_name> | <slice_goal>`

Accepted modes:

- `p`, `preview`
- `e`, `execute`

Normalisation rules:

1. Trim spaces around each segment.
2. Map `p` to `preview` and `e` to `execute`.
3. Keep user wording for `slice_name` and `slice_goal` unchanged.

Validation rules:

1. If any segment is missing, ask one short follow-up question for the missing part only.
2. If mode is invalid, ask for `preview` or `execute`.

Output rules:

1. Output only the block below, with values filled in.
2. No extra commentary.

Output block:

- `slice_name: <slice_name>`
- `slice_goal: <slice_goal>`
- `mode: <preview|execute>`
- `plan_approved: <yes|no>`

Set `plan_approved` default:

- `no` for `preview`
- `yes` for `execute`

Quick examples:

- Input: `p | Storybook Nav | Install Storybook and add NavBarView story`
- Output:
  - `slice_name: Storybook Nav`
  - `slice_goal: Install Storybook and add NavBarView story`
  - `mode: preview`
  - `plan_approved: no`

- Input: `e | Storybook Nav | Install Storybook and add NavBarView story`
- Output:
  - `slice_name: Storybook Nav`
  - `slice_goal: Install Storybook and add NavBarView story`
  - `mode: execute`
  - `plan_approved: yes`
