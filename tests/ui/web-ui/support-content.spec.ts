// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-020

import { expect, test } from '../../../src/fixtures/ui';
import { localeAwarePath, supportContent } from '../../../src/data/public-site';

test.describe('1.20 Support page renders discovery and assistance cards', () => {
  test('Support page renders discovery and assistance cards', async ({ supportPage }) => {
    await test.step('Open the public Support page', async () => {
      await supportPage.open();
    });

    await test.step('Confirm support discovery paths', async () => {
      await expect(supportPage.heroHeading()).toBeVisible();
      await expect(supportPage.searchInput()).toBeVisible();
      for (const action of supportContent.quickActions) {
        await expect(supportPage.quickAction(action.name)).toHaveAttribute(
          'href',
          localeAwarePath(action.path),
        );
      }
      for (const category of supportContent.faqCategories) {
        await expect(supportPage.faqCategory(category.name)).toHaveAttribute(
          'href',
          localeAwarePath(category.path),
        );
      }
      await expect(supportPage.viewMoreLink()).toHaveAttribute(
        'href',
        localeAwarePath(supportContent.faqIndexPath),
      );
    });

    await test.step('Confirm assistance cards and destinations', async () => {
      await expect(supportPage.chatButton()).toBeVisible();
      await expect(supportPage.assistanceLink('Submit a request')).toHaveAttribute(
        'href',
        localeAwarePath(supportContent.requestPath),
      );
      await expect(supportPage.assistanceLink('Terms and conditions')).toHaveAttribute(
        'href',
        localeAwarePath(supportContent.termsPath),
      );
    });
  });
});
