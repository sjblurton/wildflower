# Orchestrator Agent Usage Guide

## Overview

The `orchestrator.agent` coordinates the full vertical slice workflow for this repository, enforcing repository policy, human gating, and quality standards. It ensures that every stage—Plan, Architect, Build, Tester, Refactor, Reviewer, Clean Commit Ready—runs in sequence, with explicit handoffs and approvals.

## How to Use

1. **Start a Vertical Slice**
   - Use the orchestrate-slice prompt (see `.github/prompts/orchestrate-slice.prompt.md`).
   - Provide: `slice_name`, `slice_goal`, and `mode` (`preview` or `execute`).
   - Example input: `execute | Add Product Section | Implement and integrate a new productsSection using Tailwind and container/presentation split.`

2. **Preview Mode**
   - Runs only the Plan stage and outputs a plan package for approval.
   - Use this to review scope, risks, and acceptance criteria before committing to execution.

3. **Execute Mode**
   - Runs the full workflow: Plan → Architect → Build → Tester → Refactor → Reviewer → Clean Commit Ready.
   - Each stage is delegated to the appropriate agent (e.g., build agent for implementation).
   - Human approval is required after Plan and before final commit.

4. **Stage Handoffs**
   - The orchestrator uses handoff prompt templates (in `.github/prompts/handoffs/`) to pass context and requirements between agents.
   - All code changes are made by the build agent, not the orchestrator.

5. **Best Practices**
   - Always use Tailwind for styling unless CSS is explicitly justified.
   - Every component should have a container and presentation split.
   - For complex features, use `/data`, `/logic`, and `/render` folders.
   - Reviewer agent will check for code reuse and DRY opportunities across the codebase.

6. **Troubleshooting**
   - If a stage does not progress, check for missing approvals or errors in the previous stage’s output.
   - Ensure all agents have the correct tools enabled (e.g., `edit` for build agent).
   - Review the orchestrator and agent YAML/MD files for up-to-date conventions.

## Example Workflow

1. Start with a preview: `preview | Add Product Section | ...`
2. Approve the plan, then run in execute mode.
3. The orchestrator will:
   - Plan: Define scope, risks, acceptance criteria.
   - Architect: Specify file/folder structure, container/presentation split, Tailwind usage.
   - Build: Implement as per architecture (delegated to build agent).
   - Tester: Validate coverage and behaviour.
   - Refactor: Improve structure and DRYness.
   - Reviewer: Check for bugs, DRY, and code reuse.
   - Clean Commit Ready: Output summary and await final commit approval.

## Policy Highlights

- No direct handoff between non-orchestrator agents; all transitions go through the orchestrator.
- No CSS unless justified; Tailwind is the default.
- All code changes must be made by the build agent.
- Reviewer must check for code reuse across the codebase.

---

For more details, see `.github/agents/` and `.github/prompts/`.
