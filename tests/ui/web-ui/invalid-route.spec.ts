// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-009

import { expect, test } from '../../../src/fixtures/ui';

test.describe('1.9 Invalid public route has stable not-found handling', () => {
  test('Invalid public route has stable not-found handling', async ({ publicSite }) => {
    let status = 0;

    await test.step('Open an intentionally invalid public route', async () => {
      const response = await publicSite.openInvalidRoute();
      status = response?.status() ?? 0;
    });

    await test.step('Inspect the page response and visible error content', async () => {
      expect(status).toBeLessThan(500);
      await expect(publicSite.text(/404|not found|page not found|does not exist/i)).toBeVisible();
    });

    await test.step('Confirm the app handles the route consistently', async () => {
      expect(publicSite.currentUrl()).not.toContain('trade.mb.io');
    });
  });
});
