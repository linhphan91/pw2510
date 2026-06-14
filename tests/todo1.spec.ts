import { test, expect } from '@playwright/test';
/*
Built-in locators in Playwright are designed to be resilient and easy to use. They are also very powerful and can be used to locate elements in a variety of ways. In this test, we are using the getByTestId locator to locate the text input field on the page. This locator is based on the data-testid attribute, which is a common way to identify elements in a test.

*/

test('test', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByRole('textbox', {name: 'New Todo Input'}).fill('Buy milk');
  await page.getByRole('textbox', {name: 'New Todo Input'}).press('Enter');
  

});