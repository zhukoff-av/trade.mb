// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-011

import { expect, test } from '../../../src/fixtures/ui';

test.describe('1.11 Gated trade links remain signed-out safe', () => {
  test('Gated trade links remain signed-out safe', async ({ publicSite }) => {
    await test.step('Open the public English home page', async () => {
      await publicSite.openHome();
    });

    await test.step('Inspect signed-out trading, sign-in, and sign-up destinations', async () => {
      await expect(publicSite.navLink('Sign in')).toHaveAttribute('href', /trade\.mb\.io/);
      await expect(publicSite.navLink('Sign up')).toHaveAttribute('href', /trade\.mb\.io/);
    });

    await test.step('Verify they point to trade.mb.io without filling forms or creating an account', async () => {
      await expect(publicSite.ctaLink(/Start Trading|Trade Now|Get Started|Sign up/i)).toHaveAttribute(
        'href',
        /trade\.mb\.io/,
      );
    });
  });
});
