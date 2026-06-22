import { test, expect } from '@playwright/test';

test("verify nested frame content", async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/nested_frames');

    const frameLeft = await page
        .frameLocator('frame[name="frame-top"]')
        .frameLocator('frame[name="frame-left"]')
    await expect(frameLeft.locator('body')).toContainText("LEFT");

    const frameMiddle = await page
        .frameLocator('frame[name="frame-top"]')
        .frameLocator('frame[name="frame-middle"]')
    await expect(frameMiddle.locator('body')).toContainText("MIDDLE");

    const frameRight = await page
        .frameLocator('frame[name="frame-top"]')
        .frameLocator('frame[name="frame-right"]')
    await expect(frameRight.locator('body')).toContainText("RIGHT");

    const frameBottom = await page
        .frameLocator('frame[name="frame-bottom"]')
    await expect(frameBottom.locator('body')).toContainText("BOTTOM");
});