import { test, expect } from '@playwright/test';

const statusCodeDataset = [
    {statusCode: 200},
    {statusCode: 301},
    {statusCode: 404},
    {statusCode: 500}
]

statusCodeDataset.forEach(({statusCode}) => {
test(`Hyperlink - link text with ${statusCode}`, async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/status_codes");

    await expect(page
        .getByRole('heading', { name: "Status Codes" }))
        .toBeVisible();

    await page
        .getByRole('link', { name: `${statusCode}`})
        .click();

    await expect(page
        .url())
        .toContain(`${statusCode}`);

    await expect(page
        .getByText(`This page returned a ${statusCode}`))
        .toBeVisible();

    await page
        .goBack();

})
});

