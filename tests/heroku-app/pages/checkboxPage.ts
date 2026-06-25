import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';


export class CheckboxPage {
    private readonly checkbox: Locator;

    constructor(public page: Page) {
        this.checkbox = page.getByRole('checkbox');

    }

     async goto() {
        this.page.goto("https://the-internet.herokuapp.com/checkboxes");
    }

    async check(number: number) {
        await this.checkbox.nth(number).check();
    }

    async getStatusChecked(number: number) {
       return this.checkbox.nth(number);
    }

    async uncheck(number: number) {
        await this.checkbox.nth(number).uncheck();
    }

}