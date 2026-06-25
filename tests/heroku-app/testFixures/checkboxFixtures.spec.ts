import { test as baseTest, expect } from '../fixtures/heroku-fixture'

baseTest('Checkbox', async ({checkboxPage }) => {
    await checkboxPage.goto();
    await checkboxPage.check(1);
    // const checkbox = await checkboxPage.getStatusChecked(1);
    // await expect(checkbox).toBeChecked();
    expect(await checkboxPage.getStatusChecked(1)).toBeChecked();            

});

baseTest("Uncheck", async ({checkboxPage }) => {
    await checkboxPage.goto();
    await checkboxPage.uncheck(1);
    expect(await checkboxPage.getStatusChecked(1)).not.toBeChecked();
  

});