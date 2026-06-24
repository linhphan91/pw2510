import type { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly submitButton: Locator;
    private readonly flashMessage: Locator;

    constructor(public page: Page) {
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.submitButton = page.locator('button[type="submit"]');
        this.flashMessage = page.getByText('You logged into a secure area!');

    }

    async goto() {
        this.page.goto("https://the-internet.herokuapp.com/login");
    }

    async submitForm(username: string, password: string) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async getFlashMessage(): Promise<Locator> {
        return this.flashMessage;
    }

}