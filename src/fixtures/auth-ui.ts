import { expect, test as base } from '@playwright/test';
import { TradingHomePage } from '../pages/trading-home.page';

type AuthUiFixtures = {
  tradingHomePage: TradingHomePage;
};

export const test = base.extend<AuthUiFixtures>({
  tradingHomePage: async ({ page }, use) => {
    await use(new TradingHomePage(page));
  },
});

export { expect };
