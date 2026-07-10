// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-002

import { expect, test } from '../../../src/fixtures/ui';
import { accountNavigationItems, mainNavigationItems } from '../../../src/data/public-site';

test.describe('1.2 Public navigation links resolve correctly', () => {
  test('Public navigation links point to the correct destinations', async ({
    header,
    homePage,
  }) => {
    await test.step('Open the public English home page', async () => {
      await homePage.open();
    });

    for (const item of mainNavigationItems) {
      await test.step(`Check the rendered ${item.name} link`, async () => {
        await expect(header.desktopNavigationLink(item.name)).toHaveAttribute('href', item.href);
      });
    }

    for (const item of accountNavigationItems) {
      await test.step(`Check the rendered ${item.name} link`, async () => {
        await expect(header.desktopAccountLink(item.name)).toHaveAttribute('href', item.href);
      });
    }
  });

  test('@api Public navigation destinations resolve', async ({ linkChecker }) => {
    for (const item of [...mainNavigationItems, ...accountNavigationItems]) {
      await test.step(`Request the ${item.name} destination`, async () => {
        const result = await linkChecker.check(item.requestUrl, { maxRedirects: 5 });

        expect(result.status, `${item.name} returned ${result.status}`).toBeLessThan(400);
        expect(result.finalUrl).toMatch(item.finalUrl);
      });
    }
  });
});
