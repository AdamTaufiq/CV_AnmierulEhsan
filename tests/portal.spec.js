import { test, expect } from '@playwright/test';

test('loads the professional profile', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Adam Ehsan | Professional Portal');
  await expect(page.getByText('Building reliable', { exact: false })).toBeVisible();
  await expect(page.getByText('Microsoft Azure', { exact: true })).toBeVisible();
});

test('navigates to selected projects and contact sections', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Selected Projects' }).click();
  await expect(page.getByText('Cloud Application Support Portal', { exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Contact Me', exact: true }).first().click();
  await expect(page.getByLabel('Your name')).toBeVisible();
});
