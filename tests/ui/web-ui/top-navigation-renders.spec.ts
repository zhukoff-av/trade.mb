// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-001

import { expect, test } from '../../../src/fixtures/ui';
import { accountNavigationItems, mainNavigationItems } from '../../../src/data/public-site';

test.describe('1.1 Public top navigation renders expected items', () => {
  test('Public top navigation renders expected items', async ({ header, homePage }) => {
    await test.step('Open the public English home page', async () => {
      await homePage.open();
    });

    await test.step('Inspect the desktop header navigation', async () => {
      await expect(header.mainNavigation).toBeVisible();
      for (const item of mainNavigationItems) {
        await expect(header.desktopNavigationLink(item.name)).toBeVisible();
      }
    });

    await test.step('Confirm the expected signed-out public navigation items are visible', async () => {
      for (const item of accountNavigationItems) {
        await expect(header.desktopAccountLink(item.name)).toBeVisible();
      }
    });
  });
});
