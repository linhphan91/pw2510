import { test, expect } from '@playwright/test';

test("verify hover over element", async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');

    await page
    .getByRole('img', { name: 'User Avatar' })
    .first()
    .hover();

    const caption = page
    .locator('.figcaption')
    .first();

    await expect(caption).toBeVisible();

    await expect(caption.getByRole('heading', {name: 'name: user1'})).toBeVisible();
    await expect(caption.getByRole('link', {name: 'View Profile'})).toBeVisible();


    

});