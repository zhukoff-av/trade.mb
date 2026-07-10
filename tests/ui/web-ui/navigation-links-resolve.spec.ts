// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-002

import { expect, test } from '../../../src/fixtures/ui';
import { publicNavItems } from '../../../src/data/public-site';

test.describe('1.2 Public navigation links resolve correctly', () => {
  test('Public navigation links resolve correctly', async ({ linkChecker, publicSite }) => {
    await test.step('Open the public English home page', async () => {
      await publicSite.openHome();
    });

    await test.step('Read each expected desktop navigation destination', async () => {
      await expect(publicSite.navLink(publicNavItems.explore.name)).toHaveAttribute(
        'href',
        /\/en(?:-[A-Z]{2})?\/explore$/,
      );
      await expect(publicSite.navLink(publicNavItems.features.name)).toHaveAttribute(
        'href',
        /\/en(?:-[A-Z]{2})?\/features$/,
      );
      await expect(publicSite.navLink(publicNavItems.company.name)).toHaveAttribute(
        'href',
        /\/en(?:-[A-Z]{2})?\/company$/,
      );
    });

    await test.step('Check that public links resolve successfully and gated links point to trade.mb.io', async () => {
      await expect.poll(() => linkChecker.statusFor(publicNavItems.explore.path)).toBeLessThan(400);
      await expect.poll(() => linkChecker.statusFor(publicNavItems.features.path)).toBeLessThan(400);
      await expect.poll(() => linkChecker.statusFor(publicNavItems.company.path)).toBeLessThan(400);
      await expect(publicSite.navLink(publicNavItems.signIn.name)).toHaveAttribute(
        'href',
        /trade\.mb\.io/,
      );
      await expect(publicSite.navLink(publicNavItems.signUp.name)).toHaveAttribute(
        'href',
        /trade\.mb\.io/,
      );
    });
  });
});
