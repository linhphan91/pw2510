import { test, expect } from '@playwright/test';

test("verify hover over element", async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

    await page.locator('#column-a').dragTo(page.locator('#column-b'));
    await expect(page
        .locator('#column-a').getByRole('banner')).toHaveText('B')

    await expect(page
        .locator('#column-b header')).toHaveText('A')
});