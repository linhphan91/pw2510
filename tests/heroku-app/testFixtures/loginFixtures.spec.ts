import { test as baseTest, expect } from '../fixtures/heroku-fixture.ts';


const dataSet = [
    { username: 'tomsmith', password: 'SuperSecretPassword!', message: 'You logged into a secure area!' },
    { username: 'tomsmith1', password: 'SuperSecretPassword!', message: 'Your username is invalid!' },
    { username: 'tomsmith', password: 'SuperSecretPassword', message: 'Your password is invalid!' },
    { username: '', password: '', message: 'Your username is invalid!' }
];

dataSet.forEach(({ username, password, message }) => {
    baseTest(`Login test with username: ${username} and password: ${password} and show message: ${message}`, async ({ loginPage, tablePage }) => {
        
        await loginPage.goto();
        await loginPage.submitForm(username, password);

        const flashMessage = await loginPage.getFlashMessage();
        await expect(flashMessage).toContainText(message);

    });
});