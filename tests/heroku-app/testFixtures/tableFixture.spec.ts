import { test as baseTest, expect } from '../fixtures/heroku-fixture';

baseTest('verify max due person', async ({ tablePage }) => {
    expect(tablePage.getMaxDuePersonOfTable1()).toEqual(['Jason Doe']);
});

baseTest('verify min due person', async ({ tablePage }) => {
    expect(tablePage.getMinDuePersonOfTable1()).toEqual(['John Smith', 'Tim Conway']);
});