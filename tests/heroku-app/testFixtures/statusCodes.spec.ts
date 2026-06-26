import { test as baseTest, expect } from '../fixtures/heroku-fixture';

baseTest.describe('Status codes page', () => {
    baseTest.beforeEach(async ({ statusCodesPage }) => {
        await statusCodesPage.goto();
    });

    baseTest('Navigate through status codes pages using POM and fixtures', async ({ statusCodesPage }) => {
        await baseTest.step('Open status codes page', async () => {
            await expect(statusCodesPage.page).toHaveURL('https://the-internet.herokuapp.com/status_codes');
            await expect(statusCodesPage.getPageHeading()).toHaveText('Status Codes');
        });

        await baseTest.step('Verify 200 status code page and return', async () => {
            await statusCodesPage.clickStatusCode('200');
            await expect(statusCodesPage.getPageHeading()).toContainText('200');
            await expect(statusCodesPage.getPageMessage()).toContainText('This page returned a 200 status code.');
            await statusCodesPage.clickGoHere();
            await expect(statusCodesPage.page).toHaveURL('https://the-internet.herokuapp.com/status_codes');
        });

        await baseTest.step('Verify 301 status code page and return', async () => {
            await statusCodesPage.clickStatusCode('301');
            await expect(statusCodesPage.getPageHeading()).toContainText('301');
            await expect(statusCodesPage.getPageMessage()).toContainText('This page returned a 301 status code.');
            await statusCodesPage.clickGoHere();
            await expect(statusCodesPage.page).toHaveURL('https://the-internet.herokuapp.com/status_codes');
        });

        await baseTest.step('Verify 404 status code page and return', async () => {
            await statusCodesPage.clickStatusCode('404');
            await expect(statusCodesPage.getPageHeading()).toContainText('404');
            await expect(statusCodesPage.getPageMessage()).toContainText('This page returned a 404 status code.');
            await statusCodesPage.clickGoHere();
            await expect(statusCodesPage.page).toHaveURL('https://the-internet.herokuapp.com/status_codes');
        });

        await baseTest.step('Verify 500 status code page and return', async () => {
            await statusCodesPage.clickStatusCode('500');
            await expect(statusCodesPage.getPageHeading()).toContainText('500');
            await expect(statusCodesPage.getPageMessage()).toContainText('This page returned a 500 status code.');
            await statusCodesPage.clickGoHere();
            await expect(statusCodesPage.page).toHaveURL('https://the-internet.herokuapp.com/status_codes');
        });
    });
});
