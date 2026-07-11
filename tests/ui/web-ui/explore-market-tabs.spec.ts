// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-016

import { expect, test } from '../../../src/fixtures/ui';
import { exploreMarketTabs } from '../../../src/data/public-site';

test.describe('1.16 Explore market tabs render complete token rows', () => {
  test('Explore market tabs render complete token rows', async ({ explorePage }) => {
    await test.step('Open the public Explore page', async () => {
      await explorePage.open();
      await expect(explorePage.marketTable).toBeVisible();
    });

    for (const tabName of exploreMarketTabs) {
      await test.step(`Inspect ${tabName} token rows`, async () => {
        const tab = explorePage.marketTab(tabName);
        await expect(tab).toBeVisible();
        await expect(tab).toBeEnabled();
        await tab.click();

        const marketRows = explorePage.marketTokenRows();
        await expect.poll(() => marketRows.count()).toBeGreaterThan(0);

        for (const row of await marketRows.all()) {
          const cells = explorePage.rowCells(row);
          await expect(cells).toHaveCount(4);

          const assetCell = cells.nth(0);
          const priceCell = cells.nth(1);
          const percentageCell = cells.nth(2);
          const chartCell = cells.nth(3);

          await expect(assetCell.getByRole('link')).toHaveAttribute(
            'href',
            /^\/explore\/[A-Z0-9]+$/,
          );
          await expect(assetCell.getByRole('img')).toBeVisible();
          await expect(priceCell).toHaveText(/^\$[\d,]+(?:\.\d+)?$/);
          await expect(percentageCell).toHaveText(/^-?\d+(?:\.\d+)?%$/);

          const chartOrFallback = chartCell
            .getByRole('region')
            .or(chartCell.getByText('No Data Found', { exact: true }));
          await expect(chartOrFallback).toBeVisible();
        }
      });
    }
  });
});
