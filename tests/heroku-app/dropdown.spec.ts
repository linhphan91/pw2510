import { test, expect } from '@playwright/test';

test("Select an option in dropdown", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dropdown")


    //xpath: //*[@id="dropdown"]/*[contains(text(), 'Option 1')]
    //xpath= //*[@id="dropdown"]/option/@selected
    //getByRole('combobox').selectOption('1')

    await page
        .locator('#dropdown')
        .selectOption({ label: 'Option 1' });

    // await expect(page
    //     .locator('#dropdown'))
    //     .toHaveValue('1');

    await expect(page
        .locator('#dropdown option:checked'))
        .toHaveText('Option 1');


    await expect(page
        .locator('xpath=//*[@id="dropdown"]/option[@selected]'))
        .toHaveText('Option 1');

});

test("Select multiple options in dropdown", async ({ page }) => {

    await page.goto("https://output.jsbin.com/osebed/2")

    await page
        .locator('#fruits')
        .selectOption(['Banana', 'Grape'])
    //.selectOption([{label: 'Banana'}, {label: 'Orange'}])

    const listFruits = page.locator('#fruits option:checked')
    await expect(listFruits)
        .toHaveText(['Banana', 'Grape'])


    await page
        .locator('#fruits')
        .selectOption([])

    await expect(listFruits)
        .toHaveText([])
});

