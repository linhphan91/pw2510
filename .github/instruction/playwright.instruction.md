---
description: 'Playwright test generation instructions'
applyTo: '**'
---

# Test Writing Guidelines

## Code Quality Standards
- **Locators**: Prioritize user-facing, role-based locators (`getByRole`, `getByLabel`, `getByText`, etc.) for resilience and accessibility. Use `test.step()` to group interactions and improve test readability and reporting.
- **Assertions**: Use auto-retrying web-first assertions. These assertions start with the `await` keyword (e.g., `await expect(locator).toHaveText()`). Avoid `expect(locator).toBeVisible()` unless specifically testing for visibility changes.
- **Timeouts**: Rely on Playwright's built-in auto-waiting mechanisms. Avoid hard-coded waits or increased default timeouts.
- **Clarity**: Use descriptive test and step titles that clearly state the intent. Add comments only to explain complex logic or non-obvious interactions.

## Test Structure
- **Imports**: Start with `import { test as baseTest, expect } from '../fixtures/heroku-fixture'`.
- **Organization**: Group related tests for a feature under a `test.describe()` block.
- **Hooks**: Use `beforeEach` for setup actions common to all tests in a `describe` block (e.g., navigating to a page).
- **Titles**: Follow a clear naming convention, such as `Feature - Specific action or scenario`.

## File Organization
- **Location**: Store all test files in the `tests/heroku-app/testFixtures` directory.
- **Location**: Store all page files in the `tests/heroku-app/pages` directory.
- **Location**: Store all fixture files in the `tests/heroku-app/fixtures` directory.
- **Naming**: Use the convention `<feature-or-page>.spec.ts` (e.g., `login.spec.ts`, `search.spec.ts`, `todo-page.ts`).
- **Scope**: Aim for one test file per major application feature or page.

## Assertion Best Practices
- **Element Counts**: Use `toHaveCount` to assert the number of elements found by a locator.
- **Text Content**: Use `toHaveText` for exact text matches and `toContainText` for partial matches.
- **Navigation**: Use `toHaveURL` to verify the page URL after an action.

## Example Test Structure

```typescript
import { test as baseTest, expect } from '../fixtures/heroku-fixture.ts';

const dataSet = [
    { username: 'tomsmith', password: 'SuperSecretPassword!', message: 'You logged into a secure area!' },
    { username: 'tomsmith1', password: 'SuperSecretPassword!', message: 'Your username is invalid!' },
    { username: 'tomsmith', password: 'SuperSecretPassword', message: 'Your password is invalid!' },
    { username: '', password: '', message: 'Your username is invalid!' }
];

dataSet.forEach(({ username, password, message }) => {
    baseTest(`Login test with username: ${username} and password: ${password} and show message: ${message}`, async ({ loginPage, tablePage }) => {
        
        await loginPage.goto();
        await loginPage.submitForm(username, password);

        const flashMessage = await loginPage.getFlashMessage();
        await expect(flashMessage).toContainText(message);

    });
});

```
## Example Page class strucure
```typescript
import type { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly submitButton: Locator;
    private readonly flashMessage: Locator;

    constructor(public page: Page) {
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.submitButton = page.locator('button[type="submit"]');
        this.flashMessage = page.getByText('You logged into a secure area!');

    }

    async goto() {
        this.page.goto("https://the-internet.herokuapp.com/login");
    }

    async submitForm(username: string, password: string) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async getFlashMessage(): Promise<Locator> {
        return this.flashMessage;
    }
}
```
# Fixture structure
```typescript
import { test as base, type Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { TablePage } from '../pages/tablePage';
import { CheckboxPage } from '../pages/checkboxPage';

type HerokuFixtures = {
    loginPage: LoginPage,
    tablePage: TablePage,
    checkboxPage: CheckboxPage
    randomNumber: number
}
export const test = base.extend<HerokuFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    randomNumber: async ({ }, use) => {
        const randomNumber = Math.floor(Math.random() * 1000);
        await use(randomNumber);
    },
    checkboxPage: async ({ page }, use) => {
        const checkboxPage = new CheckboxPage(page);
        await use(checkboxPage);
    },
    tablePage: async ({ page }, use) => {
        const tablePage = new TablePage(page);
        await tablePage.goto();
        await use(tablePage);
    }

});

export const expect = test.expect;
```
## Test Execution Strategy

1. **Initial Run**: Execute tests with `npx playwright test --project=chromium`
2. **Debug Failures**: Analyze test failures and identify root causes
3. **Iterate**: Refine locators, assertions, or test logic as needed
4. **Validate**: Ensure tests pass consistently and cover the intended functionality
5. **Report**: Provide feedback on test results and any issues discovered

## Quality Checklist

Before finalizing tests, ensure:
- [ ] All locators are accessible and specific and avoid strict mode violations
- [ ] Tests are grouped logically and follow a clear structure
- [ ] Assertions are meaningful and reflect user expectations
- [ ] Tests follow consistent naming conventions
- [ ] Code is properly formatted and commented

## Additional Resources
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)