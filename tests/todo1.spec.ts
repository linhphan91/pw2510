import { test, expect } from '@playwright/test';
/*
Built-in locators in Playwright are designed to be resilient and easy to use. They are also very powerful and can be used to locate elements in a variety of ways. In this test, we are using the getByTestId locator to locate the text input field on the page. This locator is based on the data-testid attribute, which is a common way to identify elements in a test.

*/

test('Verify adding new todo successfully', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByPlaceholder('What needs to be done?').fill('Buy milk'); //Get locator by Attribute
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  await page.getByRole('textbox', { name: 'New Todo Input' }).fill('Buy bread'); //Get locator from DOM Tree --> Accessbility Tree
  await page.getByRole('textbox', { name: 'New Todo Input' }).press('Enter');

  await page.locator('.new-todo').fill('Buy eggs'); //Get locator by CSS/Xpath
  await page.locator('.new-todo').press('Enter');

  expect(await page.getByTestId('todo-item-label')
    .count()).toBe(3);

  await expect(page.getByTestId('todo-item-label'))
    .toHaveText(['Buy milk', 'Buy bread', 'Buy eggs']); //trả về array



});

test('Verify marking complete todo successfully', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByPlaceholder('What needs to be done?').fill('Buy milk'); //Get locator by Attribute
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  await page.getByRole('textbox', { name: 'New Todo Input' }).fill('Buy bread'); //Get locator from DOM Tree --> Accessbility Tree
  await page.getByRole('textbox', { name: 'New Todo Input' }).press('Enter');

  await page.locator('.new-todo').fill('Buy eggs'); //Get locator by CSS/Xpath
  await page.locator('.new-todo').press('Enter');
  await page
    .getByRole('listitem') //return all
    .filter({ hasText: 'Buy milk' })
    .getByTestId('todo-item-toggle')
    .click();

  expect(await page
    .getByRole('listitem') //return all
    .filter({ hasText: 'Buy milk' })
    .getByTestId('todo-item-toggle')
    .isChecked())
    .toBeTruthy();
});


test('Verify deleting todo successfully', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByPlaceholder('What needs to be done?').fill('Buy milk'); //Get locator by Attribute
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  await page.getByRole('textbox', { name: 'New Todo Input' }).fill('Buy bread'); //Get locator from DOM Tree --> Accessbility Tree
  await page.getByRole('textbox', { name: 'New Todo Input' }).press('Enter');

  await page.locator('.new-todo').fill('Buy eggs'); //Get locator by CSS/Xpath
  await page.locator('.new-todo').press('Enter');

  await page
    .getByRole('listitem') //return all
    .filter({ hasText: 'Buy milk' })
    .hover();

  await page
    .getByRole('listitem') //return all
    .filter({ hasText: 'Buy milk' })
    .getByRole('button', { name: 'Delete Todo' })
    .click();

  expect(await page
    .getByRole('listitem') //return all
    .filter({ hasText: 'Buy milk' })
    .count())
    .toBe(0);
});


test('Verify renaming todo successfully', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByPlaceholder('What needs to be done?').fill('Buy milk'); //Get locator by Attribute
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  await page.getByRole('textbox', { name: 'New Todo Input' }).fill('Buy bread'); //Get locator from DOM Tree --> Accessbility Tree
  await page.getByRole('textbox', { name: 'New Todo Input' }).press('Enter');

  await page.locator('.new-todo').fill('Buy eggs'); //Get locator by CSS/Xpath
  await page.locator('.new-todo').press('Enter');

  await page
    .getByRole('listitem') //return all
    .filter({ hasText: 'Buy milk' })
    .dblclick();
    
  await page
    .getByTestId('todo-list')
    .getByTestId('text-input')
    .press('Control+A');

  await page
    .getByTestId('todo-list')
    .getByTestId('text-input')
    .fill('Buy almond milk');

  await page
    .getByTestId('todo-list')
    .getByTestId('text-input')
    .press('Enter');

  expect(await page
    .getByRole('listitem') //return all
    .filter({ hasText: 'Buy almond milk' })
    .count())
    .toBe(1);
    
     expect(await page
    .getByRole('listitem') //return all
    .filter({ hasText: 'Buy milk' })
    .count())
    .toBe(0);

});

function press(arg0: string) {
  throw new Error('Function not implemented.');
}
