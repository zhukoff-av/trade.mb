// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-014

import { expect, test } from '../../../src/fixtures/ui';
import { localeAwarePath, localeAwarePublicUrl } from '../../../src/data/public-site';

test.describe('1.14 Home Explore all assets opens Explore', () => {
  test('Home Explore all assets opens Explore', async ({ explorePage, homePage, page }) => {
    await test.step('Open the public English home page', async () => {
      await homePage.open();
    });

    const exploreLink = homePage.exploreAllAssetsLink();

    await test.step('Inspect and activate the market CTA', async () => {
      await expect(exploreLink).toBeVisible();
      await expect(exploreLink).toHaveAttribute('href', localeAwarePath('/explore'));
      await exploreLink.click();
    });

    await test.step('Confirm the Explore destination renders', async () => {
      await expect(page).toHaveURL(localeAwarePublicUrl('/explore'));
      await expect(explorePage.heroHeading()).toBeVisible();
    });
  });
});
