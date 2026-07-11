// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-007

import { expect, test } from '../../../src/fixtures/ui';
import { appDownloadUrl, appRedirectCases } from '../../../src/data/public-site';

test.describe('1.7 App download link resolves', () => {
  test('App download link renders in the hero section', async ({ homePage }) => {
    await test.step('Open the public English home page', async () => {
      await homePage.open();
    });

    const downloadLink = homePage.downloadAppLink();

    await test.step('Locate the app download link inside the hero section', async () => {
      await expect(downloadLink).toBeVisible();
      await expect(downloadLink).toHaveAttribute('href', appDownloadUrl);
    });
  });

  test('@api App download smart link resolves for iOS and Android', async ({ linkChecker }) => {
    for (const redirectCase of appRedirectCases) {
      await test.step(`Verify the ${redirectCase.platform} store redirect`, async () => {
        const result = await linkChecker.check(appDownloadUrl, {
          maxRedirects: 0,
          userAgent: redirectCase.userAgent,
        });

        expect.soft(result.status, `${redirectCase.platform} status`).toBeGreaterThanOrEqual(300);
        expect.soft(result.status, `${redirectCase.platform} status`).toBeLessThan(400);
        expect
          .soft(result.location, `${redirectCase.platform} location`)
          .toMatch(redirectCase.location);
      });
    }
  });
});
