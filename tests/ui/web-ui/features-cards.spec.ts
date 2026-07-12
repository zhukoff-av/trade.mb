// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-017

import { expect, test } from '../../../src/fixtures/ui';
import { featuresContent } from '../../../src/data/public-site';

test.describe('1.17 Features page renders feature and solution cards', () => {
  test('Features page renders feature and solution cards', async ({ featuresPage }) => {
    await test.step('Open the public Features page', async () => {
      await featuresPage.open();
    });

    await test.step('Confirm all named feature sections', async () => {
      await expect(featuresPage.heading(featuresContent.heroHeading)).toBeVisible();
      for (const heading of featuresContent.featureHeadings) {
        await expect(featuresPage.heading(heading)).toBeVisible();
      }
    });

    await test.step('Confirm the solution cards', async () => {
      await expect(featuresPage.solutionsSection).toBeVisible();
      for (const cardName of featuresContent.solutionCards) {
        await expect(featuresPage.solutionCard(cardName)).toBeVisible();
      }
    });
  });
});
