import { test as base, type Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { TablePage } from '../pages/tablePage';
import { CheckboxPage } from '../pages/checkboxPage';

type HerokuFixtures = {
    loginPage: LoginPage,
    tablePage: TablePage,
    checkboxPage: CheckboxPage
    randomNumber: number
}
export const test = base.extend<HerokuFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    tablePage: async ({ page }, use) => {
        const tablePage = new TablePage();
        await use(tablePage);
    },
    randomNumber: async ({}, use) => {
        const randomNumber = Math.floor(Math.random() * 1000);
        await use(randomNumber);
    },
    checkboxPage: async ({ page }, use) => {
        const checkboxPage = new CheckboxPage(page);
        await use(checkboxPage);
    },

    
});

export const expect = test.expect;