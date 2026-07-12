// spec: specs/trading.md
// plan-id: TRADEMB-TRADING-002

import { expect, test } from '../../../src/fixtures/auth-ui';
import {
  marketAssetsFollowChangeOrder,
  marketChangesByAsset,
} from '../../../src/utils/market-data';

test.describe('1.2 Market categories group entries correctly', () => {
  test('category controls display entries with matching change direction', async ({
    page,
    tradingHomePage,
  }) => {
    const pricesResponse = page.waitForResponse((response) =>
      response.url().includes('/marketdata/prices?quote=USD'),
    );

    await test.step('Open the authenticated market table', async () => {
      await tradingHomePage.open();
      await expect(tradingHomePage.marketHeading).toBeVisible();
    });

    const changeByAsset = marketChangesByAsset(await (await pricesResponse).json());

    await test.step('Inspect the personalized Watchlist outcome', async () => {
      await tradingHomePage.category('Watchlist').click();
      await expect(tradingHomePage.watchlistOutcome()).toBeVisible();
    });

    await test.step('Confirm Hot contains market entries', async () => {
      await tradingHomePage.category('Hot').click();
      await expect.poll(() => tradingHomePage.marketRows.count()).toBeGreaterThan(0);
    });

    await test.step('Confirm Gainers orders changes from highest to lowest', async () => {
      await tradingHomePage.category('Gainers').click();
      await expect
        .poll(async () => {
          const symbols = await tradingHomePage.assetSymbols();
          return marketAssetsFollowChangeOrder(symbols, changeByAsset, 'descending');
        })
        .toBe(true);
    });

    await test.step('Confirm Losers orders changes from lowest to highest', async () => {
      await tradingHomePage.category('Losers').click();
      await expect
        .poll(async () => {
          const symbols = await tradingHomePage.assetSymbols();
          return marketAssetsFollowChangeOrder(symbols, changeByAsset, 'ascending');
        })
        .toBe(true);
    });
  });
});
