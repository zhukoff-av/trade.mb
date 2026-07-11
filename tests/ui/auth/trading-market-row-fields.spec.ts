// spec: specs/trading.md
// plan-id: TRADEMB-TRADING-003

import { expect, test } from '../../../src/fixtures/auth-ui';
import { parseDisplayedNumber } from '../../../src/utils/market-value';

test.describe('1.3 Market entries contain expected data fields', () => {
  test('Hot market rows contain complete comparable data', async ({ tradingHomePage }) => {
    await test.step('Open populated Hot market data', async () => {
      await tradingHomePage.open();
      await expect(tradingHomePage.marketHeading).toBeVisible();
      await tradingHomePage.category('Hot').click();
      await expect.poll(() => tradingHomePage.marketRows.count()).toBeGreaterThan(0);
    });

    await test.step('Inspect every rendered market row', async () => {
      for (const row of await tradingHomePage.marketRows.all()) {
        const cells = tradingHomePage.cells(row);
        await expect(cells).toHaveCount(6);

        const asset = cells.nth(0);
        const price = cells.nth(1);
        const change = cells.nth(2);
        const high = cells.nth(3);
        const low = cells.nth(4);
        const chart = cells.nth(5);

        await expect(asset).toHaveText(/\S/);
        await expect(asset.getByRole('img')).toBeVisible();
        await expect(price).toHaveText(/^[\d,.]+\s\$$/);
        await expect(change).toHaveText(/^-?\d+(?:\.\d+)?%$/);
        await expect(high).toHaveText(/^[\d,.]+\s\$$/);
        await expect(low).toHaveText(/^[\d,.]+\s\$$/);
        await expect(tradingHomePage.chartOrFallback(chart)).toBeVisible();

        const highValue = parseDisplayedNumber(await high.innerText());
        const lowValue = parseDisplayedNumber(await low.innerText());
        expect(highValue).toBeGreaterThanOrEqual(lowValue);
      }
    });
  });
});
