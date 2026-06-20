import { test, expect } from '@playwright/test';


test(" Login successful with valid credentials", async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(page
        .getByRole('heading', { name: "Login Page" }))
        .toBeVisible();

    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith')
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    //await page.getByRole('button', {name: 'Login'}).click();
    await page.locator('button[type="submit"]').click();

    await expect(page
        .getByRole('heading', { name: 'Welcome to the Secure Area. When you are done click logout below.' }))
        .toBeVisible();

    await expect(page
        .getByRole('link', { name: 'Logout' }))
        .toBeVisible();

    await expect(page
        .getByText('You logged into a secure area!'))
        .toBeVisible();

});


test(" Login unsuccessful with invalid username", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(page
        .getByRole('heading', { name: "Login Page" }))
        .toBeVisible();

    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith1')
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword!');
    //await page.getByRole('button', {name: 'Login'}).click();
    await page.locator('button[type="submit"]').click();

    await expect(page
        .getByText('Your username is invalid!'))
        .toBeVisible();

});

test(" Login unsuccessful with invalid password", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await expect(page
        .getByRole('heading', { name: "Login Page" }))
        .toBeVisible();

    await page.getByRole('textbox', { name: 'Username' }).fill('tomsmith')
    await page.getByRole('textbox', { name: 'Password' }).fill('SuperSecretPassword');
    //await page.getByRole('button', {name: 'Login'}).click();
    await page.locator('button[type="submit"]').click();

    await expect(page
        .getByText('Your password is invalid!'))
        .toBeVisible();

});