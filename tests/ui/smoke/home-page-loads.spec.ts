// spec: specs/smoke.md
// plan-id: TRADEMB-SMOKE-001

import { expect, test } from '../../../src/fixtures/ui.fixtures';

test.describe('Application availability', () => {
  test('Home page loads', async ({ homePage, page }) => {
    await test.step('Navigate to the home page', async () => {
      await homePage.goto();
    });

    await test.step('The page renders with a document title', async () => {
      await expect(page).toHaveTitle(/\S/);
    });
  });
});
