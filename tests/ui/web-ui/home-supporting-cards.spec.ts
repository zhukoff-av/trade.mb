// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-012

import { expect, test } from '../../../src/fixtures/ui';
import { homeSupportingCards } from '../../../src/data/public-site';

test.describe('1.12 Home supporting cards render', () => {
  test('Home supporting cards render', async ({ homePage }) => {
    await test.step('Open the public English home page', async () => {
      await homePage.open();
    });

    await test.step('Confirm the funding and platform-benefit cards', async () => {
      for (const cardName of homeSupportingCards) {
        await expect(homePage.supportingCard(cardName)).toBeVisible();
      }
    });
  });
});
