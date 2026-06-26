import type { Page, Locator } from '@playwright/test';
import type { TableContent } from '../fixtures/tableType';

export class TablePage{
    table1Content: TableContent= [];
 
    constructor(public page: Page){
        this.page = page;
    }

    async goto(){
        await this.page.goto('https://the-internet.herokuapp.com/tables');
        const rows = await this.page
            .locator('#table1 tbody tr')
            .all();

        for (const row of rows) {
            const cells = await row.locator('td').all();
            const lastName = await cells[0].innerText();
            const firstName = await cells[1].innerText();
            const due = (await cells[3].innerText()).replace('$', '');
            this.table1Content.push({ "lastName": lastName, "firstName": firstName, "due": due });
        }
    }
    async getTable1() {
        return this.table1Content;
    }

    getMaxDuePersonOfTable1(): string[] {
        const maxDue = this.table1Content
            .reduce((prev, current) => (parseFloat(prev.due) > parseFloat(current.due)) ? prev : current).due;

        const maxDueItem = this.table1Content
            .filter(item => item.due === maxDue)
            .map(item => item.firstName + ' ' + item.lastName);

        return maxDueItem;
    }

    getMinDuePersonOfTable1(): string[] {
        const minDue = this.table1Content
            .reduce((prev, current) => (parseFloat(prev.due) < parseFloat(current.due)) ? prev : current)
            .due;

        const minDueItem = this.table1Content
            .filter(item => item.due === minDue)
            .map(item => item.firstName + ' ' + item.lastName);

        return minDueItem;
    }

}