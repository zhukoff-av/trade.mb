// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-011

import { expect, test } from '../../../src/fixtures/ui';
import { gatedDestinations } from '../../../src/data/public-site';

test.describe('1.11 Gated trade links remain signed-out safe', () => {
  test('Gated trade links remain signed-out safe', async ({ header, homePage }) => {
    await test.step('Open the public English home page', async () => {
      await homePage.open();
    });

    await test.step('Inspect exact sign-in and registration destinations', async () => {
      await expect(header.desktopAccountLink('Sign in')).toHaveAttribute(
        'href',
        gatedDestinations.login,
      );
      await expect(header.desktopAccountLink('Sign up')).toHaveAttribute(
        'href',
        gatedDestinations.register,
      );
    });

    await test.step('Verify gated calls to action do not perform signed-out mutations', async () => {
      await expect(homePage.openAccountLink()).toHaveAttribute('href', gatedDestinations.register);
      await expect(homePage.startPortfolioLink()).toHaveAttribute(
        'href',
        gatedDestinations.register,
      );
      await expect(homePage.viewPlatformFeaturesLink()).toHaveAttribute(
        'href',
        gatedDestinations.login,
      );
    });
  });
});
