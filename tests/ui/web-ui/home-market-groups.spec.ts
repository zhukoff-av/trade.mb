// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-005

import { expect, test } from '../../../src/fixtures/ui';
import { expectedMarketHeadings } from '../../../src/data/public-site';

test.describe('1.5 Home market groups render', () => {
  test('Home market groups render', async ({ publicSite }) => {
    await test.step('Open the public English home page', async () => {
      await publicSite.openHome();
    });

    await test.step('Inspect the market discovery sections', async () => {
      await expect(publicSite.text(expectedMarketHeadings.topGainers)).toBeVisible();
    });

    await test.step('Confirm the expected grouped market headings render', async () => {
      await expect(publicSite.text(expectedMarketHeadings.trendingNow)).toBeVisible();
      await expect(publicSite.text(expectedMarketHeadings.topLosers)).toBeVisible();
    });
  });
});
