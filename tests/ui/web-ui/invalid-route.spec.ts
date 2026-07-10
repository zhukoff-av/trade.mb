// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-009

import { expect, test } from '../../../src/fixtures/ui';

test.describe('1.9 Invalid public route has stable not-found handling', () => {
  test('Invalid public route has stable not-found handling', async ({ homePage }) => {
    let responseStatus: number | undefined;

    await test.step('Open an intentionally invalid public route', async () => {
      const response = await homePage.openInvalidRoute();
      expect(response).not.toBeNull();
      responseStatus = response?.status();
    });

    await test.step('Inspect the page response and visible error content', async () => {
      expect(responseStatus).toBe(404);
      await expect(homePage.body).toContainText(/404|not found|does not exist/i);
    });

    await test.step('Confirm the app handles the route consistently', async () => {
      expect(homePage.currentUrl()).toMatch(/\/en(?:-[A-Z]{2})?\/this-route-should-not-exist\/?$/);
      expect(new URL(homePage.currentUrl()).hostname).not.toBe('trade.mb.io');
    });
  });
});
