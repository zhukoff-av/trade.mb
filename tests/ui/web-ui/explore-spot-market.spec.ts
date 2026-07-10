// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-004

import { expect, test } from '../../../src/fixtures/ui';

test.describe('1.4 Explore page renders spot market content', () => {
  test('Explore page renders spot market content', async ({ explorePage }) => {
    await test.step('Open the public Explore page', async () => {
      await explorePage.open();
    });

    await test.step('Inspect the market discovery content', async () => {
      await expect(explorePage.heroHeading()).toBeVisible();
      await expect(explorePage.spotMarketHeading()).toBeVisible();
    });

    await test.step('Confirm stable market labels and asset content are present', async () => {
      await expect(explorePage.spotMarketSection).toContainText('Bitcoin');
      await expect(explorePage.spotMarketSection).toContainText("Today's top crypto prices");
    });
  });
});
