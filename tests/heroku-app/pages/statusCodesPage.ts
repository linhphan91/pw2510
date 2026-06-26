import type { Locator, Page } from '@playwright/test';

export class StatusCodesPage {
    private readonly statusCodeLink = (code: string) => this.page.getByRole('link', { name: code });
    private readonly goHereLink: Locator;
    private readonly pageHeading: Locator;
    private readonly pageMessage: Locator;

    constructor(public page: Page) {
        this.goHereLink = page.getByRole('link', { name: 'go here' });
        this.pageHeading = page.locator('h3');
        this.pageMessage = page.locator('#content p');
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/status_codes');
    }

    async clickStatusCode(code: string) {
        await this.statusCodeLink(code).click();
    }

    async clickGoHere() {
        await this.goHereLink.click();
    }

    getPageHeading(): Locator {
        return this.pageHeading;
    }

    getPageMessage(): Locator {
        return this.pageMessage;
    }
}
