// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-007

import { expect, test } from '../../../src/fixtures/ui';
import { appRedirectCases } from '../../../src/data/public-site';

test.describe('1.7 App download link resolves', () => {
  test('App download link resolves for iOS and Android', async ({ homePage, linkChecker }) => {
    await test.step('Open the public English home page', async () => {
      await homePage.open();
    });

    const downloadLink = homePage.downloadAppLink();

    await test.step('Locate the app download link inside the hero section', async () => {
      await expect(downloadLink).toBeVisible();
      await expect(downloadLink).toHaveAttribute('href', /^https:\/\/mbio\.go\.link\//);
    });

    const href = await downloadLink.getAttribute('href');
    expect(href).not.toBeNull();

    for (const redirectCase of appRedirectCases) {
      await test.step(`Verify the ${redirectCase.platform} store redirect`, async () => {
        const result = await linkChecker.check(String(href), {
          maxRedirects: 0,
          userAgent: redirectCase.userAgent,
        });

        expect(result.status).toBeGreaterThanOrEqual(300);
        expect(result.status).toBeLessThan(400);
        expect(result.location).toMatch(redirectCase.location);
      });
    }
  });
});
