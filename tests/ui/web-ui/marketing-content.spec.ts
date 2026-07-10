// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-006

import { expect, test } from '../../../src/fixtures/ui';

test.describe('1.6 Marketing hero and banners render', () => {
  test('Marketing hero and banners render', async ({ publicSite }) => {
    await test.step('Open the public English home page', async () => {
      await publicSite.openHome();
    });

    await test.step('Inspect the hero and promotional banner region', async () => {
      await expect(publicSite.heading('Crypto for everyone')).toBeVisible();
      await expect(publicSite.heading('Smarter ways to trade and grow')).toBeVisible();
    });

    await test.step('Confirm expected headings and calls to action render', async () => {
      await expect(publicSite.ctaLink(/Get Started|Start Trading|Sign up|Explore/i)).toBeVisible();
      await expect(publicSite.navLink('Sign up')).toHaveAttribute('href', /trade\.mb\.io/);
    });
  });
});
