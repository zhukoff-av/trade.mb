// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-021

import { expect, test } from '../../../src/fixtures/ui';
import { tokenContent } from '../../../src/data/public-site';
import { TokenPage } from '../../../src/pages/token.page';

test.describe('1.21 $MBG navigation opens the token landing page', () => {
  test('$MBG navigation opens the token landing page', async ({ header, homePage, page }) => {
    let tokenPage!: TokenPage;

    await test.step('Open the public home page and activate $MBG navigation', async () => {
      await homePage.open();
      const [tokenTab] = await Promise.all([
        page.waitForEvent('popup'),
        header.desktopNavigationLink('$MBG').click(),
      ]);
      tokenPage = new TokenPage(tokenTab);
      await expect(tokenTab).toHaveURL(tokenContent.landingUrl);
    });

    await test.step('Confirm stable token utility content', async () => {
      await expect(tokenPage.heroHeading()).toContainText('$MBG');
      await expect(tokenPage.utilitySection).toBeVisible();
      for (const cardName of tokenContent.utilityCards) {
        await expect(tokenPage.utilityCard(cardName)).toBeVisible();
      }
    });

    await test.step('Confirm roadmap, allocation, and purchase entry point', async () => {
      await expect(tokenPage.heading(tokenContent.roadmapHeading)).toBeVisible();
      await expect(tokenPage.heading(tokenContent.allocationHeading)).toBeVisible();
      await expect(tokenPage.buyLink()).toHaveAttribute('href', tokenContent.buyUrl);
    });
  });
});
