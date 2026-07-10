// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-002

import { expect, test } from '../../../src/fixtures/ui';
import { accountNavigationItems, mainNavigationItems } from '../../../src/data/public-site';

test.describe('1.2 Public navigation links resolve correctly', () => {
  test('Public navigation links resolve correctly', async ({ header, homePage, linkChecker }) => {
    await test.step('Open the public English home page', async () => {
      await homePage.open();
    });

    for (const item of mainNavigationItems) {
      await test.step(`Validate ${item.name} destination`, async () => {
        const link = header.desktopNavigationLink(item.name);
        await expect(link).toHaveAttribute('href', item.href);

        const href = await link.getAttribute('href');
        expect(href).not.toBeNull();
        const result = await linkChecker.check(String(href), { maxRedirects: 5 });

        expect(result.status, `${item.name} returned ${result.status}`).toBeLessThan(400);
        expect(result.finalUrl).toMatch(item.finalUrl);
      });
    }

    for (const item of accountNavigationItems) {
      await test.step(`Validate ${item.name} destination`, async () => {
        const link = header.desktopAccountLink(item.name);
        await expect(link).toHaveAttribute('href', item.href);

        const href = await link.getAttribute('href');
        expect(href).not.toBeNull();
        const result = await linkChecker.check(String(href), { maxRedirects: 5 });

        expect(result.status, `${item.name} returned ${result.status}`).toBeLessThan(400);
        expect(result.finalUrl).toMatch(item.finalUrl);
      });
    }
  });
});
