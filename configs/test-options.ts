import { test as base } from '@playwright/test';
import { PageManager } from '../page/page.manager';

type TestFixtures = {
  pageManager: PageManager;
};

export const test = base.extend<TestFixtures>({
  pageManager: async ({ page, baseURL }, use) => {
    const pm = new PageManager(page);
    await pm.onHomePage().navigate(`${baseURL}`);
    await pm.onHomePage().acceptCookie();
    await use(pm);
    await page.close();
  },
});
