// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-001

import { expect, test } from '../../../src/fixtures/ui';

test.describe('1.1 Public top navigation renders expected items', () => {
  test('Public top navigation renders expected items', async ({ publicSite }) => {
    await test.step('Open the public English home page', async () => {
      await publicSite.openHome();
    });

    await test.step('Inspect the desktop header navigation', async () => {
      await expect(publicSite.navLink('Explore')).toBeVisible();
      await expect(publicSite.navLink('Features')).toBeVisible();
      await expect(publicSite.navLink('OTC Desk')).toBeVisible();
      await expect(publicSite.navLink('Company')).toBeVisible();
    });

    await test.step('Confirm the expected signed-out public navigation items are visible', async () => {
      await expect(publicSite.navLink('Support')).toBeVisible();
      await expect(publicSite.navLink('$MBG')).toBeVisible();
      await expect(publicSite.navLink('Sign in')).toBeVisible();
      await expect(publicSite.navLink('Sign up')).toBeVisible();
    });
  });
});
