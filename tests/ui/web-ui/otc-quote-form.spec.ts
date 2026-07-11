// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-018

import { expect, test } from '../../../src/fixtures/ui';
import { otcContent } from '../../../src/data/public-site';

test.describe('1.18 OTC quote form renders safely', () => {
  test('OTC quote form renders safely for signed-out visitors', async ({ otcDeskPage }) => {
    await test.step('Open the public OTC Desk page', async () => {
      await otcDeskPage.open();
    });

    await test.step('Confirm the hero and required quote controls', async () => {
      await expect(otcDeskPage.heading(otcContent.heroHeading)).toBeVisible();
      await expect(otcDeskPage.quoteSection).toBeVisible();
      for (const placeholder of otcContent.inputPlaceholders) {
        await expect(otcDeskPage.quoteInput(placeholder)).toBeVisible();
      }
      await expect(otcDeskPage.quoteSelectors()).toHaveCount(3);
    });

    await test.step('Confirm the empty form cannot advance or submit', async () => {
      await expect(otcDeskPage.nextButton()).toBeDisabled();
    });
  });
});
