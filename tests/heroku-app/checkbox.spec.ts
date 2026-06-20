import { test, expect } from '@playwright/test';

test('Checkboxes', async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/checkboxes")

    //Locator bằng CSS
    //locator('input[type="checkbox"]').first()

    //Locator bằng Xpath
    //locator('xpath=//input[@type="checkbox"]').first()

    await page
        .getByRole('checkbox')
        .first()
        .check();

    await expect(page
        .getByRole('checkbox')
        .first())
        .toBeChecked();

});

test("Uncheck", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/checkboxes")
    await page
        .getByRole('checkbox')
        .nth(1)
        .uncheck();


    await expect(page
        .getByRole('checkbox')
        .nth(1))
        .not.toBeChecked();
});