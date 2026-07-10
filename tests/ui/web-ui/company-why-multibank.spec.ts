// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-008

import { expect, test } from '../../../src/fixtures/ui';

test.describe('1.8 Company page renders Why MultiBank Group content', () => {
  test('Company page renders Why MultiBank Group content', async ({ publicSite }) => {
    await test.step('Open the public Company page', async () => {
      await publicSite.openCompany();
    });

    await test.step('Inspect the Why MultiBank Group content', async () => {
      await expect(publicSite.heading(/Why MultiBank Group/i)).toBeVisible();
    });

    await test.step('Confirm expected trust and leadership sections render', async () => {
      await expect(publicSite.text(/regulated|trusted|clients|leadership|Group/i)).toBeVisible();
      await expect(publicSite.text(/MultiBank/i)).toBeVisible();
    });
  });
});
