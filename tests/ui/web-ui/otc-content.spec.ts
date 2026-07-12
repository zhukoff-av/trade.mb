// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-019

import { expect, test } from '../../../src/fixtures/ui';
import { otcContent } from '../../../src/data/public-site';

test.describe('1.19 OTC benefit, process, and FAQ content renders', () => {
  test('OTC benefit, process, and FAQ content renders', async ({ otcDeskPage }) => {
    await test.step('Open the public OTC Desk page', async () => {
      await otcDeskPage.open();
    });

    await test.step('Confirm all OTC benefit articles', async () => {
      await expect(otcDeskPage.benefitsSection).toBeVisible();
      for (const benefit of otcContent.benefits) {
        await expect(otcDeskPage.benefitArticle(benefit)).toBeVisible();
      }
    });

    await test.step('Confirm the process steps, FAQ, and quote anchor', async () => {
      await expect(otcDeskPage.processSection).toBeVisible();
      for (const processStep of otcContent.processSteps) {
        await expect(otcDeskPage.processStep(processStep)).toBeVisible();
      }
      await expect(otcDeskPage.heading(otcContent.faqHeading)).toBeVisible();
      await expect(otcDeskPage.quoteAnchor()).toHaveAttribute('href', '#otc-form');
    });
  });
});
