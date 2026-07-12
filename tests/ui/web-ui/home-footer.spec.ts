// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-013

import { expect, test } from '../../../src/fixtures/ui';
import { footerNavigationGroups } from '../../../src/data/public-site';

test.describe('1.13 Home footer renders required navigation', () => {
  test('Home footer renders required navigation', async ({ footer, homePage }) => {
    await test.step('Open the public English home page', async () => {
      await homePage.open();
    });

    await test.step('Inspect footer policy groups and destinations', async () => {
      await expect(footer.navigation).toBeVisible();
      for (const group of footerNavigationGroups) {
        await expect(footer.groupHeading(group)).toBeVisible();
      }
    });
  });
});
