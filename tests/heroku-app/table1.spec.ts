import { test, expect } from '@playwright/test';
var table1Data: { lastName: string; firstName: string; due: string }[] = [];

test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/tables")

    const table1 = await page.locator('#table1');


    const rows = await table1.locator('tbody tr').all() //lấy các row trong table

    for (const row of rows) {
        const cells = await row.locator('td').all(); //các ô(cell) trong 1 row
        const lastName = await cells[0].innerText(); //lấy text trong cell thứ 0
        const firstName = await cells[1].innerText();
        const due = (await cells[3].innerText()).replace('$', '');

        console.log(`Last Name: ${lastName}, First Name: ${firstName}, due: ${due}`)

        table1Data.push({ "lastName": lastName, "firstName": firstName, "due": due })

    }

    console.log(table1Data)
})
test('Find max Due in a table', () => {

    //find item has max due
    const maxDue = table1Data
        .reduce((prev, current) => (parseFloat(prev.due) > parseFloat(current.due)) ? prev : current)
        .due;

    const maxDueItem = table1Data
        .filter(item => item.due === maxDue)
        .map(item => item.firstName + ' ' + item.lastName);

    expect(maxDueItem).toEqual(['Jason Doe']);

});

test('Find the min Due in a table', () => {

    //find item has min due
    const minDue = table1Data
        .reduce((prev, current) => (parseFloat(prev.due) < parseFloat(current.due)) ? prev : current)
        .due;

    const minDueItem = table1Data
        .filter(item => item.due === minDue)
        .map(item => item.firstName + ' ' + item.lastName);


    expect(minDueItem).toEqual(['John Smith', 'Tim Conway'])
});
