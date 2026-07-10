import { expect, test as base } from '@playwright/test';
import { PublicSitePage } from '../pages/public-site.page';
import { LinkChecker } from '../utils/link-checker';

type UiFixtures = {
  publicSite: PublicSitePage;
  linkChecker: LinkChecker;
};

export const test = base.extend<UiFixtures>({
  publicSite: async ({ page }, use) => {
    await use(new PublicSitePage(page));
  },
  linkChecker: async ({ request }, use) => {
    await use(new LinkChecker(request));
  },
});

export { expect };
