// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-004

import { expect, test } from '../../../src/fixtures/ui';

test.describe('1.4 Explore page renders spot market content', () => {
  test('Explore page renders spot market content', async ({ publicSite }) => {
    await test.step('Open the public Explore page', async () => {
      await publicSite.openExplore();
    });

    await test.step('Inspect the market discovery content', async () => {
      await expect(publicSite.heading('Markets at your fingertips')).toBeVisible();
      await expect(publicSite.heading('Spot market')).toBeVisible();
    });

    await test.step('Confirm spot market labels and asset content are present', async () => {
      await expect(publicSite.text(/BTC|Bitcoin|ETH|Ethereum|USDT/i)).toBeVisible();
      await expect(publicSite.text(/Price|Change|Volume|Market Cap/i)).toBeVisible();
    });
  });
});
