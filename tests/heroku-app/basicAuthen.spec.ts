import {test, expect} from '@playwright/test';

test('Verify basic authen access', async ({page})=> {
await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth')

const message = page.locator('div.example p')
await expect(message).toContainText('Congratulations! You must have the proper credentials.');
})