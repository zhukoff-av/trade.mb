// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-010

import { expect, test } from '../../../src/fixtures/ui';

test.describe('1.10 Mobile navigation is usable', () => {
  test('Mobile navigation is usable', async ({ page, publicSite }) => {
    await test.step('Open the public English home page at a mobile viewport', async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await publicSite.openHome();
    });

    await test.step('Open the mobile menu', async () => {
      await expect(publicSite.mobileMenuButton()).toBeVisible();
      await publicSite.mobileMenuButton().click();
    });

    await test.step('Confirm public navigation options are usable without horizontal overflow', async () => {
      await expect(publicSite.navLink('Home')).toBeVisible();
      await expect(publicSite.navLink('Sign up')).toBeVisible();
      await expect.poll(() => publicSite.documentWidth()).toBeLessThanOrEqual(
        (await publicSite.viewportWidth()) + 8,
      );
    });
  });
});
