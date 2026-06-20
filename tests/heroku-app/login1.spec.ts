import { test, expect } from '@playwright/test';

const dataSet = [
    { username: 'tomsmith', password: 'SuperSecretPassword!', message: 'You logged into a secure area!' },
    { username: 'tomsmith1', password: 'SuperSecretPassword!', message: 'Your username is invalid!' },
    { username: 'tomsmith', password: 'SuperSecretPassword', message: 'Your password is invalid!' },
    { username: '', password: '', message: 'Your username is invalid!'}
];

dataSet.forEach(({ username, password, message }) => {
    test(`Login test with username: ${username} and password: ${password} and show message: ${message}`, async ({ page }) => {
        await page.goto("https://the-internet.herokuapp.com/login");
        await expect(page
            .getByRole('heading', { name: "Login Page" }))
            .toBeVisible();

        await page.getByRole('textbox', { name: 'Username' }).fill(username)
        await page.getByRole('textbox', { name: 'Password' }).fill(password);
        //await page.getByRole('button', {name: 'Login'}).click();
        await page.locator('button[type="submit"]').click();

        await expect(page
            .getByText(message))
            .toBeVisible();
    });
});