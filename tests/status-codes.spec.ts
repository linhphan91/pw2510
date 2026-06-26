import { test, expect } from '@playwright/test';

test('Status codes navigation sequence', async ({ page }) => {
  await test.step('Open status codes page', async () => {
    await page.goto('https://the-internet.herokuapp.com/status_codes');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes');
  });

  await test.step('Navigate to 200 status code and verify page', async () => {
    await page.getByRole('link', { name: '200' }).click();
    await expect(page.getByRole('heading', { level: 3 })).toContainText('200');
    await expect(page.locator('body')).toContainText('This page returned a 200 status code.');
  });

  await test.step('Return from 200 status code page', async () => {
    await page.getByRole('link', { name: 'go here' }).click();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes');
  });

  await test.step('Navigate to 301 status code and verify page', async () => {
    await page.getByRole('link', { name: '301' }).click();
    await expect(page.getByRole('heading', { level: 3 })).toContainText('301');
    await expect(page.locator('body')).toContainText('This page returned a 301 status code.');
  });

  await test.step('Return from 301 status code page', async () => {
    await page.getByRole('link', { name: 'go here' }).click();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes');
  });

  await test.step('Navigate to 404 status code and verify page', async () => {
    await page.getByRole('link', { name: '404' }).click();
    await expect(page.getByRole('heading', { level: 3 })).toContainText('404');
    await expect(page.locator('body')).toContainText('This page returned a 404 status code.');
  });

  await test.step('Return from 404 status code page', async () => {
    await page.getByRole('link', { name: 'go here' }).click();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes');
  });

  await test.step('Navigate to 500 status code and verify page', async () => {
    await page.getByRole('link', { name: '500' }).click();
    await expect(page.getByRole('heading', { level: 3 })).toContainText('500');
    await expect(page.locator('body')).toContainText('This page returned a 500 status code.');
  });

  await test.step('Return from 500 status code page', async () => {
    await page.getByRole('link', { name: 'go here' }).click();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/status_codes');
  });
});
