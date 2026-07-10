// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-006

import { expect, test } from '../../../src/fixtures/ui';
import { marketingContent } from '../../../src/data/public-site';

test.describe('1.6 Marketing hero and banners render', () => {
  test('Marketing banners render in their expected sections', async ({ homePage }) => {
    await test.step('Open the public English home page', async () => {
      await homePage.open();
    });

    await test.step('Inspect the Khabib promotional banner region', async () => {
      await expect(homePage.khabibPromotionSection).toBeVisible();
      await expect(
        homePage.khabibPromotionSection.getByRole('heading', {
          name: marketingContent.khabib.heading,
          exact: true,
        }),
      ).toBeVisible();
      await expect(homePage.khabibPromotionSection).toContainText(marketingContent.khabib.body);
    });

    await test.step('Confirm smart-trading content and its call to action render together', async () => {
      await expect(homePage.smartWaysSection).toBeVisible();
      for (const section of marketingContent.smartWays.sections) {
        await expect(
          homePage.smartWaysSection.getByRole('heading', { name: section.heading, exact: true }),
        ).toBeVisible();
        await expect(homePage.smartWaysSection).toContainText(section.body);
      }
      await expect(homePage.viewPlatformFeaturesLink()).toBeVisible();
    });
  });
});
