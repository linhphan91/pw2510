import { test, expect } from '@playwright/test';

const dataSet = [
    { age: "25", gender: "f", height: "175", weight: "45", BMI: 14.7, result: "Severe Thinness" },
    { age: "30", gender: "f", height: "160", weight: "43", BMI: 16.8, result: "Moderate Thinness" },
    { age: "35", gender: "m", height: "180", weight: "60", BMI: 18.5, result: "Mild Thinness" },
    { age: "40", gender: "f", height: "170", weight: "70", BMI: 24.2, result: "Normal" },
    { age: "45", gender: "m", height: "180", weight: "85", BMI: 26.2, result: "Overweight" },
    { age: "50", gender: "f", height: "160", weight: "85", BMI: 33.2, result: "Obese Class I" },
    { age: "55", gender: "m", height: "165", weight: "100", BMI: 36.7, result: "Obese Class II" },
    { age: "60", gender: "f", height: "158", weight: "100", BMI: 40.1, result: "Obese Class III" },
]


dataSet.forEach(({ age, gender, height, weight, BMI, result }) => {
    test(`Calculate BIM index with ${age}, ${gender}, ${height}, ${weight} then have ${result} with BMI index ${BMI}`, async ({ page }) => {

        await page.goto("https://www.calculator.net/bmi-calculator.html");

        await expect(page
            .getByRole('heading', { name: 'BMI Calculator' }))
            .toBeVisible();

        await page
            .getByRole('link', { name: 'Metric Units' })
            .click();

        await page
            .getByRole('button', { name: 'Clear' })
            .click();

        await page
            .locator('#cage')
            .fill(age);

        if (await page.locator('#csex1').isChecked()) {
            if (gender === 'female') {
                await page.getByText('Female').click();
            }
        }

        await page
            .locator('#cheightmeter')
            .fill(height);

        await page
            .locator('#ckg')
            .fill(weight);

        await page
            .getByRole('button', { name: 'Calculate' })
            .click();

        await expect(page
            .getByText(`BMI = ${BMI} kg/m2`))
            .toBeVisible();

        await expect(page
            //.locator('font').getByText(result))
            .locator('font').getByText(`${result}`))
            .toBeVisible();

    })
});