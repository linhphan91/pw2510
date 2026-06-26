import { test as base, type Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { TablePage } from '../pages/tablePage';
import { CheckboxPage } from '../pages/checkboxPage';
import { StatusCodesPage } from '../pages/statusCodesPage';

type HerokuFixtures = {
    loginPage: LoginPage,
    tablePage: TablePage,
    checkboxPage: CheckboxPage,
    statusCodesPage: StatusCodesPage,
    randomNumber: number
}
export const test = base.extend<HerokuFixtures>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    randomNumber: async ({ }, use) => {
        const randomNumber = Math.floor(Math.random() * 1000);
        await use(randomNumber);
    },
    checkboxPage: async ({ page }, use) => {
        const checkboxPage = new CheckboxPage(page);
        await use(checkboxPage);
    },
    tablePage: async ({ page }, use) => {
        const tablePage = new TablePage(page);
        await tablePage.goto();
        await use(tablePage);
    },
    statusCodesPage: async ({ page }, use) => {
        const statusCodesPage = new StatusCodesPage(page);
        await use(statusCodesPage);
    }

});

export const expect = test.expect;