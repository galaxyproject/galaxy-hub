import { Page } from '@playwright/test';

export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
}

export async function getFirstVisible(page: Page, selector: string) {
  const elements = await page.locator(selector).all();
  for (const element of elements) {
    if (await element.isVisible()) {
      return element;
    }
  }
  return null;
}