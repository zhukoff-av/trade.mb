// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-003

import { expect, test } from '../../../src/fixtures/ui';
import { desktopViewports, horizontalOverflowTolerancePx } from '../../../src/data/public-site';

test.describe('1.3 Desktop home layout is stable', () => {
  for (const viewport of desktopViewports) {
    test(`Desktop home layout is stable at ${viewport.name}`, async ({
      header,
      homePage,
      page,
    }) => {
      await test.step('Open the public English home page at a desktop viewport', async () => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await homePage.open();
      });

      await test.step('Inspect the header and hero region', async () => {
        await expect(header.mainNavigation).toBeVisible();
        await expect(homePage.heroSection).toBeVisible();
        await expect(homePage.heroHeading()).toBeVisible();
      });

      await test.step('Confirm primary content is visible without horizontal overflow', async () => {
        await expect(homePage.downloadAppLink()).toBeVisible();
        await expect(homePage.openAccountLink()).toBeVisible();
        await expect
          .poll(() => homePage.documentWidth())
          .toBeLessThanOrEqual((await homePage.viewportWidth()) + horizontalOverflowTolerancePx);
      });
    });
  }
});
