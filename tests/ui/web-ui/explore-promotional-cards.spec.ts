// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-015

import { expect, test } from '../../../src/fixtures/ui';
import {
  exploreLinkedPromotionalCards,
  explorePromotionalCards,
} from '../../../src/data/public-site';

test.describe('1.15 Explore promotional cards render', () => {
  test('Explore promotional cards render', async ({ explorePage }) => {
    await test.step('Open the public Explore page', async () => {
      await explorePage.open();
    });

    await test.step('Confirm promotional cards and signed-out destinations', async () => {
      for (const imageName of explorePromotionalCards) {
        await expect(explorePage.promotionalCardImage(imageName)).toBeVisible();
      }
      for (const card of exploreLinkedPromotionalCards) {
        await expect(explorePage.promotionalCardLink(card.imageName)).toHaveAttribute(
          'href',
          card.href,
        );
      }
    });
  });
});
