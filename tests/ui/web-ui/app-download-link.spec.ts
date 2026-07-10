// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-007

import { expect, test } from '../../../src/fixtures/ui';

test.describe('1.7 App download link resolves', () => {
  test('App download link resolves', async ({ linkChecker, publicSite }) => {
    await test.step('Open the public English home page', async () => {
      await publicSite.openHome();
    });

    await test.step('Locate the app download link exposed to signed-out users', async () => {
      await expect(publicSite.ctaLink(/App|Download|iOS|Android|Google Play|App Store/i)).toBeVisible();
    });

    await test.step('Verify the destination resolves without a broken response', async () => {
      const href = await publicSite
        .ctaLink(/App|Download|iOS|Android|Google Play|App Store/i)
        .getAttribute('href');

      expect(href).toMatch(/^https?:\/\//);
      await expect.poll(() => linkChecker.statusFor(String(href))).toBeLessThan(400);
    });
  });
});
