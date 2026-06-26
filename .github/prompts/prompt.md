---
mode: agent
description: Generate a Playwright script based on the user's description of the test scenario.
model: Gemini 2.5 Flash Preview (gemini)
tools: ['playwright/*']
---

Generate a Playwright script based on the user's description of the test scenario.
Open browser
Navigate to https://the-internet.herokuapp.com/dropdown
Select "option 1"
Validate "option 1" is selected

Generate script under folder tests with filename dropdown.spec.ts
following instructions from .github/instructions/playywright.instruction.md 
if page class or fixture is needed create them under tests/pages and tests/fixtures respectively
Use best practices for Playwright test generation as per .github/chatmodes/test-gen.chatmode.md
update test case script with fixture and page class usage as per .github/instructions/playywright.instruction.md