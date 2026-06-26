<!-- .github/copilot-instructions.md: Copilot/AI agent instructions for this repository -->
# Copilot Instructions

Purpose: concise, actionable guidance so AI coding agents (Copilot, assistants) can be productive immediately in this repository.

Quick facts
- **Test runner:** Playwright (uses `@playwright/test`).
- **Run tests (UI):** `npx playwright test --ui`.
- **Run tests (CLI):** `npx playwright test`.
- **Test location:** `tests/` (suites such as `heroku-app`, `flight`, `todapp`).
- **Playwright config:** `playwright.config.ts`.

What to do first
- Inspect `package.json` for devDependencies and ensure Playwright is installed.
- Use the repository root as the working directory when running `npx playwright`.
- Prefer running individual test files while developing: `npx playwright test tests/<path-to-file>`.

Key files & folders
- `tests/` — main Playwright test suites and subfolders.
- `tests/*/pages` — Page Object Model helpers used by tests.
- `tests/*/fixtures` — fixtures used by suites.
- `playwright.config.ts` — Playwright configuration (projects, timeouts, reporters).
- `playwright-report/` — generated Playwright UI/report artifacts and traces.

Conventions and agent behavior
- Make minimal, focused edits; do not refactor unrelated tests.
- When adding or updating instructions, link to repository docs instead of copying them.
- If modifying tests, run the specific test locally and prefer small, incremental changes.
- Preserve fixtures, snapshots, and traces unless the change explicitly updates them.

Migration note
- This file consolidates the guidance previously in `AGENTS.md`.

When to update this file
- Add notes for non-obvious repository-specific conventions discovered while working.

Suggested next customizations
- Create an automation agent to run Playwright tests and upload results.
- Create a skill for fixture discovery and common test fixes.

Files added or modified

| File | Why it's useful |
|---|---|
| .github/copilot-instructions.md | Centralized instructions for AI agents: test commands, key folders, and conventions. |

If you prefer the older `AGENTS.md` approach, I can restore or keep both — tell me which you prefer.
