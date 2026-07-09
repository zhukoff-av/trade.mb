import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page';

type UiFixtures = {
  homePage: HomePage;
};

export const test = base.extend<UiFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect } from '@playwright/test';
