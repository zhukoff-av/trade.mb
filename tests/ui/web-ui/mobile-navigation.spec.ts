// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-010

import { expect, test } from '../../../src/fixtures/ui';
import {
  accountNavigationItems,
  horizontalOverflowTolerancePx,
  mainNavigationItems,
} from '../../../src/data/public-site';

test.describe('1.10 Mobile navigation is usable', () => {
  test('Mobile navigation is usable', async ({ header, homePage, page }) => {
    await test.step('Open the public English home page at a mobile viewport', async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await homePage.open();
    });

    await test.step('Open the mobile menu', async () => {
      await expect(header.mobileMenuButton()).toBeVisible();
      await header.openMobileMenu();
      await expect(header.mobileMenu()).toBeVisible();
    });

    await test.step('Confirm every public navigation option is available', async () => {
      for (const item of mainNavigationItems) {
        await expect(header.mobileNavigationLink(item.name)).toBeVisible();
      }
      for (const item of accountNavigationItems) {
        await expect(header.mobileAccountLink(item.name)).toBeVisible();
      }
    });

    await test.step('Confirm the mobile viewport has no horizontal overflow', async () => {
      await expect
        .poll(() => homePage.documentWidth())
        .toBeLessThanOrEqual((await homePage.viewportWidth()) + horizontalOverflowTolerancePx);
    });
  });
});
