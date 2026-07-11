// spec: specs/web-ui.md
// plan-id: TRADEMB-WEBUI-008

import { expect, test } from '../../../src/fixtures/ui';
import { companyContent } from '../../../src/data/public-site';

test.describe('1.8 Company page renders Why MultiBank Group content', () => {
  test('Company page renders all Why MultiBank Group content', async ({ companyPage }) => {
    await test.step('Open the public Company page', async () => {
      await companyPage.open();
    });

    await test.step('Confirm the introduction and company statistics', async () => {
      await expect(companyPage.heading(companyContent.heading)).toBeVisible();
      await expect(companyPage.heading(companyContent.introduction)).toBeVisible();
      for (const statistic of companyContent.statistics) {
        await expect(companyPage.exactText(statistic.value)).toBeVisible();
        await expect(companyPage.exactText(statistic.label)).toBeVisible();
      }
    });

    await test.step('Confirm the leadership, innovation, and integrity sections', async () => {
      for (const section of companyContent.editorialSections) {
        await expect(companyPage.heading(section.heading)).toBeVisible();
        await expect(companyPage.exactText(section.body)).toBeVisible();
      }
    });

    await test.step('Confirm the trust cards and community section', async () => {
      await expect(companyPage.heading(companyContent.strengthHeading)).toBeVisible();
      for (const strength of companyContent.strengths) {
        await expect(companyPage.exactText(strength.heading)).toBeVisible();
        await expect(companyPage.exactText(strength.body)).toBeVisible();
      }
      await expect(companyPage.heading(companyContent.communityHeading)).toBeVisible();
      await expect(companyPage.heading(companyContent.communitySubheading)).toBeVisible();
    });
  });
});
