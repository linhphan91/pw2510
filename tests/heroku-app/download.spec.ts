import { test, expect } from '@playwright/test';


test('Download a file', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/download')

    //await page.getByRole('link', { name: 'file_upload.txt' }).click();

    //Download a file  
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('link', { name: 'sample.pdf' }).click()
    ])
    //Verify that the file was downloaded successfully
    // const path = await download.path()
    // console.log(path)
    // console.log(`Downloaded file path: ${path}`)
    // console.log(__dirname)

    await download.saveAs('tests/heroku-app/FileUpload/' + download.suggestedFilename());
    //expect(path).not.toBeNull()
    expect(download.suggestedFilename()).toBe('sample.pdf')

});