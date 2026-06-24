import { test, expect } from '@playwright/test';


test('Dynamic loading', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1')
    await page.getByRole('button', { name: "Start" }).click();
    await expect(page.getByText('Hello World!')).toBeVisible({timeout: 10000, visible: true});


});