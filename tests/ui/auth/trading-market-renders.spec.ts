// spec: specs/trading.md
// plan-id: TRADEMB-TRADING-001

import { expect, test } from '../../../src/fixtures/auth-ui';

test.describe('1.1 Authenticated market table renders', () => {
  test('signed-in customers can see populated market data', async ({ tradingHomePage }) => {
    await test.step('Open the authenticated trading portal', async () => {
      await tradingHomePage.open();
      await expect(tradingHomePage.walletButton()).toBeVisible();
      await expect(tradingHomePage.marketHeading).toBeVisible();
    });

    await test.step('Inspect the market table headers', async () => {
      await expect(tradingHomePage.marketTable).toBeVisible();
      await expect(tradingHomePage.columnHeader('Asset')).toHaveCount(1);
      await expect(tradingHomePage.columnHeader('Price')).toHaveCount(1);
      await expect(tradingHomePage.columnHeader('24h Change')).toHaveCount(2);
      await expect(tradingHomePage.columnHeader('High')).toHaveCount(1);
      await expect(tradingHomePage.columnHeader('Low')).toHaveCount(1);
    });

    await test.step('Confirm Hot contains market entries', async () => {
      await tradingHomePage.category('Hot').click();
      await expect.poll(() => tradingHomePage.marketRows.count()).toBeGreaterThan(0);
    });
  });
});
