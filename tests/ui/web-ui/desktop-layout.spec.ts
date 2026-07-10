// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-003

import { expect, test } from '../../../src/fixtures/ui';

test.describe('1.3 Desktop home layout is stable', () => {
  test('Desktop home layout is stable', async ({ page, publicSite }) => {
    await test.step('Open the public English home page at a desktop viewport', async () => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await publicSite.openHome();
    });

    await test.step('Inspect the header and hero region', async () => {
      await expect(publicSite.navLink('Explore')).toBeVisible();
      await expect(publicSite.heading('Crypto for everyone')).toBeVisible();
    });

    await test.step('Confirm primary content is visible without horizontal overflow', async () => {
      await expect(publicSite.ctaLink(/Get Started|Start Trading|Sign up|Explore/i)).toBeVisible();
      await expect.poll(() => publicSite.documentWidth()).toBeLessThanOrEqual(
        (await publicSite.viewportWidth()) + 8,
      );
    });
  });
});
