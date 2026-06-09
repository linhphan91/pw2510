import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByTestId('text-input').click();
  await page.getByTestId('text-input').fill('apple');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('milk');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('banana');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('meat');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').click();
  await page.getByTestId('text-input').fill('cocacola');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('cocacola');
 
  await expect(page.getByText('apple')).toBeVisible();
  await expect(page.getByText('banana')).toBeVisible();
  await expect(page.getByText('milk')).toBeVisible();
  await expect(page.getByText('meat')).toBeVisible();
  await expect(page.getByText('cocacola')).toBeVisible();
});