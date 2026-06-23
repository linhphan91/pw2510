import { test, expect } from '@playwright/test';


test('Horizontal Slider', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/horizontal_slider')

    const slider = await page.getByRole('slider');
    //const slide = await page.locator('input[type=range])

    await slider.fill('3.5');

    await expect(page.locator('#range')).toHaveText('3.5');

});