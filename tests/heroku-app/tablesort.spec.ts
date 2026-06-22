import { test, expect } from '@playwright/test';

test.describe('Sort column from a-z', async () => {
    var table1Data: { lastName: string; firstName: string }[] = [];



    test.beforeEach(async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/tables');

        var table1 = await page.locator('#table1')
        const rows = await table1.locator('tbody tr').all()

        for (const row of rows) {
            const cells = await row.locator('td').all()
            const lastName = await cells[0].innerText()
            const firstName = await cells[1].innerText()
            //const due = await cells[3].innerText()

            console.log([{ lastName: lastName, firstName: firstName }])
            table1Data.push({ lastName: lastName, firstName: firstName });
        }

    });

    test('Sort last Name from a-z', async ({ page }) => {

        await page.locator('#table1').locator('thead tr th').first().click();
        const sortedTable = table1Data.sort((a, b) => a.lastName.localeCompare(b.lastName));


        await expect(sortedTable)
            .toEqual
            ([{
                lastName: "Bach",
                firstName: "Frank",

            },
            {
                lastName: "Conway",
                firstName: "Tim",

            },
            {
                lastName: "Doe",
                firstName: "Jason",

            },
            {
                lastName: "Smith",
                firstName: "John",

            }
            ])



    });


});