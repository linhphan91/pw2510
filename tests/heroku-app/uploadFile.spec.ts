import { test, expect } from '@playwright/test';


test('Upload a file', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload')

    const filePath = 'tests/heroku-app/FileUpload/AI_Testing_Pilot_Metrics.xlsx'

    await page.locator('#file-upload').setInputFiles(filePath);
    await page.locator('#file-submit').click();

    await expect(page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible();
    await expect(page.locator('#uploaded-files')).toHaveText('AI_Testing_Pilot_Metrics.xlsx');

});


test('Upload multiple files', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload')
//Do page ko cho upload multiple files at a time -> upload từng file

    const filePath = ['tests/heroku-app/FileUpload/AI_Testing_Pilot_Metrics.xlsx',
                        'tests/heroku-app/FileUpload/ISTQB Gen AI_Chapter 2.png']
    await page.locator('#file-upload').setInputFiles(filePath[0]);
    await page.locator('#file-submit').click();

    await expect(page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible();
    await expect(page.locator('#uploaded-files')).toHaveText('AI_Testing_Pilot_Metrics.xlsx');

    // await page.locator('#file-upload').setInputFiles(filePath[1]);
    // await page.locator('#file-submit').click();

    // await expect(page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible();
    // await expect(page.locator('#uploaded-files')).toHaveText('ISTQB Gen AI_Chapter 2.png');

});